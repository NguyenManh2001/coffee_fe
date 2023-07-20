import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {AiOutlineClose} from 'react-icons/ai';
import config from '~/config';
import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { useDispatch } from 'react-redux';
// import filterSlice from '~/Redux/filters/filters';
// import { loginSelector } from '~/Redux/selector';
// import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);

function Login() {

    const [username,setUserName] = useState('');
    const [password,setPassWord] = useState('');
    const [ischeck,setIscheck] = useState(false);
    const [error,setError] = useState('');
    const [error1,setError1] = useState('');
//     const dispatch = useDispatch()
//     const navigate = useNavigate();
//   const isAuthenticated = useSelector(loginSelector);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if(!password){
            setError1("Vui lòng nhập đầy đủ thông tin");
        }

        if(!username.endsWith("@gmail.com")){
              setError("Vui lòng nhập đầy đủ thông tin");
        }

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
    }
//       useEffect(() => {
//         const token = Cookies.get('token');
//         if (token) {
//           navigate(config.routers.ListCar);
//         }
//       }, [navigate]);
    
      
      const handleEmail =  (e) => {
        e.preventDefault();
        const value = e.target.value;
        if (value !== "") {
            setUserName(value);
            setError('');
        }else {
            setUserName('');
            setError("Vui lòng nhập thông tin");
          }
       if(!username.startsWith('')){
        // if (username.trim() !== '') {
    //     setTimeout(() => {
    //      setUserName(prevEmail => prevEmail.endsWith('@gmail.com') ? prevEmail : `${prevEmail}@gmail.com`);
    //    }, 20000);
    //    }
    }
      };
      const handlePassword =  (e) => {
        e.preventDefault();
        const value = e.target.value;
        if (value !== "") {
            setPassWord(value);
            setError1('');
        }else {
            setPassWord('');
            setTimeout(() => {
                setError1("Vui lòng nhập thông tin");
            },1000);
          }
       if(!username.startsWith('')){
        // if (username.trim() !== '') {
    //     setTimeout(() => {
    //      setUserName(prevEmail => prevEmail.endsWith('@gmail.com') ? prevEmail : `${prevEmail}@gmail.com`);
    //    }, 20000);
    //    }
    }
      };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('Iconheader')}>
                        <Link to ={config.routers.Home}><AiOutlineClose /></Link>
                    </div>
                    <div className={cx('header')}>Login</div>
                    <div className={cx('Form')}>
                        <form>
                        <div className={cx('form')}>
                            <div className={cx('formItem')}>
                                <div className={cx('Name')}>Email:</div>
                                <input type="email" placeholder= "Email" className={error == '' ? cx('input'):cx('inputt')} value={username} onChange={handleEmail}  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required title="Please enter a valid email address" />
                            </div>
                            <h5 className={cx('error')}>{error}</h5>
                            </div>
                            <div className={cx('form')}>
                            <div className={cx('formItem')}>
                                <div className={cx('Name')}>Password:</div>
                                <input type="text" placeholder= "Password" className={error1 == '' ? cx('input1'):cx('inputt1')} value={password} onChange={handlePassword}  />
                            </div>
                            <h5 className={cx('error')}>{error1}</h5>
                            </div>
                            <div className={cx('submit')}>
                                <div className={cx('btn')}>
                                    <button onClick={handleSubmit} className={cx('btnLogin')}>Login</button>
                                </div>
                            </div>
                            <div className={cx('register')}>
                                <span>Bạn chưa có tài khoản?  </span>
                                <a className={cx('linkRegister')} href={config.routers.Rigister}>Đăng ký ngay</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
