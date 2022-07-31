import classNames from 'classnames/bind';
import styles from './menu.module.scss';
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function MenuItem({title,to}) {
    return (
        <NavLink className={(nav) => cx('menu-item', {active: nav.isActive})} to={to}>
           <span className={cx('title-item')}>{title}</span>
        </NavLink>
      );
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
}
export default MenuItem;