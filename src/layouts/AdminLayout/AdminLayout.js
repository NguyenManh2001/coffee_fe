import React, { Children, useEffect, useState } from 'react';
import { Avatar, Dropdown, Space } from 'antd';
import { HiClipboardList } from 'react-icons/hi';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import config from '~/config/config';
import { FaUserCircle, FaMoneyBillAlt } from 'react-icons/fa';
import { BsFillTrashFill } from 'react-icons/bs';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { HiOutlineNewspaper } from 'react-icons/hi';
import jwt_decode from 'jwt-decode';
import { Pagination } from 'antd';
import { Modal } from 'antd';
import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import {
    FileProtectOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    NotificationOutlined,
    TeamOutlined,
    UnorderedListOutlined,
    UploadOutlined,
    CoffeeOutlined,
    UserOutlined,
    SoundOutlined,
    BarChartOutlined,
    ReadOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import Cookies from 'js-cookie';
import Images from '~/Components/Images';
import { CoffeeIcons } from '~/Components/icons/icons';
const { Header, Sider, Content } = Layout;

const cx = classNames.bind(styles);
const AdminLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [email, setEmail] = useState();
    const handleLogout = () => {
        Cookies.remove('token');
        window.location.reload();
    };
    const token = Cookies.get('token');
    useEffect(() => {
        if (token !== undefined) {
            const deToken = jwt_decode(token);
            setEmail(deToken?.email);
            // setUser(deToken?.userId);
        }
    }, [token]);
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
        <Layout style={{ height: '941px' }}>
            <Sider trigger={null} theme="light" style={{ width: 256 }} collapsible collapsed={collapsed}>
                <Space wrap>
                    {/* {collapsed ? (
                            <Images
                            style={{ height: '50px', margin: '20px' }}
                            src={require('~/assets/images/logo_transparent.png')}
                            />
                            ) : (
                            <> */}
                    {/* <Link to={config.routers.Dasboard}> */}
                    <div className={collapsed == false ? cx('logo') : cx('logo1')}>
                        <Images
                            style={{ height: '50px', marginLeft: '17px' }}
                            src={require('~/assets/images/logo_transparent.png')}
                        />
                        {collapsed == false && (
                            <div
                                style={{
                                    fontSize: '21px',
                                    color: '#d2b780',
                                    fontFamily: 'Caveat,cursive',
                                    lineHeight: '15px',
                                }}
                            >
                                Coffee Bliss
                            </div>
                        )}
                    </div>
                    {/* </Link> */}
                    {/* </>
                        )} */}
                </Space>
                <Menu
                    style={{
                        fontSize: '18px',
                    }}
                    theme="light"
                    mode="inline"
                    onClick={(item) => {
                        navigate(item.key);
                    }}
                    defaultSelectedKeys={config.routers.Dasboard}
                    items={[
                        {
                            label: 'Tổng quan',
                            icon: <BarChartOutlined style={{ fontSize: '20px' }} />,
                            key: config.routers.Dasboard,
                        },
                        {
                            // key: config.routers.ProductAdmin,
                            label: 'Sản phẩm',
                            icon: <CoffeeOutlined style={{ fontSize: '20px' }} />,
                            children: [
                                {
                                    key: config.routers.ProductAdmin,
                                    label: 'Thông tin sản phẩm',
                                    // icon: <CoffeeOutlined style={{ fontSize: '20px' }} />,
                                },
                                {
                                    key: config.routers.ToppingAdmin,
                                    label: 'Topping',
                                    // icon: <CoffeeOutlined style={{ fontSize: '20px' }} />,
                                },
                                {
                                    key: config.routers.IngredientAdmin,
                                    label: 'Nguyên liệu',
                                    // icon: <CoffeeOutlined style={{ fontSize: '20px' }} />,
                                },
                            ],
                        },
                        {
                            key: config.routers.Customer,
                            label: 'Khách Hàng',
                            icon: <TeamOutlined style={{ fontSize: '20px' }} />,
                        },
                        {
                            label: 'Đơn Hàng',
                            icon: <FileProtectOutlined style={{ fontSize: '20px' }} />,
                            key: config.routers.Order,
                        },
                        {
                            label: 'Tin tức',
                            icon: <ReadOutlined style={{ fontSize: '20px' }} />,
                            key: config.routers.NewsAdmin,
                        },
                        {
                            label: 'Khuyến mãi',
                            icon: <SoundOutlined style={{ fontSize: '20px' }} />,
                            key: config.routers.DiscountedAdmin,
                        },
                        {
                            label: 'Thực đơn',
                            icon: <UnorderedListOutlined style={{ fontSize: '20px' }} />,
                            key: config.routers.MenuAdmin,
                        },
                        {
                            label: 'Giới thiệu về chúng tôi',
                            icon: <UserOutlined style={{ fontSize: '20px' }} />,
                            key: config.routers.AboutsAdmin,
                        },
                        {
                            label: 'Quảng cáo',
                            icon: <NotificationOutlined style={{ fontSize: '20px' }} />,
                            key: config.routers.SibarAdmin,
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
                                <Avatar size={40} style={{ marginRight: '10px' }} icon={<UserOutlined />} />
                                <span style={{ marginRight: '20px' }}>{email?.split('@')[0]}</span>
                            </NavLink>
                        </Dropdown>
                    </>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        overflow: 'scroll',
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
