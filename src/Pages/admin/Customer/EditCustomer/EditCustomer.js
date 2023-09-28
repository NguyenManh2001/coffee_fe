import classNames from 'classnames/bind';
import styles from './EditCustomer.module.scss';
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
import { Button, Input, InputNumber, message, Select } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const schema = yup
    .object()
    .shape({
        name: yup.string().required('Cannot be empty').max(255, 'Maximum length: 255 characters'),
        // gender: yup.string().required('Cannot be empty').max(255, 'Maximum length: 255 characters'),
        address: yup.string().required('Cannot be empty').max(255, 'Maximum length: 255 characters'),
        email: yup.string().required('Cannot be empty').max(255, 'Maximum length: 255 characters'),
        number: yup
            .string()
            .matches(/^\d{10}$/gm, 'Số điện thoại không hợp lệ') // Đây là một ví dụ đơn giản, bạn có thể định nghĩa quy tắc xác thực phức tạp hơn
            .required('Vui lòng nhập số điện thoại'),
    })
    .required();
const cx = classNames.bind(styles);
function EditCustomer(props) {
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
    const { data } = props;
    const initialValues = {
        ...data.docs[0],
    };
    console.log(initialValues);
    const methodForm = useForm({
        mode: 'onChange',
        defaultValues: initialValues,
        shouldUnregister: false,
        resolver: yupResolver(schema),
    });
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        formState: { errors },
    } = methodForm;

    const onSubmit = async (data) => {
        // e.preventDefault();
        console.log(data);
        const res = await axios
            .put(`https://coffee-bills.onrender.com/customer/updateCustomer/${data._id}`, data)
            .then((res) => {
                navigate(config.routers.Home, { state: { successMessage: 'Bạn đã cập nhật thành công!!!' } });
            })
            .catch((err) => {
                console.log('loi');
            });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {edit ? (
                    <div className={cx('header')}>Cập nhật thông tin</div>
                ) : (
                    <div className={cx('header')}>
                        <div className={cx('header1')}>
                            <div>Thông tin cá nhân</div>
                            <div className={cx('iconEdit')} onClick={() => setEdit(!edit)}>
                                <EditOutlined />
                            </div>
                        </div>
                    </div>
                )}
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
                                            disabled={!edit}
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
                                        disabled={!edit}
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
                                            disabled={!edit}
                                        />
                                        <p style={{ margin: '0px', color: 'red' }}>{errors.address?.message}</p>
                                    </div>
                                )}
                            />
                        </div>
                        <div className={cx('contentItem')}>
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
                                            disabled="false"
                                        />
                                        <p style={{ margin: '0px', color: 'red' }}>{errors.email?.message}</p>
                                    </div>
                                )}
                            />
                        </div>
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
                                            disabled={!edit}
                                        />
                                        <p style={{ margin: '0px', color: 'red' }}>{errors.number?.message}</p>
                                    </div>
                                )}
                            />
                        </div>
                        {edit && (
                            <div className={cx('footer')}>
                                <div className={cx('btnPrev')}>
                                    <button to="#" type="submit" className={cx('bt')}>
                                        Lưu lại
                                    </button>
                                </div>
                                <div className={cx('btnPrev')}>
                                    <Link to="#" onClick={() => setEdit(false)} className={cx('bt')}>
                                        Quay lại
                                    </Link>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditCustomer;
