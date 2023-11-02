import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './VnPayReturn.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { formatTime } from '~/Components/FormatDate/FormatDate';
import config from '~/config';
import axios from 'axios';
const cx = classNames.bind(styles);
export default function VnPayReturn() {
    const [open, setOpen] = useState(true);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const vnp_TxnRef = searchParams.get('vnp_TxnRef');
    const vnp_Amount = searchParams.get('vnp_Amount');
    const vnp_BankCode = searchParams.get('vnp_BankCode');
    const vnp_OrderInfo = searchParams.get('vnp_OrderInfo');
    const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
    const vnp_TransactionNo = searchParams.get('vnp_TransactionNo');
    const vnp_PayDateStr = searchParams.get('vnp_PayDate');
    const vnp_PayDate = moment(vnp_PayDateStr, 'YYYYMMDDHHmmss');
    const formattedTime = vnp_PayDate.format('YYYY-MM-DD HH:mm:ss');
    const navigate = useNavigate();
    const [requestSent, setRequestSent] = useState(false);
    const decodedOrderInfo = decodeURIComponent(vnp_OrderInfo); // Giải mã URL-encoded
    const orderInfoData = JSON.parse(decodedOrderInfo);
    useEffect(() => {
        async function postData() {
            if (!requestSent && vnp_ResponseCode === '00') {
                try {
                    const res = await axios.post('https://coffee-bills.onrender.com/orders/addOrder', {
                        customerId: orderInfoData.customerId,
                        productId: orderInfoData.productId,
                        total: vnp_Amount / 100,
                        isPaid: true,
                    });
                    setRequestSent(true);
                } catch (error) {
                    console.error('Lỗi khi gửi yêu cầu:', error);
                }
            } else {
                try {
                    const res = await axios.post('https://coffee-bills.onrender.com/orders/addOrder', {
                        customerId: orderInfoData.customerId,
                        productId: orderInfoData.productId,
                        total: vnp_Amount / 100,
                        isPaid: false,
                    });
                    // Xử lý kết quả nếu cần
                } catch (error) {
                    console.error('Lỗi khi gửi yêu cầu:', error);
                }
            }
        }

        postData(); // Gọi hàm async từ đây
    }, [vnp_ResponseCode]);

    return (
        <Modal
            centered
            open={open}
            // onOk={() => setOpen(false)}
            onCancel={() => navigate(config.routers.Home)}
            width={650}
            footer={null}
        >
            <div className={cx('container')}>
                <div className={cx('header clearfix')}>
                    <h2 className={cx('text-muted')} style={{ textAlign: 'center' }}>
                        Thông tin giao dịch
                    </h2>
                </div>
                <div className={cx('table-responsive')}>
                    <div className={cx('form-group')}>
                        <label className={cx('name')}>Mã đơn hàng:</label>

                        <label>{vnp_TxnRef}</label>
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('name')}>Số tiền:</label>
                        <label>{(vnp_Amount / 100).toLocaleString('vi-VN')} VND</label>
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('name')}>Nội dung thanh toán:</label>
                        <label>Thanh toan cho ma GD: {orderInfoData.orderId}</label>
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('name')}>Mã phản hồi (vnp_ResponseCode):</label>
                        <label>{vnp_ResponseCode}</label>
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('name')}>Mã GD Tại VNPAY:</label>
                        <label>{vnp_TransactionNo}</label>
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('name')}>Mã Ngân hàng:</label>
                        <label>{vnp_BankCode}</label>
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('name')}>Thời gian thanh toán:</label>
                        <label>{formattedTime}</label>
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('name')}>Kết quả:</label>
                        <label>
                            {vnp_ResponseCode === '00' ? (
                                <span style={{ color: 'blue' }}>GD Thanh cong</span>
                            ) : (
                                <span style={{ color: 'red' }}>GD Khong thanh cong</span>
                            )}
                        </label>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
