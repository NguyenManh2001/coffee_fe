import classNames from 'classnames/bind';
import styles from './New.module.scss';
import Images from '~/Components/Images';
import Button from '~/Components/Button';
import NewContent from './NewContent';

const cx = classNames.bind(styles);
function New() {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('header')}>Tin tức khuyến mãi</h2>
                <div className={cx('lineborder')}>
                    <Images src="https://coffee-cup-react.vercel.app/images/line-under-heading.png" alt="lineborder" />
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('list')}>
                <div className ={cx('img-content','image1')}></div>
                <NewContent name = 'Ô long mùa xuân" - Hương vị mới lạ' date = '14/01/2022, 15:30'/>
                </div>
                <div className={cx('list')}>
                <div className ={cx('img-content','image2')}></div>
                <NewContent name = 'Ô long mùa xuân" - Hương vị mới lạ' date = '14/01/2022, 15:30'/>
                </div>
                <div className={cx('list')}>
                <div className ={cx('img-content','image3')}></div>
                <NewContent name = 'Ô long mùa xuân" - Hương vị mới lạ' date = '14/01/2022, 15:30'/>
                </div>
            </div>
            <Button className={cx('btnMenu')}>Xem thêm nhiều tin khác</Button>
        </div>
     );
}

export default New;