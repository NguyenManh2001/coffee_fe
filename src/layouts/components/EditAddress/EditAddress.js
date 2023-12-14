import classNames from 'classnames/bind';
import styles from './EditAddress.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { Empty, Avatar, Badge, Button, Modal, Dropdown, message, Alert, Input } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
const cx = classNames.bind(styles);
function EditAddress({ dataId }) {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        formState: { errors },
    } = useForm({});
    const onSubmit = async (data) => {
        // e.preventDefault();
        console.log(data);
        const res = await axios
            .put(`https://coffee-bills.onrender.com/customer/updateCustomer/${dataId}`, data)
            .then((res) => {
                navigate(config.routers.Home, { state: { successMessage: 'Bạn đã cập nhật thành công!!!' } });
            })
            .catch((err) => {
                console.log('loi');
            });
    };
    // console.log(watch('name'));
    return (
        <div className={cx('cart')}>
            <div className={cx('header-cart')}>
                <h2 className={cx('text-header')}>Nhập địa chỉ giao hàng</h2>
                {/* <div style={{ width: '75px', height: '26px' }}>
                <NavLink to={config.routers.Menu} className={cx('add')}>
                    Thêm món
                </NavLink>
            </div> */}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ width: '100%', padding: '20px 0' }}>
                    {/* <Input
                // {...field}
                // status={errors.address?.message ? 'error' : null}
                placeholder="Nhập địa chỉ"
            /> */}
                    {/* <p style={{ margin: '0px', color: 'red' }}>{errors.address?.message}</p> */}
                    <Controller
                        name="temporaryAddress"
                        control={control}
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
