import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
// import Header from '~/Page/Admin/Layout/Header/Header';
import { useState } from 'react';
import Header from '~/Pages/admin/Layout/Header/Header';
import { Sibar } from '~/Pages/admin/Layout';
// import Sibar from '../components/Sibar';
// import Header from '../components/Header';
const cx = classNames.bind(styles);

function AdminLayout({ children }) {
    // const [fullScreen,setFullScreen] = useState(true);
    // const handlefullscreen = () => {
    //     setFullScreen(!fullScreen);
    // }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Header />
            </div>
            <div className={cx('container')}>
            <div className={cx('containerLeft')}>
                <Sibar />
            </div>
            <div className={cx('containerRight')}>{children}</div>
        </div>
        </div>
    );
}

export default AdminLayout;