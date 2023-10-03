import classNames from 'classnames/bind';
import styles from './New.module.scss';
import Images from '~/Components/Images';
import Button from '~/Components/Button';
import NewContent from './NewContent';
import config from '~/config';
import { SmoothHorizontalScrolling } from '../Scroll/Scroll';
import { useRef, useState } from 'react';
import { NextIcons, PrevIcons } from '~/Components/icons/icons';
import { BsSliders } from 'react-icons/bs';
import SliderReactjs from '~/Components/SliderReactjs/Slider';
const cx = classNames.bind(styles);
const NEWS = [
    {
        id: 1,
        name: 'NĂM MỚI, UỐNG "KHỞI ĐẦU SUNG" - NHẬN LÌ XÌ KHỦNG',
        date: '02/02/2022, 20:02',
        src: require('~/assets/images/giohang.jpg'),
    },
    {
        id: 2,
        name: 'Khai trương cơ sở tây sơn, giảm giá lên tới 50%',
        date: '14/01/2022, 15:30',
        src: require('~/assets/images/tintuc-3.jpg'),
    },
    {
        id: 3,
        name: 'Mừng xuân mới, Uống thả ga, Nhận quà liền tay',
        date: '14/01/2022, 15:30',
        src: require('~/assets/images/tintuc-1.jpg'),
    },
    {
        id: 4,
        name: 'Ô long mùa xuân" - Hương vị mới lạ',
        date: '14/01/2022, 15:30',
        src: require('~/assets/images/tintuc-2.jpg'),
    },
];
function New() {
    const sliderRef = useRef(null);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('header')}>Tin tức khuyến mãi</h2>
                <div className={cx('lineborder')}>
                    <Images src={require('~/assets/images/line-under-heading.png')} alt="lineborder" />
                </div>
            </div>
            <div className={cx('content')}>
                <SliderReactjs refs={sliderRef} show={3} scroll={1} className={cx('content')}>
                    {NEWS.map((NEW, index) => (
                        <div key={index} className={cx('list')}>
                            <NewContent
                                key={index}
                                to={config.routers.News}
                                name={NEW.name}
                                date={NEW.date}
                                src={NEW.src}
                            />
                        </div>
                    ))}
                </SliderReactjs>
                <div>
                    <button onClick={() => sliderRef.current.slickPrev()} className={cx('btn-prev')}>
                        <PrevIcons />
                    </button>
                    <button onClick={() => sliderRef.current.slickNext()} className={cx('btn-next')}>
                        <NextIcons />
                    </button>
                </div>
            </div>
            <div style={{ textAlign: 'center', padding: '3%' }}>
                <Button to={config.routers.News} className={cx('btnMenu')}>
                    Xem thêm nhiều tin khác
                </Button>
            </div>
        </div>
    );
}

export default New;
