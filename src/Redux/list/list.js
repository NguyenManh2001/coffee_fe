// const initState = {
//     listscar: [],
//   };

// const listscarReducer = (state= initState,action) => {
//     console.log({state,action})
//      switch(action.type){
//         case 'listCar/addListcar':
//             return {
//                 ...state,
//                 listscar: action.payload,
//               };
//         default:
//             return state;
//      }
// }
// export default listscarReducer;

import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'; // Import thư viện Cookies
const initialStateFromCookie = Cookies.get('store')
    ? JSON.parse(Cookies.get('store'))
    : {
          listsMenu: [],
          users: {},
          listCustomer: [],
          listProduct: [],
          listProduct1: [],
      };
const listsMenuSlice = createSlice({
    name: 'Menu',
    initialState: initialStateFromCookie,
    reducers: {
        addListMenu: (state, action) => {
            state.listsMenu = action.payload;
        },
        addUser: (state, action) => {
            const { userId } = action.payload;
            console.log(action.payload);
            if (!state.users[userId]) {
                state.users[userId] = {
                    listProduct: [],
                };
                Cookies.set('store', JSON.stringify(state));
            }
        },
        addProductForUser: (state, action) => {
            const { userId, src, name, price, quatity, size, _id } = action.payload;

            console.log(`state ${state.users[userId]}`);
            if (state.users[userId]) {
                state.users[userId].listProduct.push({ src, name, price, quatity, size, _id });
                Cookies.set('store', JSON.stringify(state));
            }
        },
        deleteProductForUser: (state, action) => {
            const { user, id } = action.payload;
            console.log(user);
            if (state.users[user]) {
                // Tìm sản phẩm cần xóa dựa trên productId
                state.users[user].listProduct = state.users[user].listProduct.filter((product) => product._id !== id);

                // Sau khi xóa sản phẩm, lưu trạng thái vào Local Storage
                Cookies.set('store', JSON.stringify(state));
            }
        },
        addProduct: (state, action) => {
            state.listProduct1 = [...state.listProduct1, action.payload];
        },
        addListCustomer: (state, action) => {
            state.listCustomer = action.payload;
        },
    },
});
export default listsMenuSlice;
