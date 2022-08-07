import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import Images from '~/Components/Images';
import { MinusIcons, PlusIcons } from '~/Components/icons/icons';
import { useEffect, useState } from 'react';

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

function Product() {
    const [close, setClose] = useState(true);
    const [input, setInput] = useState('');
    const [check, setCheck] = useState(1);
    const [quatity, setQuatity] = useState(1);
    const [price, setPrice] = useState(0);
    const handleSubmit = () => {
        setClose(!close);
    };
    useEffect(() => {
        if (check === 1) {
            setPrice(30000);
            setQuatity(1);
        }
        if (check === 2) {
            setPrice(35000);
            setQuatity(1);
        }
        if (check === 3) {
            setPrice(40000);
            setQuatity(1);
        }
    }, [check]);
    const handleMinus = () => {
        if (check === 1) {
            if (quatity > 1) {
                setQuatity(quatity - 1);
                setPrice((quatity - 1) * 30000);
            }
        }
        if (check === 2) {
            if (quatity > 1) {
                setQuatity(quatity - 1);
                setPrice((quatity - 1) * 35000);
            }
        }
        if (check === 3) {
            if (quatity > 1) {
                setQuatity(quatity - 1);
                setPrice((quatity - 1) * 40000);
            }
        }
    };
    const handlePlus = () => {
        if (check === 1) {
            if (quatity >= 1) {
                setQuatity(quatity + 1);
                setPrice((quatity + 1) * 30000);
            }
        }
        if (check === 2) {
            if (quatity >= 1) {
                setQuatity(quatity + 1);
                setPrice((quatity + 1) * 35000);
            }
        }
        if (check === 3) {
            if (quatity >= 1) {
                setQuatity(quatity + 1);
                setPrice((quatity + 1) * 40000);
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
                                <Images
                                    className={cx('logo')}
                                    src="https://coffee-cup-react.vercel.app/images/sp-6.jpg"
                                />
                                <div className={cx('content-title')}>
                                    <div className={cx('content-name')}>mocha caramel</div>
                                    <div className={cx('content-price')}>50,000</div>
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
                                <button className={cx('btn-down')}>
                                    Thêm vào giỏ hàng: <span>{price}</span>đ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('wraper')}></div>
            )}
        </>
    );
}
export default Product;
