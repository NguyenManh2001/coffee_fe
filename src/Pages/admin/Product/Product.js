import classNames from 'classnames/bind';
import styles from './Product.module.scss';
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
import EditMenu from './EditProduct';
import { Empty, Button, Modal, message, Alert, Input } from 'antd';
import { formatTime } from '~/Components/FormatDate/FormatDate';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { MapContainer } from '~/Components/Map/Map';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import ExcelDropzone from '~/Components/exelUpload/exelUpload';

const { Search } = Input;
const { confirm } = Modal;
const cx = classNames.bind(styles);

function Product() {
    const [page, setPage] = useState(1);
    const [type, setType] = useState('');
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [uploadExel, setUploadExel] = useState(false);
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
                    .delete(`https://coffee-bills.onrender.com/product/deleteProduct/${id}`)
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

    const onSearch = (value, _e, info) => console.log(info?.source, value);
    const datas = useSelector(searchitemSelector);
    const handleSelected = (value) => {
        if (value === 'Tất cả') {
            setType('');
        } else {
            setType(value);
        }
        dispatch(filterSlice.actions.list(value));
    };
    console.log(type);
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
    const handleUploadExel = () => {
        setUploadExel(!uploadExel);
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
            <EditMenu data={editData} />
        </Modal>
    );
    const ModalUploadExel = (data) => (
        <Modal
            centered
            open={uploadExel}
            onOk={() => setUploadExel(false)}
            onCancel={() => setUploadExel(false)}
            width={1000}
            footer={null}
        >
            <ExcelDropzone />
        </Modal>
    );
    // useEffect(() => {
    //     axios
    //         .post('/Product/ListMenu')
    //         .then((res) => {
    //             dispatch(listsMenuSlice.actions.addListMenu(res.data));
    //             dispatch(filterSlice.actions.list(selected));
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);
    const { isLoading, data, refetch } = useQuery({
        queryKey: ['data', type, page, search],
        queryFn: () =>
            axios
                .post('https://coffee-bills.onrender.com/product/listProduct', { page, type, search })
                .then((res) => res.data),
    });

    const isdata = !data?.docs?.length;
    const compareDate = (a, b) => {
        const dateA = moment(a.createdAt);
        const dateB = moment(b.createdAt);
        return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    };
    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ảnh',
            dataIndex: 'link',
            key: 'link',

            className: cx('custom-column'),
            render: (text, record) => (
                <span>
                    {' '}
                    <img style={{ width: '100%', height: '100%' }} src={record?.link} />
                </span>
            ),
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            key: 'price',
            sorter: {
                compare: (a, b) => a.price - b.price,
                multiple: 2,
                tooltip: 'Sắp xếp theo ngày tạo',
            },
            render: (text, record) => <span>{record.price.toLocaleString('vi-VN')} VND</span>,
        },
        {
            title: 'Giảm giá(%)',
            dataIndex: 'discounted',
            key: 'discounted',

            render: (text, record) => <span>{record.discounted ? record.discounted : 0} %</span>,
        },
        {
            title: 'Thời gian nhập',
            dataIndex: 'createdAt',
            key: 'createdAt',
            className: cx('custom-create'),
            sorter: {
                compare: (a, b) => compareDate(a, b),
                multiple: 2,
                tooltip: 'Sắp xếp theo ngày tạo',
            },
            style: {
                with: '155px',
            },
            render: (text, record) => <span>{formatTime(record?.createdAt)}</span>,
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
                    <div className={cx('NameHeader')}>danh sách sản phẩm</div>
                    <div className={cx('btnHeader')}>
                        <Link to={config.routers.AddProduct} className={cx('btnIconAdd')}>
                            <AddIcons className={cx('IconAdd')} />
                            Thêm mới
                        </Link>
                        {/* <Link onClick={() => handleUploadExel()} to="#" className={cx('btnIconAdd')}>
                            <AddIcons className={cx('IconAdd')} />
                            Upload excel
                        </Link> */}
                    </div>
                </div>
                <ModalEdit />
                <ModalUploadExel />
                <div className={cx('headerContent')}>
                    <div className={cx('leftContent')}>
                        <div className={cx('name')}>Loại sản phẩm:</div>
                        <Select
                            defaultValue="Tất cả"
                            style={{ width: 120 }}
                            onChange={handleSelected}
                            options={[
                                { value: 'Tất cả', label: 'Tất cả' },
                                { value: 'Coffee', label: 'Coffee' },
                                { value: 'Freeze', label: 'Freeze' },
                                { value: 'Tea', label: 'Tea' },
                            ]}
                        />
                        {/* <div className={cx('name')}>bản ghi trên trang</div> */}
                    </div>
                    <div className={cx('rightContent')}>
                        <Search
                            placeholder="Tìm kiếm theo tên sản phẩm"
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
                                <tr style={{ textAlign: 'center' }}>
                                    <th>STT</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Ảnh</th>
                                    <th>Giá</th>
                                    <th>Thời gian nhập</th>
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
                                        {/* {data?.docs?.map((menu, index) => (
                                                    <tr
                                                        key={menu._id}
                                                        style={{ lineHeight: '65px', textAlign: 'center' }}
                                                    >
                                                        <td>{index + 1}</td>
                                                        <td>{menu.name}</td>
                                                        <td style={{ width: '100px' }}>
                                                            <img
                                                                style={{ width: '100%', height: ' 70px' }}
                                                                src={menu?.link}
                                                            />
                                                        </td>
                                                        <td>{menu.price.toLocaleString('vi-VN')} VND</td>
                                                        <td>{formatTime(menu.createdAt)}</td>
                                                        <td>
                                                            <Link
                                                                className={cx('icon')}
                                                                to="#"
                                                                onClick={() => handleUpdate(menu)}
                                                            >
                                                                <BiEditAlt />
                                                            </Link>
                                                            <Link
                                                                className={cx('icon')}
                                                                to="#"
                                                                onClick={() => handldeDelete(menu._id)}
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
                          
                        </Table>
                        {isLoading ||
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

export default Product;
