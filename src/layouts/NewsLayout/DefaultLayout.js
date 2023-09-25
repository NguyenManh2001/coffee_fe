import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Images from '~/Components/Images';
import Footer from '~/layouts/components/Footer';
import Header from '~/layouts/components/Header';
import Rigister, { RigisterItem } from '~/layouts/components/Rigister';
import { DateIcons } from '~/Components/icons/icons';
import Menu, { MenuItem } from '~/Pages/News/Menu';
import config from '~/config';

const cx = classNames.bind(styles);

function News({ children }) {
    return (
        <div id="top" className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('header')}></div>
                <div className={cx('content')}>
                    <h2 className={cx('header-content')}>Tin tức</h2>
                    <div className={cx('lineborder')}>
                        <Images
                            src="https://coffee-cup-react.vercel.app/images/line-under-heading.png"
                            alt="lineborder"
                        />
                    </div>
                    <div className={cx('main-content')}>
                        <div className={cx('content-left')}>
                            <div className={cx('fifter')}>
                                <div className={cx('title')}>Bài viết mới nhất</div>
                                <Menu>
                                    <MenuItem
                                        src="https://coffee-cup-react.vercel.app/images/tintuc-3.jpg"
                                        icon={<DateIcons />}
                                        name="Khai trương cơ sở Tây Sơn, giảm giá lên tới 50%"
                                        date="14/02/2022"
                                        to={config.routers.News1}
                                    />
                                    <MenuItem
                                        src="https://coffee-cup-react.vercel.app/images/giohang.jpg"
                                        name="Năm mới vạn điều may, uống thả ga"
                                        icon={<DateIcons />}
                                        date="24/01/2022"
                                        to={config.routers.News1}
                                    />
                                    <MenuItem
                                        src="https://coffee-cup-react.vercel.app/images/tintuc-1.jpg"
                                        name="Coffee Cup - Cảm nhận cà phê mạnh"
                                        icon={<DateIcons />}
                                        date="14/01/2022"
                                        to={config.routers.News1}
                                    />
                                    <MenuItem
                                        src="https://coffee-cup-react.vercel.app/images/tintuc-2.jpg"
                                        name="Xuân mới phát tài - Uống dài dài"
                                        icon={<DateIcons />}
                                        date="04/01/2022"
                                        to={config.routers.News1}
                                    />
                                </Menu>
                            </div>
                            <div className={cx('fifter')}>
                                <div className={cx('title')}>Bài viết đọc nhiều</div>
                                <Menu>
                                    <MenuItem
                                        src="https://coffee-cup-react.vercel.app/images/tintuc-3.jpg"
                                        icon={<DateIcons />}
                                        name="Khai trương cơ sở Tây Sơn, giảm giá lên tới 50%"
                                        date="14/02/2022"
                                        to={config.routers.News1}
                                    />
                                    <MenuItem
                                        src="https://coffee-cup-react.vercel.app/images/giohang.jpg"
                                        name="Năm mới vạn điều may, uống thả ga"
                                        icon={<DateIcons />}
                                        date="24/01/2022"
                                        to={config.routers.News1}
                                    />
                                    <MenuItem
                                        src="https://coffee-cup-react.vercel.app/images/tintuc-1.jpg"
                                        name="Coffee Cup - Cảm nhận cà phê mạnh"
                                        icon={<DateIcons />}
                                        date="14/01/2022"
                                        to={config.routers.News1}
                                    />
                                    <MenuItem
                                        src="https://coffee-cup-react.vercel.app/images/tintuc-2.jpg"
                                        name="Xuân mới phát tài - Uống dài dài"
                                        icon={<DateIcons />}
                                        date="04/01/2022"
                                        to={config.routers.News1}
                                    />
                                </Menu>
                            </div>
                        </div>
                        <div className={cx('content-right')}>{children}</div>
                    </div>
                </div>
            </div>
            <div className={cx('rigister')}>
                <Rigister>
                    <RigisterItem header="Đăng ký nhận thông tin khuyến mãi" btn="Đăng ký ngay" />
                </Rigister>
            </div>
            <Footer />
        </div>
    );
}

export default News;
