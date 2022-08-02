import classNames from "classnames/bind";
import styles from './Rigister.module.scss';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function Rigister({children}) {
    return ( 
        <div className={cx('register')}>{children}</div>
     );
}
Rigister.propTypes = {
    children: PropTypes.node.isRequired,
}
export default Rigister;