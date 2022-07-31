import classNames from 'classnames/bind';
import styles from './About.module.scss';
import Images from '~/Components/Images';
import config from '~/config';
import Content, { ContentItem } from './Content';

const cx = classNames.bind(styles);

function About() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('header')}>Về chúng tôi</h2>
                <div className={cx('lineborder')}>
                    <Images src="https://coffee-cup-react.vercel.app/images/line-under-heading.png" alt="lineborder" />
                </div>
            </div>
            <Content>
                <div className={cx('content')}>
                    <div className={cx('img-content', 'image-1')}></div>
                    <div className={cx('content-item')}>
                        <ContentItem
                          to={config.routers.News1}
                            header="khởi nguồn"
                            title="thương hiệu bắt nguồn từ cà phê việt nam"
                            text=" Từ tình yêu với Việt Nam và niềm đam mê cà phê, năm 1999, thương hiệu Black Coffee® ra đời với
                        khát vọng nâng tầm di sản cà phê lâu đời của Việt Nam và lan rộng tinh thần tự hào, kết nối hài
                        hoà giữa truyền thống với hiện đại"
                        />
                    </div>
                </div>
            </Content>
            <Content>
                <div className={cx('content')}>
                    <div className={cx('img-content', 'image-2')}></div>
                    <div className={cx('content-item')}>
                        <ContentItem
                          to={config.routers.News1}
                            header="phát triển"
                            title="thương hiệu bắt nguồn từ cà phê việt nam"
                            text=" Từ tình yêu với Việt Nam và niềm đam mê cà phê, năm 1999, thương hiệu Black Coffee® ra đời với
                        khát vọng nâng tầm di sản cà phê lâu đời của Việt Nam và lan rộng tinh thần tự hào, kết nối hài
                        hoà giữa truyền thống với hiện đại"
                        />
                    </div>
                </div>
            </Content>
            <Content>
                <div className={cx('content')}>
                    <div className={cx('img-content', 'image-3')}></div>
                    <div className={cx('content-item')}>
                        <ContentItem
                          to={config.routers.News1}
                            header="vươn tới đỉnh cao"
                            title="thương hiệu bắt nguồn từ cà phê việt nam"
                            text=" Từ tình yêu với Việt Nam và niềm đam mê cà phê, năm 1999, thương hiệu Black Coffee® ra đời với
                        khát vọng nâng tầm di sản cà phê lâu đời của Việt Nam và lan rộng tinh thần tự hào, kết nối hài
                        hoà giữa truyền thống với hiện đại"
                        />
                    </div>
                </div>
            </Content>
        </div>
    );
}

export default About;
