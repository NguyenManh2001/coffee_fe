import classNames from "classnames/bind";
import styles from './Rigister.module.scss';

const cx = classNames.bind(styles);

function Rigister({children}) {
    return ( 
        <div className={cx('register')}>{children}</div>
     );
}

export default Rigister;