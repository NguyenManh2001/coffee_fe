import classNames from 'classnames/bind';
import styles from './About.module.scss';
import Images from '~/Components/Images';
import config from '~/config';
import Content, { ContentItem } from '~/layouts/components/About/Content';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Spin } from 'antd';

const cx = classNames.bind(styles);

function About() {
    const { isLoading, data, refetch } = useQuery({
        queryKey: ['listNews'],
        queryFn: () => axios.post('https://coffee-bills.onrender.com/abouts/ListAbouts').then((res) => res.data),
    });
    console.log(data);
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
                    {isLoading ? (
                        <div className={cx('loading')}>
                            <Spin style={{ color: 'red' }} />
                        </div>
                    ) : (
                        <>
                            {data?.docs.map((data, index) => (
                                <div
                                    key={data._id}
                                    className={
                                        index % 2 !== 0 ? cx('main-content1', 'tent') : cx('main-content', 'tent')
                                    }
                                >
                                    <div className={index % 2 !== 0 ? cx('content-right') : cx('content-left')}>
                                        <div className={cx('img-content')}>
                                            <Images src={data.image} className={cx('Image')} alt="lineborder" />
                                        </div>
                                    </div>
                                    <div className={index % 2 !== 0 ? cx('content-left') : cx('content-right')}>
                                        <div className={cx('main-right')}>
                                            <Content>
                                                <div className={cx('content-item')}>
                                                    <ContentItem
                                                        to="#"
                                                        header={data.name}
                                                        title={data.title}
                                                        text={data.describe}
                                                    />
                                                </div>
                                            </Content>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default About;
