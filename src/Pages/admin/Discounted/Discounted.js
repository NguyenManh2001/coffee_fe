import classNames from 'classnames/bind';
import styles from './Discounted.module.scss';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// import Table from 'react-bootstrap/Table';
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
import { Pagination, Select, Space, Spin, Table } from 'antd';
import { Empty, Button, Modal, message, Alert, Input } from 'antd';
import { formatTime } from '~/Components/FormatDate/FormatDate';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditDiscounted from './EditDiscounted';
import moment from 'moment';

const { Search } = Input;
const { confirm } = Modal;
const cx = classNames.bind(styles);

function DiscountedAdmin() {
    const [page, setPage] = useState(1);
    const [type, setType] = useState('');
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState();
    const [searchValue, setSearchValue] = useState(' ');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const successMessage = location.state?.successMessage;

    const [messageApi, contextHolder] = message.useMessage(successMessage);

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
            setOpen(false);
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
    const handldeDelete = (id) => {
        confirm({
            title: 'Delete',
            icon: <QuestionCircleOutlined />,
            content: 'Bạn có muốn xóa không?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                axios
                    .delete(`https://coffee-bills.onrender.com/discounted/deleteDiscounted/${id}`)
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

    // const onSearch = (value, _e, info) => console.log(info?.source, value);
    const datas = useSelector(searchitemSelector);
    const handleSelected = (value) => {
        if (value === 'Tất cả') {
            setType('');
        } else {
            setType(value);
        }
        dispatch(filterSlice.actions.list(value));
    };

    const handleSearch = (e) => {
        setSearch(e);
        // dispatch(filterSlice.actions.searchListMenu(result));
    };
    const handleUpdate = (data) => {
        setOpen(!open);
        setEditData(data);
    };
    const handlePageChange = (page) => {
        setPage(page);
    };
    // const handleChange = (value) => {
    //     console.log(`selected ${value}`);
    // };
    const ModalEdit = (data) => (
        <Modal
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
            footer={null}
        >
            <EditDiscounted data={editData} />
        </Modal>
    );
    // useEffect(() => {
    //     axios
    //         .post('/menuList/ListMenu')
    //         .then((res) => {
    //             dispatch(listsMenuSlice.actions.addListMenu(res.data));
    //             dispatch(filterSlice.actions.list(selected));
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);
    const { isLoading, data, refetch } = useQuery({
        queryKey: ['dataDiscounted', type, page, search],
        queryFn: () =>
            axios
                .post('https://coffee-bills.onrender.com/discounted/listDiscounted', { page, type, search })
                .then((res) => res.data),
    });
    const isdata = !data?.docs?.length;
    const startDate = (a, b) => {
        const dateA = moment(a.startDate);
        const dateB = moment(b.startDate);
        return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    };
    const endDate = (a, b) => {
        const dateA = moment(a.endDate);
        const dateB = moment(b.endDate);
        return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    };
    const columns = [
        {
            title: 'Mã khuyến mãi',
            dataIndex: 'name',
            key: 'name',
            // className: cx('custom-column'),
        },
        {
            title: 'Loại sản phẩm',
            dataIndex: 'product',
            key: 'product',
            // className: cx('custom-column'),
        },
        {
            title: 'Giảm giá (%)',
            dataIndex: 'discounted',
            key: 'discounted',
            render: (text, record) => <span>{record?.discounted} %</span>,
        },
        {
            title: 'Thời gian bắt dầu',
            dataIndex: 'startDate',
            key: 'startDate',
            // className: cx('custom-create'),
            sorter: {
                compare: (a, b) => startDate(a, b),
                multiple: 2,
                tooltip: false,
            },
            render: (text, record) => <span>{formatTime(record?.startDate)}</span>,
        },
        {
            title: 'Thời gian kết thúc',
            dataIndex: 'endDate',
            key: 'endDate',
            // className: cx('custom-create'),
            sorter: {
                compare: (a, b) => endDate(a, b),
                multiple: 2,
                tooltip: false,
            },
            render: (text, record) => <span>{formatTime(record?.endDate)}</span>,
        },

        {
            title: 'Chức năng',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link className={cx('icon1')} to="#" onClick={() => handleUpdate(record)}>
                        <BiEditAlt />
                    </Link>
                    <Link className={cx('icon2')} to="#" onClick={() => handldeDelete(record._id)}>
                        <RiDeleteBin6Line />
                    </Link>
                </Space>
            ),
        },
    ];

    const Menudata = data?.docs;
    return (
        <div className={cx('Wrapper')}>
            {/* {contextHolder} */}
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div className={cx('Container')}>
                <div className={cx('header')}>
                    <div className={cx('NameHeader')}>danh sách thông tin</div>
                    <div className={cx('btnHeader')}>
                        <Link to={config.routers.AddDiscounted} className={cx('btnIconAdd')}>
                            <AddIcons className={cx('IconAdd')} />
                            Thêm mới
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
                            placeholder="Tìm kiếm theo mã khuyến mãi"
                            onSearch={handleSearch}
                            style={{
                                width: 200,
                            }}
                        />
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('contentItem')}>
                        {/* <Table striped bordered size="sm">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên</th>
                                    <th>Tiêu đề</th>
                                    <th>Ảnh</th>
                                    <th>Mô tả</th>
                                    <th>Thời gian tạo</th>
                                    <th colSpan={2}>Chức năng</th>
                                </tr>
                            </thead>
                            <tbody> */}
                        {isLoading ? (
                            <div className={cx('loading')} style={{ position: 'absolute', left: '48%', top: '55%' }}>
                                <Spin style={{ color: 'red' }} />
                            </div>
                        ) : (
                            <>
                                {isdata ? (
                                    <div style={{ position: 'absolute', right: '34%', left: '34%', top: '40%' }}>
                                        <Empty />
                                    </div>
                                ) : (
                                    <>
                                        {/* {data?.docs?.map((data, index) => (
                                                    <tr key={data._id} style={{ lineHeight: '65px' }}>
                                                        <td>{index + 1}</td>
                                                        <td style={{ lineHeight: '24px', width: '300px' }}>
                                                            {data.name}
                                                        </td>
                                                        <td style={{ lineHeight: '24px', width: '300px' }}>
                                                            {data.title}
                                                        </td>
                                                        <td style={{ width: '100px' }}>
                                                            <img
                                                                style={{ width: '100%', height: '100%' }}
                                                                src={data?.image}
                                                            />
                                                        </td>
                                                        <td style={{ lineHeight: '24px', width: '400px' }}>
                                                            {data.describe}
                                                        </td>
                                                        <td>{formatTime(data.createdAt)}</td>
                                                        <td>
                                                            <Link
                                                                className={cx('icon')}
                                                                to="#"
                                                                onClick={() => handleUpdate(data)}
                                                            >
                                                                <BiEditAlt />
                                                            </Link>
                                                            <Link
                                                                className={cx('icon')}
                                                                to="#"
                                                                onClick={() => handldeDelete(data._id)}
                                                            >
                                                                <RiDeleteBin6Line />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))} */}
                                        <Table columns={columns} dataSource={Menudata} pagination={false} />
                                        <Pagination
                                            style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '17px' }}
                                            defaultCurrent={1}
                                            total={data?.totalDocs}
                                            defaultPageSize={7}
                                            current={page}
                                            onChange={handlePageChange}
                                        />
                                    </>
                                )}
                            </>
                        )}
                        {/* </tbody>
                           
                        </Table> */}
                        {/* {isLoading ||
                            (!isdata && (
                                <div className={cx('footer')}>
                                    <Pagination
                                        defaultCurrent={1}
                                        total={data?.totalDocs}
                                        defaultPageSize={7}
                                        current={page}
                                        onChange={handlePageChange}
                                    />
                                </div>
                            ))} */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DiscountedAdmin;
