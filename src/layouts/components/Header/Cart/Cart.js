import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DeleteIcons, EditIcons} from '~/Components/icons/icons';
import Images from '~/Components/Images';
import config from '~/config';
import styles from './Cart.module.scss';
const cx = classNames.bind(styles);

function Cart({name,src,price}) {
    return (
        <div className={cx('content-cart')}>
            <div className={cx('content-cart-item')}>
                <div className={cx('cart-item')}>
                    <Images
                        className={cx('logo-cart')}
                        src={src}
                    />
                    <div className={cx('cart-title')}>
                        <div className={cx('cart-name')}>{name}</div>
                        <div className={cx('cart-size')}>
                            <div className={cx('size')}>
                                Size M <span>x 1</span>
                            </div>
                            <div className={cx('edit')}>
                                <EditIcons />
                            </div>
                            <div className={cx('cart-price')}>{price}</div>
                            <div className={cx('delete')}>
                                <DeleteIcons />
                            </div>
                        </div>
                    </div>
                </div>
                <NavLink className={cx('add')} to="#">
                    Thêm món
                </NavLink>
            </div>
            <div className={cx('content-cart-item')}>
                <div className={cx('price')}>
                    <div className={cx('size')}>Tổng cộng</div>
                    <div className={cx('cart-price')}>{price}</div>
                </div>
            </div>
            <div className={cx('content-title')}>
                <NavLink className={cx('btnMenu')}  to={config.routers.Menu}>
                    Thanh toán
                </NavLink>
            </div>
        </div>
    );
}

export default Cart;
