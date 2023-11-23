import classNames from 'classnames/bind';
// import Header from "../components/Header";
import Menu from '../components/Menu';
import Sibar from '../components/Sibar';
import Header from '../components/Header';
import styles from './DefaultLayout.module.scss';
import FeaturedMenu from '../components/FeaturedMenu';
import About from '../components/About';
import New from '../components/New';
import Footer from '../components/Footer';
import { Carousel } from '@trendyol-js/react-carousel';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Alert, Rate, Space, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const { isLoading, data, refetch } = useQuery({
        queryKey: ['data'],
        queryFn: () => axios.post('https://coffee-bills.onrender.com/sibar/listSibar').then((res) => res.data),
    });

    return (
        <div id="top" className={cx('wrapper')}>
            {isLoading ? (
                <div className={cx('loading')}>
                    <LoadingOutlined style={{ color: 'red' }} />
                </div>
            ) : (
                <>
                    <Header className={cx('header')} />
                    <div className={cx('container')}>
                        <Sibar />
                        <div className={cx('content')}>
                            <Menu />
                            {/* <Carousel> */}
                            <FeaturedMenu />
                            {/* </Carousel> */}
                            <About />
                            <New />
                        </div>
                        <Footer />
                    </div>
                </>
            )}
        </div>
    );
}

export default DefaultLayout;
