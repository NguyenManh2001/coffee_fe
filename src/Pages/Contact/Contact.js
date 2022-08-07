import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import Images from '~/Components/Images';
import Button from '~/Components/Button';
import { FooterItem } from '~/layouts/components/Footer/FooterItem';
import { useState } from 'react';
const cx = classNames.bind(styles);

function Contact() {

    const [inputName, setInputName] = useState('');
    const [inputPhone, setInputPhone] = useState('');
    const [inputText, setInputText] = useState('');
 
    const handleSubmit = () => {
        if(inputName !=="" && inputPhone !=="" && inputText !==""){
            setInputName('');
            setInputPhone('');
            setInputText('');
        }
    }
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
                                <input 
                                className={cx('text')}
                                type="text" 
                                value={inputName}
                                onChange={(e) => setInputName(e.target.value)}
                                placeholder="Họ tên" />
                                </p>
                                <p>
                                <input 
                                value={inputPhone}
                                onChange={(e) => setInputPhone(e.target.value)}
                                className={cx('text')}
                                type="text" 
                                required="" 
                                placeholder="Số điện thoại" />
                                </p>
                                <textarea 
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                className={cx('text')} 
                                placeholder="Lời nhắn" 
                                required=""
                                 cols="30" 
                                 rows="2"></textarea>
                                <Button className={cx('btnMenu')} onClick={handleSubmit}>Gửi</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
