import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Images from '~/Components/Images';
import Footer from '~/layouts/components/Footer';
import Header from '~/layouts/components/Header';
import Rigister, { RigisterItem } from '~/layouts/components/Rigister';
import { DateIcons } from '~/Components/icons/icons';
import Menu, { MenuItem } from '~/Pages/News/Menu';
import config from '~/config';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import formatDate from '~/Components/FormatDate/FormatDate';
import { Spin } from 'antd';

const cx = classNames.bind(styles);

function News({ children }) {
    const { isLoading, data, refetch } = useQuery({
        queryKey: ['listNews'],
        queryFn: () => axios.post('https://coffee-bills.onrender.com/news/listNews').then((res) => res.data),
    });
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
                                    {isLoading ? (
                                        <div className={cx('loading')}>
                                            <Spin style={{ color: 'red' }} />
                                        </div>
                                    ) : (
                                        <>
                                            {data?.docs.map((data) => (
                                                <MenuItem
                                                    src={data.image}
                                                    icon={<DateIcons />}
                                                    name={data.title}
                                                    date={formatDate(data.createdAt)}
                                                    to={config.routers.News1}
                                                />
                                            ))}
                                        </>
                                    )}
                                </Menu>
                            </div>
                            <div className={cx('fifter')}>
                                <div className={cx('title')}>Bài viết đọc nhiều</div>
                                <Menu>
                                    {isLoading ? (
                                        <div className={cx('loading')}>
                                            <Spin style={{ color: 'red' }} />
                                        </div>
                                    ) : (
                                        <>
                                            {data?.docs.map((data) => (
                                                <MenuItem
                                                    src={data.image}
                                                    icon={<DateIcons />}
                                                    name={data.title}
                                                    date={formatDate(data.createdAt)}
                                                    to={config.routers.News1}
                                                />
                                            ))}
                                        </>
                                    )}
                                </Menu>
                            </div>
                        </div>
                        <div className={cx('content-right')}>{children}</div>
                    </div>
                </div>
            </div>
            {/* <div className={cx('rigister')}>
                <Rigister>
                    <RigisterItem header="Đăng ký nhận thông tin khuyến mãi" btn="Đăng ký ngay" />
                </Rigister>
            </div> */}
            <Footer />
        </div>
    );
}

export default News;
