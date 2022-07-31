import classNames from "classnames/bind";
import styles from './footer.module.scss';

const cx = classNames.bind(styles);

function Content({children}) {
    return ( 
        <div className={cx('wrapper')}>
            {children}
        </div>
     );
}

export default Content;