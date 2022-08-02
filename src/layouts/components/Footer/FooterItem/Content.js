import classNames from "classnames/bind";
import styles from './footer.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function Content({children}) {
    return ( 
        <div className={cx('wrapper')}>
            {children}
        </div>
     );
}
Content.propTypes = {
    children: PropTypes.node.isRequired,
}
export default Content;