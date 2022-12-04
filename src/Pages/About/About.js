import classNames from 'classnames/bind';
import styles from './About.module.scss';
import Images from '~/Components/Images';
import config from '~/config';
import Content, { ContentItem } from '~/layouts/components/About/Content';

const cx = classNames.bind(styles);

function About() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}></div>
                <div className={cx('content')}>
                    <h2 className={cx('header-content')}>Về chúng tôi</h2>
                    <div className={cx('lineborder')}>
                        <Images
                            src="https://coffee-cup-react.vercel.app/images/line-under-heading.png"
                            alt="lineborder"
                        />
                    </div>
                    <div className={cx('main-content')}>
                        <div className={cx('content-left')}>
                            <div className={cx('img-content', 'image-1')}></div>
                        </div>
                        <div className={cx('content-right')}>
                            <div className={cx('main-right')}>
                                <Content>
                                    <div className={cx('content-item')}>
                                        <ContentItem
                                         to='#'
                                            header="Khởi nguồn"
                                            title="thương hiệu bắt nguồn từ cà phê việt nam"
                                            text=" Coffee Cup được sinh ra từ niềm đam mê bất tận với hạt cà phê Việt Nam. Qua một chặng đường dài, chúng tôi đã không ngừng mang đến những sản phẩm cà phê thơm ngon, sánh đượm trong không gian thoải mái và lịch sự với mức giá hợp lý."
                                        />
                                    </div>
                                </Content>
                            </div>
                        </div>
                    </div>
                    <div className={cx('main-content','main')}>
                        <div className={cx('content-left')}>
                            <Content>
                                <div className={cx('content-item')}>
                                    <ContentItem
                                    to='#'
                                        header="Phát triển"
                                        title="Xây dựng niềm tin bằng chất lượng sản phẩm"
                                        text=" Chúng tôi mong muốn mang đến cho bạn những trải nghiệm đáng nhớ mỗi lần đến Coffee Cup. Hãy chia sẻ với chúng tôi để chúng tôi có thể mang đến cho bạn những trải nghiệm tuyệt vời hơn thế."
                                    />
                                </div>
                            </Content>
                        </div>
                        <div className={cx('content-right','right')}>
                            <div className={cx('img-content', 'image-2')}></div>
                        </div>
                    </div>
                    <div className={cx('main-content')}>
                        <div className={cx('content-left')}>
                            <div className={cx('img-content', 'image-3')}></div>
                        </div>
                        <div className={cx('content-right')}>
                            <div className={cx('main-right')}>
                                <Content>
                                    <div className={cx('content-item')}>
                                        <ContentItem
                                          to='#'
                                            header="Vươn tới đỉnh cao"
                                            title="Hướng tới một hệ thống cơ sở toàn quốc"
                                            text="Với sứ mệnh trở thành thương hiệu cà phê Việt Nam dẫn đầu, Chúng tôi mong muốn mang đến cho bạn những trải nghiệm đáng nhớ mỗi lần đến Cup Coffee®. Hãy chia sẻ với chúng tôi để chúng tôi có thể mang đến cho bạn những trải nghiệm tuyệt vời hơn thế."
                                        />
                                    </div>
                                </Content>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
