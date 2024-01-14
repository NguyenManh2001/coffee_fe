import classNames from 'classnames/bind';
import styles from './AddDiscounted.module.scss';
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
import { DatePicker, Space } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import moment from 'moment';

const { TextArea } = Input;
const schema = yup
    .object()
    .shape({
        name: yup.string().required('Không được để trống'),
        product: yup.string().required('Không được để trống'),
        startDate: yup.string().required('Không được để trống'),
        endDate: yup.string().required('Không được để trống'),
        discounted: yup.number().typeError('Giá trị phải là số').required('Vui lòng nhập giá trị khuyến mãi'),
    })
    .required();
const cx = classNames.bind(styles);
function AddDiscounted() {
    const navigate = useNavigate();
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

    const { isLoading, data, refetch } = useQuery({
        queryKey: ['dataDiscounted'],
        queryFn: () =>
            axios.post('https://coffee-bills.onrender.com/discounted/listDiscounted').then((res) => res.data),
    });

    const onSubmit = async (datas) => {
        console.log(datas);
        // e.preventDefault();
        const startDate = moment(datas.startDate).format('YYYY-MM-DD HH:mm');
        const endDate = moment(datas.endDate).format('YYYY-MM-DD HH:mm');

        const isOverlap = data?.docs.some((discount) => {
            const startDateOverlap =
                startDate >= moment(discount.startDate).format('YYYY-MM-DD HH:mm') &&
                startDate <= moment(discount.endDate).format('YYYY-MM-DD HH:mm');
            const endDateOverlap =
                endDate >= moment(discount.startDate).format('YYYY-MM-DD HH:mm') &&
                endDate <= moment(discount.endDate).format('YYYY-MM-DD HH:mm');

            return startDateOverlap || endDateOverlap;
        });
        if (isOverlap) {
            toast.error('Thời gian khuyến mãi mới trùng với khuyến mãi đã tồn tại.');
        } else {
            // const startDate = datas.startDate.format('YYYY-MM-DD HH:mm');
            // const endDate = datas.endDate.format('YYYY-MM-DD HH:mm');
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
                    .post('https://coffee-bills.onrender.com/discounted/addDiscounted', datas)
                    .then((res) => {
                        navigate(config.routers.DiscountedAdmin, {
                            state: { successMessage: 'Bạn đã thêm thành công!!!' },
                        });
                    })
                    .catch((err) => {
                        toast.error('Bạn đã không thêm thành công');
                    });
            }
        }
    };
    return (
        <div className={cx('wrapper')}>
            {/* <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            /> */}
            <div className={cx('container')}>
                <div className={cx('header')}>Thêm thông tin</div>
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
                                Loại sản phẩm:<span className={cx('star')}>*</span>
                            </div>
                            <Controller
                                name="product"
                                control={control}
                                render={({ field }) => (
                                    <div style={{ width: '100%' }}>
                                        <Select
                                            className={cx('dropdown')}
                                            value={watch('product')}
                                            allowClear
                                            placeholder="Chọn loại sản phẩm"
                                            onChange={(val) => setValue('product', val)}
                                            status={errors.product?.message ? 'error' : null}
                                            options={[
                                                { value: 'Tất cả', label: 'Tất cả' },
                                                { value: 'Coffee', label: 'Coffee' },
                                                { value: 'Freeze', label: 'Freeze' },
                                                { value: 'Tea', label: 'Tea' },
                                            ]}
                                        />
                                        <p style={{ margin: '0px', color: 'red' }}>{errors.product?.message}</p>
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
                                        <InputNumber
                                            style={{ width: '100%' }}
                                            min={1}
                                            max={100}
                                            {...field}
                                            status={errors.discounted?.message ? 'error' : null}
                                            placeholder="Nhập số từ 1-100"
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

export default AddDiscounted;
