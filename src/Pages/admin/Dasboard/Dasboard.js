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
import { DatePicker, Button } from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import { Col, Row, Statistic } from 'antd';
import { ShoppingCartOutlined, UserOutlined, BarChartOutlined } from '@ant-design/icons';
import moment from 'moment';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const weekFormat = 'MM/DD';
const monthFormat = 'YYYY/MM';

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
    const startDate1 = dayjs().subtract(4, 'days').format('YYYY-MM-DD');
    const endDate1 = dayjs().format('YYYY-MM-DD');
    const [startDate, setStartDate] = useState(startDate1);
    const [endDate, setEndDate] = useState(endDate1);
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
            refetchCustomer();

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

    const {
        isLoading: isLoadingCustomer,
        data: data,
        refetch: refetchCustomer,
    } = useQuery({
        queryKey: ['dataCustomer'],
        queryFn: () => fetchData(),
    });

    const {
        isLoading: isLoadingOrders,
        data: ordersData,
        refetch: refetchOrders,
    } = useQuery({
        queryKey: ['dataOrder', startDate, endDate],
        queryFn: () =>
            axios
                .post('https://coffee-bills.onrender.com/orders/listAllOrders', { startDate, endDate })
                .then((res) => res.data),
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
        refetchCustomer();
    }, 300000);

    const customer = data?.customerData?.totalDocs;
    const order = data?.ordersData?.totalDocs;
    const totalAmount = data?.ordersAllData?.reduce((acc, item) => acc + item.total, 0);

    const calculateUniqueUsersPerDay = (data) => {
        const orderCountsByDate = {};
        data?.ordersAllData?.forEach((entry) => {
            const createdAt = new Date(entry.createdAt)?.toISOString().split('T')[0]; // Lấy ngày từ trường 'createdAt'

            if (createdAt >= startDate && createdAt <= endDate) {
                if (!orderCountsByDate[createdAt]) {
                    orderCountsByDate[createdAt] = new Set(); // Tạo một set để lưu trữ đơn hàng duy nhất
                }

                orderCountsByDate[createdAt].add(entry._id); // Thêm ID đơn hàng vào set
            }
        });

        // Tạo mảng chứa số lượng đơn hàng duy nhất mỗi ngày
        const uniqueOrderEachDay = [];
        let currentDate = new Date(startDate);
        while (currentDate <= new Date(endDate)) {
            const currentDateISODate = currentDate.toISOString().split('T')[0];
            uniqueOrderEachDay.push(orderCountsByDate[currentDateISODate]?.size || 0);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return uniqueOrderEachDay;
    };
    const calculateTotalAmountPerDay = (data) => {
        const totalAmountByDate = {};

        // const today = new Date();
        // const todayISODate = today.toISOString().split('T')[0]; // Ngày hôm nay

        // const fourDaysAgo = new Date(today);
        // fourDaysAgo.setDate(today.getDate() - 4);
        // const fourDaysAgoISODate = fourDaysAgo.toISOString().split('T')[0]; // Ngày 4 ngày trước

        data?.ordersAllData?.forEach((entry) => {
            const createdAt = new Date(entry.createdAt)?.toISOString().split('T')[0]; // Lấy ngày từ trường 'createdAt'

            if (createdAt >= startDate && createdAt <= endDate) {
                if (!totalAmountByDate[createdAt]) {
                    totalAmountByDate[createdAt] = 0; // Khởi tạo tổng tiền cho ngày đó là 0
                }

                totalAmountByDate[createdAt] += entry.total; // Cộng tổng tiền của mỗi đơn vào tổng tiền của ngày tương ứng
            }
        });

        // Tạo mảng chứa tổng tiền của từng ngày
        const totalAmountPerDay = [];
        let currentDate = new Date(startDate);
        while (currentDate <= new Date(endDate)) {
            const currentDateISODate = currentDate.toISOString().split('T')[0];
            totalAmountPerDay.push(totalAmountByDate[currentDateISODate] || 0);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return totalAmountPerDay;
    };

    // Sử dụng hàm để tính tổng tiền của từng ngày từ dữ liệu đã cung cấp
    const total = calculateTotalAmountPerDay(data);

    // Sử dụng hàm để tính số lượng đơn  duy nhất mỗi ngày từ dữ liệu đã cung cấp
    const orders = calculateUniqueUsersPerDay(data);

    const onChangeStartDate = (date, dateString) => {
        setStartDate(dateString);
    };
    const onChangeEndDate = (date, dateString) => {
        if (dateString > startDate) {
            setEndDate(dateString);
        } else {
            toast.error('Ngày kết thúc phải lơn hơn ngày bắt đầu');
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
            {/* Same as */}
            <ToastContainer />
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('header')}>
                        <div className={cx('headerTitles')}>
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
                        <div className={cx('headerIcon')}>
                            <ShoppingCartOutlined className={cx('iconCart')} />
                        </div>
                    </div>
                    <div className={cx('header1')}>
                        <div className={cx('headerTitles')}>
                            <div className={cx('Name')}>Tổng số người dùng</div>
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
                        <div className={cx('headerIcon')}>
                            <UserOutlined className={cx('iconCart')} />
                        </div>
                    </div>
                    <div className={cx('header2')}>
                        <div className={cx('headerTitles')}>
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
                        <div className={cx('headerIcon')}>
                            <BarChartOutlined className={cx('iconCart')} />
                        </div>
                    </div>
                </div>
                <div className={cx('search')}>
                    <div className={cx('headerSearch')}>BIỂU ĐỒ LỌC</div>
                    <div className={cx('contentSearch')}>
                        <div className={cx('contentItemSearch')}>
                            <div className={cx('title')}>Ngày bắt đầu</div>
                            <div className={cx('input')}>
                                {' '}
                                <DatePicker
                                    defaultValue={dayjs(startDate, dateFormat)}
                                    format={dateFormat}
                                    onChange={onChangeStartDate}
                                    style={{ width: '100%', height: '75%' }}
                                />
                            </div>
                        </div>
                        <div className={cx('contentItemSearch')}>
                            <div className={cx('title')}>Ngày kết thúc</div>
                            <div className={cx('input')}>
                                {' '}
                                <DatePicker
                                    defaultValue={dayjs(endDate, dateFormat)}
                                    format={dateFormat}
                                    onChange={onChangeEndDate}
                                    style={{ width: '100%', height: '75%' }}
                                />
                            </div>
                        </div>
                        <div className={cx('contentItemSearch')}>
                            <div className={cx('title')}>Filter Graph</div>
                            <div className={cx('input')}>
                                <Button
                                    type="primary"
                                    style={{ height: '75%', width: '100%', backgroundColor: '#1677ff' }}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('chart')}>
                    <div className={cx('chartValue')}>
                        <div className={cx('chartLabel')}>
                            <div className={cx('chartName')}>TỔNG QUAN</div>
                            <div className={cx('chartName1')}>Doanh số</div>
                        </div>
                        <Chart
                            total={total}
                            startDate={startDate}
                            endDate={endDate}
                            title={'Doanh số'}
                            width={'815px'}
                        />
                    </div>
                    <div className={cx('chartValue1')}>
                        <div className={cx('chartLabel')}>
                            <div className={cx('chartName')}>HIỆU SUẤT</div>
                            <div className={cx('chartName1')}>Tổng số đơn đặt hàng</div>
                        </div>
                        <Chart
                            orders={orders}
                            startDate={startDate}
                            endDate={endDate}
                            title={'Số lương đơn hàng'}
                            width={'518px'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dasboard;
