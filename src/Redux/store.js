import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './filters/filters';
import listsMenuSlice from './list/list';
const Store = configureStore({
    reducer: {
        filter: filterSlice.reducer,
        list: listsMenuSlice.reducer,
    },
});
export default Store;
