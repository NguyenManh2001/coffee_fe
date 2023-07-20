import classNames from 'classnames/bind';
import styles from './MenuList.module.scss';
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
import filterSlice from '~/Redux/filters/filters';
import { searchitemSelector } from '~/Redux/selector';
const cx = classNames.bind(styles);

function MenuList() {
    const [selected,setSelected] = useState('Coffee');
    // const [datas,setDatas] = useState([]);
    const [show,setShow] = useState(true);
    const [iddelete,setDelete] = useState('');
    const [searchValue,setSearchValue] = useState(" ");
    const dispatch = useDispatch();
    const datas = useSelector(searchitemSelector);
    const handleSelected = (e) => {
        setSelected(e.target.value);
        dispatch(filterSlice.actions.list(e.target.value));
    }
    const handleSearch = (e) =>{
        const result = e.target.value;
        setSearchValue(result);
        dispatch(filterSlice.actions.searchListMenu(result));
    }
    useEffect(() => {
        axios.post('/menuList/ListMenu')
        .then(res => {
            dispatch(listsMenuSlice.actions.addListMenu(res.data));
            dispatch(filterSlice.actions.list(selected));
           })
           .catch((err) => {
            console.log(err);
        })
    },[])
    const handleDelete = (id2,id1) => {
        axios.delete(`/menuList/deleteMenu/${id2}/${id1}`)
       .then(res => {
        axios.post('/menuList/ListMenu')
        .then(res => {
            dispatch(listsMenuSlice.actions.addListMenu(res.data));
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
                    <div className={cx('NameHeader')}>danh sách sản phẩm</div>
                    <div className={cx('btnHeader')}>
                        <Link to={config.routers.AddMenu} className={cx('btnIconAdd')}>
                            <AddIcons className={cx('IconAdd')} />
                            Thêm mới
                        </Link>
                    </div>
                </div>
                <div className={cx('headerContent')}>
                    <div className={cx('leftContent')}>
                        <div className={cx('name')}>Loại sản phẩm:</div>
                        <select className={cx('dropdown')} onChange={handleSelected} value={selected} id="cars">
                            <option value='Coffee'>Coffee</option>
                            <option value='Freeze'>Freeze</option>
                            <option value='Tea'>Tea</option>
                        </select>
                        {/* <div className={cx('name')}>bản ghi trên trang</div> */}
                    </div>
                    <div className={cx('rightContent')}>
                        <h5 className={cx('searchname')}>Tìm kiếm</h5>
                        <div className={cx('search')}>
                            <input placeholder="Tìm kiếm" onChange={handleSearch} className={cx('inputSearch')} />
                        </div>
                    </div>
                </div>
                <div className={cx('content')}>
                <div className={cx('contentItem')}>
                    <Table striped bordered  size="sm">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên sản phẩm</th>
                                <th>Link ảnh</th>
                                <th>Giá</th>
                                <th>Thời gian nhập</th>
                                <th colSpan={2}>Chức năng</th>
                            </tr>
                        </thead>
                                 {datas.map((data) => (
                        <tbody key={data._id}>
                                    {data.menus.map((menu,index) => (
                                <tr key={menu._id} style={{lineHeight: '65px'}}>
                                    <td>{index + 1}</td>
                                    <td>{menu.name}</td>
                                    <td style={{ width: '100px'}}><img style={{ width: '100%', height: '100%' }} src={menu.link} /></td>
                                    <td>{menu.price}</td>
                                    <td>{menu.createdAt}</td>
                                    <td>
                                        <Link className={cx('icon')} to={`/Admin/MenuList/EditMenu/${menu._id}/${data._id}`}><BiEditAlt /></Link>
                                        <Link className={cx('icon')} to='#' onClick={() => handleDelete(menu._id,data._id)}><RiDeleteBin6Line /></Link>
                                        </td>
                                </tr>
                                    ))}
                                     </tbody>
                                ))}
                    </Table>
                </div>
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

export default MenuList;
