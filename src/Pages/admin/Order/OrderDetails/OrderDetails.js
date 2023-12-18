import classNames from 'classnames/bind';
import styles from './OrderDetails.module.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import Images from '~/Components/Images';
import { DeleteIcons, EditIcons } from '~/Components/icons/icons';

const cx = classNames.bind(styles);
const OrderDetails = (props) => {
    const { data } = props;
    console.log(data);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>Chi tiết đơn hàng</div>
                <div className={cx('conten')}>
                    <div className={cx('content')}>
                        <div className={cx('title')}>Tên khách hàng:</div>
                        <div className={cx('name')}>{data?.customer?.name}</div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('title')}>Địa chỉ:</div>
                        <div className={cx('name')}>{data?.customer?.address}</div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('title')}>Email:</div>
                        <div className={cx('name')}>{data?.customer?.email}</div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('title')}>Số điện thoại:</div>
                        <div className={cx('name')}>{data?.customer?.number}</div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('title')}>Tổng tiền:</div>
                        <div className={cx('name')}>{data?.total.toLocaleString('vi-VN')} VND</div>
                    </div>
                    {/* <div className={cx('content')}>
                        <div className={cx('title')}>Ghi chú:</div>
                        <div className={cx('name')}>{data?.total.toLocaleString('vi-VN')} VND</div>
                    </div> */}
                    <div className={cx('content')}>
                        <div className={cx('title')}>Thanh toán:</div>
                        <div className={cx('name')}>
                            {data?.isPaid ? (
                                <p style={{ color: '#23b123' }}>Đã thanh toán</p>
                            ) : (
                                <p style={{ color: '#ff2605 ' }}>Chưa thanh toán</p>
                            )}
                        </div>
                    </div>
                    <div className={cx('content1')}>
                        <div className={cx('title')} style={{ width: '160px' }}>
                            Danh sách sản phẩm:
                        </div>
                    </div>
                    <>
                        {data?.products?.map((e) => (
                            <div className={cx('cart-item')}>
                                {/* <Checkbox
                        checked={checked ? checked : checkedList.includes(index)}
                        style={{ paddingRight: '14px' }}
                        onChange={() => onChangeCheckBox(index, menu)}
                    ></Checkbox> */}
                                {/* ... Rest of your menu item rendering */}
                                <Images className={cx('logo-cart')} src={e?.product?.link} />
                                <div className={cx('cart-title')}>
                                    <div className={cx('cart-name')}>{e?.product?.name}</div>
                                    <div className={cx('cart-size')}>
                                        <div style={{ display: 'flex' }}>
                                            <div className={cx('size')}>
                                                Size {e?.size} <span>x {e?.quantity}</span>
                                                {', '}
                                                {e.ice ? e.ice : '0'}% đá, {e.sugar ? e.sugar : '0'}% đường,{' '}
                                                {e?.toppings}
                                            </div>
                                            {/* <div className={cx('edit')}>
                                                <EditIcons />
                                            </div> */}
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <div className={cx('cart-price')}>
                                                {e?.price
                                                    ? e?.price.toLocaleString('vi-VN')
                                                    : e?.product.price.toLocaleString('vi-VN')}{' '}
                                                VND
                                            </div>
                                            {/* <div className={cx('delete')}>
                                                <DeleteIcons />
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
