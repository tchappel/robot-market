import { useEffect } from "react";
import { Robot, LoadingStatus } from "types";
import { Button, Box } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@material-ui/icons/CheckBoxOutlineBlankOutlined";
import RobotsGrid from "components/RobotsGrid";
import RobotCard from "components/RobotCard";
import { useStoreSelector, useStoreDispatch } from "store/hooks";
import RobotsFilter from "components/RobotsFilter";
import { selectAllRobots, selectRobotsLoading } from "store/robotsSlice";
import {
  RobotsFilterOptions,
  createRobotsFilterOptions,
  updateRobotsFilterOptions,
  selectRobotsFilterLoading,
  selectRobotsFilterOptions,
} from "store/robotsFilterSlice";
import { formatTHB, formatDateString } from "services/currency";
import useCartAction from "hooks/useCartAction";
import { isEmptyObject, isEmptyArray } from "services/logic";

export const getAllRobotMaterials = (robots: Robot[]) => {
  const robotMaterialsSet = new Set<string>();
  robots.forEach((robot) => {
    robotMaterialsSet.add(robot.material);
  });
  return Array.from(robotMaterialsSet);
};

const getRobotsFilterOptions = (robots: Robot[]) => {
  const options: RobotsFilterOptions = {};
  getAllRobotMaterials(robots).forEach((material) => {
    options[material] = true;
  });
  return options;
};

const filterRobotsByMaterials = (
  robots: Robot[],
  robotsFilterOptions: RobotsFilterOptions
) => {
  const materialsArray = Object.keys(robotsFilterOptions).filter(
    (material) => !!robotsFilterOptions[material]
  );
  if (materialsArray.length) {
    return robots.filter((robot) => materialsArray.includes(robot.material));
  }
  return robots;
};

const MainContent = () => {
  const allRobots = useStoreSelector(selectAllRobots);
  const robotsLoading = useStoreSelector(selectRobotsLoading);
  const robotsFilterOptions = useStoreSelector(selectRobotsFilterOptions);
  const robotsFilterLoading = useStoreSelector(selectRobotsFilterLoading);
  const storeDispatch = useStoreDispatch();

  const isRobotsFilterLoading = robotsFilterLoading !== LoadingStatus.succeeded;
  const isRobotsGridLoading = robotsLoading !== LoadingStatus.succeeded;

  const filteredRobots = filterRobotsByMaterials(
    allRobots,
    robotsFilterOptions
  );

  const { action: addItemToCart, disableStatus: isAddItemToCartDisabled } =
    useCartAction("add");

  const {
    action: removeItemFromCart,
    disableStatus: isRemoveItemFromCartDisabled,
  } = useCartAction("remove");

  const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    storeDispatch(
      updateRobotsFilterOptions({
        [event.target.name]: event.target.checked,
      })
    );
  };

  const selectAllFilterOptions = () => {
    const nextRobotsMaterialOptions: RobotsFilterOptions = {};
    Object.keys(robotsFilterOptions).forEach((material) => {
      nextRobotsMaterialOptions[material] = true;
    });
    storeDispatch(updateRobotsFilterOptions(nextRobotsMaterialOptions));
  };

  const deselectAllFilterOptions = () => {
    const nextRobotsMaterialOptions: RobotsFilterOptions = {};
    Object.keys(robotsFilterOptions).forEach((material) => {
      nextRobotsMaterialOptions[material] = false;
    });
    storeDispatch(updateRobotsFilterOptions(nextRobotsMaterialOptions));
  };

  useEffect(() => {
    if (!isEmptyArray(allRobots) && isEmptyObject(robotsFilterOptions)) {
      const nextRobotsFilterOptions = getRobotsFilterOptions(allRobots);
      storeDispatch(createRobotsFilterOptions(nextRobotsFilterOptions));
    }
  }, [allRobots, robotsFilterOptions, storeDispatch]);

  return (
    <>
      <Toolbar>
        <Box display="flex" flexWrap="wrap" width="100%" py={2}>
          <Box width="100%" display="flex" justifyContent="space-between">
            <Typography variant="h6" noWrap component="h2">
              Filter robots
            </Typography>
            <Box>
              <Button
                startIcon={<CheckBoxOutlinedIcon />}
                onClick={selectAllFilterOptions}
              >
                select all
              </Button>
              <Button
                startIcon={<CheckBoxOutlineBlankOutlinedIcon />}
                onClick={deselectAllFilterOptions}
              >
                deselect all
              </Button>
            </Box>
          </Box>
          <Box width="100%">
            <RobotsFilter
              loading={isRobotsFilterLoading}
              options={robotsFilterOptions}
              onChange={onFilterChange}
            />
          </Box>
        </Box>
      </Toolbar>
      <Container maxWidth="xl">
        <RobotsGrid loading={isRobotsGridLoading}>
          {filteredRobots.map((robot) => (
            <RobotCard
              key={robot.id}
              title={robot.name}
              media={{
                src: robot.image,
                alt: `robot {robot.name} avatar`,
                title: robot.name,
              }}
              content={
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary={`Price: ${formatTHB(Number(robot.price))}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Stock: ${robot.stock}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={`Created date: ${formatDateString(
                        robot.createdAt
                      )}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Material: ${robot.material}`} />
                  </ListItem>
                </List>
              }
              actions={
                <Box display="flex" width="100%" justifyContent="space-between">
                  <Button
                    size="small"
                    color="secondary"
                    disabled={isRemoveItemFromCartDisabled(robot.id)}
                    onClick={() => removeItemFromCart(robot.id)}
                  >
                    Remove from cart
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    disabled={isAddItemToCartDisabled(robot.id)}
                    onClick={() => addItemToCart(robot.id)}
                  >
                    Add to cart
                  </Button>
                </Box>
              }
            />
          ))}
        </RobotsGrid>
      </Container>
    </>
  );
};

export default MainContent;
