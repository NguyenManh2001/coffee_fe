import classNames from "classnames/bind";
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Menu() {
    return (  
        <div className={cx('wrapper')}></div>
    );
}

export default Menu;