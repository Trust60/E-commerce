import { createSlice } from '@reduxjs/toolkit';

const saveCartToLocalStorage = (cart) => {
	localStorage.setItem('cart', JSON.stringify(cart));
};

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		items: [],
		totalAmount: 0,
	},
	reducers: {
		addItemToCart(state, action) {
			if (state.items.length >= 1) {
				if (state.items[0].shop !== action.payload.shop) {
					// Change this alert to popup message
					alert(
						`To add a new product, go to the store № ${state.items[0].shop}. To select this item please clear the shopping cart`,
					);
					return;
				}
			}
			const newItem = { ...action.payload, price: Number(action.payload.price), quantity: 1 };
			const existingItem = state.items.find((item) => item.id === newItem.id);

			if (existingItem) {
				existingItem.quantity += 1;
			} else {
				state.items.push(newItem);
			}
			state.totalAmount += newItem.price;

			saveCartToLocalStorage(state);
		},
		decreaseQuantity(state, action) {
			const newItem = action.payload;
			const existingItem = state.items.find((item) => item.id === newItem);

			if (existingItem) {
				if (existingItem.quantity === 1) {
					return;
				} else {
					existingItem.quantity -= 1;
					state.totalAmount -= existingItem.price;
				}
			}
			saveCartToLocalStorage(state);
		},
		increaseQuantity(state, action) {
			const newItem = action.payload;
			const existingItem = state.items.find((item) => item.id === newItem);
			if (existingItem) {
				existingItem.quantity += 1;
				state.totalAmount += existingItem.price;
			}
			saveCartToLocalStorage(state);
		},
		removeItem(state, action) {
			const newItem = action.payload;
			const deletedItem = state.items.find((item) => item.id === newItem);
			state.totalAmount -= deletedItem.price * deletedItem.quantity;
			state.items = state.items.filter((item) => item.id !== newItem);
			saveCartToLocalStorage(state);
		},
		clearCart(state) {
			state.items = [];
			state.totalAmount = 0;
			saveCartToLocalStorage(state);
		},
		setCart(state, action) {
			state.items = action.payload.items;
			state.totalAmount = action.payload.totalAmount;
		},
	},
});

export const { actions, reducer } = cartSlice;
