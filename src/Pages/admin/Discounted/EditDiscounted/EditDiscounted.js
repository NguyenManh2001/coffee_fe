import classNames from 'classnames/bind';
import styles from './EditDiscounted.module.scss';
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
import { Input, InputNumber, Select, DatePicker } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
// const { RangePicker } = DatePicker;
// const dateFormat = 'YYYY-MM-DD HH:MM:SS';
// const weekFormat = 'MM/DD';
// const monthFormat = 'YYYY/MM';
const { TextArea } = Input;
const schema = yup
    .object()
    .shape({
        // title: yup.string().required('Cannot be empty').max(255, 'Maximum length: 255 characters'),
        // btnName: yup.string().required('Cannot be empty'),
    })
    .required();
const cx = classNames.bind(styles);
function EditDiscounted(props) {
    const { data } = props;
    const [file, setFile] = useState();
    const [logo, setLogo] = useState();
    const navigate = useNavigate();
    // const [imgPreview, setImgPreview] = useState(data.image);
    const initialValues = {
        ...data,
        // name: data.name,
        startDate: dayjs(data.startDate),
        endDate: dayjs(data.endDate),
        // discounted: data.discounted,
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
        const startDate = data.startDate.format('YYYY-MM-DD HH:mm');
        const endDate = data.endDate.format('YYYY-MM-DD HH:mm');
        if (startDate < moment(new Date()).format('YYYY-MM-DD HH:mm')) {
            toast.error('Thời gian bắt đầu phải lớn hơn thời gian hiện tại');
        } else if (startDate > endDate) {
            toast.error('Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc');
        } else {
            // const uploadData = new FormData();
            // uploadData.append('name', data.name);
            // uploadData.append('startDate', startDate);
            // uploadData.append('endDate', endDate);
            // uploadData.append('discounted', data.discounted);
            const res = await axios
                .put(`https://coffee-bills.onrender.com/discounted/editDiscounted/${data._id}`, data)
                .then((res) => {
                    navigate(config.routers.DiscountedAdmin, {
                        state: { successMessage: 'Bạn đã cập nhật thành công!!!' },
                    });
                })
                .catch((err) => {
                    console.log('loi');
                });
        }
    };
    return (
        <div className={cx('wrapper')}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className={cx('container')}>
                <div className={cx('header')}>Cập nhật thông tin</div>
                <div className={cx('content')}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={cx('contentItem')}>
                            <div className={cx('name')}>
                                Mã khuyến mãi:<span className={cx('star')}>*</span>
                            </div>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <div style={{ width: '100%' }}>
                                        <Input
                                            {...field}
                                            status={errors.name?.message ? 'error' : null}
                                            placeholder="Nhập mã khuyến mãi (vd: KM10)"
                                        />
                                        <p style={{ margin: '0px', color: 'red' }}>{errors.name?.message}</p>
                                    </div>
                                )}
                            />
                        </div>
                        <div className={cx('contentItem')}>
                            <div className={cx('name')}>
                                Thời gian bắt đầu:<span className={cx('star')}>*</span>
                            </div>
                            <Controller
                                name="startDate"
                                control={control}
                                render={({ field }) => (
                                    <div style={{ width: '100%' }}>
                                        <DatePicker
                                            {...field}
                                            showTime
                                            style={{ width: '100%' }}
                                            status={errors.startDate?.message ? 'error' : null}
                                            // onChange={onChange}
                                        />
                                        <p style={{ margin: '0px', color: 'red' }}>{errors.startDate?.message}</p>
                                    </div>
                                )}
                            />
                        </div>
                        <div className={cx('contentItem')}>
                            <div className={cx('name')}>
                                Thời gian kết thúc:<span className={cx('star')}>*</span>
                            </div>
                            <Controller
                                name="endDate"
                                control={control}
                                render={({ field }) => (
                                    <div style={{ width: '100%' }}>
                                        <DatePicker
                                            {...field}
                                            showTime
                                            style={{ width: '100%' }}
                                            status={errors.endDate?.message ? 'error' : null}
                                            // onChange={onChange}
                                        />
                                        <p style={{ margin: '0px', color: 'red' }}>{errors.endDate?.message}</p>
                                    </div>
                                )}
                            />
                        </div>

                        <div className={cx('contentItem')} style={{ marginBottom: '30px', height: '5px' }}>
                            <div className={cx('name')}>
                                Giảm giá :<span className={cx('star')}>*</span>
                            </div>
                            <Controller
                                name="discounted"
                                control={control}
                                render={({ field }) => (
                                    <div style={{ width: '100%' }}>
                                        <Input
                                            {...field}
                                            status={errors.discounted?.message ? 'error' : null}
                                            placeholder="Nhập tên"
                                        />
                                        <p style={{ margin: '0px', color: 'red' }}>{errors.discounted?.message}</p>
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
                                <Link to={config.routers.DiscountedAdmin} className={cx('bt')}>
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

export default EditDiscounted;
