import classNames from "classnames/bind";
import styles from './DefaultLayout.module.scss';
import Images from '~/Components/Images';
import Button from '~/Components/Button';
import Footer from '~/layouts/components/Footer';
import Header from '~/layouts/components/Header';
import Rigister, { RigisterItem } from '~/layouts/components/Rigister';
import Items, { Item } from '~/layouts/components/Menu1'
import config from '~/config';
const cx = classNames.bind(styles);
function MenuLayout({children}) {
    return ( 
            <div className={cx('wrapper')}>
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
                            <aside className={cx('fifter')}>
                                    <div className={cx('title')}>sản phẩm</div>
                                <Items>
                                    <Item to={config.routers.Coffee} title='Cà phê' />
                                    <Item title='Trà' to = {config.routers.Tea} />
                                    <Item title='Freeze' to = {config.routers.Freeze} />
                                    <Item title='Cà phê gói' to = {config.routers.Coffee1} />
                                </Items>
                                
                                </aside>
                                {/* <div className={cx('fifter')}>
                                    <div className={cx('title')}>sản phẩm</div>
                                    <div className={cx('fifter-content')}>
                                        <div className={cx('fifter-item')}>
                                            <NavLink to = '#'className={cx('fifter-name')}>Cà phê</NavLink>
                                        </div>
                                        <div className={cx('fifter-item')}>
                                            <div className={cx('fifter-name')}>Trà</div>
                                        </div>
                                        <div className={cx('fifter-item')}>
                                            <div className={cx('fifter-name')}>Freeze</div>
                                        </div>
                                        <div className={cx('fifter-item')}>
                                            <div className={cx('fifter-name')}>Cà phê gói</div>
                                        </div>
                                    </div>
                                </div> */}
                                <div className={cx('fifter')}>
                                    <div className={cx('title')}>Tìm kiếm</div>
                                    <div className={cx('fifter-content')}>
                                        <div className={cx('fifter-item')}>
                                            <div className={cx('fifter-name')}>
                                                <input
                                                    type="text"
                                                    className={cx('fifter-search')}
                                                    placeholder="Tìm kiếm"
                                                    value=""
                                                />
                                            </div>
                                            <div className={cx('radio-group')}>
                                                <div className={cx('radio-item')}>
                                                    <input type="radio" id="new" value="new" />
                                                    <label className={cx('radio-name')} for="new">
                                                        Mới nhất
                                                    </label>
                                                </div>
                                                <div className={cx('radio-item')}>
                                                    <input type="radio" id="new" value="new" />
                                                    <label className={cx('radio-name')} for="new">
                                                        Bán chạy
                                                    </label>
                                                </div>
                                                <div className={cx('radio-item')}>
                                                    <input type="radio" id="new" value="new" />
                                                    <label className={cx('radio-name')} for="new">
                                                        Đặc biệt
                                                    </label>
                                                </div>
                                                <Button className={cx('btnMenu')}>Bỏ chọn</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('content-right')}>
                                <div className={cx('main-right')}>
                              {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('rigister')}>
                <Rigister>
                <RigisterItem header='Đăng ký nhận thông tin khuyến mãi' btn = 'Đăng ký ngay' />
                </Rigister>
                </div>
               <Footer />
            </div>
        );
}

export default MenuLayout;