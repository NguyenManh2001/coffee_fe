import classNames from 'classnames/bind';
import styles from './Freeze.module.scss';
import { MenuItems } from '~/layouts/components/FeaturedMenu/Menu';
import { StarIcons } from '~/Components/icons/icons';
const cx = classNames.bind(styles);

function Freeze() {
    return ( 
        <div className={cx('wrapper')}>
        <div className={cx('content-right')}>
        <div className={cx('main-right')}>
        <menu className={cx('menu')}>
                <MenuItems
                    star="anh"
                    src="https://coffee-cup-react.vercel.app/images/sp-15-freeze-matcha.png"
                    price="35,000đ"
                    title="Freeze Matcha"
                    icon={<StarIcons />}
                />
                <MenuItems
                    star="anh"
                    src="https://coffee-cup-react.vercel.app/images/sp-16-freeze-vietquat.jpg"
                    price="35,000đ"
                    title="Freeze Việt Quất"
                    icon={<StarIcons />}
                />
                <MenuItems
                    star="anh"
                    src="https://coffee-cup-react.vercel.app/images/sp-18-freeze-socola.jpg"
                    price="35,000đ"
                    title="Freeze Socola"
                    icon={<StarIcons />}
                />
            </menu>
            <menu className={cx('menu')}>
                <MenuItems
                    star="anh"
                    src="https://coffee-cup-react.vercel.app/images/sp-21-freezekem.jpg"
                    price="35,000đ"
                    title="Freeze kem"
                    icon={<StarIcons />}
                />
            </menu>
        </div>
        </div>
    </div>
     );
}

export default Freeze;