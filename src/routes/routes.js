import Menu from '~/Pages/Menu';
import Home from '~/Pages/Home';
import News from '~/Pages/News';
import Contact from '~/Pages/Contact';
import About from '~/Pages/About';
import Tea from '~/Pages/Tea';
import Freeze from '~/Pages/Freeze';
import Coffee from '~/Pages/Coffee';
import Coffee1 from '~/Pages/Coffee1';
import config from '~/config';
import News1 from '~/Pages/News1';
import HeaderRegister from '~/layouts/HeaderRegister';
import MenuLayout from '~/layouts/MenuLayout';
import NewsLayout from '~/layouts/NewsLayout';
// import AdminLayout from '~/layouts/AdminLayout';
import { DefaultLayout, Layout, AdminLayout, HeaderOnly } from '~/layouts';
import Login from '~/layouts/components/Login/Login';
import Account from '~/Pages/admin/Account/Account';
import AddAccount from '~/Pages/admin/Account/AddAccount/AddAccount';
import EditAccount from '~/Pages/admin/Account/EditAccount/EditAccount';
import MenuList from '~/Pages/admin/MenuList/MenuList';
import AddMenu from '~/Pages/admin/MenuList/AddMenu/AddMenu';
import EditMenu from '~/Pages/admin/MenuList/EditMenu/EditMenu';
import Customer from '~/Pages/admin/Customer/Customer';
import AddCustomer from '~/Pages/admin/Customer/AddCustomer/AddCustomer';
import EditCustomer from '~/Pages/admin/Customer/EditCustomer/EditCustomer';
import Invoice from '~/Pages/admin/Invoice/Invoice';
// import Rigister from '~/layouts/components/Rigister/Rigister';
import Rigister from '~/Pages/admin/Layout/Rigister/Rigister';
import NewsAdmin from '~/Pages/admin/News/News';
import AddNews from '~/Pages/admin/News/AddNews';

const publicRoutes = [
    { path: config.routers.Home, component: Home, layout: DefaultLayout },
    { path: config.routers.News, component: News, layout: NewsLayout },
    { path: config.routers.Menu, layout: MenuLayout, component: Menu },
    { path: config.routers.Contact, component: Contact, layout: HeaderRegister },
    { path: config.routers.About, component: About, layout: HeaderRegister },
    { path: config.routers.Tea, layout: MenuLayout, component: Tea },
    { path: config.routers.Coffee, layout: MenuLayout, component: Coffee },
    { path: config.routers.Freeze, layout: MenuLayout, component: Freeze },
    { path: config.routers.Coffee1, layout: MenuLayout, component: Coffee1 },
    { path: config.routers.News1, component: News1, layout: NewsLayout },
    { path: config.routers.Rigister, component: Rigister, layout: null },
    { path: config.routers.Login, component: Login, layout: null },
    // { path: config.routers.Account, component: Account, layout: AdminLayout },
    // { path: config.routers.AddAccount, component: AddAccount, layout: AdminLayout },
    // { path: config.routers.EditAccount, component: EditAccount, layout: AdminLayout },
    // { path: config.routers.MenuAdmin, component: MenuList, layout: AdminLayout },
    // { path: config.routers.AddMenu, component: AddMenu, layout: AdminLayout },
    // { path: config.routers.EditMenu, component: EditMenu, layout: AdminLayout },
    // { path: config.routers.Customer, component: Customer, layout: AdminLayout },
    // { path: config.routers.AddCustomer, component: AddCustomer, layout: AdminLayout },
    // { path: config.routers.EditCustomer, component: EditCustomer, layout: AdminLayout },
    // { path: config.routers.Invoice, component: Invoice, layout: AdminLayout },
];
const privateRoutes = [
    { path: config.routers.Account, component: Account, layout: AdminLayout },
    { path: config.routers.AddAccount, component: AddAccount, layout: AdminLayout },
    { path: config.routers.EditAccount, component: EditAccount, layout: AdminLayout },
    { path: config.routers.MenuAdmin, component: MenuList, layout: AdminLayout },
    { path: config.routers.AddMenu, component: AddMenu, layout: AdminLayout },
    { path: config.routers.EditMenu, component: EditMenu, layout: AdminLayout },
    { path: config.routers.Customer, component: Customer, layout: AdminLayout },
    { path: config.routers.AddCustomer, component: AddCustomer, layout: AdminLayout },
    { path: config.routers.EditCustomer, component: EditCustomer, layout: AdminLayout },
    { path: config.routers.Invoice, component: Invoice, layout: AdminLayout },
    { path: config.routers.NewsAdmin, component: NewsAdmin, layout: AdminLayout },
    { path: config.routers.AddNews, component: AddNews, layout: AdminLayout },
];
export { publicRoutes, privateRoutes };
