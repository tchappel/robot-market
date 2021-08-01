import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import type { RootState } from "store";
import type { Robot, CartItem } from "types";

export const cartItemsAdapter = createEntityAdapter<CartItem>();

const initialState = {
  totalAmount: 0,
  totalPrice: 0,
  isFull: false, // cart has already 5 types of robots;
  cartItems: cartItemsAdapter.getInitialState(),
};

const cartItemsSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Robot>) => {
      const { selectById: selectCartItemsById, selectIds: selectCartItemsIds } =
        cartItemsAdapter.getSelectors();
      const cartItem = selectCartItemsById(state.cartItems, action.payload.id);
      const cartItemsIds = selectCartItemsIds(state.cartItems);
      let robotTypesInCart = cartItem
        ? cartItemsIds.length
        : cartItemsIds.length + 1;
      const newCartItemQuantity = cartItem ? cartItem.quantity + 1 : 1;
      cartItemsAdapter.upsertOne(state.cartItems, {
        id: action.payload.id,
        quantity: newCartItemQuantity,
        leftStock: action.payload.stock - newCartItemQuantity,
      });
      state.totalAmount += 1;
      state.totalPrice = parseFloat(
        (state.totalPrice + parseFloat(action.payload.price)).toFixed(2)
      );
      state.isFull = robotTypesInCart >= 5;
    },
    removeItem: (state, action: PayloadAction<Robot>) => {
      const { selectById: selectCartItemsById, selectIds: selectCartItemsIds } =
        cartItemsAdapter.getSelectors();
      const cartItem = selectCartItemsById(state.cartItems, action.payload.id);
      const cartItemsIds = selectCartItemsIds(state.cartItems);
      let robotTypesInCart = cartItemsIds.length;
      if (cartItem) {
        const newCartItemQuantity = cartItem.quantity - 1;
        if (newCartItemQuantity === 0) {
          cartItemsAdapter.removeOne(state.cartItems, action.payload.id);
          robotTypesInCart -= 1;
        } else {
          cartItemsAdapter.updateOne(state.cartItems, {
            id: action.payload.id,
            changes: {
              quantity: newCartItemQuantity,
              leftStock: action.payload.stock - newCartItemQuantity,
            },
          });
        }
        state.totalAmount -= 1;
        state.totalPrice = parseFloat(
          (state.totalPrice - parseFloat(action.payload.price)).toFixed(2)
        );
        state.isFull = robotTypesInCart >= 5;
      }
    },
    removeAllitems: (state, action: PayloadAction<Robot>) => {
      const { selectById: selectCartItemsById } =
        cartItemsAdapter.getSelectors();

      const cartItem = selectCartItemsById(state.cartItems, action.payload.id);

      if (cartItem) {
        cartItemsAdapter.removeOne(state.cartItems, action.payload.id);
        state.totalAmount -= cartItem.quantity;
        state.totalPrice = parseFloat(
          (
            state.totalPrice -
            parseFloat(action.payload.price) * cartItem.quantity
          ).toFixed(2)
        );
        state.isFull = false;
      }
    },
  },
});

export const {
  addItem: addItemToCart,
  removeItem: removeItemFromCart,
  removeAllitems: removeAllItemsFromCart,
} = cartItemsSlice.actions;

export const {
  selectById: selectCartItemById,
  selectIds: selectCartItemIds,
  selectEntities: selectCartItemEntities,
  selectAll: selectAllCartItems,
  selectTotal: selectTotalCartItems,
} = cartItemsAdapter.getSelectors((state: RootState) => state.cart.cartItems);

export const selectCart = (state: RootState) => state.cart;
export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectTotalAmount = (state: RootState) => state.cart.totalAmount;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectCartIsFull = (state: RootState) => state.cart.isFull;

export default cartItemsSlice.reducer;
