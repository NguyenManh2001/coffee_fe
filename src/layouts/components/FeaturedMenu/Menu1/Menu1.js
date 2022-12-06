import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);
function MenuFeat({children}) {
    return (
        <div className={cx('menu')}>
            <div className={cx('menu-item')}>{children}</div>
        </div>
    );
}
MenuFeat.propTypes = {
    children: PropTypes.node.isRequired,
}
export default MenuFeat;
