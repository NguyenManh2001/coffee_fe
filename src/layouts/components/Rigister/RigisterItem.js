import classNames from 'classnames/bind';
import styles from './Rigister.module.scss';
import Button from '~/Components/Button';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function Rigister({header,btn}) {
    return (
        <div className={cx('rigister-container')}>
            <div className={cx('rigister-content')}>
                <h2 className={cx('register-name')}>{header}</h2>
                <div className={cx('register-title')}>
                    <input className={cx('register-input')} type="text" required="" placeholder="Nhập email của bạn" />
                    <Button className={cx('btnMenu')}>{btn}</Button>
                </div>
            </div>
        </div>
    );
}
Rigister.propTypes = {
    header: PropTypes.string.isRequired,
    btn: PropTypes.string.isRequired,
}
export default Rigister;
