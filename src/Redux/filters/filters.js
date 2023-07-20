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


import {createSlice} from '@reduxjs/toolkit';

 const filterSlice = createSlice({
    name:"listMenu",
    initialState:{
      search:'',
      list:'',
      login: null,
      token:null,
    },
    reducers:{
      searchListMenu:(state,action) => {
       state.search = action.payload;
      },
      list:(state,action) => {
        state.list = action.payload;   
      },
      login:(state,action) => {
        state.login = action.payload;
       },
       token:(state,action) => {
        state.token = action.payload;
       }
    }
});
export default filterSlice;