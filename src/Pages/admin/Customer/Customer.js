import classNames from 'classnames/bind';
import styles from './Customer.module.scss';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { AddIcons } from '~/Components/icons/icons';
import {BiEditAlt} from 'react-icons/bi';
import {RiDeleteBin6Line} from 'react-icons/ri';
import config from '~/config/config';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import listsMenuSlice from '~/Redux/list/list';
import { searchCustomerSelector } from '~/Redux/selector';
import filterSlice from '~/Redux/filters/filters';
const cx = classNames.bind(styles);

function Customer() {
    const [select,setSelect] = useState("10");
    // const [id,setId] = useState("");
    // const [name,setName] = useState("");
    // const [name,setName] = useState("");
    // const [name,setName] = useState("");
   const datas = useSelector(searchCustomerSelector);
   const dispatch = useDispatch();
    useEffect(() => {
        axios.post('/customer/listCustomer',{select})
        .then(res => {
            dispatch(listsMenuSlice.actions.addListCustomer(res.data.docs));
           })
           .catch((err) => {
            console.log(err);
        })
    },[select])

    const handleSearch = (e) =>{
        const result = e.target.value;
        dispatch(filterSlice.actions.searchListMenu(result));
    }
    const handleSelected = (e) => {
        const result = e.target.value;
        setSelect(result);
    }
    const handldeDelete = (id) => {
        axios.delete(`/customer/deleteCustomer/${id}`)
        .then(res => {
            axios.post('/customer/listCustomer',{select})
        .then(res => {
            dispatch(listsMenuSlice.actions.addListCustomer(res.data.docs));
           })
           .catch((err) => {
            console.log(err);
        })
        })
        .catch((err) => {
            console.log(err);
        });
    }
    return (
        <div className={cx('Wrapper')}>
            <div className={cx('Container')}>
                <div className={cx('header')}>
                    <div className={cx('NameHeader')}>danh sách khách hàng</div>
                    <div className={cx('btnHeader')}>
                        <Link to={config.routers.AddCustomer} className={cx('btnIconAdd')}>
                            <AddIcons className={cx('IconAdd')} />
                            Thêm mới
                        </Link>
                    </div>
                </div>
                <div className={cx('headerContent')}>
                    <div className={cx('leftContent')}>
                        <div className={cx('name')}>Hiển thị</div>
                        <select className={cx('dropdown')} onChange={handleSelected} value = {select} id="cars">
                            <option value = "10">10</option>
                            <option value = "25">25</option>
                            <option value = "40">40</option>
                            <option value = "100">50</option>
                        </select>
                        <div className={cx('name')}>bản ghi trên trang</div>
                    </div>
                    <div className={cx('rightContent')}>
                        <h5 className={cx('searchname')}>Tìm kiếm</h5>
                        <div className={cx('search')}>
                            <input placeholder="Tìm kiếm" onChange={handleSearch} className={cx('inputSearch')} />
                        </div>
                    </div>
                </div>
                <div className={cx('content')}>
                    <Table striped bordered  size="sm">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên khách hàng</th>
                                <th>Giới tính</th>
                                <th>Địa chỉ</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
                                <th>Thời gian mua</th>
                                <th colSpan={2}>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.map((data,index) => (
                            <tr key={data._id}>
                                <td>{index + 1}</td>
                                <td>{data.name}</td>
                                <td>{data.gender}</td>
                                <td>{data.address}</td>
                                <td>{data.email}</td>
                                <td>{data.number}</td>
                                <td>{data.createdAt}</td>
                                <td>
                                    <Link className={cx('icon')} to={config.routers.EditCustomer}><BiEditAlt /></Link>
                                    <Link className={cx('icon')} onClick={() => handldeDelete(data._id)} to='#'><RiDeleteBin6Line /></Link>
                                    </td>
                            </tr>
                          ))}
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

export default Customer;
