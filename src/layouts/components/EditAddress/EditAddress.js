import classNames from 'classnames/bind';
import styles from './EditAddress.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { Empty, Avatar, Badge, Button, Modal, Dropdown, message, Alert, Input } from 'antd';
import axios from 'axios';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import MapContainer from '~/Components/Map/Map';
import { addAddressSelector } from '~/Redux/selector';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import listsMenuSlice from '~/Redux/list/list';
const cx = classNames.bind(styles);

const schema = yup
    .object()
    .shape({
        temporaryAddress: yup.string().required('Cannot be empty').max(255, 'Maximum length: 255 characters'),
    })
    .required();
function EditAddress({ dataId, temporaryAddress }) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const address = useSelector(addAddressSelector);

    const initialValues = {
        temporaryAddress: address || '',
    };

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
    useEffect(() => {
        if (Object.keys(address).length === 0) {
            setValue('temporaryAddress', '');
        } else {
            setValue('temporaryAddress', address);
        }
    }, [address, setValue]);
    const onSubmit = async (data) => {
        // e.preventDefault();
        // console.log(data);
        const res = await axios
            .put(`https://coffee-bills.onrender.com/customer/updateCustomer/${dataId}`, data)
            .then((res) => {
                dispatch(listsMenuSlice.actions.addAddress(''));
                navigate(config.routers.Home, { state: { successMessage: 'Bạn đã cập nhật thành công!!!' } });
            })
            .catch((err) => {
                console.log('loi');
            });
    };

    return (
        <div className={cx('cart')}>
            <div className={cx('header-cart')}>
                <h2 className={cx('text-header')}>Nhập địa chỉ giao hàng</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ width: '100%', padding: '20px 0' }}>
                    <Controller
                        name="temporaryAddress"
                        control={control}
                        // defaultValue={address}
                        render={({ field }) => (
                            <div style={{ width: '100%' }}>
                                <Input
                                    {...field}
                                    status={errors.temporaryAddress?.message ? 'error' : null}
                                    placeholder="Nhập địa chỉ (ví dụ: 175 Tây Sơn - Đống Đa - Hà Nội)"
                                />
                                <p style={{ margin: '0px', color: 'red' }}>{errors.temporaryAddress?.message}</p>
                            </div>
                        )}
                    />
                </div>
                {open && <MapContainer temporaryAddress={temporaryAddress} />}
                {open ? (
                    <div className={cx('Map')} style={{ margin: '14px 10px 15px' }} onClick={() => setOpen(!open)}>
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
                <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                    <button className={cx('btnMenu')} to="#" type="submit">
                        Xác nhận
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditAddress;
