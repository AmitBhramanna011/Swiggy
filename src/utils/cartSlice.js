import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [], // Each item will now include quantity
    },
    reducers: {
        addItems: (state, action) => {
            // If the item already exists, increase its quantity; otherwise, add it to the cart
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({...action.payload, quantity: 1}); // New items start with a quantity of 1
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
        updateItemQuantity: (state, action) => {
            const { id, quantityChange } = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += quantityChange;
                // If the quantity is less than or equal to 0, remove the item
                if (existingItem.quantity <= 0) {
                    state.items = state.items.filter(item => item.id !== id);
                }
            }
        },
    },
});

export const { addItems, removeItem, clearCart, updateItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
