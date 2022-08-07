import classNames from "classnames/bind";
import styles from './DefaultLayout.module.scss';
import Images from '~/Components/Images';
import Button from '~/Components/Button';
import Footer from '~/layouts/components/Footer';
import Header from '~/layouts/components/Header';
import Rigister, { RigisterItem } from '~/layouts/components/Rigister';
import Items, { Item } from '~/layouts/components/Menu1'
import config from '~/config';
import { useState } from "react";

const checks = [
    {
        id: 1 ,
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
]
const cx = classNames.bind(styles);

function MenuLayout({children}) {

    const [checked,setChecked] = useState();
    const [input,setInput] = useState('');
    const handleSubmit = () => {
         setChecked();
    }

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
                                <div className={cx('fifter')}>
                                    <div className={cx('title')}>Tìm kiếm</div>
                                    <div className={cx('fifter-content')}>
                                        <div className={cx('fifter-item')}>
                                            <div className={cx('fifter-name')}>
                                                <input
                                                    type="text"
                                                    className={cx('fifter-search')}
                                                    placeholder="Tìm kiếm"
                                                    onChange={(e) => setInput(e.target.value)}
                                                    value={input}
                                                />
                                            </div>
                                            <div className={cx('radio-group')}>
                                                <div className={cx('radio-item')}>
                                                   {checks.map(check => (
                                                    <div key={check.id}>
                                                        <input 
                                                        type='radio'
                                                        checked={checked === check.id}
                                                        onChange={() => setChecked(check.id)}
                                                        />
                                                        <span className={cx('radio-name')}>{check.name}</span>
                                                    </div>
                                                   ))}
                                                </div>
                                                <Button onClick={handleSubmit} className={cx('btnMenu')}>Bỏ chọn</Button>
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