import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CartIcons, EditIcons, DeleteIcons, LoginIcons, MenuIcons } from '~/Components/icons/icons';
import Images from '~/Components/Images';
import config from '~/config';
import styles from './Header.module.scss';
import Menu, { MenuItem } from './menu';

const cx = classNames.bind(styles);
function Header({ name, src, price, quatity, size }) {
    const [content, setContent] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [Name, setName] = useState(name);
    useEffect(() => {
        const handleScroll = () => {
            const Scroll = window.scrollY;
            if (Scroll >= 200) {
                setShowHeader(false);
                // setName(!Name);

            } else {
                setShowHeader(true);
             
            }
        };
        window.addEventListener('scroll', handleScroll);
    });

    const handleSubmit = () => {
        setContent(!content)
    };

    return (
        <div className={cx('wraper')}>
            <>
                {showHeader ? (
                    <div className={cx('container')}>
                        <div className={cx('menuIcon')}>
                        <MenuIcons />
                        </div>
                        <Images className={cx('logo')} src={require('~/assets/images/logo-2.png')} />

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
                ) : (
                    <div className={cx('container')}></div>
                )}
            </>
            <>
                {content ? (
                    <div className={cx('content')}>
                        <div className={cx('cart')}>
                            <div className={cx('header-cart')}>
                                <h2 className={cx('text-header')}>Giỏ hàng của tôi</h2>
                                <button onClick={handleSubmit} className={cx('btn')} aria-label="Close"></button>
                            </div>
                            {Name?(
                                <div className={cx('content-cart')}>
                                    <div className={cx('content-cart-item')}>
                                        <div className={cx('cart-item')}>
                                            <Images className={cx('logo-cart')} src={src} />
                                            <div className={cx('cart-title')}>
                                                <div className={cx('cart-name')}>{name}</div>
                                                <div className={cx('cart-size')}>
                                                    <div className={cx('size')}>
                                                        Size {size} <span>x {quatity}</span>
                                                    </div>
                                                    <div className={cx('edit')}>
                                                        <EditIcons />
                                                    </div>
                                                    <div className={cx('cart-price')}>{price}đ</div>
                                                    <div className={cx('delete')}>
                                                        <DeleteIcons />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <NavLink to={config.routers.Menu} className={cx('add')}>
                                            Thêm món
                                        </NavLink>
                                    </div>
                                    <div className={cx('content-cart-item')}>
                                        <div className={cx('price')}>
                                            <div className={cx('size')}>Tổng cộng</div>
                                            <div className={cx('cart-price')}>{price}đ</div>
                                        </div>
                                    </div>
                                    <div className={cx('content-title')}>
                                        <NavLink className={cx('btnMenu')} to={config.routers.Menu}>
                                            Thanh toán
                                        </NavLink>
                                    </div>
                                </div>
                            ) : (
                                <div className={cx('content-cart')}>
                                    <h3 className={cx('content-header')}>Giỏ hàng trống</h3>
                                    <div className={cx('content-title')}>
                                        <NavLink
                                            className={cx('btnMenu')}
                                            onClick={handleSubmit}
                                            to={config.routers.Menu}
                                        >
                                            Tiếp tục mua hàng
                                        </NavLink>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className={cx('container')}></div>
                )}
            </>
        </div>
    );
}

export default Header;
