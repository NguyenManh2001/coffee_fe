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
import { EnvironmentOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import MapContainer from '~/Components/Map/Map';
import { Button, Input, InputNumber, message, Select } from 'antd';
import { addAddressSelector } from '~/Redux/selector';
import listsMenuSlice from '~/Redux/list/list';

const schema = yup
    .object()
    .shape({
        name: yup.string().required('Vui lòng nhập thông tin').max(255, 'Maximum length: 255 characters'),
        gender: yup.string().required('Vui lòng chọn giới tính'),
        address: yup.string().required('Vui lòng nhập thông tin').max(255, 'Maximum length: 255 characters'),
        // email: yup.string().required('Cannot be empty').max(255, 'Maximum length: 255 characters'),
        number: yup
            .string()
            .matches(/^(0\d{9})$/, 'Số điện thoại không hợp lệ') // Đây là một ví dụ đơn giản, bạn có thể định nghĩa quy tắc xác thực phức tạp hơn
            .required('Vui lòng nhập số điện thoại'),
    })
    .required();
const cx = classNames.bind(styles);
function AddCustomer() {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const address = useSelector(addAddressSelector);
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
    useEffect(() => {
        if (Object.keys(address).length === 0) {
            setValue('address', '');
        } else {
            setValue('address', address);
        }
    }, [address, setValue]);
    const onSubmit = async (data) => {
        // e.preventDefault();
        console.log(data);
        const res = await axios
            .post('https://coffee-bills.onrender.com/customer/addCustomer', {
                ...data,
                email: email,
            })
            .then((res) => {
                dispatch(listsMenuSlice.actions.addAddress(''));
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
                                Tên người dùng:<span className={cx('star')}>*</span>
                            </div>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <div style={{ width: '100%' }}>
                                        <Input
                                            {...field}
                                            status={errors.name?.message ? 'error' : null}
                                            placeholder="Nhập họ và tên"
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
                                    <div style={{ width: '100%' }}>
                                        <Select
                                            className={cx('dropdown')}
                                            value={watch('gender')}
                                            allowClear
                                            placeholder="Chọn giới tính"
                                            onChange={(val) => setValue('gender', val)}
                                            status={errors.gender?.message ? 'error' : null}
                                            options={[
                                                { value: 'Nam', label: 'Nam' },
                                                { value: 'Nữ', label: 'Nữ' },
                                            ]}
                                        />
                                        <p style={{ margin: '0px', color: 'red' }}>{errors.gender?.message}</p>
                                    </div>
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
                                            placeholder="Nhập địa chỉ"
                                        />
                                        <p style={{ margin: '0px', color: 'red' }}>{errors.address?.message}</p>
                                    </div>
                                )}
                            />
                        </div>
                        {open && <MapContainer temporaryAddress={watch('temporaryAddress')} />}
                        <div className={cx('contentItem1')}>
                            {open ? (
                                <div
                                    className={cx('Map')}
                                    style={{ margin: '14px 10px 15px' }}
                                    onClick={() => setOpen(!open)}
                                >
                                    <EnvironmentOutlined />
                                    <span style={{ padding: '0 5px' }}>Ẩn bản đồ</span>
                                </div>
                            ) : (
                                <>
                                    {/* <div style={{ textAlign: 'center' }}>OR</div> */}
                                    <div className={cx('Map')} onClick={() => setOpen(!open)}>
                                        <EnvironmentOutlined />
                                        <span style={{ padding: '0 5px' }}>Dùng định vị bản đồ</span>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className={cx('contentItem')} style={{ margin: '0' }}>
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
                                            placeholder="Nhập số điện thoại"
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
