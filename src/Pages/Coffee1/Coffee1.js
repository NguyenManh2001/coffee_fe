import classNames from 'classnames/bind';
import styles from './Coffee1.module.scss';
import Images from '~/Components/Images';
import Button from '~/Components/Button';
import { MenuItems } from '~/layouts/components/FeaturedMenu/Menu';
import { StarIcons } from '~/Components/icons/icons';
import Items, { Item } from '~/layouts/components/Menu1'
import config from '~/config';
const cx = classNames.bind(styles);

function Coffee1() {
    return ( 
        <div className={cx('wrapper')}>
        <div className={cx('content-right')}>
        <div className={cx('main-right')}>
        <menu className={cx('menu')}>
                <MenuItems
                    star="anh"
                    src="https://coffee-cup-react.vercel.app/images/sp-23.jpg"
                    price="65,000đ"
                    title="Cà phê gói"
                    icon={<StarIcons />}
                />
                <MenuItems
                    star="anh"
                    src="https://coffee-cup-react.vercel.app/images/sp-24.jpg"
                    price="80,000đ"
                    title="Cà phê hòa tan"
                    icon={<StarIcons />}
                />
                <MenuItems
                    star="anh"
                    src="https://coffee-cup-react.vercel.app/images/sp-25.jpg"
                    price="95,000đ"
                    title="Cà phê Roast"
                    icon={<StarIcons />}
                />
            </menu>
        </div>
        </div>
    </div>
     );
}

export default Coffee1;