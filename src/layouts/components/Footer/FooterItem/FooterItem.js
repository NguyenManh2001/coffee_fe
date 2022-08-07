import classNames from 'classnames/bind';
import styles from './footer.module.scss';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function FooterItem({ title, linkName, src, phone, email, name, share}) {
    return (
        <div className={cx('footer')}>
            <p className={cx('footer-title')}>{title}</p>
            <p className={cx('footer-link')}>
                <a className={cx('link-name')}  href={src}>
                    {linkName}
                </a>
            </p>
            <p className={cx('footer-link')}>
                <a className={cx('link-name')}  href={src}>
                    {phone}
                </a>
            </p>
            <p className={cx('footer-link')}>
                <a className={cx('link-name')}  href={src}>
                    {email}
                </a>
            </p>
            <p className={cx('footer-link')}>
                <a className={cx('link-name')}  href={src}>
                    {name}
                </a>
            </p>
            <p className={cx('footer-link')}>
                <a className={cx('link-name')}  href={src}>
                    {share}
                </a>
            </p>
        </div>
    );
}
FooterItem.propTypes = {
    title: PropTypes.string,
    linkName: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string,
    share: PropTypes.string,
}
export default FooterItem;
