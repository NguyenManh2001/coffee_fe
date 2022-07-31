import classNames from 'classnames/bind';
import { CartIcons, LoginIcons } from '~/Components/icons/icons';
import Images from '~/Components/Images';
import config from '~/config';
import styles from './Header.module.scss';
import Menu, { MenuItem } from './menu';
const cx = classNames.bind(styles);
function Header() {
    return (
        <div className={cx('wraper')}>
             <div className={cx('container')}>
                 <Images className={cx('logo')} src="https://coffee-cup-react.vercel.app/images/logo-2.png"/>
                
                 <Menu>
                    <MenuItem title='Trang chủ' to={config.routers.Home}/>
                    <MenuItem title='Menu' to={config.routers.Menu}/>
                    <MenuItem title='Tin tức' to={config.routers.News}/>
                    <MenuItem title='Liên hệ' to={config.routers.Contact}/>
                    <MenuItem title='Chúng tôi' to={config.routers.About}/>
                 </Menu>
                  
                <div>
                 <a className={cx('ColorIcon')}><CartIcons /></a>
                 <a className={cx('ColorIcon')}><LoginIcons /></a>
                 </div>
            </div>
        </div>
    )
}

export default Header;