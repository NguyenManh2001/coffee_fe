import classNames from 'classnames/bind';
import styles from './EditAccount.module.scss';
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
        // name: yup.string().required('Cannot be empty').max(255, 'Maximum length: 255 characters'),
        // // gender: yup.string().required('Cannot be empty').max(255, 'Maximum length: 255 characters'),
        // address: yup.string().required('Cannot be empty').max(255, 'Maximum length: 255 characters'),
        // email: yup.string().required('Cannot be empty').max(255, 'Maximum length: 255 characters'),
        // number: yup.string().required('Cannot be empty').max(255, 'Maximum length: 255 characters'),
    })
    .required();
const cx = classNames.bind(styles);
function EditCustomer(props) {
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
    const { data } = props;
    console.log(data);
    const initialValues = {
        ...data,
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
            .put(`/account/editAccount/${data._id}`, {
                role: data.role,
            })
            .then((res) => {
                navigate(config.routers.Account, { state: { successMessage: 'Bạn đã cập nhật thành công!!!' } });
            })
            .catch((err) => {
                console.log('loi');
            });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>Cập nhật thông tin</div>
                <div className={cx('content')}>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                                Phân quyền:<span className={cx('star')}>*</span>
                            </div>
                            <Controller
                                name="role"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        className={cx('dropdown')}
                                        value={watch('role')}
                                        allowClear
                                        onChange={(val) => setValue('role', val)}
                                        options={[
                                            { value: 0, label: 'Customer' },
                                            { value: 1, label: 'Admin' },
                                        ]}
                                    />
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
                                <Link to="#" onClick={() => setEdit(false)} className={cx('bt')}>
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

export default EditCustomer;
