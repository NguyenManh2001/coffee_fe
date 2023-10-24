import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import config from '~/config';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import filterSlice from '~/Redux/filters/filters';
import { useDropzone } from 'react-dropzone';
import Autocomplete from 'react-autocomplete';
import { yupResolver } from '@hookform/resolvers/yup';
import jwt_decode from 'jwt-decode';
import * as yup from 'yup';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, InputNumber, message, Select } from 'antd';

const schema = yup
    .object()
    .shape({
        email: yup.string().required('Không được để trống').matches(/@/, 'Email phải bao gồm "@"'),
        password: yup.string().required('Không được để trống').max(255, 'Maximum length: 255 characters'),
        // address: yup.string().required('Cannot be empty').max(255, 'Maximum length: 255 characters'),
        // email: yup.string().required('Cannot be empty').max(255, 'Maximum length: 255 characters'),
        // number: yup.string().required('Cannot be empty').max(255, 'Maximum length: 255 characters'),
    })
    .required();

// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { useDispatch } from 'react-redux';
// import filterSlice from '~/Redux/filters/filters';
// import { loginSelector } from '~/Redux/selector';
// import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);

function Login() {
    const [username, setUserName] = useState('');
    const [password, setPassWord] = useState('');
    const [ischeck, setIscheck] = useState(false);
    const [error1, setError1] = useState('');
    const [userRole, setUserRole] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Sai email hoặc mật khẩu',
        });
    };
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
        try {
            console.log(data);
            const res = await axios.post('https://coffee-bills.onrender.com/account/login', data);
            const token = res.data.token;
            const expires = new Date(Date.now() + 3600 * 1000);

            if (token) {
                Cookies.set('token', token, { expires });
                const decodedToken = jwt_decode(token);
                const newUserRole = decodedToken.role;
                dispatch(filterSlice.actions.token(decodedToken));
                const token1 = Cookies.get('token');
                if (newUserRole === 1) {
                    navigate(config.routers.MenuAdmin, {
                        state: { successMessage: 'Bạn đã đăng nhập thành công!!!' },
                    });
                } else if (newUserRole === 0) {
                    navigate(config.routers.Home, {
                        state: { successMessage: 'Bạn đã đăng nhập thành công!!!' },
                    });
                }
            }
        } catch (err) {
            error();
        }
    };

    //     const dispatch = useDispatch()
    //     const navigate = useNavigate();
    //   const isAuthenticated = useSelector(loginSelector);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (!password) {
    //         setError1('Vui lòng nhập đầy đủ thông tin');
    //     }

    //     if (!username.endsWith('@gmail.com')) {
    //         setError('Vui lòng nhập đầy đủ thông tin');
    //     }

    //     const response = await axios.post('/login', { username, password })
    //     .then(response => {
    //         const token = response.data.token;
    //         const expires = new Date(Date.now() + 3600 * 1000);
    //         if(token){
    //             setIscheck(true);
    //             Cookies.set('token',token, { expires});
    //             dispatch(filterSlice.actions.login(Cookies.get('token')));
    //         }
    //         else{
    //             console.log('ban chua dang nhap');
    //         }
    //     })
    //     .catch(err =>{
    //       console.log('ban chua dang nhap');
    //     })
    //   };
    //   if(ischeck){
    //     navigate(config.routers.ListCar);
    //   };
    // };
    //       useEffect(() => {
    //         const token = Cookies.get('token');
    //         if (token) {
    //           navigate(config.routers.ListCar);
    //         }
    //       }, [navigate]);

    // const handleEmail = (e) => {
    //     e.preventDefault();
    //     const value = e.target.value;
    //     if (value !== '') {
    //         setUserName(value);
    //         setError('');
    //     } else {
    //         setUserName('');
    //         setError('Vui lòng nhập thông tin');
    //     }
    //     if (!username.startsWith('')) {
    //         // if (username.trim() !== '') {
    //         //     setTimeout(() => {
    //         //      setUserName(prevEmail => prevEmail.endsWith('@gmail.com') ? prevEmail : `${prevEmail}@gmail.com`);
    //         //    }, 20000);
    //         //    }
    //     }
    // };
    // const handlePassword = (e) => {
    //     e.preventDefault();
    //     const value = e.target.value;
    //     if (value !== '') {
    //         setPassWord(value);
    //         setError1('');
    //     } else {
    //         setPassWord('');
    //         setTimeout(() => {
    //             setError1('Vui lòng nhập thông tin');
    //         }, 1000);
    //     }
    //     if (!username.startsWith('')) {
    //         // if (username.trim() !== '') {
    //         //     setTimeout(() => {
    //         //      setUserName(prevEmail => prevEmail.endsWith('@gmail.com') ? prevEmail : `${prevEmail}@gmail.com`);
    //         //    }, 20000);
    //         //    }
    //     }
    // };
    return (
        <div className={cx('wrapper')}>
            {contextHolder}
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('Iconheader')}>
                        <Link to={config.routers.Home}>
                            <AiOutlineClose />
                        </Link>
                    </div>
                    <div className={cx('header')}>Login</div>
                    <div className={cx('Form')}>
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
                                                placeholder="Basic usage"
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
                                                placeholder="input password"
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
                                        Đăng nhập
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className={cx('register')}>
                            <span>Bạn chưa có tài khoản? </span>
                            <a className={cx('linkRegister')} href={config.routers.Rigister}>
                                Đăng ký ngay
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
