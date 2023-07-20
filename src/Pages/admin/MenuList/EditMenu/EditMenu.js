import classNames from 'classnames/bind';
import styles from './EditMenu.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config/config';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
const cx = classNames.bind(styles);
function EditMenu() {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [price, setPrice] = useState('');
    const [selected, setSelected] = useState('');
    console.log(name);
       console.log(price);
       console.log(link);
    const navigate = useNavigate();
    const { id1, id2 } = useParams();
    console.log(id1);
       console.log(id2);
    useEffect(() => {
        axios.post(`/menuList/editMenu/${id2}/${id1}`)
            .then(res => {
                // console.log(res.data.menus.map((menu) => menu.name));
                // console.log(res.data.name);
                setName(res.data.menus.map((menu) => menu.name));
                setLink(res.data.menus.map((menu) => menu.link));
                setPrice(res.data.menus.map((menu) => menu.price));
                setSelected(res.data.name)
                // navigate(config.routers.MenuAdmin);
            })
            .catch(err => {
                console.log('loi dl');
            })
    },[]);
    const handleImageChange = (e) => {
        const files = e.target.files[0];
        // const images = URL.createObjectURL(files);
        setLink(files);
    }

    const handleSelect = (e) => {
        setSelected(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const uploadData = new FormData();
        uploadData.append("link",link);
        uploadData.append("name",name);
        uploadData.append("price",price);
        try {
            await axios.put(`/menuList/EditMenu/${id2}/${id1}`, uploadData);
            // console.log('Cap nhat thanh cong');
        
            navigate(config.routers.MenuAdmin);
          } catch (err) {
            console.log('loi', err);
          }
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>Cập nhật thông tin</div>
                <div  className={cx('content')}>
                    <div  className={cx('contentItem')}>
                        <div className={cx('name')}>
                            Loại sản phẩm:<span className={cx('star')}>*</span>
                        </div>
                        <div className={cx('input')}>
                            <select className={cx('dropdown')}  disabled id="cars" value={selected} onChange={handleSelect}>
                                <option></option>
                                <option value='Coffee'>Coffee</option>
                                <option value='Freeze'>Freeze</option>
                                <option value='Tea'>Tea</option>
                            </select>
                        </div>
                    </div>
                    <div className={cx('contentItem')}>
                        <div className={cx('name')}>
                            Tên sản phẩm:<span className={cx('star')}>*</span>
                        </div>
                        <div className={cx('input')}>
                            <input type='text' value={name} onChange={(e) => setName(e.target.value)} className={cx('inputitem')} />
                        </div>
                    </div>
                    <div className={cx('contentItem')}>
                        <div className={cx('name')}>
                            Link ảnh:<span className={cx('star')}>*</span>
                        </div>
                        <div className={cx('inputLink')}>
                            <input type='file' defaultValue={link}  onChange={handleImageChange} className={cx('inputitem')} />
                        </div>
                    </div>
                    <div className={cx('contentItem')}>
                        <div className={cx('name')}>
                            Price:<span className={cx('star')}>*</span>
                        </div>
                        <div className={cx('input')}>
                            <input type='text' value={price} onChange={(e) => setPrice(e.target.value)} className={cx('inputitem')} />
                        </div>
                    </div>
                </div>
                <div className={cx('footer')}>
                    <div className={cx('btnPrev')}>
                        <Link to='#' onClick={handleSubmit} className={cx('bt')}>Lưu lại</Link>
                    </div>
                    <div className={cx('btnPrev')}>
                        <Link to={config.routers.MenuAdmin} className={cx('bt')}>Quay lại</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditMenu;
