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


const publicRoutes = [
    { path: config.routers.Home, component: Home },
    { path: config.routers.News, component: News, layout: NewsLayout},
    { path: config.routers.Menu, layout: MenuLayout, component: Menu },
    { path: config.routers.Contact, component: Contact, layout: HeaderRegister },
    { path: config.routers.About, component: About, layout: HeaderRegister },
    { path: config.routers.Tea, layout: MenuLayout , component: Tea},
    { path: config.routers.Coffee, layout: MenuLayout , component: Coffee},
    { path: config.routers.Freeze, layout: MenuLayout , component: Freeze},
    { path: config.routers.Coffee1, layout: MenuLayout, component: Coffee1},
    { path: config.routers.News1, component: News1, layout: NewsLayout},
];
const privateRoutes = [
]
export { publicRoutes, privateRoutes }