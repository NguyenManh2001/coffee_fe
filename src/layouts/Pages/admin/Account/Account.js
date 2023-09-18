import classNames from 'classnames/bind';
import styles from './Account.module.scss';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { AddIcons } from '~/Components/icons/icons';
import {BiEditAlt} from 'react-icons/bi';
import {RiDeleteBin6Line} from 'react-icons/ri';
import config from '~/config/config';
const cx = classNames.bind(styles);

function Account() {
    return (
        <div className={cx('Wrapper')}>
            <div className={cx('Container')}>
                <div className={cx('header')}>
                    <div className={cx('NameHeader')}>danh sách tài khoản</div>
                    <div className={cx('btnHeader')}>
                        <Link to={config.routers.AddAccount} className={cx('btnIconAdd')}>
                            <AddIcons className={cx('IconAdd')} />
                            Thêm mới
                        </Link>
                    </div>
                </div>
                <div className={cx('headerContent')}>
                    <div className={cx('leftContent')}>
                        <div className={cx('name')}>Hiển thị</div>
                        <select className={cx('dropdown')} id="cars">
                            <option>10</option>
                            <option>25</option>
                            <option>40</option>
                            <option>50</option>
                        </select>
                        <div className={cx('name')}>bản ghi trên trang</div>
                    </div>
                    <div className={cx('rightContent')}>
                        <h5 className={cx('searchname')}>Tìm kiếm</h5>
                        <div className={cx('search')}>
                            <input placeholder="Tìm kiếm" className={cx('inputSearch')} />
                        </div>
                    </div>
                </div>
                <div className={cx('content')}>
                    <Table striped bordered  size="sm">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Email</th>
                                <th>Trạng thái</th>
                                <th>Quyền</th>
                                <th colSpan={2}>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>
                                    <Link className={cx('icon')} to={config.routers.EditAccount}><BiEditAlt /></Link>
                                    <Link className={cx('icon')} to='#'><RiDeleteBin6Line /></Link>
                                    </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>
                                    <Link className={cx('icon')} to={config.routers.EditAccount}><BiEditAlt /></Link>
                                    <Link className={cx('icon')} to='#'><RiDeleteBin6Line /></Link>
                                    </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>
                                    <Link className={cx('icon')} to={config.routers.EditAccount}><BiEditAlt /></Link>
                                    <Link className={cx('icon')} to='#'><RiDeleteBin6Line /></Link>
                                    </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className={cx('footer')}>
                    <h5 className={cx('titlefooter')}>Hiển thị từ 1 đến 8 của tổng số 8 bản ghi</h5>
                    <div className={cx('btnFooter')}>
                        <Link className={cx('link')} to ='#'>Trước</Link>
                        <div className={cx('number')}>1</div>                       
                         <Link className={cx('link')} to ='#'>Tiếp</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
