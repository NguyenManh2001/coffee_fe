import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Images from '~/Components/Images';
import Button from '~/Components/Button';
import { MenuItems } from '~/layouts/components/FeaturedMenu/Menu';
import { StarIcons } from '~/Components/icons/icons';
import Items, { Item } from '~/layouts/components/Menu1'
import config from '~/config';
const cx = classNames.bind(styles);

function Menu() {
    return ( 
        <div className={cx('wrapper')}>
        <div className={cx('content-right')}>
        <div className={cx('main-right')}>
            <menu className={cx('menu')}>
                <MenuItems
                    star="anh"
                    src="https://coffee-cup-react.vercel.app/images/sp-2-cafe-mocha-nong.jpg"
                    price="35,000đ"
                    title="Cà Phê Mocha"
                    icon={<StarIcons />}
                />
                <MenuItems
                    star="anh"
                    src="https://coffee-cup-react.vercel.app/images/sp-4-americano.jpg"
                    price="35,000đ"
                    title="Americano"
                    icon={<StarIcons />}
                />
                <MenuItems
                    star="anh"
                    src="https://coffee-cup-react.vercel.app/images/sp-5-mocha-socola.jpg"
                    price="35,000đ"
                    title="Mocha Socola"
                    icon={<StarIcons />}
                />
            </menu>
            <menu className={cx('menu')}>
                <MenuItems
                    star="anh"
                    src="https://coffee-cup-react.vercel.app/images/sp-1-caramel-latte.jpg"
                    price="35,000đ"
                    title="Caramel latte"
                    icon={<StarIcons />}
                />

                <MenuItems
                    star="anh"
                    src="https://coffee-cup-react.vercel.app/images/sp-3-epresso-macchiato.jpg"
                    price="35,000đ"
                    title="Macchiato"
                    icon={<StarIcons />}
                />
                <MenuItems
                    star="anh"
                    src="https://coffee-cup-react.vercel.app/images/sp-6.jpg"
                    price="35,000đ"
                    title="mocha caramel"
                    icon={<StarIcons />}
                />
            </menu>
            <menu className={cx('menu')}>
                <MenuItems
                    star="anh"
                    src="https://coffee-cup-react.vercel.app/images/sp-7.jpg"
                    price="35,000đ"
                    title="Capuchino"
                    icon={<StarIcons />}
                />

                <MenuItems
                    star="anh"
                    src="https://coffee-cup-react.vercel.app/images/sp-10-mocha-dua.jpg"
                    price="35,000đ"
                    title="mocha dừa"
                    icon={<StarIcons />}
                />
                <MenuItems
                    star="anh"
                    src="https://coffee-cup-react.vercel.app/images/sp-12-mocha-latte.jpg"
                    price="35,000đ"
                    title="mocha latte"
                    icon={<StarIcons />}
                />
            </menu>
            <menu className={cx('menu')}>
                <MenuItems
                    star="anh"
                    src="https://coffee-cup-react.vercel.app/images/sp-13-bacxiu.jpg"
                    price="35,000đ"
                    title="Bạc xỉu"
                    icon={<StarIcons />}
                />

                <MenuItems
                    star="anh"
                    src="https://coffee-cup-react.vercel.app/images/sp-17-duada.jpg"
                    price="35,000đ"
                    title="cà phê dừa"
                    icon={<StarIcons />}
                />
                <MenuItems
                    star="anh"
                    src="https://coffee-cup-react.vercel.app/images/sp-20.jpg"
                    price="35,000đ"
                    title="Cà phê sữa"
                    icon={<StarIcons />}
                />
            </menu>
        </div>
        </div>
    </div>
     );
}

export default Menu;