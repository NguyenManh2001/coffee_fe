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
import { Input, Menu } from 'antd';
import { Rate } from 'antd';
import { Pagination } from 'antd';
import Search from 'antd/es/input/Search';
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
    const [product, setProduct] = useState(false);
    const [header, setHeader] = useState(1);
    const [page, setPage] = useState('');
    const [limit, setLimit] = useState(6);
    const [type, setType] = useState('');
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
    const { isLoading, data, refetch } = useQuery({
        queryKey: ['data', type, page, search, limit],
        queryFn: () =>
            axios
                .post('https://coffee-bills.onrender.com/product/listProduct', { page, type, search, limit })
                .then((res) => res.data),
    });
    console.log(type);
    const items = [
        getItem(
            'SẢN PHẨM',
            'grp',
            [getItem('Cà phê', '1'), getItem('Freeze', '2'), getItem('Trà', '3'), getItem('Cà phê gói', '4')],
            'group',
        ),
        // getItem(
        //     'Tìm kiếm',
        //     'grp',
        //     null,
        //     [
        //         getItem(<Input placeholder="Tìm kiếm theo tên sản phẩm" />, '5'),
        //         getItem(
        //             <Button className={cx('btnMenu')} style={{ margin: '10px 29px', height: '40px' }}>
        //                 Tìm kiếm
        //             </Button>,
        //             '6',
        //         ),
        //     ],
        //     'group',
        // ),
    ];
    const renderItems = () => {
        return data?.docs?.map((MENU, index) => {
            if (MENU._id === header) {
                return (
                    <div key={header}>
                        {product && (
                            <Product
                                key={MENU._id}
                                _id={MENU._id}
                                src={MENU.link}
                                name={MENU.name}
                                cart={MENU.price}
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
    const handleCoffee = () => {
        setType('Coffee');
        setSelect(!select);
    };
    const handleSearch = (e) => {
        setSearch(e);
        // dispatch(filterSlice.actions.searchListMenu(result));
    };
    const handlePageChange = (page) => {
        setPage(page);
    };
    console.log(data);
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
                                                placeholder="input search text"
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
                                <Menu
                                    onClick={onClick}
                                    style={{
                                        width: 212,
                                        height: 230,
                                    }}
                                    // defaultSelectedKeys={['1']}
                                    // defaultOpenKeys={['sub1']}
                                    mode="inline"
                                    items={items}
                                />
                                {/* <div className={cx('title')}>sản phẩm</div> */}
                                {/* <Items> */}
                                {/* <Link to="#" onClick={handleCoffee}>
                                        Cà phê
                                    </Link> */}
                                {/* <NavLink
                                        className={
                                            select
                                                ? (nav) => cx('fifter-item', { active: nav.isActive })
                                                : cx('fifter-item')
                                        }
                                        onClick={handleCoffee}
                                        to="#"
                                    >
                                        <div className={cx('fifter-name')}>Cà phê</div>
                                    </NavLink>
                                    <NavLink
                                        className={(nav) => cx('fifter-item', { active: nav.isActive })}
                                        onClick={() => setType('Tea')}
                                        to="#"
                                    >
                                        <div className={cx('fifter-name')}>Tea</div>
                                    </NavLink> */}
                                {/* <Item title="Trà" to={config.routers.Tea} /> */}
                                {/* <Item title="Freeze" to={config.routers.Freeze} /> */}
                                {/* <Link to="#" onClick={handleClick}>
                                        Freeze
                                    </Link> */}
                                {/* <NavLink
                                        className={(nav) => cx('fifter-item', { active: nav.isActive })}
                                        onClick={handleClick}
                                        to="#"
                                    >
                                        <div className={cx('fifter-name')}>Freeze</div>
                                    </NavLink>
                                    <Item title="Cà phê gói" to={config.routers.Coffee1} />
                                </Items> */}
                            </aside>
                        </div>
                        <div className={cx('content-right')}>
                            <div className={cx('main-right')}>
                                <div className={cx('wrapper')}>
                                    <div className={cx('content-right')}>
                                        <div className={cx('main-right')}>
                                            <MenuFeat className={cx('menu')}>
                                                {data?.docs?.map((MENU, index) => (
                                                    <MenuItems1
                                                        key={MENU._id}
                                                        // autoPlay={3}
                                                        star={<Rate allowHalf defaultValue={2.5} />}
                                                        src={MENU.link}
                                                        price={MENU.price}
                                                        title={MENU.name}
                                                        icon={<StarIcons />}
                                                        onClick={() => {
                                                            setProduct(!product);
                                                            setHeader(MENU._id);
                                                        }}
                                                    />
                                                ))}
                                            </MenuFeat>
                                        </div>
                                        <div style={{ textAlign: 'center', margin: '35px' }}>
                                            <Pagination
                                                defaultCurrent={1}
                                                total={data?.totalDocs}
                                                defaultPageSize={6}
                                                current={page}
                                                onChange={handlePageChange}
                                            />
                                        </div>
                                    </div>
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
