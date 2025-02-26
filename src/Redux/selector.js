import { createSelector } from '@reduxjs/toolkit';

export const searchSelector = (state) => state.filter.search;
export const addProductSelector = (state) => state.list.listProduct1;
export const productSelector = (state) => state.list.product;
export const addAddressSelector = (state) => state.list.address;
export const addUserProductSelector = (state) => state.list.users;
export const tokenSelector = (state) => state.filter.token;
export const listSelector = (state) => state.list.listsMenu;
export const listCustomerSelector = (state) => state.list.listCustomer;
export const selectorMenu = (state) => state.filter.list;
// export const tokenSelector = (state) => state.filter.token;
export const searchitemSelector = createSelector(
    listSelector,
    searchSelector,
    selectorMenu,
    (listMenus, searchValue, selectorMenuItem) => {
        if (!listMenus) {
            return [];
        }
        const filteredMenus = listMenus.filter((listMenu) => listMenu.name === selectorMenuItem);
        if (filteredMenus.length === 0) {
            return [];
        }
        return filteredMenus.filter((listMenu) => listMenu.menus.filter((menu) => menu.name.includes(searchValue)));
    },
);
export const searchCustomerSelector = createSelector(
    listCustomerSelector,
    searchSelector,
    (listCustomers, searchValue) => {
        if (!listCustomers) {
            return [];
        }
        console.log(listCustomers);
        return listCustomers.filter((listCustomer) => {
            return listCustomer.name.includes(searchValue);
        });
    },
);
