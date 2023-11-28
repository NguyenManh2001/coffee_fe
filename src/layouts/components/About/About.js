import classNames from 'classnames/bind';
import styles from './About.module.scss';
import Images from '~/Components/Images';
import Content, { ContentItem } from './Content';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Spin } from 'antd';

const cx = classNames.bind(styles);

function About() {
    const { isLoading, data, refetch } = useQuery({
        queryKey: ['listAbouts'],
        queryFn: () => axios.post('https://coffee-bills.onrender.com/abouts/ListAbouts').then((res) => res.data),
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('header')}>Về chúng tôi</h2>
                <div className={cx('lineborder')}>
                    <Images src={require('~/assets/images/line-under-heading.png')} alt="lineborder" />
                </div>
            </div>
            {isLoading ? (
                <div className={cx('loading')}>
                    <Spin style={{ color: 'red' }} />
                </div>
            ) : (
                <>
                    {data?.docs?.map((data) => (
                        <Content>
                            <div key={data._id} className={cx('content')}>
                                <div className={cx('img-content')}>
                                    <Images src={data.image} className={cx('Image')} alt="lineborder" />
                                </div>
                                <div className={cx('content-item')}>
                                    <ContentItem to="#" header={data.name} title={data.title} text={data.describe} />
                                </div>
                            </div>
                        </Content>
                    ))}
                </>
            )}
        </div>
    );
}

export default About;
