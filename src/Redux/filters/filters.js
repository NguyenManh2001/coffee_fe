// const initState = {
//         search:'',
// }
// const filterReducer = (state= initState,action) => {
//     console.log({state,action})
//      switch(action.type){
//         case 'listCar/searchListcar':
//                 return{
//                     ...state,
//                     search: action.payload
//                 }
//         default:
//             return state;
//      }
// }
// export default filterReducer;

import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'; // Import thư viện Cookies

// Lấy trạng thái ban đầu từ cookie (nếu có)
const initialStateFromCookie = Cookies.get('reduxState')
    ? JSON.parse(Cookies.get('reduxState'))
    : {
          search: '',
          list: '',
          login: null,
          token: null,
      };

const filterSlice = createSlice({
    name: 'listMenu',
    initialState: initialStateFromCookie, // Sử dụng trạng thái từ cookie
    reducers: {
        searchListMenu: (state, action) => {
            state.search = action.payload;
        },
        list: (state, action) => {
            state.list = action.payload;
        },
        login: (state, action) => {
            state.login = action.payload;
        },
        token: (state, action) => {
            state.token = action.payload;

            // Lưu trạng thái mới vào cookie sau khi thay đổi
            Cookies.set('reduxState', JSON.stringify(state));
        },
    },
});

export default filterSlice;
