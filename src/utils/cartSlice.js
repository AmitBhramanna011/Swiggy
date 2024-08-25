import { createSlice } from "@reduxjs/toolkit";
const cartSlice=createSlice({
    name:"cart",
    initialState:{
        items: [],
    },
    reducers:{
        addItems:(state,action)=>{
            state.items.push(action.payload);
        },
        removeItem:(state,action)=>{
            state.items.pop();
        },
        clearCart:(state)=>{
            state.items.length=0;
            // items=[]   will not work
        },
    },
});

// Basically it createSlice return object of actions and reducers , etc 
// like 
// {
//     action:...;
//     reducers:...;
// }

export const {addItems,removeItem,clearCart} =cartSlice.actions;
export default cartSlice.reducer;