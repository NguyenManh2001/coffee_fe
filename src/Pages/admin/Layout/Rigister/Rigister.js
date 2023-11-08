import classNames from 'classnames/bind';
import styles from './Rigister.module.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import config from '~/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import Autocomplete from 'react-autocomplete';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, InputNumber, message, Select } from 'antd';

const schema = yup
    .object()
    .shape({
        // name: yup.string().required('Cannot be empty').max(255, 'Maximum length: 255 characters'),
        // // gender: yup.string().required('Cannot be empty').max(255, 'Maximum length: 255 characters'),
        // address: yup.string().required('Cannot be empty').max(255, 'Maximum length: 255 characters'),
        // email: yup.string().required('Cannot be empty').max(255, 'Maximum length: 255 characters'),
        // number: yup.string().required('Cannot be empty').max(255, 'Maximum length: 255 characters'),
    })
    .required();

const cx = classNames.bind(styles);

function Rigister() {
    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('Nam');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data) => {
        // e.preventDefault();
        console.log(data);
        const res = await axios
            .post('https://coffee-bills.onrender.com/account/register', {
                ...data,
                role: 0,
            })
            .then((res) => {
                navigate(config.routers.Login, { state: { successMessage: 'Bạn đã đăng ký thành công!!!' } });
            })
            .catch((err) => {
                console.log('loi');
            });
    };
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const response = await axios
    //         .post('/register', { email, password })
    //         .then((response) => {
    //             const token = response.data.token;
    //             Cookies.set('token', token, { expires: 7 });
    //             if (token) {
    //                 navigate(config.routers.Login);
    //             } else {
    //                 console.log('ban chua dang ki');
    //             }
    //         })
    //         .catch((err) => {
    //             console.log('ban chua dang nhap');
    //         });
    // };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('headericon')}>
                        <div className={cx('iconClose')}>
                            <Link to={config.routers.Home}>
                                <AiOutlineClose />
                            </Link>
                        </div>
                    </div>
                    <div className={cx('header')}>Register</div>
                    <div className={cx('Form1')}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={cx('formItem')}>
                                <div className={cx('Name')}>Email:</div>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <div style={{ width: '100%' }}>
                                            <Input
                                                style={{ height: '40px' }}
                                                {...field}
                                                status={errors.email?.message ? 'error' : null}
                                                placeholder="Nhập Email"
                                            />
                                            <p style={{ margin: '0px', color: 'red' }}>{errors.email?.message}</p>
                                        </div>
                                    )}
                                />
                            </div>
                            <div className={cx('formItem')}>
                                <div className={cx('Name')}>Mật khẩu:</div>
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => (
                                        <div style={{ width: '100%' }}>
                                            <Input.Password
                                                style={{ height: '40px' }}
                                                {...field}
                                                placeholder="Nhập password"
                                                status={errors.password?.message ? 'error' : null}
                                                iconRender={(visible) =>
                                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                                }
                                            />
                                            <p style={{ margin: '0px', color: 'red' }}>{errors.password?.message}</p>
                                        </div>
                                    )}
                                />
                            </div>
                            <div className={cx('submit')}>
                                <div className={cx('btn')}>
                                    <button type="submit" className={cx('btnLogin')}>
                                        Đăng ký
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className={cx('register')}>
                            <span>Bạn đã có tài khoản? </span>
                            <a className={cx('linkRegister')} href={config.routers.Login}>
                                Đăng nhập
                            </a>
                        </div>
                    </div>
                    {/* <div className={cx('header')}>Thông tin cá nhân</div>
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
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Rigister;
