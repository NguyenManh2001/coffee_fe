import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Images from '~/Components/Images';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function MenuItem({ src,name,date,icon,to }) {
    return (
        <NavLink className={(nav) => cx({active: nav.isActive})} to={to}>
            <div className={cx('fifter-item')}>
                <Images className={cx('img')} src={src} alt="lineborder" />
                <div className={cx('info')}>
                    <div className={cx('info-name')}>{name}</div>
                    {/* <NavLink className={(nav) => cx('info-name', {active: nav.isActive})} to={to}>{name}</NavLink> */}
                    <div className={cx('info-date')}>
                        {icon}
                        <div className={cx('date-name')}>{date}</div>
                    </div>
                </div>
            </div>
            </NavLink>
    );
}
MenuItem.propTypes = {
    src: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
}
export default MenuItem;
