import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import Images from '~/Components/Images';
import { MinusIcons, PlusIcons } from '~/Components/icons/icons';
import { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Modal } from 'antd';
import jwt_decode from 'jwt-decode';
import EditCustomer from '~/Pages/admin/Customer/EditCustomer';
import AddCustomer from '~/Pages/admin/Customer/AddCustomer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import config from '~/config';
import listsMenuSlice from '~/Redux/list/list';
import { Checkbox } from 'antd';
import { Radio } from 'antd';
import { addProductSelector } from '~/Redux/selector';

const cx = classNames.bind(styles);

const sizes = [
    {
        id: 1,
        name: 'Size S',
    },
    {
        id: 2,
        name: 'Size M + 5.000đ',
    },
    {
        id: 3,
        name: 'Size L + 10.000đ',
    },
];

// const initState = {
//     menus: [],
// };
// const ADD_MENU = 'add_menu';

// const addMenu = (payload) => {
//     return {
//         type: ADD_MENU,
//         payload,
//     };
// };
// const reducer = (state, action) => {
//     let newState;
//     switch (action.type) {
//         case ADD_MENU:
//             newState = {
//                 ...state,
//                 menus: [...state.menus, action.payload],
//             };
//             break;
//         default:
//             throw new Error('Invalid action.');
//     }
//     return newState;
// };

function Product({ _id, src, name, type, cart, onClick }) {
    // const [state, dispatch] = useReducer(reducer, initState);
    // const { menus } = state;
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState();
    const [close, setClose] = useState(true);
    const [input, setInput] = useState('');
    const [check, setCheck] = useState('1');
    const [quatity, setQuatity] = useState(1);
    const [price, setPrice] = useState(cart);
    const [size, setSize] = useState('s');
    const [value1, setValue1] = useState('Apple');
    const [userId, setUserId] = useState();
    const [selectedValues, setSelectedValues] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart1 = new Number(cart);

    const token = Cookies.get('token');
    useEffect(() => {
        if (token !== undefined) {
            const deToken = jwt_decode(token);
            setEmail(deToken?.email);
            setUserId(deToken?.userId);
        }
    }, [token]);
    const { isLoading, data, refetch } = useQuery({
        queryKey: ['listCustomer', email],
        queryFn: () => axios.post('/customer/listCustomer', { email }).then((res) => res.data),
    });
    const {
        isLoading: isLoadingTopping,
        data: dataTopping,
        refetch: refetchTopping,
    } = useQuery({
        queryKey: ['dataTopping'],
        queryFn: () => axios.post('https://coffee-bills.onrender.com/topping/listTopping').then((res) => res.data),
    });
    const dataType = dataTopping?.docs?.filter((doc) => doc.type === type);
    const plainOptionsTopping =
        dataType?.map((data) => ({
            label: `${data?.name} + ${data?.price.toLocaleString('vi-VN')}đ`,
            value: `${data?.name},`,
            price: data?.price,
        })) || [];
    // const plainOptionsTopping = [
    //     {
    //         label: 'Trân châu trắng + 5.000đ',
    //         value: 'Trân châu trắng, ',
    //         price: 5000,
    //     },
    //     {
    //         label: 'Trân châu sợi + 5.000đ',
    //         value: 'Trân châu sợi, ',
    //         price: 5000,
    //     },
    //     {
    //         label: 'Thạch cà phê + 5.000đ',
    //         value: 'Thạch cà phê, ',
    //         price: 5000,
    //     },
    //     {
    //         label: 'Pudding phô mai + 7.000đ',
    //         value: 'Pudding phô mai, ',
    //         price: 7000,
    //     },
    //     {
    //         label: 'Trân châu sương mai + 7.000đ',
    //         value: 'Trân châu sương mai, ',
    //         price: 7000,
    //     },
    //     {
    //         label: 'Thạch dứa + 5.000đ',
    //         value: 'Thạch dứa, ',
    //         price: 5000,
    //     },
    // ];
    const plainOptions = [
        {
            label: '0% Đá',
            value: '0',
        },
        {
            label: '50% Đá',
            value: '50',
        },
        {
            label: '100% Đá',
            value: '100',
        },
    ];
    const plainOptionsSuga = [
        {
            label: '0% Đường',
            value: '0',
        },
        {
            label: '50% Đường',
            value: '50',
        },
        {
            label: '100% Đường',
            value: '100',
        },
    ];
    const options = [
        {
            label: 'Size S',
            value: '1',
        },
        {
            label: 'Size M + 5.000đ',
            value: '2',
        },
        {
            label: 'Size L + 10.000đ',
            value: '3',
        },
    ];
    const [sugar, setSugar] = useState('0');
    const [ice, setIce] = useState('0');

    const onChange = (checkedValues) => {
        let newPrice = new Number(price);
        // Kiểm tra và cập nhật giá tiền dựa trên các giá trị đã được chọn
        checkedValues.forEach((value) => {
            if (!selectedValues.includes(value)) {
                // Nếu giá trị chưa được chọn trước đó, cộng giá trị vào tổng giá tiền
                // console.log(plainOptionsTopping);
                // console.log(value);
                const selectedItem = plainOptionsTopping.find((item) => item.value === value);
                if (selectedItem) {
                    newPrice += selectedItem.price;
                }
            }
        });

        // Kiểm tra và cập nhật giá tiền dựa trên các giá trị đã được bỏ chọn
        selectedValues.forEach((value) => {
            if (!checkedValues.includes(value)) {
                // Nếu giá trị đã được chọn trước đó nhưng không được chọn nữa, trừ giá trị ra khỏi tổng giá tiền
                const deselectedItem = plainOptionsTopping.find((item) => item.value === value);
                if (deselectedItem) {
                    newPrice -= deselectedItem.price;
                }
            }
        });

        setPrice(newPrice);
        setSelectedValues(checkedValues);
    };

    const onChangeIce = ({ target: { value } }) => {
        setIce(value);
    };
    const onChangesugar = ({ target: { value } }) => {
        setSugar(value);
    };

    const onChangeSize = ({ target: { value } }) => {
        let newPrice = new Number(price);

        // Xử lý giảm giá tiền của lựa chọn trước đó
        if (check === '1') {
            newPrice -= cart1;
        } else if (check === '2') {
            newPrice -= cart1 + 5000;
        } else if (check === '3') {
            newPrice -= cart1 + 10000;
        }

        // Xử lý tăng giá tiền của lựa chọn mới
        if (value === '1') {
            newPrice += cart1;
            setQuatity(1);
            setSize('S');
        } else if (value === '2') {
            newPrice += cart1 + 5000;
            setQuatity(1);
            setSize('M');
        } else if (value === '3') {
            newPrice += cart1 + 10000;
            setQuatity(1);
            setSize('L');
        }

        setPrice(newPrice);
        setCheck(value);
    };
    const ModalEdit = () => (
        <Modal
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
            footer={null}
        >
            <AddCustomer />
        </Modal>
    );

    const product = {};
    const handleAdd = () => {
        if (token) {
            if (data?.docs?.length > 0) {
                if (_id !== undefined && userId !== undefined) {
                    // dispatch(listsMenuSlice.actions.addProduct({ src, name, price, quatity, size, _id }));
                    dispatch(listsMenuSlice.actions.addUser({ userId }));
                    dispatch(
                        listsMenuSlice.actions.addProductForUser({
                            userId,
                            src,
                            name,
                            price,
                            quatity,
                            size,
                            ice,
                            sugar,
                            selectedValues,
                            _id,
                        }),
                    );
                    setClose(!close);
                    onClick();
                }
            } else {
                setOpen(true);
            }
        } else {
            navigate(config.routers.Login);
        }
        // onClick();
    };
    // const cart2 = cart1 + 5000;
    // const cart3 = cart1 + 10000;
    const handleSubmit = () => {
        setClose(!close);
        onClick();
    };
    // let newPrice = new Number(price);
    const cart2 = cart1 + 5000;
    const cart3 = cart1 + 10000;
    // useEffect(() => {
    //     if (check === '1') {
    //         setPrice(cart);
    //         setQuatity(1);
    //         setSize('S');
    //     }
    //     if (check === '2') {
    //         setPrice(cart2);
    //         setQuatity(1);
    //         setSize('M');
    //     }
    //     if (check === '3') {
    //         setPrice(cart3);
    //         setQuatity(1);
    //         setSize('L');
    //     }
    // }, [check]);
    const handleMinus = () => {
        if (check === '1') {
            if (quatity > 1) {
                setQuatity(quatity - 1);
                setPrice(new Number(price) - new Number(cart));
            }
        }
        if (check === '2') {
            if (quatity > 1) {
                setQuatity(quatity - 1);
                setPrice(new Number(price) - new Number(cart2));
            }
        }
        if (check === '3') {
            if (quatity > 1) {
                setQuatity(quatity - 1);
                setPrice(new Number(price) - new Number(cart3));
            }
        }
    };
    const handlePlus = () => {
        if (check === '1') {
            if (quatity >= 1) {
                setQuatity(quatity + 1);
                setPrice(new Number(price) + new Number(cart));
            }
        }
        if (check === '2') {
            if (quatity >= 1) {
                setQuatity(quatity + 1);
                setPrice(new Number(price) + new Number(cart2));
            }
        }
        if (check === '3') {
            if (quatity >= 1) {
                setQuatity(quatity + 1);
                setPrice(new Number(price) + new Number(cart3));
            }
        }
    };
    return (
        <>
            {close && (
                <div className={cx('wrapper')}>
                    <div className={cx('container')}>
                        <div className={cx('content')}>
                            {!data?.docs?.length && <ModalEdit />}
                            <button className={cx('btn')} onClick={handleSubmit} aria-label="Close"></button>
                            <div className={cx('conntent-item')}>
                                <Images className={cx('logo')} src={src} />
                                <div className={cx('content-title')}>
                                    <div className={cx('content-name')}>{name}</div>
                                    <div className={cx('content-price')}>{cart}đ</div>
                                </div>
                            </div>
                            <div className={cx('content-check')}>
                                <div className={cx('content-header')}>Chọn size *</div>
                                <form className={cx('form-group')}>
                                    {/* {sizes.map((size) => (
                                        <div className={cx('check')} key={size.id}>
                                            <input
                                                className={cx('form-check-input')}
                                                type="radio"
                                                checked={check === size.id}
                                                onChange={() => setCheck(size.id)}
                                            />
                                            {size.name}
                                        </div>
                                    ))} */}
                                    <Radio.Group options={options} onChange={onChangeSize} value={check} />
                                </form>
                                <div className={cx('content-header')}>Chọn đường *</div>
                                <div>
                                    <Radio.Group options={plainOptionsSuga} onChange={onChangesugar} value={sugar} />
                                </div>
                                <div className={cx('content-header')}>Chọn mức đá *</div>
                                <div>
                                    <Radio.Group options={plainOptions} onChange={onChangeIce} value={ice} />
                                </div>
                                <div className={cx('content-header')}>Chọn Topping*</div>
                                <div style={{ padding: '1px 0 20px' }}>
                                    <Checkbox.Group
                                        options={plainOptionsTopping}
                                        defaultValue={['Apple']}
                                        style={{ width: '240px' }}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                            {/* <div className={cx('conntent-note')}>
                                <div className={cx('content-header')}>
                                    Ghi chú <span className={cx('title')}>(nếu có)</span>
                                </div>
                                <input
                                    className={cx('content-input')}
                                    type="text"
                                    placeholder="Ghi chú cho quán"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                ></input>
                            </div> */}
                            <div className={cx('content-down')}>
                                <div className={cx('down-item')}>
                                    <div onClick={handleMinus} className={cx('Minus')}>
                                        <MinusIcons className={cx('Icons')} />
                                    </div>
                                    <div className={cx('quantity')}>{quatity}</div>
                                    <div onClick={handlePlus} className={cx('plus')}>
                                        <PlusIcons className={cx('Icons')} />
                                    </div>
                                </div>
                                <button onClick={handleAdd} className={cx('btn-down')}>
                                    Thêm vào giỏ hàng: <span>{price}</span>đ
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* <>
                        {menus?.map((menu, index) => (
                            <Header
                                key={index}
                                size={size}
                                quatity={menu.quatity}
                                name={menu.name}
                                src={menu.src}
                                price={menu.price}
                            />
                        ))}
                    </> */}
                </div>
            )}
        </>
    );
}
Product.propType = {
    _id: PropTypes.string,
    src: PropTypes.string,
    name: PropTypes.string,
    cart: PropTypes.string,
};
export default Product;
