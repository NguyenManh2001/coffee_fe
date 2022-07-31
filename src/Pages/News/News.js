import classNames from 'classnames/bind';
import styles from './News.module.scss';
import { ContentItem } from '~/layouts/components/About/Content';
import { DateIcons } from '~/Components/icons/icons';
import config from '~/config';

const cx = classNames.bind(styles);

function News() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('main-right')}>
                    <div className={cx('img-content', 'image-1')}></div>
                    <div className={cx('content-item')}>
                        <ContentItem
                        to={config.routers.News1}
                            header='Năm mới, uống "cực sung" - Nhận lì xì khủng'
                            icon={<DateIcons />}
                            date="04/03/2022"
                            text='Chia tay năm cũ với quá nhiều nốt trầm, Tết này hãy cùng The Coffee Cup nạp cho mình bộ 3 "Sung" gói trọn tình cảm đong đầy, vừa ngon tròn vị vừa mang đến sự hứng khởi...'
                        />
                    </div>
                </div>
                <div className={cx('main-right')}>
                    <div className={cx('img-content', 'image-2')}></div>
                    <div className={cx('content-item')}>
                        <ContentItem
                          to={config.routers.News1}
                            header="Tết cận kề - Fan Coffee Cup có quà năm mới..."
                            icon={<DateIcons />}
                            date="14/02/2022"
                            text="Ra mắt bộ sản phẩm mới toanh để “khuynh đảo” những ngày Tết, The Coffee House đề cao những tiêu chí có thể cuốn hút và chinh phục bạn ngay lần đầu tiên chạm mặt"
                        />
                    </div>
                </div>
                <div className={cx('main-right')}>
                    <div className={cx('img-content', 'image-3')}></div>
                    <div className={cx('content-item')}>
                        <ContentItem
                          to={config.routers.News1}
                            header="Coffee Cup - Quán cà phê lý tưởng để gặp gỡ bạn bè mùa Tết này"
                            icon={<DateIcons />}
                            date="24/01/2022"
                            text="Những ngày cuối năm, đầu năm mới, bạn lên kế hoạch để gặp gỡ những..."
                        />
                    </div>
                </div>
                <div className={cx('main-right')}>
                    <div className={cx('img-content', 'image-4')}></div>
                    <div className={cx('content-item')}>
                        <ContentItem
                          to={config.routers.News1}
                            header="Khai trương cơ sở Tây Sơn, giảm giá lên tới 50%"
                            icon={<DateIcons />}
                            date="14/01/2022"
                            text="Nhân dịp khai trương cơ sở mới tại 137 Tây Sơn - Đống Đa-Hà nội, chúng tôi vui mừng chào đón khách hang tới tham quan và thưởng thức các sản phẩm của cơ sở với nhiều ưu đãi hấp dẫn..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default News;
