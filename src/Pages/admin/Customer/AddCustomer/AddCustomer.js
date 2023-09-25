import classNames from 'classnames/bind';
import styles from './AddCustomer.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config/config';
// import Select from 'react-select';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import Autocomplete from 'react-autocomplete';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { Button, Input, InputNumber, message, Select } from 'antd';

const schema = yup
    .object()
    .shape({
        name: yup.string().required('Cannot be empty').max(255, 'Maximum length: 255 characters'),
        // gender: yup.string().required('Cannot be empty').max(255, 'Maximum length: 255 characters'),
        address: yup.string().required('Cannot be empty').max(255, 'Maximum length: 255 characters'),
        // email: yup.string().required('Cannot be empty').max(255, 'Maximum length: 255 characters'),
        number: yup.string().required('Cannot be empty').max(255, 'Maximum length: 255 characters'),
    })
    .required();
const cx = classNames.bind(styles);
function AddCustomer() {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const token = Cookies.get('token');
    useEffect(() => {
        if (token !== undefined) {
            const deToken = jwt_decode(token);
            setEmail(deToken?.email);
        }
    }, [token]);
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
            .post('/customer/addCustomer', {
                ...data,
                email: email,
            })
            .then((res) => {
                navigate(config.routers.Home, { state: { successMessage: 'Bạn đã thêm thành công!!!' } });
            })
            .catch((err) => {
                console.log('loi');
            });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>Thêm thông tin</div>
                <div className={cx('content')}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={cx('contentItem')}>
                            <div className={cx('name')}>
                                Tên khách hàng:<span className={cx('star')}>*</span>
                            </div>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <div style={{ width: '100%' }}>
                                        <Input
                                            {...field}
                                            status={errors.name?.message ? 'error' : null}
                                            placeholder="Basic usage"
                                        />
                                        <p style={{ margin: '0px', color: 'red' }}>{errors.name?.message}</p>
                                    </div>
                                )}
                            />
                        </div>
                        <div className={cx('contentItem')}>
                            <div className={cx('name')}>
                                Giới tính:<span className={cx('star')}>*</span>
                            </div>
                            <Controller
                                name="gender"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        className={cx('dropdown')}
                                        value={watch('gender')}
                                        allowClear
                                        onChange={(val) => setValue('gender', val)}
                                        options={[
                                            { value: 'Nam', label: 'Nam' },
                                            { value: 'Nữ', label: 'Nữ' },
                                        ]}
                                    />
                                )}
                            />
                        </div>
                        <div className={cx('contentItem')}>
                            <div className={cx('name')}>
                                Địa chỉ:<span className={cx('star')}>*</span>
                            </div>
                            <Controller
                                name="address"
                                control={control}
                                render={({ field }) => (
                                    <div style={{ width: '100%' }}>
                                        <Input
                                            {...field}
                                            status={errors.address?.message ? 'error' : null}
                                            placeholder="Basic usage"
                                        />
                                        <p style={{ margin: '0px', color: 'red' }}>{errors.address?.message}</p>
                                    </div>
                                )}
                            />
                        </div>
                        {/* <div className={cx('contentItem')}>
                            <div className={cx('name')}>
                                Email:<span className={cx('star')}>*</span>
                            </div>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <div style={{ width: '100%' }}>
                                        <Input
                                            {...field}
                                            status={errors.email?.message ? 'error' : null}
                                            placeholder="Basic usage"
                                        />
                                        <p style={{ margin: '0px', color: 'red' }}>{errors.email?.message}</p>
                                    </div>
                                )}
                            />
                        </div> */}
                        <div className={cx('contentItem')}>
                            <div className={cx('name')}>
                                Số điện thoại:<span className={cx('star')}>*</span>
                            </div>
                            <Controller
                                name="number"
                                control={control}
                                render={({ field }) => (
                                    <div style={{ width: '100%' }}>
                                        <Input
                                            {...field}
                                            status={errors.number?.message ? 'error' : null}
                                            placeholder="Basic usage"
                                        />
                                        <p style={{ margin: '0px', color: 'red' }}>{errors.number?.message}</p>
                                    </div>
                                )}
                            />
                        </div>
                        <div className={cx('footer')}>
                            <div className={cx('btnPrev')}>
                                <button to="#" type="submit" className={cx('bt')}>
                                    Lưu lại
                                </button>
                            </div>
                            {/* <div className={cx('btnPrev')}>
                                <Link to={config.routers.Home} className={cx('bt')}>
                                    Quay lại
                                </Link>
                            </div> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddCustomer;
