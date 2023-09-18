import classNames from 'classnames/bind';
import styles from './Customer.module.scss';
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
import { QuestionCircleOutlined } from '@ant-design/icons';
import EditCustomer from './EditCustomer';

const { Search } = Input;
const { confirm } = Modal;
const cx = classNames.bind(styles);

function Customer() {
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState();
    const [page, setPage] = useState(1);
    const [select, setSelect] = useState(10);
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const successMessage = location.state?.successMessage;

    const [messageApi, contextHolder] = message.useMessage(successMessage);

    const success = (message) => {
        messageApi.open({
            type: 'success',
            content: message,
        });
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
                    .delete(`/customer/deleteCustomer/${id}`)
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
        console.log(value);
        dispatch(filterSlice.actions.list(value));
    };
    const handleSearch = (e) => {
        setSearch(e);
        // dispatch(filterSlice.actions.searchListMenu(result));
    };
    const { isLoading, data, refetch } = useQuery({
        queryKey: ['dataCustomer', select, page, search],
        queryFn: () => axios.post('/customer/listCustomer', { page, select, search }).then((res) => res.data),
    });
    const onSearch = (value, _e, info) => console.log(info?.source, value);
    const datas = useSelector(searchitemSelector);
    const handleUpdate = (data) => {
        setOpen(!open);
        setEditData(data);
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
            <EditCustomer data={editData} handle={open} />
        </Modal>
    );
    // useEffect(() => {
    //     axios
    //         .post('/ Customer/ListMenu')
    //         .then((res) => {
    //             dispatch(listsMenuSlice.actions.addListMenu(res.data));
    //             dispatch(filterSlice.actions.list(selected));
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    const isdata = !datas?.length;

    return (
        <div className={cx('Wrapper')}>
            {contextHolder}
            <div className={cx('Container')}>
                <div className={cx('header')}>
                    <div className={cx('NameHeader')}>danh sách khách hàng</div>
                    <div className={cx('btnHeader')}>
                        <Link to={config.routers.AddCustomer} className={cx('btnIconAdd')}>
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
                                    <th>Giới tính</th>
                                    <th>Địa chỉ</th>
                                    <th>Email</th>
                                    <th>Số điện thoại</th>
                                    <th>Thời gian mua</th>
                                    <th colSpan={2}>Chức năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.docs?.map((data, index) => (
                                    <tr key={data._id}>
                                        <td>{index + 1}</td>
                                        <td>{data.name}</td>
                                        <td>{data.gender}</td>
                                        <td>{data.address}</td>
                                        <td>{data.email}</td>
                                        <td>{data.number}</td>
                                        <td>{formatTime(data.createdAt)}</td>
                                        <td>
                                            <Link className={cx('icon')} to="#" onClick={() => handleUpdate(data)}>
                                                <BiEditAlt />
                                            </Link>
                                            <Link className={cx('icon')} onClick={() => handleDelete(data._id)} to="#">
                                                <RiDeleteBin6Line />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className={cx('footer')}>
                            <Pagination
                                defaultCurrent={1}
                                total={data?.limit <= 10 ? data.total : 10}
                                current={page}
                                onChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Customer;
