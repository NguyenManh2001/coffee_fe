import React, { Children, useState } from 'react';
import { Avatar, Dropdown, Space } from 'antd';
import { HiClipboardList } from 'react-icons/hi';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import config from '~/config/config';
import { FaUserCircle, FaMoneyBillAlt } from 'react-icons/fa';
import { BsFillTrashFill } from 'react-icons/bs';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { Pagination } from 'antd';
import { Modal } from 'antd';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import Cookies from 'js-cookie';
const { Header, Sider, Content } = Layout;

const AdminLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const handleLogout = () => {
        Cookies.remove('token');
        window.location.reload();
    };

    const items = [
        {
            key: '1',
            label: (
                <NavLink to="#" onClick={handleLogout}>
                    Đăng xuất
                </NavLink>
            ),
        },
    ];
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    // const handleHover = () => {
    //     setShowModal(true); // Hiển thị modal khi hover
    // };
    // const handleMouseLeave = () => {
    //     setShowModal(false); // Ẩn modal khi rời chuột
    // };
    return (
        <Layout style={{ height: '948px' }}>
            <Sider trigger={null} style={{ width: 256 }} collapsible collapsed={collapsed}>
                <Space wrap>
                    <div style={{ height: '50px' }}></div>
                </Space>
                <Menu
                    style={{ fontSize: '18px' }}
                    theme="dark"
                    mode="inline"
                    onClick={(item) => {
                        navigate(item.key);
                    }}
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            label: 'Sản phẩm',
                            icon: <HiClipboardList style={{ fontSize: '20px' }} />,
                            key: config.routers.MenuAdmin,
                        },
                        {
                            key: config.routers.Customer,
                            label: 'Khách Hàng',
                            icon: <HiOutlineUserGroup style={{ fontSize: '20px' }} />,
                        },
                        {
                            label: 'Hóa Đơn',
                            icon: <FaMoneyBillAlt style={{ fontSize: '20px' }} />,
                            key: config.routers.Invoice,
                        },
                        {
                            label: 'Tin tức',
                            icon: <HiOutlineNewspaper style={{ fontSize: '20px' }} />,
                            key: config.routers.NewsAdmin,
                        },
                        {
                            label: 'Tài Khoản',
                            icon: <FaUserCircle style={{ fontSize: '20px' }} />,
                            key: config.routers.Account,
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <Dropdown
                            // className={cx('ColorLoginIcon')}
                            menu={{
                                items,
                            }}
                            placement="bottom"
                            arrow={{
                                pointAtCenter: true,
                            }}
                        >
                            <NavLink to="#">
                                <Avatar size={40} style={{ marginRight: '30px' }} icon={<UserOutlined />} />
                            </NavLink>
                        </Dropdown>
                    </>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
