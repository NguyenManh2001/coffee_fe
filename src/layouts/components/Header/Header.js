import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { CartIcons, EditIcons, DeleteIcons, LoginIcons, MenuIcons } from '~/Components/icons/icons';
import Images from '~/Components/Images';
import config from '~/config';
import styles from './Header.module.scss';
import Menu, { MenuItem } from './menu';
import Tippy from '@tippyjs/react/headless';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Empty, Avatar, Badge, Button, Modal, Dropdown, message, Alert, Input } from 'antd';
import { tokenSelector } from '~/Redux/selector';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import EditCustomer from '~/Pages/admin/Customer/EditCustomer';
import AddCustomer from '~/Pages/admin/Customer/AddCustomer';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const cx = classNames.bind(styles);

function Header({ name, src, price, quatity, size }) {
    const [content, setContent] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState();
    const [Name, setName] = useState(name);
    const navigate = useNavigate();
    const location = useLocation();
    const successMessage = location.state?.successMessage;

    const [messageApi, contextHolder] = message.useMessage(successMessage);

    const success = (message) => {
        messageApi.open({
            type: 'success',
            content: message,
        });
    };

    useEffect(() => {
        if (location.state && location.state.successMessage) {
            success(location.state.successMessage);
            setOpen(false);
            refetch();

            // Đặt giá trị successMessage trong location.state thành null
            const newLocation = { ...location };
            newLocation.state.successMessage = null;
            navigate({ pathname: location.pathname, state: newLocation.state });
        }
    }, [location.state]);
    // const userRole = useSelector(tokenSelector);
    const token = Cookies.get('token');

    const handleLogout = () => {
        Cookies.remove('token');
        window.location.reload();
    };
    const handleInfomation = () => {
        setOpen(true);
    };
    useEffect(() => {
        if (token !== undefined) {
            const deToken = jwt_decode(token);
            setEmail(deToken?.email);
        }
    }, [token]);

    const { isLoading, data, refetch } = useQuery({
        queryKey: ['listCustomer', email],
        queryFn: () => axios.post('/customer/listCustomer', { email }).then((res) => res.data),
    });
    console.log(data);
    const ModalEdit = () => (
        <Modal
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
            footer={null}
        >
            {data?.docs?.length > 0 ? <EditCustomer data={data} /> : <AddCustomer />}
        </Modal>
    );
    const items = email
        ? [
              {
                  key: '1',
                  label: (
                      <NavLink to="#" onClick={handleInfomation}>
                          Thông tin cá nhân
                      </NavLink>
                  ),
              },
              {
                  key: '2',
                  label: (
                      <NavLink to="#" onClick={handleLogout}>
                          Đăng xuất
                      </NavLink>
                  ),
              },
          ]
        : [
              {
                  key: '1',
                  label: <NavLink to={config.routers.Login}>Đăng nhập</NavLink>,
              },
              {
                  key: '2',
                  label: <NavLink to={config.routers.Rigister}>Đăng ký</NavLink>,
              },
          ];

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
        setContent(!content);
    };

    return (
        <div className={cx('wraper')}>
            <>
                {contextHolder}
                {showHeader ? (
                    <div className={cx('container')}>
                        <Tippy
                            interactive
                            delay={[400, 500]}
                            //  placement={'bottom-end'}
                            render={(attrs) => (
                                <div className="box" tabIndex="-1" {...attrs}>
                                    <div className={cx('TippyWrapper')}>
                                        <MenuItem title="Trang chủ" to={config.routers.Home} />
                                        <MenuItem title="Menu" to={config.routers.Menu} />
                                        <MenuItem title="Tin tức" to={config.routers.News} />
                                        <MenuItem title="Liên hệ" to={config.routers.Contact} />
                                        <MenuItem title="Chúng tôi" to={config.routers.About} />
                                    </div>
                                </div>
                            )}
                        >
                            <div className={cx('menuIcon')}>
                                {' '}
                                <MenuIcons />{' '}
                            </div>
                        </Tippy>
                        <Images className={cx('logo')} src={require('~/assets/images/logo-2.png')} />

                        <Menu>
                            <MenuItem title="Trang chủ" to={config.routers.Home} />
                            <MenuItem title="Menu" to={config.routers.Menu} />
                            <MenuItem title="Tin tức" to={config.routers.News} />
                            <MenuItem title="Liên hệ" to={config.routers.Contact} />
                            <MenuItem title="Chúng tôi" to={config.routers.About} />
                        </Menu>
                        <div style={{ display: 'flex' }}>
                            <button className={cx('ColorCartIcon')} onClick={handleSubmit} to="#">
                                <Badge count={5}>
                                    <ShoppingCartOutlined style={{ fontSize: '34px', color: '#ffffff' }} />
                                </Badge>
                            </button>
                            {email ? (
                                <>
                                    <Dropdown
                                        className={cx('ColorLoginIcon')}
                                        menu={{
                                            items,
                                        }}
                                        placement="bottom"
                                        arrow={{
                                            pointAtCenter: true,
                                        }}
                                    >
                                        <NavLink className={cx('ColorLoginIcon')} to="#">
                                            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                                        </NavLink>
                                    </Dropdown>
                                    <span style={{ lineHeight: '41px', color: '#fff' }}>{email}</span>
                                </>
                            ) : (
                                <Dropdown
                                    className={cx('ColorLoginIcon')}
                                    menu={{
                                        items,
                                    }}
                                    placement="bottom"
                                    arrow={{
                                        pointAtCenter: true,
                                    }}
                                >
                                    <NavLink className={cx('ColorLoginIcon')} to="#">
                                        <LoginIcons />
                                    </NavLink>
                                </Dropdown>
                            )}
                        </div>
                        <ModalEdit />
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
                            {Name ? (
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
