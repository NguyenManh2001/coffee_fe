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
import { useMediaQuery } from 'react-responsive';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Spin } from 'antd';
import formatDate, { formatTime } from '~/Components/FormatDate/FormatDate';
const cx = classNames.bind(styles);

function New() {
    const sliderRef = useRef(null);
    const isMobile = useMediaQuery({ maxWidth: 767 }); // Điều này kiểm tra nếu kích thước màn hình nhỏ hơn 768px

    const slidesToShow = isMobile ? 1 : 3;
    const { isLoading, data, refetch } = useQuery({
        queryKey: ['listNews'],
        queryFn: () => axios.post('https://coffee-bills.onrender.com/news/listNews').then((res) => res.data),
    });

    console.log(data);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('header')}>Tin tức</h2>
                <div className={cx('lineborder')}>
                    <Images src={require('~/assets/images/line-under-heading.png')} alt="lineborder" />
                </div>
            </div>
            {isLoading ? (
                <div className={cx('loading')}>
                    <Spin style={{ color: 'red' }} />
                </div>
            ) : (
                <>
                    <div className={cx('content')}>
                        <SliderReactjs refs={sliderRef} show={slidesToShow} scroll={1} className={cx('content')}>
                            {data?.docs?.map((data, index) => (
                                <div key={data._id} className={cx('list')}>
                                    <NewContent
                                        // style={{ width: '210px' }}
                                        key={data._id}
                                        to={config.routers.News}
                                        name={data.title}
                                        date={formatTime(data.createdAt)}
                                        src={data.image}
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
                </>
            )}
        </div>
    );
}

export default New;
