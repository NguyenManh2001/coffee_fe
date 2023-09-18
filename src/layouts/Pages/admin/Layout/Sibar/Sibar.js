import classNames from 'classnames/bind';
import styles from './Sibar.module.scss';
import {HiClipboardList} from 'react-icons/hi';
import { NavLink,Link } from 'react-router-dom';
import config from '~/config/config';
import { FaUserCircle,FaMoneyBillAlt } from 'react-icons/fa';
import {BsFillTrashFill} from 'react-icons/bs';
import {HiOutlineUserGroup} from 'react-icons/hi'
const cx = classNames.bind(styles);
function Sibar() {

    const MENUS = [
        {
            id:1,
            name:'Sản phẩm',
            icon: <HiClipboardList />,
            link: config.routers.MenuAdmin
        },
        {
            id:2,
            name:'Khách Hàng',
            icon: <HiOutlineUserGroup />,
            link: config.routers.Customer
        },
        {
            id:3,
            name:'Hóa Đơn',
            icon: <FaMoneyBillAlt />,
            link: config.routers.Invoice
        },
        {
            id:4,
            name:'Tài Khoản',
            icon: <FaUserCircle />,
            link: config.routers.Account
        },
    ]
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
            <div className={cx('logo')}>
                    <img
                        className={cx('imgLogo')}
                        src={require('~/assets/images/logo-2.png')}
                        alt="Girl in a jacket"
                    />
                    <h5 className={cx('headertitle')}>Cup Coffee</h5>
                </div>
                <div className={cx('menu')}>
                    {MENUS.map((MENU) => (
                    <NavLink key={MENU.id} to ={MENU.link} className={(nav) => cx('menuItem', {active: nav.isActive})}>
                        <div className={cx('Icon')}>{MENU.icon}</div>
                        <div className={cx('Name')}>{MENU.name}</div>
                    </NavLink>
                    ))}
                     {/* <Link to='#' className={cx('menuItem')}>
                        <div className={cx('Icon')}><FaUserCircle /></div>
                        <div className={cx('Name')}>Thông tin cá nhân</div>
                    </Link>
                    <Link to='#' className={cx('menuItem')}>
                        <div className={cx('Icon')}><BsFillTrashFill /></div>
                        <div className={cx('Name')}>Thùng giác</div>
                    </Link> */}
                </div>
            </div>
        </div>
    );
}

export default Sibar;
