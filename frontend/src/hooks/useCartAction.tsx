import { useStoreSelector, useStoreDispatch } from "store/hooks";
import { useDialogDispatch } from "context/dialog";
import { selectRobots, robotsAdapter } from "store/robotsSlice";
import {
  addItemToCart,
  removeItemFromCart,
  removeAllItemsFromCart,
  cartItemsAdapter,
  selectCartItems,
  selectCartIsFull,
} from "store/cartSlice";

const useCartAction = (actionType: "add" | "remove" | "remove-all") => {
  const cartItems = useStoreSelector(selectCartItems);
  const robots = useStoreSelector(selectRobots);
  const isCartFull = useStoreSelector(selectCartIsFull);

  const storeDispatch = useStoreDispatch();
  const dialogDispatch = useDialogDispatch();

  const selectCartItemById = (robotId: string) => {
    const { selectById } = cartItemsAdapter.getSelectors();
    return selectById(cartItems, robotId);
  };

  const selectRobotById = (robotId: string) => {
    const { selectById } = robotsAdapter.getSelectors();
    return selectById(robots, robotId);
  };

  const isAddItemToCartBtnDisabled = (robotId: string) => {
    const robot = selectRobotById(robotId);
    const cartItem = selectCartItemById(robotId);
    if (!robot) {
      return true;
    }
    if (!cartItem) {
      return robot.stock === 0;
    }
    return robot.stock - cartItem.quantity === 0;
  };

  const handleAddItemToCart = (robotId: string) => {
    const robot = selectRobotById(robotId);
    const cartItem = selectCartItemById(robotId);
    if (robot) {
      if (isCartFull && !cartItem) {
        dialogDispatch({
          type: "OPEN_DIALOG",
          payload: {
            title: "Your cart is full!",
            content: "Maximum 5 types of robots. Remove one type to continue.",
          },
        });
      } else {
        storeDispatch(addItemToCart(robot));
      }
    }
  };

  const isRemoveItemFromCartBtnDisabled = (robotId: string) => {
    const cartItem = selectCartItemById(robotId);
    return !cartItem;
  };

  const handleRemoveItemFromCart = (robotId: string) => {
    const robot = selectRobotById(robotId);
    const cartItem = selectCartItemById(robotId);
    if (robot && cartItem) {
      storeDispatch(removeItemFromCart(robot));
    }
  };

  const isRemoveAllItemsFromCartBtnDisabled = (robotId: string) => {
    const cartItem = selectCartItemById(robotId);
    return !cartItem;
  };

  const handleRemoveAllItemsFromCart = (robotId: string) => {
    const robot = selectRobotById(robotId);
    const cartItem = selectCartItemById(robotId);
    if (robot && cartItem) {
      storeDispatch(removeAllItemsFromCart(robot));
    }
  };

  const getAction = () => {
    if (actionType === "add") {
      return handleAddItemToCart;
    }
    if (actionType === "remove") {
      return handleRemoveItemFromCart;
    }

    if (actionType === "remove-all") {
      return handleRemoveAllItemsFromCart;
    }

    return () => {};
  };

  const getDisabledStatus = () => {
    if (actionType === "add") {
      return isAddItemToCartBtnDisabled;
    }

    if (actionType === "remove") {
      return isRemoveItemFromCartBtnDisabled;
    }

    if (actionType === "remove-all") {
      return isRemoveAllItemsFromCartBtnDisabled;
    }
    return () => true;
  };

  return { action: getAction(), disableStatus: getDisabledStatus() };
};

export default useCartAction;
