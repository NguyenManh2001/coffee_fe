import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { CartIcons, EditIcons, DeleteIcons, LoginIcons, MenuIcons } from '~/Components/icons/icons';
import Images from '~/Components/Images';
import config from '~/config';
import styles from './Header.module.scss';
import Menu, { MenuItem } from './menu';
import Tippy from '@tippyjs/react/headless';
import { ShoppingCartOutlined, EditOutlined, VerticalLeftOutlined } from '@ant-design/icons';
import { Empty, Avatar, Badge, Button, Modal, Dropdown, message, Alert, Input } from 'antd';
import { addProductSelector, addUserProductSelector, productSelector, tokenSelector } from '~/Redux/selector';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { Checkbox, Radio, Select } from 'antd';
import EditCustomer from '~/Pages/admin/Customer/EditCustomer';
import AddCustomer from '~/Pages/admin/Customer/AddCustomer';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import listsMenuSlice from '~/Redux/list/list';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMediaQuery } from 'react-responsive';
import { FaUserCircle } from 'react-icons/fa';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import formatDate, { formatTime } from '~/Components/FormatDate/FormatDate';
import EditAddress from '../EditAddress';

const cx = classNames.bind(styles);

const fetchData = async () => {
    const promises = [
        axios.post('https://coffee-bills.onrender.com/customer/listCustomer').then((res) => res.data),
        axios.post('https://coffee-bills.onrender.com/orders/listOrder').then((res) => res.data),
        axios.post('https://coffee-bills.onrender.com/orders/listAllOrders').then((res) => res.data),
    ];

    const [customerData, ordersData, ordersAllData] = await Promise.all(promises);

    return { customerData, ordersData, ordersAllData };
};
function Header(props) {
    const { name, src, price, quatity, size, google } = props;
    const [content, setContent] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [open, setOpen] = useState(false);
    const [buy, setBuy] = useState(false);
    const [email, setEmail] = useState();
    const [user, setUser] = useState();
    const [Name, setName] = useState(name);
    const [date, setDate1] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const [distances, setDistances] = useState('');
    const [checked, setChecked] = useState(false);
    const [list, setList] = useState([]);
    const [check, setCheck] = useState(false);
    const [checkedList, setCheckedList] = useState([]);
    const [priceList, setPriceList] = useState(0);
    const [productId, setProductId] = useState([]);
    const [history, setHistory] = useState(false);
    const [timeShip, setTimeShip] = useState(false);
    const [shipAddress, setShipAddress] = useState(false);
    const [ids, setIds] = useState([]);
    const [timeInMinutes, setTimeInMinutes] = useState(0);
    const successMessage = location.state?.successMessage;

    const [messageApi, contextHolder] = message.useMessage(successMessage);
    const token = Cookies.get('token');
    const dispatch = useDispatch();
    const success = (message) => {
        // messageApi.open({
        //     type: 'success',
        //     content: message,
        // });
        toast.success(message);
    };

    useEffect(() => {
        if (location.state && location.state.successMessage) {
            success(location.state.successMessage);
            setShipAddress(false);
            refetch();

            // Đặt giá trị successMessage trong location.state thành null
            const newLocation = { ...location };
            newLocation.state.successMessage = null;
            navigate({ pathname: location.pathname, state: newLocation.state });
        }
    }, [location.state]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        formState: { errors },
    } = useForm({});

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
    useEffect(() => {
        if (token !== undefined) {
            const deToken = jwt_decode(token);
            setEmail(deToken?.email);
            setUser(deToken?.userId);
        }
    }, [token]);
    const isMobile = useMediaQuery({ maxWidth: 767 }); // Điều này kiểm tra nếu kích thước màn hình nhỏ hơn 768px

    // const userRole = useSelector(tokenSelector);
    const menus = useSelector(addProductSelector);
    const usersData = useSelector(addUserProductSelector);
    const handleLogout = () => {
        Cookies.remove('token');
        toast.success('Bạn đăng xuất thành công');
        window.location.reload();
    };
    const handleInfomation = () => {
        setOpen(true);
    };
    const handleHistory = () => {
        setHistory(true);
    };
    const handleEdit = () => {
        setShipAddress(true);
    };
    const handleDate = (value) => {
        setDate1(value);
        // setTimeShip(true);
    };
    const [value1, setValue1] = useState(1);

    const onChange = (e) => {
        setValue1(e.target.value);
    };
    // const { isLoading, data, refetch } = useQuery({
    //     queryKey: ['listCustomer', email],
    //     queryFn: () =>
    //         axios.post('https://coffee-bills.onrender.com/customer/listCustomer', { email }).then((res) => res.data),
    // });
    let currentTime = new Date();

    let currentHour = currentTime.getHours();
    let currentMinute = currentTime.getMinutes();

    // Làm tròn phút hiện tại thành khoảng phút gần nhất chia hết cho 15
    currentMinute = Math.round(currentMinute / 30) * 30;
    if (currentMinute === 60) {
        currentHour++;
        currentMinute = 0;
    }

    // Tạo mảng chứa 10 giá trị thời gian, bắt đầu từ thời gian hiện tại đã làm tròn
    let timeArray = [];
    if (formatDate(currentTime) === date) {
        for (let i = 0; i < 10; i++) {
            if (currentHour >= 8 && currentHour <= 21) {
                let nextTime = `${currentHour < 10 ? '0' : ''}${currentHour}:${
                    currentMinute < 10 ? '0' : ''
                }${currentMinute}`;
                timeArray.push(nextTime);
                i++; // Tăng biến đếm i chỉ khi thời gian nằm trong khoảng từ 8:00 đến 21:00
            }
            currentMinute += 30;
            if (currentMinute >= 60) {
                currentHour++;
                currentMinute -= 60;
            }

            currentHour %= 25;
        }
    } else {
        for (let i = 0; i < 10; i++) {
            if (currentHour >= 8 && currentHour <= 21) {
                let nextTime = `${currentHour < 10 ? '0' : ''}${currentHour}:${
                    currentMinute < 10 ? '0' : ''
                }${currentMinute}`;
                timeArray.push(nextTime);
                // i++; // Tăng biến đếm i chỉ khi thời gian nằm trong khoảng từ 8:00 đến 21:00
            }
            currentMinute += 30;
            if (currentMinute >= 60) {
                currentHour++;
                currentMinute -= 60;
            }

            currentHour %= 25;
        }
    }
    timeArray = timeArray.filter((time) => {
        let [hour, minute] = time.split(':').map(Number);
        if (hour < currentTime.getHours()) {
            return false;
        } else if (hour === currentTime.getHours() && minute < currentTime.getMinutes()) {
            return false;
        }
        return true;
    });

    let currentDate = new Date();
    let numberOfDays = 10;

    // Mảng chứa ngày tháng
    let dateArray = [];

    // Tạo mảng với số ngày cần tạo
    for (let i = 0; i < numberOfDays; i++) {
        // Thêm ngày hiện tại vào mảng và sau đó tăng ngày lên 1 để lấy ngày tiếp theo
        dateArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    const arrayTime = timeArray.map((time) => ({ value: time, lable: time }));
    const arrayDate = dateArray.map((date) => ({ value: formatDate(date), lable: formatDate(date) }));

    const {
        isLoading: isLoadingCustomer,
        data: data,
        refetch: refetch,
    } = useQuery({
        queryKey: ['listCustomer', email],
        queryFn: () =>
            axios.post('https://coffee-bills.onrender.com/customer/listCustomer', { email }).then((res) => res.data),
    });
    const users = data?.docs[0]?._id;
    const temporaryAddress = data?.docs[0]?.temporaryAddress;
    const {
        isLoading: isLoadingOrders,
        data: ordersData,
        refetch: refetchOrders,
    } = useQuery({
        queryKey: ['dataOrder', users],
        queryFn: () =>
            axios.post('https://coffee-bills.onrender.com/orders/listAllOrders', { users }).then((res) => res.data),
    });
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

    const ModalHistory = () => (
        <Modal
            centered
            open={history}
            onOk={() => setHistory(false)}
            onCancel={() => setHistory(false)}
            width={600}
            height={500}
            footer={null}
        >
            <div className={cx('cart')}>
                <div className={cx('header-cart')}>
                    <h2 className={cx('text-header')}>Lịch sử mua hàng</h2>
                    {/* <div style={{ width: '75px', height: '26px' }}>
                        <NavLink to={config.routers.Menu} className={cx('add')}>
                            Thêm món
                        </NavLink>
                    </div> */}
                </div>
                <div style={{ height: '500px', overflow: 'auto' }}>
                    {ordersData?.map((data, index) => (
                        <div key={data._id}>
                            <div className={cx('header-cart')}>
                                <h2 className={cx('text-header')}>Thời gian: {formatTime(data.createdAt)}</h2>
                            </div>
                            <div style={{ margin: '15px 0px' }}>
                                {data?.products?.map((data, index) => (
                                    <div style={{ marginBottom: '10px' }} className={cx('cart-item')} key={index}>
                                        <Images className={cx('logo-cart')} src={data?.product?.link} />
                                        <div className={cx('cart-title')}>
                                            <div className={cx('cart-name')}>{data?.product?.name}</div>
                                            <div className={cx('cart-size')}>
                                                <div classNames={cx('sizeCart')}>
                                                    <div className={cx('size')}>
                                                        Size {data?.size} <span>x {data?.quantity}</span>,{' '}
                                                        {data.ice ? data.ice : '0'}% đá, {data.sugar ? data.sugar : '0'}
                                                        % đường, {data?.toppings}
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex' }}>
                                                    <div className={cx('cart-price')}>{data?.product?.price} VND</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    );

    const ModalShipAddress = () => (
        <Modal
            centered
            open={shipAddress}
            onOk={() => setShipAddress(false)}
            onCancel={() => setShipAddress(false)}
            width={600}
            height={500}
            footer={null}
        >
            <EditAddress dataId={users} temporaryAddress={temporaryAddress} />
        </Modal>
    );
    // const [time, setTime] = useState('');
    // const onChangeDate = (value) => {
    //     setTime(value);
    // };
    // console.log(time);
    // const ModalTimeShipAddress = () => (
    //     <Modal
    //         centered
    //         open={timeShip}
    //         onOk={() => setTimeShip(false)}
    //         onCancel={() => setTimeShip(false)}
    //         width={600}
    //         height={500}
    //         footer={null}
    //     >
    //         <div className={cx('cart')}>
    //             <div className={cx('header-cart')}>
    //                 <h2 className={cx('text-header')}>Thời gian nhận hàng</h2>
    //                 {/* <div style={{ width: '75px', height: '26px' }}>
    //                     <NavLink to={config.routers.Menu} className={cx('add')}>
    //                         Thêm món
    //                     </NavLink>
    //                 </div> */}
    //             </div>

    //             <div style={{ width: '100%', padding: '20px 0' }}>
    //                 <div>
    //                     <Select
    //                         defaultValue={formatDate(new Date())}
    //                         // value={date}
    //                         style={{ width: '100%', margin: '10px' }}
    //                         // onChange={onChangeDate}
    //                         options={arrayDate}
    //                     />
    //                 </div>
    //                 <div>
    //                     <Select
    //                         defaultValue="Càng sớm càng tốt"
    //                         style={{ width: '100%', margin: '10px' }}
    //                         // onChange={onChangeDate}
    //                         options={arrayTime}
    //                     />
    //                 </div>
    //             </div>
    //             <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
    //                 <div className={cx('btnMenu')} to="#">
    //                     Xác nhận
    //                 </div>
    //             </div>
    //         </div>
    //     </Modal>
    // );
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
                      <NavLink to="#" onClick={handleHistory}>
                          Lịch sử mua hàng
                      </NavLink>
                  ),
              },
              {
                  key: '3',
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
    useEffect(() => {
        const geocoder = new google.maps.Geocoder();
        const originAddress = '44 Lê Đại Hành, Hai Bà Trưng, Hà Nội';
        const destinationAddress = temporaryAddress;

        // Chuyển đổi địa chỉ thành tọa độ (latitude và longitude)
        geocoder.geocode({ address: originAddress }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
                const origin = results[0].geometry.location;

                // Tiếp tục chuyển đổi địa chỉ đích thành tọa độ
                geocoder.geocode({ address: destinationAddress }, (results, status) => {
                    if (status === 'OK' && results && results[0]) {
                        const destination = results[0].geometry.location;

                        // Sử dụng DistanceMatrixService để tính toán khoảng cách
                        const service = new google.maps.DistanceMatrixService();
                        service.getDistanceMatrix(
                            {
                                origins: [origin],
                                destinations: [destination],
                                travelMode: 'DRIVING', // Có thể là DRIVING, WALKING, BICYCLING, hoặc TRANSIT
                                unitSystem: google.maps.UnitSystem.METRIC,
                                avoidHighways: false,
                                avoidTolls: false,
                            },
                            (response, status) => {
                                if (status === 'OK') {
                                    const distance = response.rows[0].elements[0].distance.text.split(' ')[0];
                                    setDistances(distance);
                                    // console.log('Khoảng cách: ', response.rows[0].elements[0].distance.text);
                                } else {
                                    console.log('Không thể tính toán khoảng cách:', status);
                                }
                            },
                        );
                    } else {
                        console.log('Không thể tìm thấy địa chỉ điểm đến');
                    }
                });
            } else {
                console.log('Không thể tìm thấy địa chỉ điểm xuất phát');
            }
        });
    }, [temporaryAddress]);

    const distance = new Number(distances);
    const number = new Number(3000);
    const deliveryCharges = distance * number;
    useEffect(() => {
        const distanceInKm = parseFloat(distance);
        if (!isNaN(distanceInKm)) {
            const time = (distanceInKm / 30) * 60; // Tính thời gian dựa trên khoảng cách và hệ số chia
            setTimeInMinutes(Math.ceil(time)); // Lưu thời gian vào state với định dạng làm tròn 2 chữ số sau dấu thập phân
        } else {
            setTimeInMinutes(null);
        }
    }, [distance]);
    const handleSubmit1 = () => {
        setContent(!content);
        if (usersData[user]?.listProduct?.length !== undefined) {
            const maxLength = usersData[user]?.listProduct?.reduce((max, arr) => Math.max(max, arr.length));
            if (maxLength === usersData[user]?.listProduct?.length) {
                setChecked(true);
            } else {
                setChecked(false);
            }
        }
    };
    const handleShopDate = () => {
        setTimeShip(true);
    };
    const onChangeCheckBox = (index, menu) => {
        console.log(menu);
        const updatedCheckedList = [...checkedList];

        // Kiểm tra trạng thái của checkbox cá nhân và cập nhật danh sách
        if (updatedCheckedList.includes(index)) {
            if (list.includes(menu)) {
                setList(list.filter((item) => item !== menu));
                setProductId(productId.filter((item) => item.product !== menu._id));
                setIds(ids.filter((item) => item !== menu._id));
                dispatch(listsMenuSlice.actions.deleteProductSize(menu._id));
            } else {
                setList([...list, menu]);
                setProductId([
                    ...productId,
                    {
                        product: menu._id,
                        quantity: menu.quatity,
                        size: menu.size,
                        ice: menu.ice,
                        price: Array.isArray(menu.price) ? menu.price[0] : menu.price,
                        sugar: menu.sugar,
                        toppings: menu.selectedValues,
                    },
                ]);
                setIds([...ids, menu._id]);
                // dispatch(listsMenuSlice.actions.addProductSize(productId));
            }
            updatedCheckedList.splice(updatedCheckedList.indexOf(index), 1);
        } else {
            setList([...list, menu]);
            setIds([...ids, menu._id]);
            setProductId([
                ...productId,
                {
                    product: menu._id,
                    quantity: menu.quatity,
                    size: menu.size,
                    ice: menu.ice,
                    price: Array.isArray(menu.price) ? menu.price[0] : menu.price,
                    sugar: menu.sugar,
                    toppings: menu.selectedValues,
                },
            ]);
            updatedCheckedList.push(index);
            // dispatch(listsMenuSlice.actions.addProductSize(productId));
        }

        // Kiểm tra xem tất cả các checkbox cá nhân có được chọn hay không
        const allChecked = updatedCheckedList.length === usersData[user]?.listProduct?.length;
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

    useEffect(() => {
        if (productId.length > 0) {
            dispatch(listsMenuSlice.actions.addProductSize(productId));
        }
    }, [productId]);
    const produ = useSelector(productSelector);
    console.log('Product', produ);
    const handleBuy = async () => {
        if (value1 === 1) {
            try {
                const res = await axios.post('https://coffee-bills.onrender.com/orders/addOrder', {
                    customerId: data?.docs[0]?._id,
                    productId: productId,
                    total: priceList + deliveryCharges,
                    address:
                        data?.docs[0]?.temporaryAddress !== undefined
                            ? data?.docs[0]?.temporaryAddress
                            : data?.docs[0]?.address,
                    isPaid: false,
                });
                if (res) {
                    setBuy(false);
                    setContent(false);
                    dispatch(listsMenuSlice.actions.deleteProductsForUser({ user, ids }));
                    navigate(config.routers.Home, { state: { successMessage: 'Bạn đã mua hàng thành công!!!' } });
                } else {
                    console.log('lỗi');
                }
            } catch (error) {}
        }
        if (value1 === 2) {
            try {
                const res = await axios.post('https://coffee-bills.onrender.com/payment/create_payment', {
                    amount: priceList + deliveryCharges,
                    customerId: data?.docs[0]?._id,
                    // productId: '',
                    address:
                        data?.docs[0]?.temporaryAddress !== undefined
                            ? data?.docs[0]?.temporaryAddress
                            : data?.docs[0]?.address,
                    language: '',
                });
                if (res) {
                    const vnp_Url = res.data.vnpUrl;
                    dispatch(listsMenuSlice.actions.deleteProductsForUser({ user, ids }));
                    // console.log(vnp_Url);
                    window.location.href = vnp_Url;
                } else {
                    console.log('lỗi');
                }
            } catch (error) {}
        }
    };

    const onChangeAll = (e) => {
        const newSelectAllChecked = !checked; // Đảo ngược trạng thái checkbox tổng cộng
        setChecked(newSelectAllChecked);

        if (newSelectAllChecked) {
            // Nếu checkbox tổng cộng được chọn, chọn tất cả các checkbox cá nhân
            const allIndices = usersData[user]?.listProduct?.map((_, index) => index);
            setCheckedList(allIndices);
            setList(usersData[user]?.listProduct);
            setProductId(
                usersData[user]?.listProduct?.map((menu) => ({
                    product: menu._id,
                    quantity: menu.quatity,
                    size: menu.size,
                    ice: menu.ice,
                    price: Array.isArray(menu.price) ? menu.price[0] : menu.price,
                    sugar: menu.sugar,
                    toppings: menu.selectedValues,
                })),
            );
            setIds(usersData[user]?.listProduct?.map((menu) => menu._id));
            const totalPrice = usersData[user]?.listProduct?.reduce((acc, menu) => {
                const price = parseInt(menu.price); // Chuyển price thành số
                return acc + price;
            }, 0);
            setPriceList(totalPrice);
        } else {
            // Nếu checkbox tổng cộng bị bỏ chọn, bỏ chọn tất cả các checkbox cá nhân
            setCheckedList([]);
            setList([]);
            setIds([]);
            setProductId([]);
            setPriceList(0);
        }
    };
    const handleDelete = (id) => {
        dispatch(listsMenuSlice.actions.deleteProductForUser({ user, id }));
    };

    return (
        <div className={cx('wraper')}>
            <>
                {/* {contextHolder} */}
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                {/* Same as */}
                <ToastContainer />
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
                                    {/* <MenuItem title="Liên hệ" to={config.routers.Contact} /> */}
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
                    <Images className={cx('logo')} src={require('~/assets/images/logo_transparent.png')} />

                    <Menu>
                        <MenuItem title="Trang chủ" to={config.routers.Home} />
                        <MenuItem title="Menu" to={config.routers.Menu} />
                        <MenuItem title="Tin tức" to={config.routers.News} />
                        {/* <MenuItem title="Liên hệ" to={config.routers.Contact} /> */}
                        <MenuItem title="Chúng tôi" to={config.routers.About} />
                    </Menu>
                    <div style={{ display: 'flex' }}>
                        <button className={cx('ColorCartIcon')} onClick={handleSubmit1} to="#">
                            <Badge count={usersData[user]?.listProduct?.length}>
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
                                <span className={cx('email')} style={{ lineHeight: '41px', color: '#fff' }}>
                                    {email}
                                </span>
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
                            <>
                                {isMobile ? (
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
                                            <FaUserCircle style={{ fontSize: '32px' }} />
                                        </NavLink>
                                    </Dropdown>
                                ) : (
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
                            </>
                        )}
                    </div>
                    <ModalEdit />
                    <ModalHistory />
                    <ModalShipAddress />
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
                    height={700}
                    className={cx('ant')}
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
                            {usersData[user]?.listProduct?.length > 0 ? (
                                <>
                                    <div className={cx('content-cart')}>
                                        <div className={cx('content-cart-item')}>
                                            {buy ? (
                                                <div>
                                                    <div
                                                        className={cx('pprice')}
                                                        style={{ fontSize: '22px', marginBottom: '16px' }}
                                                    >
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
                                                            value={value1}
                                                        >
                                                            <Radio
                                                                style={
                                                                    isMobile
                                                                        ? { fontSize: '16px' }
                                                                        : { fontSize: '18px' }
                                                                }
                                                                value={1}
                                                            >
                                                                Thanh toán tiền sau khi nhận hàng
                                                            </Radio>
                                                            <Radio
                                                                style={
                                                                    isMobile
                                                                        ? { fontSize: '16px' }
                                                                        : { fontSize: '18px' }
                                                                }
                                                                value={2}
                                                            >
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
                                                    <div
                                                        className={cx('pprice1')}
                                                        style={{ fontSize: '22px', marginBottom: '16px' }}
                                                    >
                                                        <div>Giao hàng</div>
                                                        <NavLink to="#" onClick={handleEdit}>
                                                            <EditOutlined className={cx('editAddress')} />
                                                        </NavLink>
                                                    </div>
                                                    <div className={cx('ship')}>
                                                        <div className={cx('imageShip')}>
                                                            <Images
                                                                className={cx('logoShip')}
                                                                src={require('~/assets/images/Delivery2.png')}
                                                            />
                                                        </div>
                                                        <div style={{ width: '100%' }}>
                                                            <div className={cx('contentShip1')}>
                                                                <div className={cx('titleShip')}>
                                                                    {data?.docs[0]?.temporaryAddress === undefined
                                                                        ? data?.docs[0]?.address.split(', ')[0]
                                                                        : data?.docs[0]?.temporaryAddress.split(
                                                                              ', ',
                                                                          )[0]}
                                                                </div>
                                                                <div className={cx('addressShip')}>
                                                                    {data?.docs[0]?.temporaryAddress === undefined
                                                                        ? data?.docs[0]?.address
                                                                        : data?.docs[0]?.temporaryAddress}
                                                                </div>
                                                            </div>
                                                            <div className={cx('contentShip')}>
                                                                <div>
                                                                    <div className={cx('titleShip')}>
                                                                        Nhận hàng trong ngày hôm nay
                                                                    </div>
                                                                    <div className={cx('addressShip')}>
                                                                        Vào lúc: sau {timeInMinutes + 20} phút từ khi
                                                                        đặt hàng
                                                                    </div>
                                                                </div>
                                                                {/* <NavLink to="#" onClick={handleShopDate}>
                                                                    <VerticalLeftOutlined
                                                                        style={{ fontSize: '31px', opacity: '0.8' }}
                                                                    />
                                                                </NavLink> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={cx('pprice1')}
                                                        style={{ fontSize: '22px', marginBottom: '16px' }}
                                                    >
                                                        <div>Tổng cộng</div>
                                                    </div>
                                                    <div className={cx('pricea')}>
                                                        <div>Thành tiền</div>
                                                        <div style={{ marginRight: '10px' }}>
                                                            {priceList.toLocaleString('vi-VN')}đ
                                                        </div>
                                                    </div>
                                                    <div className={cx('pricea')} style={{ border: 'none' }}>
                                                        <div>Phí giao hàng</div>
                                                        <div style={{ marginRight: '10px' }}>
                                                            {deliveryCharges.toLocaleString('vi-VN')}đ
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    {Object.keys(usersData).map((userId) => (
                                                        <div key={userId}>
                                                            {/* <h2>Người dùng: {userId}</h2> */}

                                                            {user === userId &&
                                                                usersData[userId].listProduct.map((product, index) => (
                                                                    <div className={cx('cart-item')} key={index}>
                                                                        <Checkbox
                                                                            checked={
                                                                                checked
                                                                                    ? checked
                                                                                    : checkedList.includes(index)
                                                                            }
                                                                            style={{ paddingRight: '14px' }}
                                                                            onChange={() =>
                                                                                onChangeCheckBox(index, product)
                                                                            }
                                                                        ></Checkbox>
                                                                        {/* ... Rest of your product item rendering */}
                                                                        <Images
                                                                            className={cx('logo-cart')}
                                                                            src={product.src}
                                                                        />
                                                                        <div className={cx('cart-title')}>
                                                                            <div className={cx('cart-name')}>
                                                                                {product.name}
                                                                            </div>
                                                                            <div className={cx('cart-size')}>
                                                                                <div classNames={cx('sizeCart')}>
                                                                                    <div className={cx('size')}>
                                                                                        Size {product.size}{' '}
                                                                                        <span>x {product.quatity}</span>
                                                                                        , {product?.ice}% đá,{' '}
                                                                                        {product?.sugar}% đường,{' '}
                                                                                        {product?.selectedValues}
                                                                                    </div>
                                                                                    {/* <div className={cx('edit')}>
                                                                                        <EditIcons />
                                                                                    </div> */}
                                                                                </div>
                                                                                <div style={{ display: 'flex' }}>
                                                                                    <div className={cx('cart-price')}>
                                                                                        {product.price.toLocaleString(
                                                                                            'vi-VN',
                                                                                        )}
                                                                                        đ
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className={cx('delete')}
                                                                            onClick={() => handleDelete(product._id)}
                                                                        >
                                                                            <DeleteIcons />
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    ))}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className={buy ? cx('content-cart-item2') : cx('content-cart-item1')}>
                                        {!buy && (
                                            <div>
                                                <Checkbox
                                                    style={{ fontSize: '16px' }}
                                                    checked={checked}
                                                    onChange={onChangeAll}
                                                >
                                                    Tất cả
                                                </Checkbox>
                                            </div>
                                        )}
                                        {/* <div className={cx('cart-price')}>{price}đ</div> */}
                                        {buy ? (
                                            <>
                                                <div className={cx('size')} style={{ fontSize: '16px' }}>
                                                    Thành tiền: {(priceList + deliveryCharges).toLocaleString('vi-VN')}đ
                                                </div>
                                                <div className={cx('content-title')}>
                                                    <NavLink className={cx('btnMenu')} to="#" onClick={handleBuy}>
                                                        Đặt hàng
                                                    </NavLink>
                                                </div>
                                            </>
                                        ) : (
                                            <div className={cx('price')}>
                                                <div className={cx('size')} style={{ fontSize: '16px' }}>
                                                    Thành tiền: {priceList.toLocaleString('vi-VN')}đ
                                                </div>
                                                <div className={cx('content-title')}>
                                                    <Button
                                                        className={cx('btnMenu1')}
                                                        disabled={priceList === 0}
                                                        style={{ height: '40px' }}
                                                        to="#"
                                                        onClick={() => {
                                                            if (priceList !== 0) {
                                                                setBuy(!buy);
                                                            }
                                                        }}
                                                    >
                                                        Mua hàng
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
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
            {/* <ModalTimeShipAddress /> */}
        </div>
    );
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCzNP5qQql2a5y8lOoO-1yj1lj_tzjVImA', // Điền khóa API của bạn ở đây
})(Header);
