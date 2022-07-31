import classNames from 'classnames/bind';
import styles from './menu.module.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function Item({ title, to }) {
    return (
                <NavLink className={(nav) => cx('fifter-item', {active: nav.isActive })} to={to}>
                    <div className={cx('fifter-name')}>
                      {title}
                    </div>
        </NavLink>
    );
}

Item.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};
export default Item;
