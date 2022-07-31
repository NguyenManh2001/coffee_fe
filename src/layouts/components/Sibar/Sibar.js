import classNames from 'classnames/bind';
import Images from '~/Components/Images';
import styles from './Sibar.module.scss';
import React from 'react';
import Carousel from 'better-react-carousel';

const cx = classNames.bind(styles);

const Gallery = () => {
    return (
        <Carousel cols={1} rows={1} autoplay={2000} loop>
            <Carousel.Item className={cx('Carousel5')}>
                <Images
                    className={cx('carousel-img')}
                    src="https://coffee-cup-react.vercel.app/images/home-4-slide.jpg?random=1"
                    alt="..."
                />
            </Carousel.Item>
            <Carousel.Item>
                <Images
                    className={cx('carousel-img')}
                    src="https://coffee-cup-react.vercel.app/images/home-1-slider-4.jpg?random=2"
                    alt="..."
                />
            </Carousel.Item>
            <Carousel.Item>
                <Images
                    className={cx('carousel-img')}
                    src="https://coffee-cup-react.vercel.app/images/home-1-slider-img-2.jpg?random=3"
                    alt="..."
                />
            </Carousel.Item>
        </Carousel>
    );
};
function Sibar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('carousel')}>
                <div className={cx('carousel-inner')}>
                    <div className={cx('carousel-item active')}>{Gallery()}</div>
                </div>
                <div className={cx('carousel-caption')}>
                    <div className={cx('content')}>
                        <div className={cx('logo-icon')}>
                            <Images
                                className={cx('banner-icon ')}
                                src="https://coffee-cup-react.vercel.app/images/banner-logo-2.png"
                                alt="First slide"
                            />
                        </div>
                        <h1 className={cx('banner-heading')}>Coffee Cup</h1>
                        <h4 className={cx('banner-subheading')}>Cà phê - Trà - Freeze</h4>
                        <a className={cx('')} href="/menu">
                            <button className={cx('btn')}>Khám phá ngay</button>
                        </a>
                    </div>
                </div>
            </div>
                <div className={cx('carousellogo')}>
                <Images className={cx('logo')} src="https://coffee-cup-react.vercel.app/svg/border-top.svg" alt="border"/>
                </div>
        </div>
    );
}

export default Sibar;

