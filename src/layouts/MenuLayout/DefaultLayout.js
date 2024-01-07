import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Images from '~/Components/Images';
import Button from '~/Components/Button';
import Footer from '~/layouts/components/Footer';
import Header from '~/layouts/components/Header';
import Rigister, { RigisterItem } from '~/layouts/components/Rigister';
import Items, { Item } from '~/layouts/components/Menu1';
import config from '~/config';
import { useState } from 'react';
import FeatureMenu from '../components/FeaturedMenu/FeaturedMenu';
import Coffee from '~/Pages/Coffee';
import { Link, NavLink } from 'react-router-dom';
import { MenuItems1 } from '~/layouts/components/FeaturedMenu/Menu1';
import MenuFeat from '~/layouts/components/FeaturedMenu/Menu1/Menu1';
import { StarIcons } from '~/Components/icons/icons';
import { BsStar } from 'react-icons/bs';
import Product from '~/layouts/components/Product';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Empty, Input, Menu, Spin } from 'antd';
import { Rate } from 'antd';
import { Pagination } from 'antd';
import Search from 'antd/es/input/Search';
import moment from 'moment';
import { useParams } from 'react-router-dom';
function getItem(label, key, children, type) {
    return {
        key,
        children,
        label,
        type,
    };
}
const checks = [
    {
        id: 1,
        name: 'Mới nhất',
    },
    {
        id: 2,
        name: 'Bán chạy',
    },
    {
        id: 3,
        name: 'Đặc biệt',
    },
];
const cx = classNames.bind(styles);

function MenuLayout({ children }) {
    const [checked, setChecked] = useState();
    const [input, setInput] = useState('');
    const [select, setSelect] = useState(false);
    const handleSubmit = () => {
        setChecked();
    };
    // console.log(type);
    const { productName } = useParams();
    const [product, setProduct] = useState(false);
    const [header, setHeader] = useState(1);
    const [page, setPage] = useState('');
    const [name, setName] = useState('');
    const [limit, setLimit] = useState(6);
    const [type, setType] = useState(productName);
    const [search, setSearch] = useState('');
    const onClick = (e) => {
        if (e.key === '1') {
            setType('Coffee');
        }
        if (e.key === '2') {
            setType('Freeze');
        }
        if (e.key === '3') {
            setType('Tea');
        }
        //   if(e.key === "4"){
        //     setType('Coffee');
        //   }
    };
    // const sliderRef = useRef(null);
    const {
        isLoading: isLoading,
        data: data,
        refetch: refetch,
    } = useQuery({
        queryKey: ['data', type, page, search, limit],
        queryFn: () =>
            axios
                .post('https://coffee-bills.onrender.com/product/listProduct', { page, type, search, limit })
                .then((res) => res.data),
    });
    const {
        isLoading: isLoadingMenu,
        data: dataMenu,
        refetch: refetchData,
    } = useQuery({
        queryKey: ['menu'],
        queryFn: () => axios.post('https://coffee-bills.onrender.com/menu/listMenu').then((res) => res.data),
    });
    const items = dataMenu?.docs;
    const renderItems = () => {
        return data?.docs?.map((MENU, index) => {
            const currentTime = moment(); // Thời gian hiện tại
            const filteredDiscounts = MENU.discounts.filter((element) => {
                const startDate = moment(element.startDate); // Thời gian bắt đầu
                const endDate = moment(element.endDate); // Thời gian kết thúc
                return currentTime.isBetween(startDate, endDate);
            });
            if (MENU._id === header) {
                return (
                    <div key={header}>
                        {product && (
                            <Product
                                key={MENU._id}
                                _id={MENU._id}
                                src={MENU.link}
                                name={MENU.name}
                                cart={
                                    filteredDiscounts.length > 0
                                        ? filteredDiscounts.map(
                                              (data) => MENU.price - MENU.price * (data.discounted / 100),
                                          )
                                        : MENU.discounted
                                        ? MENU.price - (MENU.price * MENU.discounted) / 100
                                        : MENU.price
                                }
                                onClick={() => {
                                    setProduct(false);
                                }}
                            />
                        )}
                    </div>
                );
            }
        });
    };
    const handleClick = () => {
        setType('Freeze');
    };
    const handleCoffee = (data) => {
        // if (data === 'Cà Phê') {
        //     setType('Coffee');
        //     setName('Coffee');
        // } else if (data === 'Trà') {
        //     setType('Tea');
        //     setName('Tea');
        // } else {
        //     setType(data);
        //     setName(data);
        // }
        // setSelect(!select);
        setType(data);
    };
    const handleSearch = (e) => {
        setSearch(e);
        // dispatch(filterSlice.actions.searchListMenu(result));
    };
    const handlePageChange = (page) => {
        setPage(page);
    };
    const isdata = !data?.docs?.length;
    return (
        <div id="top" className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('header')}></div>
                <div className={cx('content')}>
                    <h2 className={cx('header-content')}>Menu</h2>
                    <div className={cx('lineborder')}>
                        <Images
                            src="https://coffee-cup-react.vercel.app/images/line-under-heading.png"
                            alt="lineborder"
                        />
                    </div>
                    <div className={cx('main-content')}>
                        <div className={cx('content-left')}>
                            <div className={cx('fifter')}>
                                <div className={cx('title')}>Tìm kiếm</div>
                                <div className={cx('fifter-content')}>
                                    <div className={cx('fifter-item')}>
                                        <div className={cx('fifter-name')}>
                                            <Search
                                                placeholder="Tìm kiếm"
                                                onSearch={handleSearch}
                                                style={{
                                                    width: 200,
                                                }}
                                            />
                                        </div>
                                        {/* <div className={cx('radio-group')}> */}
                                        {/* <div className={cx('radio-item')}>
                                                {checks.map((check) => (
                                                    <div key={check.id}>
                                                        <input
                                                            type="radio"
                                                            checked={checked === check.id}
                                                            onChange={() => setChecked(check.id)}
                                                        />
                                                        <span className={cx('radio-name')}>{check.name}</span>
                                                    </div>
                                                ))}
                                            </div>  */}
                                        {/* <Button onClick={handleSubmit} className={cx('btnMenu')}>
                                                Tìm kiếm
                                            </Button>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <aside className={cx('fifter')}>
                                {/* <div className={cx('title1')}>Sản phẩm</div>
                                <Menu
                                    onClick={onClick}
                                    style={{
                                        width: 212,
                                        height: 200,
                                    }}
                                    // defaultSelectedKeys={['1']}
                                    // defaultOpenKeys={['sub1']}
                                    mode="inline"
                                    items={items}
                                    className={cx('custom-menu')}
                                /> */}
                                <div className={cx('title1')}>sản phẩm</div>
                                <div style={{ padding: '0 12px' }}>
                                    {dataMenu?.docs.map((data) => (
                                        <NavLink
                                            className={
                                                data.name === type
                                                    ? (nav) => cx('fifter-item', { active: nav.isActive })
                                                    : cx('fifter-item')
                                            }
                                            onClick={() => handleCoffee(data.name)}
                                            to="#"
                                        >
                                            <div className={cx('fifter-name')}>{data.name}</div>
                                        </NavLink>
                                    ))}
                                </div>
                            </aside>
                        </div>
                        <div className={cx('content-right')}>
                            <div className={cx('main-right')}>
                                <div className={cx('wrapper')}>
                                    {isLoading ? (
                                        <div className={cx('loading')}>
                                            <Spin style={{ color: 'red' }} />
                                        </div>
                                    ) : (
                                        <div className={cx('content-right')}>
                                            {isdata ? (
                                                <Empty style={{ paddingTop: '110px' }} />
                                            ) : (
                                                <>
                                                    <div className={cx('main-right')}>
                                                        <MenuFeat className={cx('menu')}>
                                                            {data?.docs?.map((MENU, index) => (
                                                                <MenuItems1
                                                                    key={MENU._id}
                                                                    // autoPlay={3}
                                                                    star={
                                                                        <Rate
                                                                            allowHalf
                                                                            defaultValue={2.5}
                                                                            className={cx('rate')}
                                                                        />
                                                                    }
                                                                    src={MENU.link}
                                                                    price={MENU.price}
                                                                    title={MENU.name}
                                                                    discounted={MENU.discounted}
                                                                    discounts={MENU.discounts}
                                                                    icon={<StarIcons />}
                                                                    onClick={() => {
                                                                        setProduct(!product);
                                                                        setHeader(MENU._id);
                                                                    }}
                                                                />
                                                            ))}
                                                        </MenuFeat>
                                                    </div>
                                                    <div className={cx('pagination')} style={{ textAlign: 'center' }}>
                                                        <Pagination
                                                            defaultCurrent={1}
                                                            total={data?.totalDocs}
                                                            defaultPageSize={6}
                                                            current={page}
                                                            onChange={handlePageChange}
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    )}
                                    {renderItems()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className={cx('rigister')}>
                <Rigister>
                    <RigisterItem header="Đăng ký nhận thông tin khuyến mãi" btn="Đăng ký ngay" />
                </Rigister>
            </div> */}
            <Footer />
        </div>
    );
}

export default MenuLayout;
