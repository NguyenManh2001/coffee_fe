import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Images from '~/Components/Images';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Alert, Rate, Space, Spin } from 'antd';
const cx = classNames.bind(styles);
function Menu() {
    const { isLoading, data, refetch } = useQuery({
        queryKey: ['menu'],
        queryFn: () => axios.post('https://coffee-bills.onrender.com/menu/listMenu').then((res) => res.data),
    });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('header')}>Thực Đơn</h2>
                <div className={cx('lineborder')}>
                    <Images src={require('~/assets/images/line-under-heading.png')} alt="lineborder" />
                </div>
                {isLoading ? (
                    <div className={cx('loading')}>
                        <Spin style={{ color: 'red' }} />
                    </div>
                ) : (
                    <div className={cx('menu')}>
                        {data?.docs.map((data) => (
                            <MenuItem
                                key={data?._id}
                                className={cx('menu-item', 'item-1')}
                                style={{ backgroundImage: `url(${data?.image})` }}
                            >
                                <div className={cx('menu-content')}>
                                    <h4 className={cx('title-coffee')}>{data?.name}</h4>
                                    <div className={cx('item-border')}></div>
                                    <Link className={cx('item-add')} to="/Menu/Coffee">
                                        Xem thêm
                                    </Link>
                                </div>
                                <div className={cx('itemImage')}></div>
                            </MenuItem>
                        ))}
                        {/* <div className={cx('menu-item', 'menu-item-center')}>
                        <div className={cx('menu-content')}>
                            <h4 className={cx('title-coffee')}>Trà</h4>
                            <div className={cx('item-border')}></div>
                            <Link className={cx('item-add')} to="/Menu/tea">
                                Xem thêm
                            </Link>
                        </div>
                        <div className={cx('itemImage')}></div>
                    </div>
                    <div className={cx('menu-item', 'item-3')}>
                        <div className={cx('menu-content')}>
                            <h4 className={cx('title-coffee')}>Freeze</h4>
                            <div className={cx('item-border')}></div>
                            <Link className={cx('item-add')} to="/Menu/Freeze">
                                Xem thêm
                            </Link>
                        </div>
                        <div className={cx('itemImage')}></div>
                    </div> */}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Menu;

const MenuItem = styled.div`
    /* Các thuộc tính CSS */
    background-size: cover;
    border-radius: 16px;

    /* Hiệu ứng hover */
    &:hover {
        box-shadow: 0 4px 14px 2px #00000080;
        transform: translateY(-8px);
    }
`;
