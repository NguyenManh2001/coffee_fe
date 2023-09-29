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
import { addProductSelector, tokenSelector } from '~/Redux/selector';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { Checkbox, Radio } from 'antd';
import EditCustomer from '~/Pages/admin/Customer/EditCustomer';
import AddCustomer from '~/Pages/admin/Customer/AddCustomer';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const cx = classNames.bind(styles);

function Header({ name, src, price, quatity, size }) {
    const [content, setContent] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [open, setOpen] = useState(false);
    const [buy, setBuy] = useState(false);
    const [email, setEmail] = useState();
    const [Name, setName] = useState(name);
    const navigate = useNavigate();
    const location = useLocation();
    const [checked, setChecked] = useState(false);
    const [list, setList] = useState([]);
    const [check, setCheck] = useState(false);
    const [checkedList, setCheckedList] = useState([]);
    const [priceList, setPriceList] = useState(0);
    const [productId, setProductId] = useState([]);
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
    const menus = useSelector(addProductSelector);
    console.log(menus[0]);
    const handleLogout = () => {
        Cookies.remove('token');
        window.location.reload();
    };
    const handleInfomation = () => {
        setOpen(true);
    };
    const [value, setValue] = useState(1);

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    useEffect(() => {
        if (token !== undefined) {
            const deToken = jwt_decode(token);
            setEmail(deToken?.email);
        }
    }, [token]);

    const { isLoading, data, refetch } = useQuery({
        queryKey: ['listCustomer', email],
        queryFn: () =>
            axios.post('https://coffee-bills.onrender.com/customer/listCustomer', { email }).then((res) => res.data),
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
    const items = [
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
    const onChangeCheckBox = (index, menu) => {
        const updatedCheckedList = [...checkedList];

        // Kiểm tra trạng thái của checkbox cá nhân và cập nhật danh sách
        if (updatedCheckedList.includes(index)) {
            if (list.includes(menu)) {
                setList(list.filter((item) => item !== menu));
                setProductId(productId.filter((item) => item !== menu._id));
            } else {
                setList([...list, menu]);
                setProductId([...productId, { product: menu._id, quantity: menu.quatity, size: menu.size }]);
            }
            updatedCheckedList.splice(updatedCheckedList.indexOf(index), 1);
        } else {
            setList([...list, menu]);
            setProductId([...productId, { product: menu._id, quantity: menu.quatity, size: menu.size }]);
            updatedCheckedList.push(index);
        }

        // Kiểm tra xem tất cả các checkbox cá nhân có được chọn hay không
        const allChecked = updatedCheckedList.length === menus.length;
        setChecked(allChecked);

        // Cập nhật danh sách checkbox cá nhân
        setCheckedList(updatedCheckedList);
    };
    useEffect(() => {
        if (list) {
            const totalPrice = list.reduce((acc, list) => {
                const price = parseInt(list.price); // Chuyển price thành số
                return acc + price;
            }, 0);
            setPriceList(totalPrice);
        }
    }, [list]);
    const handleBuy = async () => {
        if (value === 1) {
            try {
                const res = await axios.post('https://coffee-bills.onrender.com/orders/addOrder', {
                    customerId: data?.docs[0]?._id,
                    productId: productId,
                    total: priceList,
                    isPaid: false,
                });
                if (res) {
                    navigate(config.routers.Home, { state: { successMessage: 'Bạn đã thêm thành công!!!' } });
                } else {
                    console.log('lỗi');
                }
            } catch (error) {}
        }
        if (value === 2) {
            try {
                const res = await axios.post('https://coffee-bills.onrender.com/payment/create_payment', {
                    amount: priceList,
                    orderDescription: productId,
                    // isPaid: true,
                });
                if (res) {
                    console.log(res);
                    const vnpayPaymentURL = res.data.vnpayPaymentURL;

                    // // Thực hiện chuyển hướng đến URL thanh toán
                    window.location.href = vnpayPaymentURL;
                } else {
                    console.log('lỗi');
                }
            } catch (error) {}
        }
    };
    console.log(data?.docs[0]?._id);
    const onChangeAll = (e) => {
        const newSelectAllChecked = !checked; // Đảo ngược trạng thái checkbox tổng cộng
        setChecked(newSelectAllChecked);

        if (newSelectAllChecked) {
            // Nếu checkbox tổng cộng được chọn, chọn tất cả các checkbox cá nhân
            const allIndices = menus.map((_, index) => index);
            setCheckedList(allIndices);
            setList(menus);
            setProductId(menus.map((menu) => ({ product: menu._id, quantity: menu.quatity, size: menu.size })));
            const totalPrice = menus.reduce((acc, menu) => {
                const price = parseInt(menu.price); // Chuyển price thành số
                return acc + price;
            }, 0);
            setPriceList(totalPrice);
        } else {
            // Nếu checkbox tổng cộng bị bỏ chọn, bỏ chọn tất cả các checkbox cá nhân
            setCheckedList([]);
            setPriceList(0);
        }
    };
    console.log(productId);

    return (
        <div className={cx('wraper')}>
            <>
                {contextHolder}
                {/* {!showHeader && ( */}
                <div className={showHeader ? cx('container') : cx('container1')}>
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
                            <Badge count={menus.length}>
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
                            // <Dropdown
                            //     className={cx('ColorLoginIcon')}
                            //     menu={{
                            //         items,
                            //     }}
                            //     placement="bottom"
                            //     arrow={{
                            //         pointAtCenter: true,
                            //     }}
                            // >
                            //     <NavLink className={cx('ColorLoginIcon')} to="#">
                            //         <LoginIcons />
                            //     </NavLink>
                            // </Dropdown>

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <NavLink className={cx('ColorLoginIcon')} to={config.routers.Login}>
                                    Đăng nhập
                                </NavLink>
                                <p style={{ color: '#fff', margin: ' 5px' }}>/</p>
                                <NavLink className={cx('ColorLoginIcon')} to={config.routers.Rigister}>
                                    Đăng ký
                                </NavLink>
                            </div>
                        )}
                    </div>
                    <ModalEdit />
                </div>
                {/* )} */}
            </>
            <>
                <Modal
                    // style={{ width: '65%', marginLeft: 'auto', marginRight: 'auto' }}
                    centered
                    open={content}
                    onOk={() => setContent(false)}
                    onCancel={() => {
                        setContent(false);
                        setBuy(false);
                    }}
                    width={600}
                    height={500}
                    footer={null}
                >
                    <div className={cx('content')}>
                        <div className={cx('cart')}>
                            <div className={cx('header-cart')}>
                                {buy ? (
                                    <h2 className={cx('text-header')}>Thanh toán</h2>
                                ) : (
                                    <>
                                        <h2 className={cx('text-header')}>Giỏ hàng của tôi</h2>
                                        <div style={{ width: '75px', height: '26px' }}>
                                            <NavLink to={config.routers.Menu} className={cx('add')}>
                                                Thêm món
                                            </NavLink>
                                        </div>
                                    </>
                                )}
                            </div>
                            {menus.length > 0 ? (
                                <>
                                    <div className={cx('content-cart')}>
                                        <div className={cx('content-cart-item')}>
                                            {buy ? (
                                                <div>
                                                    <div style={{ fontSize: '22px', marginBottom: '16px' }}>
                                                        Phương thức thanh toán
                                                    </div>
                                                    <div
                                                        style={{
                                                            lineHeight: '40px',
                                                            marginLeft: '15px',
                                                            fontSize: '18px',
                                                        }}
                                                    >
                                                        <Radio.Group
                                                            style={{
                                                                lineHeight: '50px',
                                                            }}
                                                            onChange={onChange}
                                                            value={value}
                                                        >
                                                            <Radio style={{ fontSize: '18px' }} value={1}>
                                                                Thanh toán tiền mặt sau khi nhận hàng
                                                            </Radio>
                                                            <Radio style={{ fontSize: '18px' }} value={2}>
                                                                {' '}
                                                                Thanh toán tiền bằng VNPay
                                                            </Radio>
                                                        </Radio.Group>
                                                        {/* <div>
                                                            <Radio style={{ fontSize: '18px' }}>
                                                                Thanh toán tiền mặt sau khi nhận hàng
                                                            </Radio>
                                                        </div>
                                                        <div>
                                                            <Radio style={{ fontSize: '18px' }}>
                                                                Thanh toán tiền bằng VNPay
                                                            </Radio>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    {menus.map((menu, index) => (
                                                        <div className={cx('cart-item')} key={index}>
                                                            <Checkbox
                                                                checked={
                                                                    checked ? checked : checkedList.includes(index)
                                                                }
                                                                style={{ paddingRight: '14px' }}
                                                                onChange={() => onChangeCheckBox(index, menu)}
                                                            ></Checkbox>
                                                            {/* ... Rest of your menu item rendering */}
                                                            <Images className={cx('logo-cart')} src={menu.src} />
                                                            <div className={cx('cart-title')}>
                                                                <div className={cx('cart-name')}>{menu.name}</div>
                                                                <div className={cx('cart-size')}>
                                                                    <div style={{ display: 'flex', width: '120px' }}>
                                                                        <div className={cx('size')}>
                                                                            Size {menu.size}{' '}
                                                                            <span>x {menu.quatity}</span>
                                                                        </div>
                                                                        <div className={cx('edit')}>
                                                                            <EditIcons />
                                                                        </div>
                                                                    </div>
                                                                    <div style={{ display: 'flex' }}>
                                                                        <div className={cx('cart-price')}>
                                                                            {menu.price} VND
                                                                        </div>
                                                                        <div className={cx('delete')}>
                                                                            <DeleteIcons />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className={buy ? cx('content-cart-item2') : cx('content-cart-item1')}>
                                        {!buy && (
                                            <div>
                                                <Checkbox checked={checked} onChange={onChangeAll}>
                                                    Tất cả
                                                </Checkbox>
                                            </div>
                                        )}
                                        <div className={cx('price')}>
                                            <div className={cx('size')}>Tổng cộng : {priceList} VND</div>
                                            {/* <div className={cx('cart-price')}>{price}đ</div> */}
                                            {buy ? (
                                                <div className={cx('content-title')}>
                                                    <NavLink className={cx('btnMenu')} to="#" onClick={handleBuy}>
                                                        Đặt hàng
                                                    </NavLink>
                                                </div>
                                            ) : (
                                                <div className={cx('content-title')}>
                                                    <NavLink
                                                        className={cx('btnMenu')}
                                                        to="#"
                                                        onClick={() => setBuy(!buy)}
                                                    >
                                                        Mua hàng
                                                    </NavLink>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className={cx('content-cart')}>
                                    <h3 className={cx('content-header')} style={{ textAlign: 'center' }}>
                                        Giỏ hàng trống
                                    </h3>
                                    <div className={cx('content-title')} style={{ textAlign: 'center' }}>
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
                </Modal>
            </>
        </div>
    );
}

export default Header;
