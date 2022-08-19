import classNames from "classnames/bind";
import styles from './Menu.module.scss';
import Images from "~/Components/Images";

const cx = classNames.bind(styles);
function Menu() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
            <h2 className={cx('header')}>Thực Đơn</h2>
            <div className={cx('lineborder')}>
            <Images src={require('~/assets/images/line-under-heading.png')} alt="lineborder"/>
            </div>
            <div className={cx('menu')}>
                <div className={cx('menu-item','item-1')}>
                    <div className={cx('menu-content')}>
                        <h4 className={cx('title-coffee')}>Cà Phê</h4>
                        <div className={cx('item-border')}></div>
                        <a className={cx('item-add')} href="/menu">Xem thêm</a>
                    </div>
                    <div className={cx('itemImage')}></div>
                </div>
                <div className={cx('menu-item','menu-item-center')}>
                <div className={cx('menu-content')}>
                        <h4 className={cx('title-coffee')}>Trà</h4>
                        <div className={cx('item-border')}></div>
                        <a className={cx('item-add')} href="/menu">Xem thêm</a>
                    </div>
                    <div className={cx('itemImage')}></div>
                </div>
                <div className={cx('menu-item','item-3')}>
                <div className={cx('menu-content')}>
                        <h4 className={cx('title-coffee')}>Freeze</h4>
                        <div className={cx('item-border')}></div>
                        <a className={cx('item-add')} href="/menu">Xem thêm</a>
                    </div>
                    <div className={cx('itemImage')}></div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Menu;