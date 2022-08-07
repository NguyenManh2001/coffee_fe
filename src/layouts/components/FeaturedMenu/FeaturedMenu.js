import classNames from 'classnames/bind';
import styles from './FeaturedMenu.module.scss';
import Images from '~/Components/Images';
import { StarIcons } from '~/Components/icons/icons';
import Menu, { MenuItems } from './Menu';
import Button from '~/Components/Button';
import config from '~/config';
import Rigister, { RigisterItem } from '../Rigister';
import Product from '../Product';
import { useState,useEffect } from 'react';
const cx = classNames.bind(styles);
function FeatureMenu() {

    const [product,setProduct] = useState(false);

    const handleSubmit= () => {
        setProduct(!product) ;
    }
    
    // useEffect(() => {
    //     if(product === true){
    //         setProduct(false);
    //     }
    // },[product]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('header')}>Sản phẩm nổi bật</h2>
                <div className={cx('lineborder')}>
                    <Images src="https://coffee-cup-react.vercel.app/images/line-under-heading.png" alt="lineborder" />
                </div>
                <Menu>
                    <MenuItems
                        star="anh"
                        src="https://coffee-cup-react.vercel.app/images/sp-2-cafe-mocha-nong.jpg"
                        price="35,000đ"
                        title="Cà Phê Mocha"
                        icon={<StarIcons />}
                        onClick = {handleSubmit}
                    />
                    <MenuItems
                        star="anh"
                        src="https://coffee-cup-react.vercel.app/images/sp-4-americano.jpg"
                        price="35,000đ"
                        title="Americano"
                        icon={<StarIcons />}
                        onClick = {handleSubmit}
                    />
                    <MenuItems
                        star="anh"
                        src="https://coffee-cup-react.vercel.app/images/sp-5-mocha-socola.jpg"
                        price="35,000đ"
                        title="Mocha Socola"
                        icon={<StarIcons />}
                        onClick = {handleSubmit}
                    />
                    <MenuItems
                        star="anh"
                        src="https://coffee-cup-react.vercel.app/images/sp-6.jpg"
                        price="35,000đ"
                        title="Mocha Caramel"
                        icon={<StarIcons />}
                        onClick = {handleSubmit}
                    />
                </Menu>
                <div className={cx('btn')}>
                    <Button className={cx('btnMenu')} to={config.routers.Menu}>Xem tất cả menu</Button>
                </div>
                <div className={cx('rigister')}>
               <Rigister>
               <RigisterItem header='Đăng ký nhận thông tin khuyến mãi' btn = 'Đăng ký ngay' />
               </Rigister>
               </div>
            </div>
            <>
            {product ? (
            <Product />
            ) : (
                <div></div>
            )}
            </>
        </div>
    );
}

export default FeatureMenu;
