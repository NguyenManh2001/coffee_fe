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
import { BsStar } from 'react-icons/bs';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SliderReactjs from '~/Components/SliderReactjs/Slider';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Alert, Rate, Space, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import moment from 'moment';
// import { Carousel } from '@trendyol-js/react-carousel/dist/types/components/carousel';

const cx = classNames.bind(styles);
// const sliderMenu = styled.div`
// grid-template-columns: repeat(${MENUS.length}),300px`;

// const MENUS = [
//     {
//         id: 1,
//         star: <BsStar />,
//         src: require('~/assets/images/sp-2-cafe-mocha-nong.jpg'),
//         price: '35000',
//         title: 'Cà Phê Mocha',
//         icon: <StarIcons />,
//     },
//     {
//         id: 2,
//         star: <BsStar />,
//         src: require('~/assets/images/sp-4-americano.jpg'),
//         price: '40000',
//         title: 'Americano',
//         icon: <StarIcons />,
//     },
//     {
//         id: 3,
//         star: <BsStar />,
//         src: require('~/assets/images/sp-5-mocha-socola.jpg'),
//         price: '35000',
//         title: 'Mocha Socola',
//         icon: <StarIcons />,
//     },
//     {
//         id: 4,
//         star: <BsStar />,
//         src: require('~/assets/images/sp-1-caramel-latte.jpg'),
//         price: '50000',
//         title: 'Caramel latte',
//         icon: <StarIcons />,
//     },
//     {
//         id: 5,
//         star: <BsStar />,
//         src: require('~/assets/images/sp-3-epresso-macchiato.jpg'),
//         price: '35000',
//         title: 'Macchiato',
//         icon: <StarIcons />,
//     },
//     {
//         id: 6,
//         star: <BsStar />,
//         src: require('~/assets/images/sp-6.jpg'),
//         price: '35000',
//         title: 'mocha caramel',
//         icon: <StarIcons />,
//     },
//     {
//         id: 7,
//         star: <BsStar />,
//         src: require('~/assets/images/sp-7.jpg'),
//         price: '35000',
//         title: 'Capuchino',
//         icon: <StarIcons />,
//     },
//     {
//         id: 8,
//         star: <BsStar />,
//         src: require('~/assets/images/sp-10-mocha-dua.jpg'),
//         price: '35000',
//         title: 'mocha dừa',
//         icon: <StarIcons />,
//     },
// ];

function FeatureMenu({ select }) {
    const [product, setProduct] = useState(false);
    const [header, setHeader] = useState(1);
    const [page, setPage] = useState('');
    const [limit, setLimit] = useState(8);
    const [type, setType] = useState('');
    const [search, setSearch] = useState('');
    const sliderRef = useRef(null);
    const isMobile = useMediaQuery({ maxWidth: 767 }); // Điều này kiểm tra nếu kích thước màn hình nhỏ hơn 768px

    const slidesToShow = isMobile ? 2 : 4;
    const { isLoading, data, refetch } = useQuery({
        queryKey: ['data', type, page, search, limit],
        queryFn: () =>
            axios
                .post('https://coffee-bills.onrender.com/product/listProduct', { page, type, search, limit })
                .then((res) => res.data),
    });
    const renderItems = () => {
        return data?.docs?.map((MENU, index) => {
            const currentTime = moment(); // Thời gian hiện tại
            const filteredDiscounts = MENU.discounts.filter((element) => {
                const startDate = moment(element.startDate); // Thời gian bắt đầu
                const endDate = moment(element.endDate); // Thời gian kết thúc
                return currentTime.isBetween(startDate, endDate);
            });
            if (MENU._id === header) {
                return (
                    <div key={header}>
                        {product && (
                            <Product
                                key={MENU._id}
                                _id={MENU._id}
                                src={MENU.link}
                                name={MENU.name}
                                cart={
                                    filteredDiscounts.length > 0
                                        ? filteredDiscounts.map(
                                              (data) => MENU.price - MENU.price * (data.discounted / 100),
                                          )
                                        : MENU.discounted
                                        ? MENU.price - (MENU.price * MENU.discounted) / 100
                                        : MENU.price
                                }
                                onClick={() => {
                                    setProduct(false);
                                }}
                            />
                        )}
                    </div>
                );
            }
        });
    };
    console.log(data);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('header')}>Sản phẩm</h2>
                <div className={cx('lineborder')}>
                    <Images src={require('~/assets/images/line-under-heading.png')} alt="lineborder" />
                </div>
                {isLoading ? (
                    <div className={cx('loading')}>
                        <Spin style={{ color: 'red' }} />
                    </div>
                ) : (
                    <>
                        <div className={cx('Menu')}>
                            {/* <SliderReactjs refs={sliderRef} show={slidesToShow} scroll={4} className={cx('Menu')}> */}
                            {data?.docs?.map((MENU, index) => (
                                <MenuItems
                                    key={MENU._id}
                                    autoPlay={3}
                                    star={<Rate allowHalf defaultValue={2.5} />}
                                    src={MENU.link}
                                    price={MENU.price}
                                    title={MENU.name}
                                    type={MENU.type}
                                    discounts={MENU.discounts}
                                    discounted={MENU.discounted}
                                    icon={<StarIcons />}
                                    onClick={() => {
                                        setProduct(!product);
                                        setHeader(MENU._id);
                                    }}
                                />
                            ))}
                            {/* </SliderReactjs> */}
                        </div>
                        {/* <div>
                            <button onClick={() => sliderRef.current.slickPrev()} className={cx('btn-prev')}>
                                <PrevIcons />
                            </button>
                            <button onClick={() => sliderRef.current.slickNext()} className={cx('btn-next')}>
                                <NextIcons />
                            </button>
                        </div> */}

                        <div className={cx('btn')}>
                            {data?.docs.length === data?.totalDocs ? (
                                <Button
                                    className={cx('btnMenu')}
                                    style={{ width: '200px' }}
                                    onClick={() => setLimit(limit - 8)}
                                >
                                    Ẩn
                                </Button>
                            ) : (
                                <Button
                                    className={cx('btnMenu')}
                                    style={{ width: '200px' }}
                                    onClick={() => setLimit(limit + 8)}
                                >
                                    Xem thêm
                                </Button>
                            )}
                        </div>
                    </>
                )}
                {/* <div className={cx('rigister')}>
                    <Rigister>
                        <RigisterItem header="Đăng ký nhận thông tin khuyến mãi" btn="Đăng ký ngay" />
                    </Rigister>
                </div> */}
            </div>
            {renderItems()}
        </div>
    );
}

export default FeatureMenu;
