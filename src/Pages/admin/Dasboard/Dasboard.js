import React, { useState, useEffect, useRef } from 'react';
import styles from './Dasboard.module.scss';
import classNames from 'classnames/bind';
import { Progress, Space } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Chart from '~/layouts/components/chart';
import axios from 'axios';
import CountUp from 'react-countup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Col, Row, Statistic } from 'antd';
const formatter = (value) => <CountUp end={value} separator="," />;
const cx = classNames.bind(styles);
const fetchData = async () => {
    const promises = [
        axios.post('https://coffee-bills.onrender.com/customer/listCustomer').then((res) => res.data),
        axios.post('https://coffee-bills.onrender.com/orders/listOrder').then((res) => res.data),
        axios.post('https://coffee-bills.onrender.com/orders/listAllOrders').then((res) => res.data),
    ];

    const [customerData, ordersData, ordersAllData] = await Promise.all(promises);

    return { customerData, ordersData, ordersAllData };
};

function Dasboard() {
    const location = useLocation();
    const navigate = useNavigate();
    const successMessage = location.state?.successMessage;

    // const [messageApi, contextHolder] = message.useMessage(successMessage);

    const success = (message) => {
        // messageApi.open({
        //     type: 'success',
        //     content: message,
        // });
        toast.success(message);
    };

    useEffect(() => {
        if (location.state && location.state.successMessage) {
            success(location.state.successMessage);
            // setOpen(false);
            refetch();

            // Đặt giá trị successMessage trong location.state thành null
            const newLocation = { ...location };
            newLocation.state.successMessage = null;
            navigate({ pathname: location.pathname, state: newLocation.state });
        }
    }, [location.state]);
    const error = () => {
        // messageApi.open({
        //     type: 'error',
        //     content: 'Bạn xóa không thành công',
        // });
        toast.error('Bạn xóa không thành công');
    };

    const { isLoading, data, refetch } = useQuery({
        queryKey: ['dataCustomer'],
        queryFn: () => fetchData(),
    });
    const useInterval = (callback, delay) => {
        const savedCallback = useRef();

        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        useEffect(() => {
            const interval = setInterval(() => {
                savedCallback.current();
            }, delay);
            return () => clearInterval(interval);
        }, [delay]);
    };

    // Gọi refetch sau mỗi 5 phút
    useInterval(() => {
        refetch();
    }, 300000);

    const customer = data?.customerData?.totalDocs;
    const order = data?.ordersData?.totalDocs;
    const totalAmount = data?.ordersAllData?.reduce((acc, item) => acc + item.total, 0);
    console.log(data);

    const calculateUniqueUsersPerDay = (data) => {
        const orderCountsByDate = {};

        const today = new Date();
        const todayISODate = today.toISOString().split('T')[0]; // Ngày hôm nay

        const fourDaysAgo = new Date(today);
        fourDaysAgo.setDate(today.getDate() - 4);
        const fourDaysAgoISODate = fourDaysAgo.toISOString().split('T')[0]; // Ngày 4 ngày trước

        data?.ordersAllData?.forEach((entry) => {
            const createdAt = new Date(entry.createdAt)?.toISOString().split('T')[0]; // Lấy ngày từ trường 'createdAt'

            if (createdAt === todayISODate || createdAt >= fourDaysAgoISODate) {
                if (!orderCountsByDate[createdAt]) {
                    orderCountsByDate[createdAt] = new Set(); // Tạo một set để lưu trữ đơn hàng duy nhất
                }

                orderCountsByDate[createdAt].add(entry._id); // Thêm ID đơn hàng vào set
            }
        });

        // Tạo mảng chứa số lượng người dùng duy nhất mỗi ngày
        const uniqueOrderEachDay = [];
        let currentDate = fourDaysAgo;
        while (currentDate <= today) {
            const currentDateISODate = currentDate.toISOString().split('T')[0];
            uniqueOrderEachDay.push(orderCountsByDate[currentDateISODate]?.size || 0);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return uniqueOrderEachDay;
    };
    const calculateTotalAmountPerDay = (data) => {
        const totalAmountByDate = {};

        const today = new Date();
        const todayISODate = today.toISOString().split('T')[0]; // Ngày hôm nay

        const fourDaysAgo = new Date(today);
        fourDaysAgo.setDate(today.getDate() - 4);
        const fourDaysAgoISODate = fourDaysAgo.toISOString().split('T')[0]; // Ngày 4 ngày trước

        data?.ordersAllData?.forEach((entry) => {
            const createdAt = new Date(entry.createdAt)?.toISOString().split('T')[0]; // Lấy ngày từ trường 'createdAt'

            if (createdAt === todayISODate || createdAt >= fourDaysAgoISODate) {
                if (!totalAmountByDate[createdAt]) {
                    totalAmountByDate[createdAt] = 0; // Khởi tạo tổng tiền cho ngày đó là 0
                }

                totalAmountByDate[createdAt] += entry.total; // Cộng tổng tiền của mỗi đơn vào tổng tiền của ngày tương ứng
            }
        });

        // Tạo mảng chứa tổng tiền của từng ngày
        const totalAmountPerDay = [];
        let currentDate = fourDaysAgo;
        while (currentDate <= today) {
            const currentDateISODate = currentDate.toISOString().split('T')[0];
            totalAmountPerDay.push(totalAmountByDate[currentDateISODate] || 0);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return totalAmountPerDay;
    };

    // Sử dụng hàm để tính tổng tiền của từng ngày từ dữ liệu đã cung cấp
    const total = calculateTotalAmountPerDay(data);
    console.log(total);

    // Sử dụng hàm để tính số lượng đơn  duy nhất mỗi ngày từ dữ liệu đã cung cấp
    const orders = calculateUniqueUsersPerDay(data);
    console.log(orders);
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
            {/* Same as */}
            <ToastContainer />
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('header')}>
                        <div className={cx('Name')}>Tổng đơn hàng</div>
                        <div className={cx('quantity')}>
                            <div className={cx('number')}>
                                {' '}
                                <Statistic
                                    className={cx('number')}
                                    value={order}
                                    valueStyle={{ color: '#fff', fontSize: '33px' }}
                                    formatter={formatter}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('header1')}>
                        <div className={cx('Name')}>Tổng khách hàng</div>
                        <div className={cx('quantity')}>
                            <div className={cx('number')}>
                                <Statistic
                                    className={cx('number')}
                                    value={customer}
                                    valueStyle={{ color: '#fff', fontSize: '33px' }}
                                    formatter={formatter}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('header2')}>
                        <div className={cx('Name')}>Tổng tiền</div>
                        <div className={cx('quantity')}>
                            <div className={cx('number')}>
                                VND
                                <Statistic
                                    value={totalAmount}
                                    valueStyle={{ color: '#fff', fontSize: '33px', paddingLeft: '10px' }}
                                    formatter={formatter}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Chart orders={orders} total={total} />
            </div>
        </div>
    );
}

export default Dasboard;
