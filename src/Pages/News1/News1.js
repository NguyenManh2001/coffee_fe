import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { FacebookIcons, InstagamIcons, TwiterIcons } from '~/Components/icons/icons';
import Images from '~/Components/Images';
import styles from './News1.module.scss';

const cx = classNames.bind(styles);

function News1() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('main-right')}>
                    <h3 className={cx('header')}>NĂM MỚI, UỐNG "KHỞI ĐẦU SUNG" - NHẬN LÌ XÌ KHỦNG</h3>
                    <p>Ngày viết: 22/02/2022</p>
                    <div className={cx('content')}>
                        <div className={cx('content-left')}>
                            <div className={cx('main-content')}>
                                <h3 className={cx('header')}>Năm mới "khởi đầu sung" với bộ 3 trà Tết</h3>
                                <p>
                                    Chia tay năm cũ với quá nhiều nốt trầm, Tết này hãy cùng The Coffee Cup nạp cho mình
                                    bộ 3 "Sung" gói trọn tình cảm đong đầy, vừa ngon tròn vị vừa mang đến sự hứng khởi,
                                    tươi mới cho những ngày đầu năm để bắt đầu năm Dần đầy năng lượng, mãnh liệt và đủ
                                    sức "công phá" mọi thử thách.Nào, giờ thì hãy cùng nhau khám phá bộ 3 trà Tết và
                                    cùng nhau đón một cái Tết trọn vẹn hơn cả về sức khỏe, tình cảm, sum vầy và sự thịnh
                                    vượng!
                                </p>
                            </div>
                        </div>
                        <div className={cx('content-right')}>
                            <Images
                                className={cx('image1')}
                                src="https://coffee-cup-react.vercel.app/images/giohang.jpg"
                                alt="lineborder"
                            />
                        </div>
                    </div>
                    <div className={cx('content1')}>
                        <h4 className={cx('header')}>Tranh thủ cơ hội nhận lì xì khủng tại "Nhà"</h4>
                        <p>
                            Không chỉ được thưởng thức những "cực phẩm" Trà mùa Tết, The Coffee Cup còn lì xì riêng cho
                            khách hàng khi đến với "Nhà" bằng một món quà đặc biệt: Mua một ly trà Tết KHỞI ĐẦU SUNG,
                            bạn sẽ được tặng thêm một ly tùy chọn trong bộ ba Trà Sen Nhãn Sum Vầy, Trà Dưa Đào Sung Túc
                            và Trà Sữa Sung Sức.
                        </p>
                        <div>
                            <Images
                                className={cx('image2')}
                                src="https://coffee-cup-react.vercel.app/images/cf-10-3.jpg"
                                alt="lineborder"
                            />
                        </div>
                        <p>
                            Đừng quên chương trình chỉ áp dụng từ 20/1 đến hết ngày 30/2, không áp dụng trên topping và
                            mỗi khách hàng chỉ được nhận 1 mã/SĐT thôi nhé. Ngoài ra bạn cũng không nhận được ưu đãi này
                            khi sử dụng chương trình khuyến mãi song song và chương trình có thể kết thúc sớm hơn dự
                            kiến khi hết số lượng voucher phát ra.
                        </p>
                        <p className={cx('content2-title')}>
                        Cùng Nhà chào đón năm Dần đủ đầy, sung sức như hổ, sum vầy tết sang và ngày càng sung túc bạn nhé!
                        </p>
                        <div className={cx('footer')}>
                            <div className={cx('share')}>
                                <span>Chia sẻ: </span>
                                <NavLink className={cx('icon')}  to='#'>
                                    <FacebookIcons  />
                                </NavLink>
                                <NavLink className={cx('icon')} to='#'>
                                    <TwiterIcons />
                                </NavLink>
                                <NavLink className={cx('icon')} to='#'>
                                    <InstagamIcons />
                                </NavLink>
                            </div>
                            <div className={cx('next-page')}>
                            <NavLink className={cx('next')} to='#'>
                            Bài kế tiếp 
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default News1;
