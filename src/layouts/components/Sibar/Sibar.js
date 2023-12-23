import classNames from 'classnames/bind';
import Images from '~/Components/Images';
import styles from './Sibar.module.scss';
import React from 'react';
// import Carousel from 'better-react-carousel';
import Carousel from 'react-bootstrap/Carousel';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const cx = classNames.bind(styles);
// const Sibars = [
//     {
//         id: 1,
//         name: 'Coffee Bliss',
//         title: 'Cà phê - Trà - Freeze',
//         srcImage: require('~/assets/images/home-4-slide.jpg'),
//         iconImage: require('~/assets/images/banner-logo-2.png'),
//         btn: 'Khám phá ngay',
//     },
//     {
//         id: 2,
//         name: 'Coffee Bliss',
//         title: 'Đặt hàng dễ dàng hơn với ứng dụng di dộng',
//         srcImage: require('~/assets/images/home-1-slider-4.jpg'),
//         iconImage: require('~/assets/images/banner-logo-1.png'),
//         btn: 'Tải App ngay',
//     },
//     {
//         id: 3,
//         name: 'Coffee Bliss',
//         title: 'Khuyến mãi đầu xuân Nhâm Dần lên tới 20%',
//         srcImage: require('~/assets/images/home-1-slider-img-2.jpg'),
//         iconImage: require('~/assets/images/banner-logo-2.png'),
//         btn: 'Khám phá ngay',
//     },
// ];
function Sibar() {
    const { isLoading, data, refetch } = useQuery({
        queryKey: ['data'],
        queryFn: () => axios.post('https://coffee-bills.onrender.com/sibar/listSibar').then((res) => res.data),
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('carousel')}>
                <div className={cx('carousel-inner')}>
                    <div className={cx('carousel-item active')}>
                        <Carousel className={cx('carousel1')}>
                            {data?.docs?.map((Sibar, index) => (
                                <Carousel.Item key={index}>
                                    <Images className={cx('carousel-img')} src={Sibar.srcImage} alt="..." />
                                    <Carousel.Caption className={cx('carouselItem')}>
                                        <div className={cx('carousel-caption')}>
                                            <div className={cx('content')}>
                                                <div className={cx('logo-icon')}>
                                                    <Images
                                                        className={cx('banner-icon ')}
                                                        src={Sibar.iconImage}
                                                        alt="First slide"
                                                    />
                                                </div>
                                                <h1 className={cx('banner-heading')}>{Sibar.name}</h1>
                                                <h4 className={cx('banner-subheading')}>{Sibar.title}</h4>
                                                <a className={cx('')} href="/menu">
                                                    <button className={cx('btn')}>{Sibar.btnName}</button>
                                                </a>
                                            </div>
                                        </div>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
            <div className={cx('carousellogo')}>
                <Images
                    className={cx('logo')}
                    src="https://coffee-cup-react.vercel.app/svg/border-top.svg"
                    alt="border"
                />
            </div>
        </div>
    );
}

export default Sibar;
