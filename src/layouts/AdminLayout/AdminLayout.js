import React, { Children, useState } from 'react';
import { Avatar, Space } from 'antd';
import { HiClipboardList } from 'react-icons/hi';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import config from '~/config/config';
import { FaUserCircle, FaMoneyBillAlt } from 'react-icons/fa';
import { BsFillTrashFill } from 'react-icons/bs';
import { HiOutlineUserGroup } from 'react-icons/hi';
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
const { Header, Sider, Content } = Layout;
const AdminLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
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
                <Space wrap size={16}>
                    <Avatar size={64} icon={<UserOutlined />} />
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
                    }}
                >
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
