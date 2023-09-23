import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import Images from '~/Components/Images';
import { MinusIcons, PlusIcons } from '~/Components/icons/icons';
import { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';

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

const initState = {
    menus: [],
};
const ADD_MENU = 'add_menu';

const addMenu = (payload) => {
    return {
        type: ADD_MENU,
        payload,
    };
};
const reducer = (state, action) => {
    let newState;
    switch (action.type) {
        case ADD_MENU:
            newState = {
                ...state,
                menus: [...state.menus, action.payload],
            };
            break;
        default:
            throw new Error('Invalid action.');
    }
    return newState;
};

function Product({ src, name, cart, onClick }) {
    const handleAdd = () => {
        dispatch(addMenu({ src, name, price, quatity, size }));
        // onClick();
    };
    const [state, dispatch] = useReducer(reducer, initState);
    const { menus } = state;
    const [close, setClose] = useState(true);
    const [input, setInput] = useState('');
    const [check, setCheck] = useState(1);
    const [quatity, setQuatity] = useState(1);
    const [price, setPrice] = useState(0);
    const [size, setSize] = useState('s');
    const cart1 = new Number(cart);

    const cart2 = cart1 + 5000;
    const cart3 = cart1 + 10000;
    const handleSubmit = () => {
        setClose(!close);
        onClick();
    };
    useEffect(() => {
        if (check === 1) {
            setPrice(cart);
            setQuatity(1);
            setSize('S');
        }
        if (check === 2) {
            setPrice(cart2);
            setQuatity(1);
            setSize('M');
        }
        if (check === 3) {
            setPrice(cart3);
            setQuatity(1);
            setSize('L');
        }
    }, [check]);
    const handleMinus = () => {
        if (check === 1) {
            if (quatity > 1) {
                setQuatity(quatity - 1);
                setPrice((quatity - 1) * cart);
            }
        }
        if (check === 2) {
            if (quatity > 1) {
                setQuatity(quatity - 1);
                setPrice((quatity - 1) * cart2);
            }
        }
        if (check === 3) {
            if (quatity > 1) {
                setQuatity(quatity - 1);
                setPrice((quatity - 1) * cart3);
            }
        }
    };
    const handlePlus = () => {
        if (check === 1) {
            if (quatity >= 1) {
                setQuatity(quatity + 1);
                setPrice((quatity + 1) * cart);
            }
        }
        if (check === 2) {
            if (quatity >= 1) {
                setQuatity(quatity + 1);
                setPrice((quatity + 1) * cart2);
            }
        }
        if (check === 3) {
            if (quatity >= 1) {
                setQuatity(quatity + 1);
                setPrice((quatity + 1) * cart3);
            }
        }
    };
    return (
        <>
            {close ? (
                <div className={cx('wrapper')}>
                    <div className={cx('container')}>
                        <div className={cx('content')}>
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
                                    {sizes.map((size) => (
                                        <div key={size.id}>
                                            <input
                                                className={cx('form-check-input')}
                                                type="radio"
                                                checked={check === size.id}
                                                onChange={() => setCheck(size.id)}
                                            />
                                            {size.name}
                                        </div>
                                    ))}
                                </form>
                            </div>
                            <div className={cx('conntent-note')}>
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
                            </div>
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
                    <>
                        {menus.map((menu, index) => (
                            <Header
                                key={index}
                                size={size}
                                quatity={menu.quatity}
                                name={menu.name}
                                src={menu.src}
                                price={menu.price}
                            />
                        ))}
                    </>
                </div>
            ) : (
                <div className={cx('wraper')}></div>
            )}
        </>
    );
}
Product.propType = {
    src: PropTypes.string,
    name: PropTypes.string,
    cart: PropTypes.string,
};
export default Product;
