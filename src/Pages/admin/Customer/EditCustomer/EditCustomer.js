import classNames from 'classnames/bind';
import styles from './EditCustomer.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config/config';
const cx = classNames.bind(styles);
function EditCustomer() {
    return (
        <div className={cx('wrapper')}>
        <div className={cx('container')}>
            <div className={cx('header')}>Cập nhật thông tin</div>
            <div className={cx('content')}>
                <div className={cx('contentItem')}>
                    <div className={cx('name')}>
                        Tên khách hàng:<span className={cx('star')}>*</span>
                    </div>
                    <div className={cx('input')}>
                        <input type="text" className={cx('inputitem')} />
                    </div>
                </div>
                <div className={cx('title')}>Vui lòng nhập đầy đủ thông tin</div>
                <div className={cx('contentItem')}>
                    <div className={cx('name')}>
                        Giới tính:<span className={cx('star')}>*</span>
                    </div>
                    <div className={cx('input')}>
                        <select className={cx('dropdown')} id="cars">
                            <option>Nam</option>
                            <option>Nữ</option>
                        </select>
                    </div>
                </div>
                <div className={cx('title')}>Vui lòng nhập đầy đủ thông tin</div>
                <div className={cx('contentItem')}>
                    <div className={cx('name')}>
                        Địa chỉ:<span className={cx('star')}>*</span>
                    </div>
                    <div className={cx('inputLink')}>
                        <input type="text" className={cx('inputitem')} />
                    </div>
                </div>
                <div className={cx('title')}>Vui lòng nhập đầy đủ thông tin</div>
                <div className={cx('contentItem')}>
                    <div className={cx('name')}>
                        Email:<span className={cx('star')}>*</span>
                    </div>
                    <div className={cx('input')}>
                        <input type="password" className={cx('inputitem')} />
                    </div>
                </div>
                <div className={cx('title')}>Vui lòng nhập đầy đủ thông tin</div>
                <div className={cx('contentItem')}>
                    <div className={cx('name')}>
                        Số điện thoại:<span className={cx('star')}>*</span>
                    </div>
                    <div className={cx('input')}>
                        <input type="password" className={cx('inputitem')} />
                    </div>
                </div>
                <div className={cx('title')}>Vui lòng nhập đầy đủ thông tin</div>
            </div>
            <div className={cx('footer')}>
                <div className={cx('btnPrev')}>
                    <Link to="#" className={cx('bt')}>
                        Lưu lại
                    </Link>
                </div>
                <div className={cx('btnPrev')}>
                    <Link to={config.routers.Customer} className={cx('bt')}>
                        Quay lại
                    </Link>
                </div>
            </div>
        </div>
    </div>
    );
}

export default EditCustomer;
