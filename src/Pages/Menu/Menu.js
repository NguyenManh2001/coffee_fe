import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { MenuItems } from '~/layouts/components/FeaturedMenu/Menu';
import { StarIcons } from '~/Components/icons/icons';
import { useState } from 'react';
import Product from '~/layouts/components/Product';
const cx = classNames.bind(styles);

function Menu() {
    const [product, setProduct] = useState(false);

    const handleSubmit = () => {
        setProduct(!product);
    };
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
                            onClick={handleSubmit}
                        />
                        <MenuItems
                            star="anh"
                            src="https://coffee-cup-react.vercel.app/images/sp-4-americano.jpg"
                            price="35,000đ"
                            title="Americano"
                            icon={<StarIcons />}
                            onClick={handleSubmit}
                        />
                        <MenuItems
                            star="anh"
                            src="https://coffee-cup-react.vercel.app/images/sp-5-mocha-socola.jpg"
                            price="35,000đ"
                            title="Mocha Socola"
                            icon={<StarIcons />}
                            onClick={handleSubmit}
                        />
                    </menu>
                    <menu className={cx('menu')}>
                        <MenuItems
                            star="anh"
                            src="https://coffee-cup-react.vercel.app/images/sp-1-caramel-latte.jpg"
                            price="35,000đ"
                            title="Caramel latte"
                            icon={<StarIcons />}
                            onClick={handleSubmit}
                        />

                        <MenuItems
                            star="anh"
                            src="https://coffee-cup-react.vercel.app/images/sp-3-epresso-macchiato.jpg"
                            price="35,000đ"
                            title="Macchiato"
                            icon={<StarIcons />}
                            onClick={handleSubmit}
                        />
                        <MenuItems
                            star="anh"
                            src="https://coffee-cup-react.vercel.app/images/sp-6.jpg"
                            price="35,000đ"
                            title="mocha caramel"
                            icon={<StarIcons />}
                            onClick={handleSubmit}
                        />
                    </menu>
                    <menu className={cx('menu')}>
                        <MenuItems
                            star="anh"
                            src="https://coffee-cup-react.vercel.app/images/sp-7.jpg"
                            price="35,000đ"
                            title="Capuchino"
                            icon={<StarIcons />}
                            onClick={handleSubmit}
                        />

                        <MenuItems
                            star="anh"
                            src="https://coffee-cup-react.vercel.app/images/sp-10-mocha-dua.jpg"
                            price="35,000đ"
                            title="mocha dừa"
                            icon={<StarIcons />}
                            onClick={handleSubmit}
                        />
                        <MenuItems
                            star="anh"
                            src="https://coffee-cup-react.vercel.app/images/sp-12-mocha-latte.jpg"
                            price="35,000đ"
                            title="mocha latte"
                            icon={<StarIcons />}
                            onClick={handleSubmit}
                        />
                    </menu>
                    <menu className={cx('menu')}>
                        <MenuItems
                            star="anh"
                            src="https://coffee-cup-react.vercel.app/images/sp-13-bacxiu.jpg"
                            price="35,000đ"
                            title="Bạc xỉu"
                            icon={<StarIcons />}
                            onClick={handleSubmit}
                        />

                        <MenuItems
                            star="anh"
                            src="https://coffee-cup-react.vercel.app/images/sp-17-duada.jpg"
                            price="35,000đ"
                            title="cà phê dừa"
                            icon={<StarIcons />}
                            onClick={handleSubmit}
                        />
                        <MenuItems
                            star="anh"
                            src="https://coffee-cup-react.vercel.app/images/sp-20.jpg"
                            price="35,000đ"
                            title="Cà phê sữa"
                            icon={<StarIcons />}
                            onClick={handleSubmit}
                        />
                    </menu>
                </div>
            </div>
            {product ? <Product /> : <div></div>}
        </div>
    );
}

export default Menu;
