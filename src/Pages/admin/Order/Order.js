import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { AddIcons } from '~/Components/icons/icons';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import config from '~/config/config';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import listsMenuSlice from '~/Redux/list/list';
import filterSlice from '~/Redux/filters/filters';
import { searchitemSelector } from '~/Redux/selector';
import { Pagination, Select } from 'antd';
import { Empty, Button, Modal, message, Alert, Input } from 'antd';
import { formatTime } from '~/Components/FormatDate/FormatDate';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EyeInvisibleOutlined, EyeOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import OrderDetails from './OrderDetails/OrderDetails';
import { exportToExcel } from '~/Components/exel/exel';

const { Search } = Input;
const { confirm } = Modal;
const cx = classNames.bind(styles);

function Order() {
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState();
    const [page, setPage] = useState(1);
    const [select, setSelect] = useState(10);
    const [search, setSearch] = useState('');
    const [eye, setEye] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const location = useLocation();
    // const successMessage = location.state?.successMessage;

    const [messageApi, contextHolder] = message.useMessage();

    const success = (message) => {
        messageApi.open({
            type: 'success',
            content: message,
        });
    };

    // useEffect(() => {
    //     if (location.state && location.state.successMessage) {
    //         success(location.state.successMessage);
    //         setOpen(false);
    //         refetch();

    //         // Đặt giá trị successMessage trong location.state thành null
    //         const newLocation = { ...location };
    //         newLocation.state.successMessage = null;
    //         navigate({ pathname: location.pathname, state: newLocation.state });
    //     }
    // }, [location.state]);

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Bạn xóa không thành công',
        });
    };
    const handleDelete = (id) => {
        confirm({
            title: 'Delete',
            icon: <QuestionCircleOutlined />,
            content: 'Bạn có muốn xóa không?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                axios
                    .delete(`https://coffee-bills.onrender.com/orders/deleteOrder/${id}`)
                    .then((res) => {
                        success('Bạn đã xóa thành công');
                        refetch();
                    })
                    .catch((err) => {
                        error();
                    });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const handlePageChange = (page) => {
        setPage(page);
    };
    const handleSelected = (value) => {
        setSelect(value);
        dispatch(filterSlice.actions.list(value));
    };
    const handleSearch = (e) => {
        setSearch(e);
        // dispatch(filterSlice.actions.searchListMenu(result));
    };
    const { isLoading, data, refetch } = useQuery({
        queryKey: ['dataOrder', select, page, search],
        queryFn: () =>
            axios
                .post('https://coffee-bills.onrender.com/orders/listOrder', { page, select, search })
                .then((res) => res.data),
    });
    console.log(data);
    // const onSearch = (value, _e, info) => console.log(info?.source, value);
    const datas = useSelector(searchitemSelector);
    const handleUpdate = (data) => {
        setOpen(!open);
        setEditData(data);
        setEye((prevState) => ({
            ...prevState,
            [data._id]: !prevState[data._id],
        }));
    };
    // const handleChange = (value) => {
    //     console.log(`selected ${value}`);
    // };
    const ModalEdit = (data) => (
        <Modal
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => {
                setOpen(false);
                setEye({});
            }}
            width={670}
            footer={null}
        >
            <OrderDetails data={editData} handle={open} />
        </Modal>
    );
    // useEffect(() => {
    //     axios
    //         .post('/ Order/ListMenu')
    //         .then((res) => {
    //             dispatch(listsMenuSlice.actions.addListMenu(res.data));
    //             dispatch(filterSlice.actions.list(selected));
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);
    const handleExl = () => {
        exportToExcel(data.docs);
    };
    const isdata = !data?.docs?.length;

    return (
        <div className={cx('Wrapper')}>
            {contextHolder}
            <div className={cx('Container')}>
                <div className={cx('header')}>
                    <div className={cx('NameHeader')}>danh sách đơn hàng</div>
                    <div className={cx('btnHeader')}>
                        <Link to="#" className={cx('btnIconAdd')} onClick={handleExl}>
                            {/* <AddIcons className={cx('IconAdd')} /> */}
                            Export Exel
                        </Link>
                    </div>
                </div>
                <ModalEdit />
                <div className={cx('headerContent')}>
                    <div className={cx('leftContent')}>
                        <div className={cx('name')}>Hiển thị</div>
                        <Select
                            defaultValue="10"
                            style={{ width: 120, margin: '10px' }}
                            onChange={handleSelected}
                            options={[
                                { value: 10, label: 10 },
                                { value: 25, label: 25 },
                                { value: 40, label: 40 },
                            ]}
                        />
                        <div className={cx('name')}>bản ghi trên trang</div>
                    </div>
                    <div className={cx('rightContent')}>
                        <Search
                            placeholder="input search text"
                            onSearch={handleSearch}
                            style={{
                                width: 200,
                            }}
                        />
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('contentItem')}>
                        <Table striped bordered size="sm">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên khách hàng</th>
                                    <th>Tổng tiền</th>
                                    <th>Thời gian tạo</th>
                                    <th>Thanh toán</th>
                                    <th colSpan={2}>Chức năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isdata ? (
                                    <div style={{ position: 'absolute', right: '34%', left: '34%', top: '65%' }}>
                                        <Empty />
                                    </div>
                                ) : (
                                    <>
                                        {data?.docs?.map((data, index) => (
                                            <tr key={data._id}>
                                                <td>{index + 1}</td>
                                                <td>{data.customer.name}</td>
                                                <td>{data.total.toLocaleString('vi-VN')} VND</td>
                                                <td>{formatTime(data.createdAt)}</td>
                                                <td>{data.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</td>
                                                <td>
                                                    <Link
                                                        className={cx('icon')}
                                                        to="#"
                                                        onClick={() => handleUpdate(data)}
                                                    >
                                                        {eye[data._id] ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                    </Link>

                                                    <Link
                                                        className={cx('icon')}
                                                        onClick={() => handleDelete(data._id)}
                                                        to="#"
                                                    >
                                                        <RiDeleteBin6Line />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                )}
                            </tbody>
                        </Table>
                        {!isdata && (
                            <div className={cx('footer')}>
                                <Pagination
                                    defaultCurrent={1}
                                    total={data?.totalDocs}
                                    // defaultPageSize={10}
                                    current={page}
                                    onChange={handlePageChange}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;