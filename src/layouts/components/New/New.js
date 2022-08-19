import classNames from 'classnames/bind';
import styles from './New.module.scss';
import Images from '~/Components/Images';
import Button from '~/Components/Button';
import NewContent from './NewContent';
import config from '~/config';
import { SmoothHorizontalScrolling } from '../Scroll/Scroll';
import { useRef, useState } from 'react';
import { NextIcons, PrevIcons} from '~/Components/icons/icons';
import { BsSliders } from 'react-icons/bs';
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
]
function New() {
    const slider = useRef();
    const update = useRef();

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
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('header')}>Tin tức khuyến mãi</h2>
                <div className={cx('lineborder')}>
                    <Images src={require('~/assets/images/line-under-heading.png')} alt="lineborder" />
                </div>
            </div>
            <div  ref={slider} className={cx('content')}>
                  {NEWS.map((NEW,index) => (
                <div key={index} ref={update} className={cx('list')}>
                <NewContent  to={config.routers.News} name = {NEW.name} date = {NEW.date} src={NEW.src}/>
                 </div>
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
            <Button to={config.routers.News} className={cx('btnMenu')}>Xem thêm nhiều tin khác</Button>
        </div>
     );
}

export default New;