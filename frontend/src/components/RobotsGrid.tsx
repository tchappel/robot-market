import { Grid, Box } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

type RobotsGridProps = {
  children: JSX.Element[];
  loading: boolean;
};

const renderLoadingPlaceholders = (num = 1) =>
  new Array(num).fill(undefined).map((item: undefined, index) => (
    <Grid item xs={3} key={index}>
      <Skeleton variant="rect" width={"100%"} height={190} animation="wave" />
      <Skeleton width="100%" />
      <Skeleton width="100%" />
      <Skeleton width="100%" />
      <Skeleton width="100%" />
      <Box display="flex" justifyContent="space-around">
        <Skeleton width="30%" height={50} />
        <Skeleton width="30%" height={50} />
      </Box>
    </Grid>
  ));

const RobotsGrid = ({ children, loading }: RobotsGridProps) => {
  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="center"
      spacing={4}
    >
      {loading
        ? renderLoadingPlaceholders(48)
        : children.map((child) => (
            <Grid item xs={3} key={child.key}>
              {child}
            </Grid>
          ))}
    </Grid>
  );
};

export default RobotsGrid;
