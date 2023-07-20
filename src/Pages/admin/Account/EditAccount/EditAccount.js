import classNames from 'classnames/bind';
import styles from './EditAccount.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config/config';
const cx = classNames.bind(styles);
function EditAccount() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>Cập nhập thông tin</div>
                <div className={cx('content')}>
                    <div className={cx('contentItem')}>
                    <div className={cx('name')}>
                        Email:<span className={cx('star')}>*</span>
                        </div>
                        <div className={cx('input')}>
                            <input type='text' className={cx('inputitem')}  />
                        </div>
                    </div>
                    <div className={cx('title')}>Vui lòng nhập đầy đủ thông tin</div>
                    <div className={cx('contentItem')}>
                    <div className={cx('name')}>
                        Mật khẩu:<span className={cx('star')}>*</span>
                        </div>
                        <div className={cx('input')}>
                            <input type='password' className={cx('inputitem')}  />
                        </div>
                    </div>
                    <div className={cx('title')}>Vui lòng nhập đầy đủ thông tin</div>
                    <div className={cx('contentItem')}>
                    <div className={cx('name')}>
                        Quyền truy cập:
                        </div>
                        <div className={cx('input')}>
                            <input className={cx('inputitem')}  />
                        </div>
                    </div>
                    <div className={cx('contentItem')}>
                    <div className={cx('name')}>
                       Kích hoạt:
                        </div>
                        <div className={cx('input1')}>
                            <input type='checkbox' className={cx('inputitem')}  />
                        </div>
                    </div>
                </div>
                <div className={cx('footer')}>
                <div className={cx('btnPrev')}>
                    <Link to ='#' className={cx('bt')}>Lưu lại</Link>
                    </div>
                    <div className={cx('btnPrev')}>
                      <Link to ={config.routers.Account} className={cx('bt')}>Quay lại</Link>
                </div>
                </div>
            </div>
        </div>
    );
}

export default EditAccount;
