import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from './NewContent.module.scss';
import PropTypes from 'prop-types';
import Images from '~/Components/Images';
const cx = classNames.bind(styles);

function NewContent({ src,name, date, to }) {
    return (
        <div className={cx('list')}>
            <Images className ={cx('img-content')} src= {src} alt="lineborder" />
        <NavLink to={to}>
            <div className={cx('title-content')}>
                <h3 className={cx('title-name')}>{name}</h3>
                <div className={cx('calendar-date')}>{date}</div>
            </div>
        </NavLink>
        </div>
    );
}
NewContent.propTypes = {
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
}
export default NewContent;
