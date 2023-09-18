import classNames from 'classnames/bind';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import config from '~/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from './Rigister.module.scss';

const cx = classNames.bind(styles);

function Rigister() {
    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('Nam');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const navigate = useNavigate();
    console.log(gender);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios
            .post('/register', { email, password })
            .then((response) => {
                const token = response.data.token;
                Cookies.set('token', token, { expires: 7 });
                if (token) {
                    navigate(config.routers.Login);
                } else {
                    console.log('ban chua dang ki');
                }
            })
            .catch((err) => {
                console.log('ban chua dang nhap');
            });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('headericon')}>
                        <div className={cx('iconClose')}>
                            <AiOutlineClose />
                        </div>
                    </div>
                    <div className={cx('header')}>Đăng ký tài khoản</div>
                    <div className={cx('Form1')}>
                        <form>
                            <div className={cx('formItem')}>
                                <div className={cx('Name')}>Email:</div>
                                <input
                                    className={cx('input')}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                />
                            </div>
                            <div className={cx('formItem')}>
                                <div className={cx('Name')}>Mật khẩu:</div>
                                <input
                                    type="text"
                                    value={password}
                                    onChange={(e) => setPassWord(e.target.value)}
                                    className={cx('input')}
                                />
                            </div>
                        </form>
                    </div>
                    <div className={cx('header')}>Thông tin cá nhân</div>
                    <div className={cx('Form')}>
                        <form>
                            <div className={cx('formItem')}>
                                <div className={cx('Name')}>Họ và Tên:</div>
                                <input
                                    className={cx('input')}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="name"
                                />
                            </div>
                            <div className={cx('formItem')}>
                                <div className={cx('Name')}>Giới tính:</div>
                                <select
                                    className={cx('input')}
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                </select>
                            </div>
                            <div className={cx('formItem')}>
                                <div className={cx('Name')}>Địa chỉ:</div>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className={cx('input')}
                                />
                            </div>
                            <div className={cx('formItem')}>
                                <div className={cx('Name')}>Số điện thoại:</div>
                                <input
                                    type="text"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                    className={cx('input')}
                                />
                            </div>
                        </form>
                    </div>
                    <div className={cx('submit')}>
                        <div className={cx('btn')}>
                            <button className={cx('btnLogin')}>Xác nhận</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Rigister;
