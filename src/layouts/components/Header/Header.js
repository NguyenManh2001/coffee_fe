import classNames from 'classnames/bind';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CartIcons, LoginIcons } from '~/Components/icons/icons';
import Images from '~/Components/Images';
import config from '~/config';
import styles from './Header.module.scss';
import Menu, { MenuItem } from './menu';

const cx = classNames.bind(styles);
function Header() {
    const [content, setContent] = useState(false);
    // const [cart, setCart] = useState(false);

    // const handleOpen = () => {
    //     setContent(!content);
    //     setCart(!cart);
    // };
    const handleSubmit = () => {
        setContent(!content);
        // setCart(!cart);
    };

    return (
        <div className={cx('wraper')}>
            <div className={cx('container')}>
                <Images className={cx('logo')} src="https://coffee-cup-react.vercel.app/images/logo-2.png" />

                <Menu>
                    <MenuItem title="Trang chủ" to={config.routers.Home} />
                    <MenuItem title="Menu" to={config.routers.Menu} />
                    <MenuItem title="Tin tức" to={config.routers.News} />
                    <MenuItem title="Liên hệ" to={config.routers.Contact} />
                    <MenuItem title="Chúng tôi" to={config.routers.About} />
                </Menu>

                <div>
                    <button className={cx('ColorCartIcon')} onClick={handleSubmit} to="#">
                        <CartIcons />
                    </button>
                    <NavLink className={cx('ColorLoginIcon')} to="#">
                        <LoginIcons />
                    </NavLink>
                </div>
            </div>
            <>
            {content ? (
                
                <div className={cx('content')}>
                    <div className={cx('cart')}>
                        <div className={cx('header-cart')}>
                            <h2 className={cx('text-header')}>Giỏ hàng của tôi</h2>
                            <button onClick={handleSubmit} className={cx('btn')} aria-label="Close"></button>
                        </div>
                        <div className={cx('content-cart')}>
                            <h3 className={cx('content-header')}>Giỏ hàng trống</h3>
                            <div className={cx('content-title')}>
                                <NavLink className={cx('btnMenu')} onClick={handleSubmit} to={config.routers.Menu}>
                                    Tiếp tục mua hàng
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('container')}>
            </div>
            )}
            </>
        </div>
    );
}

export default Header;
