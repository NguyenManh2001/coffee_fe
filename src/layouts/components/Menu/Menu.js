import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Images from '~/Components/Images';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Alert, Rate, Space, Spin } from 'antd';
import Button from '~/Components/Button';
import { useState } from 'react';
const cx = classNames.bind(styles);
function Menu() {
    const [limit, setLimit] = useState(3);
    const navigate = useNavigate();
    const { isLoading, data, refetch } = useQuery({
        queryKey: ['menu', limit],
        queryFn: () => axios.post('https://coffee-bills.onrender.com/menu/listMenu', { limit }).then((res) => res.data),
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
                                onClick={() => {
                                    navigate(`/Menu/${data?.name}`);
                                }}
                                className={cx('menu-item', 'item-1')}
                                style={{ backgroundImage: `url(${data?.image})` }}
                            >
                                <div className={cx('menu-content')}>
                                    <h4 className={cx('title-coffee')}>{data?.name}</h4>
                                    <div className={cx('item-border')}></div>
                                    <Link className={cx('item-add')} to={`/Menu/${data?.name}`}>
                                        Xem thêm
                                    </Link>
                                </div>
                                <div className={cx('itemImage')}></div>
                            </MenuItem>
                        ))}
                    </div>
                )}
                <div className={cx('btn')}>
                    {data?.docs.length === data?.totalDocs ? (
                        <Button
                            className={cx('btnMenu')}
                            style={{ width: '200px' }}
                            onClick={() => setLimit(limit - 3)}
                        >
                            Ẩn
                        </Button>
                    ) : (
                        <Button
                            className={cx('btnMenu')}
                            style={{ width: '200px' }}
                            onClick={() => setLimit(limit + 3)}
                        >
                            Xem thêm
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Menu;

const MenuItem = styled.div`
    /* Các thuộc tính CSS */
    background-size: cover;
    border-radius: 16px;
    width: 30.3333%;
    margin: 16px 0;
    &:hover {
        box-shadow: 0 4px 14px 2px #00000080;
        transform: translateY(-8px);
    }
`;
