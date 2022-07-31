import classNames from 'classnames/bind';
import styles from './menu.module.scss';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function Items({children}) {
    return <nav className={cx('fifter-content')}>{children}</nav>;
};

Items.propTypes = {
    children: PropTypes.node.isRequired,
}


export default Items;