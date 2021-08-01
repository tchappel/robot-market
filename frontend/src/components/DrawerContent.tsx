import { useStoreSelector } from "store/hooks";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import {
  selectAllCartItems,
  selectCartItemEntities,
  selectTotalAmount as selectCartTotalAmount,
  selectTotalPrice as selectCartTotalPrice,
} from "store/cartSlice";
import { selectRobotEntities } from "store/robotsSlice";
import { formatTHB } from "services/currency";
import useCartAction from "hooks/useCartAction";

const DrawerContent = () => {
  const cartItemsEntities = useStoreSelector(selectCartItemEntities);
  const allCartItems = useStoreSelector(selectAllCartItems);
  const isCartEmpty = !useStoreSelector(selectCartTotalAmount);
  const cartTotalAmount = useStoreSelector(selectCartTotalAmount);
  const cartTotalPrice = useStoreSelector(selectCartTotalPrice);

  const robotEntities = useStoreSelector(selectRobotEntities);

  const getRobotName = (robotId: string) => {
    const robot = robotEntities[robotId];
    return robot ? robot.name : "";
  };

  const getRobotAvatarSrc = (robotId: string) => {
    const robot = robotEntities[robotId];
    return robot ? robot.image : "";
  };

  const getRobotAvatarAlt = (robotId: string) => {
    const robotName = getRobotName(robotId);
    return robotName ? `Avatar of robot ${robotName}` : "";
  };

  const getRobotLeftStock = (robotId: string) => {
    const robot = cartItemsEntities[robotId];
    if (robot) {
      return robot.leftStock;
    }
    return "unknown";
  };

  const { action: addItemToCart, disableStatus: isAddItemToCartDisabled } =
    useCartAction("add");

  const {
    action: removeItemFromCart,
    disableStatus: isRemoveItemFromCartDisabled,
  } = useCartAction("remove");

  const {
    action: removeAllItemsFromCart,
    disableStatus: isRemoveAllItemsFromCartDisabled,
  } = useCartAction("remove-all");

  return isCartEmpty ? (
    <Typography variant="body1" align="center">
      Your cart is empty
    </Typography>
  ) : (
    <>
      <List dense>
        {allCartItems.map((cartItem) => {
          return (
            <ListItem key={cartItem.id}>
              <ListItemAvatar>
                <Avatar
                  src={getRobotAvatarSrc(cartItem.id)}
                  alt={getRobotAvatarAlt(cartItem.id)}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <span>
                    {getRobotName(cartItem.id)}
                    <br />
                    {`quantity: ${cartItem.quantity}`}
                  </span>
                }
                secondary={`${getRobotLeftStock(cartItem.id)} left in stock`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="start"
                  aria-label="remove 1 robot item from cart"
                  disabled={isRemoveItemFromCartDisabled(cartItem.id)}
                  onClick={() => removeItemFromCart(cartItem.id)}
                  size="small"
                  color="secondary"
                >
                  <RemoveIcon />
                </IconButton>
                <IconButton
                  aria-label="add 1 robot item to cart"
                  disabled={isAddItemToCartDisabled(cartItem.id)}
                  onClick={() => addItemToCart(cartItem.id)}
                  size="small"
                  color="primary"
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="remove all robot items from cart"
                  disabled={isRemoveAllItemsFromCartDisabled(cartItem.id)}
                  onClick={() => removeAllItemsFromCart(cartItem.id)}
                  size="small"
                >
                  <DeleteForeverOutlinedIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <Box p={2}>
        <Typography variant="h6" component="h2">
          {`Total Amount: ${cartTotalAmount}`}
        </Typography>
        <Typography variant="h6" component="h2">
          {`Total Price: ${formatTHB(cartTotalPrice)}`}
        </Typography>
      </Box>
    </>
  );
};

export default DrawerContent;
