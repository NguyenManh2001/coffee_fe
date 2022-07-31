
import classNames from "classnames/bind";
import styles from './Menu.module.scss'

const cx = classNames.bind(styles);

function Menu({children}) {
    return ( 
        // <div className={cx('fifter-content')}>{children}</div>
        <nav className={cx('fifter-content')}>{children}</nav>
     );
}

export default Menu;