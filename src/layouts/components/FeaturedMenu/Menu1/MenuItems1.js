import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Images from '~/Components/Images';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);
function MenuItems1({ refs, star, price, title, icon, src, onClick }) {
    return (
        <div ref={refs} className={cx('menu-content')}>
                <div className={cx('card')}>
                    <div className={cx('card-img')}>
                        <Images className={cx('card-img')} src={src} alt="Cà phê mocha" />
                    </div>
                    <div className={cx('card-content')}>
                        <div className={cx('card-content-left')}>
                            <div className={cx('card-like')}>
                                <div className={cx('icon')}>{star} {star} {star} </div>
                                <div className={cx('price')}>{price}đ</div>
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
MenuItems1.propTypes = {
    star: PropTypes.object.isRequired,
    price: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    src: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};
export default MenuItems1;
