import classNames from "classnames/bind";
import styles from './Content.module.scss';
import { NavLink } from "react-router-dom";
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
                    <p class="p-text">
                      {text}
                    </p>
                </div>
     );
}

export default ContentItem;