import classNames from "classnames/bind";
import styles from './HeaderProduct.module.scss';
import Images from "~/Components/Images";
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function HeaderProduct({src,name,cart}) {
    return (  
        <div className={cx('conntent-item')}>
        <Images
            className={cx('logo')}
            src={src}
        />
        <div className={cx('content-title')}>
            <div className={cx('content-name')}>{name}</div>
            <div className={cx('content-price')}>{cart}</div>
        </div>
    </div>
    );
}
HeaderProduct.propType ={
    src: PropTypes.string,
    name: PropTypes.string,
    cart: PropTypes.string,
}
export default HeaderProduct;