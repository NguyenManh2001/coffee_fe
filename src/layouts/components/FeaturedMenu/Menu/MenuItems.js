import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Images from '~/Components/Images';
import { CartIcons, StarIcons } from '~/Components/icons/icons';
import Button from '~/Components/Button';

const cx = classNames.bind(styles);
function MenuItems({star,price,title,icon,src}) {
    return (
       
        <div className={cx('menu-content')}>
            <div className={cx('card')}>
                <div className={cx('card-img')}>
                    <Images
                        className={cx('card-img')}
                        src={src}
                        alt="Cà phê mocha"
                    />
                </div>
                <div className={cx('card-content')}>
                    <div className={cx('card-content-left')}>
                        <div className={cx('card-like')}>
                            <div className={cx('icon')}>{star}</div>
                            <div className={cx('price')}>{price}</div>
                        </div>
                        <div className={cx('card-content-right')}>
                            <div className={cx('card-like')}>
                                <div className={cx('cart-name')}>{title}</div>
                                <div className={cx('iconcart')}>
                                    <a className={cx('Icons')}>
                                       {icon}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuItems;
