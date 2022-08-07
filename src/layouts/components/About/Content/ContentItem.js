import classNames from "classnames/bind";
import styles from './Content.module.scss';
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function ContentItem({header,title,text,icon,date,to}) {
    return ( 
                <div className={cx('content-item')}>
                    <NavLink to={to}>
                    <h3 className={cx('content-header')}>{header}</h3>
                    </NavLink>
                    <div className={cx('info-date')}>
                        {icon}
                        <div className={cx('date-name')}>{date}</div>
                    </div>
                    <h4 className={cx('content-title')}>{title}</h4>
                    <p className={cx("p-text")}>
                      {text}
                    </p>
                </div>
     );
}

ContentItem.propTypes = {
    header: PropTypes.string,
    icon: PropTypes.node,
    date: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
}

export default ContentItem;