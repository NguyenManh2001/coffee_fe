import classNames from 'classnames/bind';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Rigister, { RigisterItem } from '../components/Rigister';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
                {/* <div className={cx('rigister')}>
                <Rigister>
                <RigisterItem header='Đăng ký nhận thông tin khuyến mãi' btn = 'Đăng ký ngay' />
                </Rigister>
                </div> */}
                <Footer />
            </div>
        </div>
    );
}

export default DefaultLayout;
