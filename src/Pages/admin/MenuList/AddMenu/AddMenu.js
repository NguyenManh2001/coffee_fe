import classNames from 'classnames/bind';
import styles from './AddMenu.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config/config';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Navigate ,useNavigate} from 'react-router-dom';
const cx = classNames.bind(styles);
function AddMenu() {
  const [name,setName] = useState('');
  const [link,setLink] = useState('');
  const [price,setPrice]= useState('');
  const [selected,setSelected] = useState('');
  const [error,setError] = useState('');
  const [error1,setError1] = useState('');
  const [error2,setError2] = useState('');
  const [error3,setError3] = useState('');
    const [error4,setError4] = useState('');
    const navigate = useNavigate();
  const handleImageChange = (e) => {
      setLink( e.target.files[0]);
  }
  console.log(link);
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("link",link);
    uploadData.append("selected",selected);
    uploadData.append("name",name);
    uploadData.append("price",price);
    if (!name && !link && !price && !selected) {
        setError("Vui lòng nhập đầy đủ thông tin");
    } else {
        if (!name) {
            setError1("Vui lòng nhập thông tin");
            setError('');
        }
        if (!link) {
            setError2("Vui lòng nhập thông tin");
            setError('');
        }
        if (!price) {
            setError3("Vui lòng nhập thông tin");
            setError('');
        }
        if (!selected) {
            setError4("Vui lòng nhập thông tin");
            setError('');
        }
    }
    if(name && link && price && selected){
    const res = await axios.post('/menuList/addMenu',uploadData)
    .then(res => {   
        navigate(config.routers.MenuAdmin);
    })
    .catch(err => {
       console.log('loi');
    })
}else {
    if (name) {
        setError1('');
        setError('');
    }
    if (link) {
        setError2('');
        setError('');
    }
    if (price) {
        setError3('');
        setError('');
    }
    if (selected) {
        setError4('');
        setError('');
    }
}
   }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>Thêm thông tin</div>
                <div className={cx('content')}>
                <div className={cx('contentItem')}>
                    <div className={cx('name')}>
                        Loại sản phẩm:<span className={cx('star')}>*</span>
                        </div>
                        <div className={cx('input')}>
                        <select className={cx('dropdown')} id="cars" value={selected} onChange={handleSelect}>
                            <option></option>
                            <option value='Coffee'>Coffee</option>
                            <option value='Freeze'>Freeze</option>
                            <option value='Tea'>Tea</option>
                        </select>
                        </div>
                    </div>
                    <div className={cx('title')}>{error === '' ? error4:error}</div>
                    <div className={cx('contentItem')}>
                    <div className={cx('name')}>
                        Tên sản phẩm:<span className={cx('star')}>*</span>
                        </div>
                        <div className={cx('input')}>
                            <input type='text' onChange={(e) => setName(e.target.value)} className={cx('inputitem')}  />
                        </div>
                    </div>
                    <div className={cx('title')}>{error === '' ? error1:error}</div>
                    <div className={cx('contentItem')}>
                    <div className={cx('name')}>
                        Link ảnh:<span className={cx('star')}>*</span>
                        </div>
                        <div className={cx('inputLink')}>
                            <input type='file' onChange={handleImageChange} className={cx('inputitem')}  />
                        </div>
                    </div>
                    <div className={cx('title')}>{error === '' ? error2:error}</div>
                    <div className={cx('contentItem')}>
                    <div className={cx('name')}>
                        Price:<span className={cx('star')}>*</span>
                        </div>
                        <div className={cx('input')}>
                            <input type='text' onChange={(e) => setPrice(e.target.value)} className={cx('inputitem')}  />
                        </div>
                    </div>
                    <div className={cx('title')}>{error === '' ? error3:error}</div>
                </div>
                <div className={cx('footer')}>
                <div className={cx('btnPrev')}>
                    <Link to ='#' onClick={handleSubmit} className={cx('bt')}>Lưu lại</Link>
                    </div>
                    <div className={cx('btnPrev')}>
                      <Link to ={config.routers.MenuAdmin} className={cx('bt')}>Quay lại</Link>
                </div>
                </div>
            </div>
        </div>
    );
}

export default AddMenu;
