import { Modal } from 'antd';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './VnPayReturn.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { formatTime } from '~/Components/FormatDate/FormatDate';
import config from '~/config';
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
                        <label>{vnp_OrderInfo}</label>
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
