import classNames from 'classnames/bind';
import styles from './EditMenu.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config/config';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import Autocomplete from 'react-autocomplete';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input, InputNumber, Select } from 'antd';
const { TextArea } = Input;
const schema = yup
    .object()
    .shape({
        name: yup.string().required('Cannot be empty').max(255, 'Maximum length: 255 characters'),
        // describe: yup.string().required('Cannot be empty'),
    })
    .required();
const cx = classNames.bind(styles);
function EditMenu(props) {
    const { data } = props;
    const [file, setFile] = useState();
    const navigate = useNavigate();
    // const [imgPreview, setImgPreview] = useState(data.image);
    const initialValues = {
        ...data,
    };
    console.log(props);
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

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/gif': [],
        },
        onDrop: (acceptedFiles) => {
            setFile(acceptedFiles[0]);
            // URL.revokeObjectURL(imgPreview);
            // setImgPreview(URL.createObjectURL(acceptedFiles[0]));
            setValue('image', URL.createObjectURL(acceptedFiles[0]));
        },
    });
    // useEffect(() => {
    //     axios
    //         .post(`/menuList/editMenu/${id2}/${id1}`)
    //         .then((res) => {
    //             // console.log(res.data.menus.map((menu) => menu.name));
    //             // console.log(res.data.name);
    //             setName(res.data.menus.map((menu) => menu.name));
    //             setLink(res.data.menus.map((menu) => menu.link));
    //             setPrice(res.data.menus.map((menu) => menu.price));
    //             setSelected(res.data.name);
    //             // navigate(config.routers.MenuAdmin);
    //         })
    //         .catch((err) => {
    //             console.log('loi dl');
    //         });
    // }, []);
    // const handleImageChange = (e) => {
    //     const files = e.target.files[0];
    //     // const images = URL.createObjectURL(files);
    //     setLink(files);
    // };

    // const handleSelect = (e) => {
    //     setSelected(e.target.value);
    // };
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const uploadData = new FormData();
    //     uploadData.append('link', link);
    //     uploadData.append('name', name);
    //     uploadData.append('price', price);
    //     try {
    //         await axios.put(`/menuList/EditMenu/${id2}/${id1}`, uploadData);
    //         // console.log('Cap nhat thanh cong');

    //         navigate(config.routers.MenuAdmin);
    //     } catch (err) {
    //         console.log('loi', err);
    //     }
    // };
    const onSubmit = async (data) => {
        // e.preventDefault();

        const uploadData = new FormData();
        if (file) {
            uploadData.append('image', file, file.name);
        } else {
            uploadData.append('image', data.image);
        }
        uploadData.append('name', data.name);
        console.log(data.type);
        const res = await axios
            .put(`https://coffee-bills.onrender.com/menu/editMenu/${data._id}`, uploadData)
            .then((res) => {
                navigate(config.routers.MenuAdmin, { state: { successMessage: 'Bạn đã cập nhật thành công!!!' } });
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
                                Tên:<span className={cx('star')}>*</span>
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
                                Ảnh:<span className={cx('star')}>*</span>
                            </div>
                            <div
                                {...getRootProps()}
                                style={{
                                    border: '2px dashed #eee',
                                    padding: '20px',
                                    textAlign: 'center',
                                    width: '100%',
                                }}
                            >
                                <input {...getInputProps()} />
                                {file ? file.name : 'Drag and drop image here or upload from device'}
                            </div>
                        </div>
                        <div>
                            {watch('image') && (
                                <img
                                    src={watch('image')}
                                    style={{
                                        height: '150px',
                                        objectFit: 'cover',
                                        display: 'block',
                                        margin: '4% 19% 0',
                                    }}
                                    alt=""
                                />
                            )}
                        </div>

                        <div className={cx('footer')}>
                            <div className={cx('btnPrev')}>
                                <button to="#" type="submit" className={cx('bt')}>
                                    Lưu lại
                                </button>
                            </div>
                            {/* <div className={cx('btnPrev')}>
                        <Link to={config.routers.MenuAdmin} className={cx('bt')}>
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

export default EditMenu;
