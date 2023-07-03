import { createSlice } from "@reduxjs/toolkit";


const initialState = {
}

const CartSlice = createSlice({
    name:"cart",
    initialState,
    reducers: {
        add:(prevState, action) => {
            const {payload} = action;
            let state = {...prevState}
            // const state = {..p};
            const pId = payload[0].pid;
            Object.values(state).filter(val => {
                return val.pid === pId
            }).forEach(val => {
                delete state[val.vid];
            })
            console.log(payload);
            for(let i = 0;i < payload.length;i++) {
                const {vid} = payload[i];
                const quantity = payload[i].qty;
                const price = payload[i].price;
                const orderItem = {
                    pid: payload[i].pid,
                    vid:payload[i].vid,
                    qty : Number(payload[i].qty),
                    label: payload[i].label,
                    color:payload[i].color,
                    pImage: payload[i].pImage,
                    price:payload[i].price,
                    totalPrice: payload[i].totalPrice
                  }
                  if(prevState[vid]) {
                    orderItem.totalPrice += (prevState[vid].totalPrice);
                    orderItem.qty += (prevState[vid].qty);
                  }
                  delete state[vid];
                  state[vid] = orderItem;
            }
            return state;
        },
        clear: (state) => {
            return {};
        }
    }
})

export const {add, clear} = CartSlice.actions;
export default CartSlice.reducer;