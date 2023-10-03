import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { FooterItem } from './FooterItem';
import Content from './FooterItem/Content';
const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('footer')}>
                    <div className={cx('logo-image')}></div>
                    <div className={cx('logo-name')}>Coffee Bliss</div>
                </div>

                <Content>
                    <FooterItem
                        title="Thông tin liên hệ"
                        linkName="Địa chỉ : 44 Lê Đại Hành, Hai Bà Trưng, Hà Nội"
                        phone="Điện thoại : 0987654321"
                        email="Email : coffeecup@gmail.com"
                        src="https://goo.gl/maps/U37UxTnCCesQCuza7"
                        name=""
                    />
                    <FooterItem
                        title="Chính sách và quy định"
                        linkName="Chính sách & Quy định chung"
                        phone="Phương thức thanh toán"
                        email="Quy định đổi trả"
                        name="Chính sách bảo mật thông tin cá nhân"
                        share="Khiếu nại, phản hồi"
                        src="#"
                    />
                    <FooterItem
                        title="dịch vụ khách hàng"
                        linkName="Giao hàng tận nơi"
                        phone="Thanh toán qua ví MoMo"
                        email="Tri ân khách hàng thân thiết"
                        name="Chăm sóc, hậu mãi"
                        src="#"
                    />
                </Content>
            </div>
        </div>
    );
}

export default Footer;
