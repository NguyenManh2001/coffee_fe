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


import {createSlice} from '@reduxjs/toolkit';
const listsMenuSlice  = createSlice({
      name:"Menu",
      initialState:{
        listsMenu:[],
        listCustomer:[],
      },
      reducers:{
        addListMenu:(state,action) => {
         state.listsMenu = action.payload
        },
        addListCustomer:(state,action) => {
          state.listCustomer = action.payload
         },
      },
})
export default listsMenuSlice;