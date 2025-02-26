import classNames from 'classnames/bind';
import styles from './AddTopping.module.scss';
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
import { Input, InputNumber, message, Select } from 'antd';
const { TextArea } = Input;
const schema = yup
    .object()
    .shape({
        name: yup.string().required('Không được để trống').max(255, 'Maximum length: 255 characters'),
        type: yup.string().required('Không được để trống'),
        price: yup.number().required('Không được để trống').moreThan(0, 'Giá trị phải lớn hơn 0'),
    })
    .required();
const cx = classNames.bind(styles);
function AddTopping() {
    const [file, setFile] = useState();
    const navigate = useNavigate();
    const [imgPreview, setImgPreview] = useState();
    const [messageApi, contextHolder] = message.useMessage();
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
    // const { getRootProps, getInputProps, isDragActive } = useDropzone({
    //     accept: {
    //         'image/jpeg': [],
    //         'image/png': [],
    //         'image/gif': [],
    //     },
    //     onDrop: (acceptedFiles) => {
    //         setFile(acceptedFiles[0]);
    //         URL.revokeObjectURL(imgPreview);
    //         setImgPreview(URL.createObjectURL(acceptedFiles[0]));
    //     },
    // });

    const onSubmit = async (data) => {
        // e.preventDefault();
        console.log(data);
        // const uploadData = new FormData();
        // uploadData.append('image', file, file.name);
        // uploadData.append('title', data.title);
        // uploadData.append('describe', data.describe);
        // uploadData.append('name', data.name);
        const res = await axios
            .post('https://coffee-bills.onrender.com/topping/AddTopping', data)
            .then((res) => {
                navigate(config.routers.ToppingAdmin, { state: { successMessage: 'Bạn đã thêm thành công!!!' } });
            })
            .catch((err) => {
                console.log('loi');
            });
    };
    return (
        <div className={cx('wrapper')}>
            {contextHolder}
            <div className={cx('container')}>
                <div className={cx('header')}>Thêm thông tin</div>
                <div className={cx('content')}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={cx('contentItem')}>
                            <div className={cx('name')}>
                                Loại sản phẩm:<span className={cx('star')}>*</span>
                            </div>
                            <Controller
                                name="type"
                                control={control}
                                render={({ field }) => (
                                    <div style={{ width: '100%' }}>
                                        <Select
                                            className={cx('dropdown')}
                                            value={watch('type')}
                                            allowClear
                                            placeholder="Chọn loại sản phẩm"
                                            onChange={(val) => setValue('type', val)}
                                            status={errors.type?.message ? 'error' : null}
                                            options={[
                                                { value: 'Coffee', label: 'Coffee' },
                                                { value: 'Freeze', label: 'Freeze' },
                                                { value: 'Tea', label: 'Tea' },
                                            ]}
                                        />
                                        <p style={{ margin: '0px', color: 'red' }}>{errors.type?.message}</p>
                                    </div>
                                )}
                            />
                        </div>
                        <div className={cx('contentItem')}>
                            <div className={cx('name')}>
                                Tên Topping:<span className={cx('star')}>*</span>
                            </div>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <div style={{ width: '100%' }}>
                                        <Input
                                            {...field}
                                            status={errors.name?.message ? 'error' : null}
                                            placeholder="Nhập tên"
                                        />
                                        <p style={{ margin: '0px', color: 'red' }}>{errors.name?.message}</p>
                                    </div>
                                )}
                            />
                        </div>
                        <div className={cx('contentItem')}>
                            <div className={cx('name')}>
                                Giá tiền:<span className={cx('star')}>*</span>
                            </div>
                            <Controller
                                name="price"
                                control={control}
                                render={({ field }) => (
                                    <div style={{ width: '100%' }}>
                                        <Input
                                            {...field}
                                            status={errors.price?.message ? 'error' : null}
                                            placeholder="Nhập tiêu đề"
                                        />
                                        <p style={{ margin: '0px', color: 'red' }}>{errors.price?.message}</p>
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
                            <div className={cx('btnPrev')}>
                                <Link to={config.routers.ToppingAdmin} className={cx('bt')}>
                                    Quay lại
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddTopping;
