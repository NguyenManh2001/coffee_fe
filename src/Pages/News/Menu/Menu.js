import classNames from "classnames/bind";
import styles from './Menu.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function Menu({children}) {
    return ( 
        // <div className={cx('fifter-content')}>{children}</div>
        <nav className={cx('fifter-content')}>{children}</nav>
     );
}
Menu.propTypes = {
    children: PropTypes.node.isRequired,
}
export default Menu;