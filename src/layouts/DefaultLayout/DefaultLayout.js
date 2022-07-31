import classNames from 'classnames/bind';
// import Header from "../components/Header";
import Sibar from '../components/Sibar';
import Menu from '../components/Menu';
import Header from '../components/Header';
import styles from './DefaultLayout.module.scss';
import FeaturedMenu from '../components/FeaturedMenu';
import About from '../components/About';
import New from '../components/New';
import Footer from '../components/Footer';

const cx = classNames.bind(styles);

function DefaultLayout({children}) {
    return (
        <div className={cx('wrapper')}>
            <Header className={cx('header')} />
            <div className={cx('container')}>
                <Sibar />
                <div className={cx('content')}>
                    <Menu />
                    <FeaturedMenu />
                    <About />
                    <New />
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default DefaultLayout;
