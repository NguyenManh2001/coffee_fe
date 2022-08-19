import classNames from 'classnames/bind';
import styles from './FeaturedMenu.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Images from '~/Components/Images';
import { NextIcons, PrevIcons, StarIcons } from '~/Components/icons/icons';
import { MenuItems } from './Menu';
import Button from '~/Components/Button';
import config from '~/config';
import Rigister, { RigisterItem } from '../Rigister';
import Product from '../Product';
import { SmoothHorizontalScrolling } from '../Scroll/Scroll';
import { useEffect, useRef, useState } from 'react';
import {BsStar} from 'react-icons/bs';
// import { Carousel } from '@trendyol-js/react-carousel/dist/types/components/carousel';

const cx = classNames.bind(styles);
// const sliderMenu = styled.div`
// grid-template-columns: repeat(${MENUS.length}),300px`;

const MENUS = [
    {
        id: 1,
        star:  <BsStar />,
        src: require('~/assets/images/sp-2-cafe-mocha-nong.jpg'),
        price: '35000',
        title: 'Cà Phê Mocha',
        icon: <StarIcons />,
    },
    {
        id: 2,
        star:  <BsStar />,
        src: require('~/assets/images/sp-4-americano.jpg'),
        price: '40000',
        title: 'Americano',
        icon: <StarIcons />,
    },
    {
        id: 3,
        star:  <BsStar />,
        src: require('~/assets/images/sp-5-mocha-socola.jpg'),
        price: '35000',
        title: 'Mocha Socola',
        icon: <StarIcons />,
    },
    {
        id: 4,
        star:  <BsStar />,
        src: require('~/assets/images/sp-1-caramel-latte.jpg'),
        price: '50000',
        title: 'Caramel latte',
        icon: <StarIcons />,
    },
    {
        id: 5,
        star:  <BsStar />,
        src: require('~/assets/images/sp-3-epresso-macchiato.jpg'),
        price: '35000',
        title: 'Macchiato',
        icon: <StarIcons />,
    },
    {
        id: 6,
        star:  <BsStar />,
        src: require('~/assets/images/sp-6.jpg'),
        price: '35000',
        title: 'mocha caramel',
        icon: <StarIcons />,
    },
    {
        id: 7,
        star:  <BsStar />,
        src: require('~/assets/images/sp-7.jpg'),
        price: '35000',
        title: 'Capuchino',
        icon: <StarIcons />,
    },
    {
        id: 8,
        star:  <BsStar />,
        src: require('~/assets/images/sp-10-mocha-dua.jpg'),
        price: '35000',
        title: 'mocha dừa',
        icon: <StarIcons />,
    },
];

function FeatureMenu() {
    const slider = useRef();
    const update = useRef();
    const [product, setProduct] = useState(false);
    const [header, setHeader] = useState(1);
    const autoPlay = useRef();
    const nextSlider = () => {
        const maxScrollRight = slider.current.scrollWidth - slider.current.clientWidth;
        if (slider.current.scrollLeft < maxScrollRight) {
            SmoothHorizontalScrolling(slider.current,250,
                  update.current.clientWidth , 
                  slider.current.scrollLeft,
                )
        };
    }
    const prevSlider = () => {
        if (slider.current.scrollLeft > 0 ) {
            SmoothHorizontalScrolling(slider.current,250,
                  -update.current.clientWidth , 
                  slider.current.scrollLeft,
                )
        };
    };

    // useEffect(() => {
    //     autoPlay.current = nextSlider;
    // })
    useEffect(() => {
        autoPlay.current = setTimeout(nextSlider,3000)
    })
    const renderItems = () => {
        return (MENUS.map((MENU, index) => {
            if (MENU.id === header) {
                return (
                    <div key={header}>
                        {product ? (
                            <Product key={MENU.id} src={MENU.src} name={MENU.title} cart={MENU.price} />
                        ) : (
                            <div key={MENU.id}></div>
                        )}
                    </div>
                );
            }
        }));
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('header')}>Sản phẩm nổi bật</h2>
                <div className={cx('lineborder')}>
                    <Images src={require('~/assets/images/line-under-heading.png')} alt="lineborder" />
                </div>
                <div ref={slider} className={cx('Menu')}>
                    {MENUS.map((MENU, index) => (
                        <MenuItems
                            key={index}
                            autoPlay={3}
                            refs={update}
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
                    <div>
                        <button onClick={prevSlider} className={cx('btn-prev')}>
                            <PrevIcons />
                        </button>
                        <button onClick={nextSlider} className={cx('btn-next')}>
                            <NextIcons />
                        </button>
                    </div>
                </div>
                <div className={cx('btn')}>
                    <Button className={cx('btnMenu')} to={config.routers.Menu}>
                        Xem tất cả menu
                    </Button>
                </div>
                <div className={cx('rigister')}>
                    <Rigister>
                        <RigisterItem header="Đăng ký nhận thông tin khuyến mãi" btn="Đăng ký ngay" />
                    </Rigister>
                </div>
            </div>
            {renderItems()}
        </div>
    );
}

export default FeatureMenu;
