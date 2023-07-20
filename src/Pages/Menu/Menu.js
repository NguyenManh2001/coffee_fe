import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { MenuItems1 } from '~/layouts/components/FeaturedMenu/Menu1';
import MenuFeat from '~/layouts/components/FeaturedMenu/Menu1/Menu1';
import { StarIcons } from '~/Components/icons/icons';
import { BsStar } from 'react-icons/bs';
import { useState } from 'react';
import Product from '~/layouts/components/Product';

const cx = classNames.bind(styles);

const MENUS = [
    {
        id: 1,
        star: <BsStar />,
        src: require('~/assets/images/sp-2-cafe-mocha-nong.jpg'),
        price: '35000',
        title: 'Cà Phê Mocha',
        icon: <StarIcons />,
    },
    {
        id: 2,
        star: <BsStar />,
        src: require('~/assets/images/sp-4-americano.jpg'),
        price: '40000',
        title: 'Americano',
        icon: <StarIcons />,
    },
    {
        id: 3,
        star: <BsStar />,
        src: require('~/assets/images/sp-5-mocha-socola.jpg'),
        price: '35000',
        title: 'Mocha Socola',
        icon: <StarIcons />,
    },
    {
        id: 4,
        star: <BsStar />,
        src: require('~/assets/images/sp-1-caramel-latte.jpg'),
        price: '50000',
        title: 'Caramel latte',
        icon: <StarIcons />,
    },
    {
        id: 5,
        star: <BsStar />,
        src: require('~/assets/images/sp-3-epresso-macchiato.jpg'),
        price: '35000',
        title: 'Macchiato',
        icon: <StarIcons />,
    },
    {
        id: 6,
        star: <BsStar />,
        src: require('~/assets/images/sp-6.jpg'),
        price: '35000',
        title: 'mocha caramel',
        icon: <StarIcons />,
    },
    {
        id: 7,
        star: <BsStar />,
        src: require('~/assets/images/sp-7.jpg'),
        price: '35000',
        title: 'Capuchino',
        icon: <StarIcons />,
    },
    {
        id: 8,
        star: <BsStar />,
        src: require('~/assets/images/sp-10-mocha-dua.jpg'),
        price: '35000',
        title: 'mocha dừa',
        icon: <StarIcons />,
    },
    {
        id: 9,
        star: <BsStar />,
        src: require('~/assets/images/sp-12-mocha-latte.jpg'),
        price: '35000',
        title: 'mocha latte',
        icon: <StarIcons />,
    },
    {
        id: 10,
        star: <BsStar />,
        src: require('~/assets/images/sp-13-bacxiu.jpg'),
        price: '35000',
        title: 'Bạc xỉu',
        icon: <StarIcons />,
    },
    {
        id: 11,
        star: <BsStar />,
        src: require('~/assets/images/sp-17-duada.jpg'),
        price: '35000',
        title: 'cà phê dừa',
        icon: <StarIcons />,
    },
    {
        id: 12,
        star: <BsStar />,
        src: require('~/assets/images/sp-20.jpg'),
        price: '35000',
        title: 'Cà phê sữa',
        icon: <StarIcons />,
    },
];

function Menu() {
    const [product, setProduct] = useState(false);
    const [header, setHeader] = useState(1);


    const renderItems = () => {
        return MENUS.map((MENU) => {
            if (MENU.id === header) {
                return (
                    <div key={header}>
                        {product ? (
                            <Product
                                id={MENU.id}
                                src={MENU.src}
                                name={MENU.title}
                                cart={MENU.price}
                            />
                        ) : (
                            <div></div>
                        )}
                    </div>
                )
            }
        })
    }
    return (
        <div className={cx('wrapper')}>
            <MenuFeat className={cx('menu')}>
                {MENUS.map((MENU) => (
                    <MenuItems1
                        key={MENU.id}
                        star={MENU.star}
                        src={MENU.src}
                        price={MENU.price}
                        title={MENU.title}
                        icon={MENU.icon}
                        onClick={() => {
                            setProduct(!product);
                            setHeader(MENU.id);
                        }}
                    />
                ))}
            </MenuFeat>
            <>{renderItems()}</>
        </div>
    );
}

export default Menu;
