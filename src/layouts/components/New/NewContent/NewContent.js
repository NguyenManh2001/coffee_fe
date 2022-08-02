import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from './NewContent.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function NewContent({ name, date, to }) {
    return (
        <NavLink to={to}>
            <div className={cx('title-content')}>
                <h3 className={cx('title-name')}>{name}</h3>
                <div className={cx('calendar-date')}>{date}</div>
            </div>
        </NavLink>
    );
}
NewContent.propTypes = {
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
}
export default NewContent;
