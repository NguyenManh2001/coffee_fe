import classNames from 'classnames/bind';
import styles from './NewContent.module.scss';

const cx = classNames.bind(styles);

function NewContent({name,date}) {
    return ( 
        <div className ={cx('title-content')}>
        <h3 className={cx('title-name')}>{name}</h3>
        <div className={cx('calendar-date')}>{date}</div>
    </div>
     );
}

export default NewContent;