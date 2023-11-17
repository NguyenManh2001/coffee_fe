import classNames from 'classnames/bind';
import styles from './AddSibar.module.scss';
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
        name: yup.string().required('Cannot be empty'),
        title: yup.string().required('Cannot be empty').max(255, 'Maximum length: 255 characters'),
        btnName: yup.string().required('Cannot be empty').max(255, 'Maximum length: 255 characters'),
    })
    .required();
const cx = classNames.bind(styles);
function AddSibar() {
    const [file, setFile] = useState();
    const navigate = useNavigate();
    const [imgPreview, setImgPreview] = useState();
    const [logo, setLogo] = useState();
    const [imgPreviewLogo, setImgPreviewLogo] = useState();
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
    const { getRootProps: getRootPropsImage, getInputProps: getInputPropsImage } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/gif': [],
        },
        onDrop: (acceptedFiles) => {
            setFile(acceptedFiles[0]);
            URL.revokeObjectURL(imgPreview);
            setImgPreview(URL.createObjectURL(acceptedFiles[0]));
        },
    });
    const { getRootProps: getRootLogoProps, getInputProps: getInputLogoProps } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/gif': [],
        },
        onDrop: (acceptedFiles) => {
            setLogo(acceptedFiles[0]);
            URL.revokeObjectURL(imgPreviewLogo);
            setImgPreviewLogo(URL.createObjectURL(acceptedFiles[0]));
        },
    });

    const onSubmit = async (data) => {
        // e.preventDefault();
        const uploadData = new FormData();
        uploadData.append('srcImage', file, file.name);
        uploadData.append('iconImage', logo, logo.name);
        uploadData.append('title', data.title);
        uploadData.append('btnName', data.btnName);
        uploadData.append('name', data.name);
        console.log(uploadData);
        const res = await axios
            .post('https://coffee-bills.onrender.com/sibar/AddSibar', uploadData)
            .then((res) => {
                navigate(config.routers.SibarAdmin, { state: { successMessage: 'Bạn đã thêm thành công!!!' } });
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
                                Tên quán:<span className={cx('star')}>*</span>
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
                                Tiêu đề:<span className={cx('star')}>*</span>
                            </div>
                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) => (
                                    <div style={{ width: '100%' }}>
                                        <Input
                                            {...field}
                                            status={errors.title?.message ? 'error' : null}
                                            placeholder="Nhập tiêu đề"
                                        />
                                        <p style={{ margin: '0px', color: 'red' }}>{errors.title?.message}</p>
                                    </div>
                                )}
                            />
                        </div>
                        <div className={cx('contentItem')}>
                            <div className={cx('name')}>
                                Ảnh nền:<span className={cx('star')}>*</span>
                            </div>
                            <div className={cx('inputLink')}>
                                <div {...getRootPropsImage()}>
                                    <div>{file ? file.name : 'Drag and drop image here or upload from device'}</div>
                                    <input
                                        {...getInputPropsImage()}
                                        multiple={false}
                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            {imgPreview && (
                                <img
                                    src={imgPreview}
                                    style={{
                                        height: '78px',
                                        objectFit: 'cover',
                                        display: 'block',
                                        margin: '3% 19% 10px',
                                    }}
                                    alt=""
                                />
                            )}
                        </div>
                        <div className={cx('contentItem')}>
                            <div className={cx('name')}>
                                Logo:<span className={cx('star')}>*</span>
                            </div>
                            <div className={cx('inputLink')}>
                                <div {...getRootLogoProps()}>
                                    <div>{logo ? logo.name : 'Drag and drop logo here or upload from device'}</div>
                                    <input
                                        {...getInputLogoProps()}
                                        multiple={false}
                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            {imgPreviewLogo && (
                                <img
                                    src={imgPreviewLogo}
                                    style={{
                                        height: '78px',
                                        objectFit: 'cover',
                                        display: 'block',
                                        margin: '3% 19% 10px',
                                    }}
                                    alt=""
                                />
                            )}
                        </div>

                        <div className={cx('contentItem')} style={{ marginBottom: '30px', height: '5px' }}>
                            <div className={cx('name')}>
                                Tên nút :<span className={cx('star')}>*</span>
                            </div>
                            <Controller
                                name="btnName"
                                control={control}
                                render={({ field }) => (
                                    <div style={{ width: '100%' }}>
                                        <Input
                                            {...field}
                                            status={errors.btnName?.message ? 'error' : null}
                                            placeholder="Nhập tên"
                                        />
                                        <p style={{ margin: '0px', color: 'red' }}>{errors.btnName?.message}</p>
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
                                <Link to={config.routers.NewsAdmin} className={cx('bt')}>
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

export default AddSibar;
