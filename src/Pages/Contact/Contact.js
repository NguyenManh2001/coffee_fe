import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import Images from '~/Components/Images';
import Button from '~/Components/Button';
import { Menu as menu, MenuItems } from '~/layouts/components/FeaturedMenu/Menu';
import { StarIcons } from '~/Components/icons/icons';
import { FooterItem } from '~/layouts/components/Footer/FooterItem';
const cx = classNames.bind(styles);

function Contact() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}></div>
                <div className={cx('content')}>
                    <h2 className={cx('header-content')}>Liên hệ với chúng tôi</h2>
                    <div className={cx('lineborder')}>
                        <Images
                            src="https://coffee-cup-react.vercel.app/images/line-under-heading.png"
                            alt="lineborder"
                        />
                    </div>
                    <div className={cx('main-content')}>
                        <div className={cx('content-left')}>
                            <div className={cx('main-left')}>
                                <div className={cx('header-left')}>
                                    <Images
                                        className={cx('logo')}
                                        src="https://coffee-cup-react.vercel.app/images/logo-2.png"
                                        alt="lineborder"
                                    />
                                    <p className={cx('logo-name')}>Coffee Cup</p>
                                </div>
                                <div className={cx('title')}>
                                <FooterItem
                                    linkName="Địa chỉ : 44 Lê Đại Hành, Hai Bà Trưng, Hà Nội"
                                    phone="Điện thoại : 0987654321"
                                    email="Email : coffeecup@gmail.com"
                                    src="https://goo.gl/maps/U37UxTnCCesQCuza7"
                                />
                                </div>
                            </div>
                        </div>
                        <div className={cx('content-right')}>
                            <div className={cx('main-right')}>
                                <div className={cx('header-right')}>
                                    <h4 className={cx('header-name')}>Để lại lời nhắn</h4>
                                </div>
                                <p>
                                <input className={cx('text')} type="text" required="" placeholder="Họ tên" />
                                </p>
                                <p>
                                <input className={cx('text')} type="text" required="" placeholder="Số điện thoại" />
                                </p>
                                <textarea className={cx('text')} placeholder="Lời nhắn" required="" cols="30" rows="2"></textarea>
                                <Button className={cx('btnMenu')}>Gửi</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
