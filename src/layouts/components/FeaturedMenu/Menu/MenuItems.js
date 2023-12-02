import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Images from '~/Components/Images';
import PropTypes from 'prop-types';
import moment from 'moment';

const cx = classNames.bind(styles);
function MenuItems({ star, price, title, icon, src, discounted, discounts, onClick }) {
    const currentTime = moment(); // Thời gian hiện tại
    const filteredDiscounts = discounts.filter((element) => {
        const startDate = moment(element.startDate); // Thời gian bắt đầu
        const endDate = moment(element.endDate); // Thời gian kết thúc
        return currentTime.isBetween(startDate, endDate);
    });

    return (
        <div className={cx('menu-content')}>
            <div className={cx('card')} onClick={onClick}>
                {filteredDiscounts.length > 0 ? (
                    <div>
                        {filteredDiscounts.map((data) => (
                            <>
                                <div className={cx('discounted')}>- {data.discounted} %</div>
                                <div className={discounted > 0 ? cx('card-img1') : cx('card-img')}>
                                    <Images className={cx('card-img')} src={src} alt="Cà phê mocha" />
                                </div>
                            </>
                        ))}
                    </div>
                ) : (
                    <>
                        {discounted > 0 && <div className={cx('discounted')}>- {discounted} %</div>}
                        <div className={discounted > 0 ? cx('card-img1') : cx('card-img')}>
                            <Images className={cx('card-img')} src={src} alt="Cà phê mocha" />
                        </div>
                    </>
                )}
                <div className={cx('card-content')}>
                    <div className={cx('card-content-left')}>
                        <div className={cx('card-like')}>
                            <div className={cx('icon')}>{star} </div>
                            {filteredDiscounts.length > 0 ? (
                                <div>
                                    {filteredDiscounts.map((data) => (
                                        <>
                                            {data.discounted > 0 ? (
                                                <div style={{ display: 'flex', marginTop: '10px' }}>
                                                    <div className={cx('price', 'price1')}>đ{price}</div>
                                                    <div className={cx('price')}>
                                                        đ
                                                        {(price - price * (data.discounted / 100)).toLocaleString(
                                                            'vi-VN',
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className={cx('price')}>đ{price.toLocaleString('vi-VN')}</div>
                                            )}
                                        </>
                                    ))}
                                </div>
                            ) : (
                                <>
                                    {discounted > 0 ? (
                                        <div style={{ display: 'flex', marginTop: '10px' }}>
                                            <div className={cx('price', 'price1')}>đ{price}</div>
                                            <div className={cx('price')}>
                                                đ{(price - price * (discounted / 100)).toLocaleString('vi-VN')}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={cx('price')}>đ{price.toLocaleString('vi-VN')}</div>
                                    )}
                                </>
                            )}
                        </div>
                        <div className={cx('card-content-right')}>
                            <div className={cx('card-like')}>
                                <div className={cx('cart-name')}>{title}</div>
                                <div className={cx('iconcart')}>
                                    <button onClick={onClick} className={cx('Icons')}>
                                        {icon}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
MenuItems.propTypes = {
    star: PropTypes.object.isRequired,
    price: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    src: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};
export default MenuItems;
