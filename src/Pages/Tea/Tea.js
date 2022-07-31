import classNames from 'classnames/bind';
import styles from './Tea.module.scss';
import Images from '~/Components/Images';
import Button from '~/Components/Button';
import { MenuItems } from '~/layouts/components/FeaturedMenu/Menu';
import { StarIcons } from '~/Components/icons/icons';
import Items, { Item } from '~/layouts/components/Menu1'
import config from '~/config';
const cx = classNames.bind(styles);

function Tea() {
    return ( 
        <div className={cx('wrapper')}>
        <div className={cx('content-right')}>
        <div className={cx('main-right')}>
            <menu className={cx('menu')}>
                <MenuItems
                    star="anh"
                    src="https://coffee-cup-react.vercel.app/images/sp-8-trasen.jpg"
                    price="35,000đ"
                    title="Trà Sen"
                    icon={<StarIcons />}
                />
                <MenuItems
                    star="anh"
                    src="https://coffee-cup-react.vercel.app/images/sp-9-travai.jpg"
                    price="35,000đ"
                    title="Trà vải"
                    icon={<StarIcons />}
                />
                <MenuItems
                    star="anh"
                    src="	https://coffee-cup-react.vercel.app/images/sp-11.jpg"
                    price="35,000đ"
                    title="Trà Quất"
                    icon={<StarIcons />}
                />
            </menu>
            <menu className={cx('menu')}>
                <MenuItems
                    star="anh"
                    src="https://coffee-cup-react.vercel.app/images/sp-14-tradao.jpg"
                    price="35,000đ"
                    title="Trà đào"
                    icon={<StarIcons />}
                />

                <MenuItems
                    star="anh"
                    src="https://coffee-cup-react.vercel.app/images/sp-22-trachanh.jpg"
                    price="35,000đ"
                    title="Trà chanh"
                    icon={<StarIcons />}
                />
            </menu>
         
        </div>
        </div>
    </div>
     );
}

export default Tea;