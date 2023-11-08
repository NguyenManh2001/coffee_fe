import classNames from 'classnames/bind';
import styles from './News.module.scss';
import { ContentItem } from '~/layouts/components/About/Content';
import { DateIcons } from '~/Components/icons/icons';
import config from '~/config';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import formatDate from '~/Components/FormatDate/FormatDate';
import Images from '~/Components/Images';
import { Spin } from 'antd';

const cx = classNames.bind(styles);

function News() {
    const { isLoading, data, refetch } = useQuery({
        queryKey: ['listNews'],
        queryFn: () => axios.post('https://coffee-bills.onrender.com/news/listNews').then((res) => res.data),
    });
    return (
        <div id="top" className={cx('wrapper')}>
            {isLoading ? (
                <div className={cx('loading')}>
                    <Spin style={{ color: 'red' }} />
                </div>
            ) : (
                <div className={cx('container')}>
                    {data?.docs?.map((data) => (
                        <div key={data._id} className={cx('main-right')}>
                            <div className={cx('img-content')}>
                                <Images className={cx('img-content1')} src={data.image} alt="lineborder" />
                            </div>
                            <div className={cx('content-item')}>
                                <ContentItem
                                    to={config.routers.News1}
                                    header={data.title}
                                    icon={<DateIcons />}
                                    date={formatDate(data.createdAt)}
                                    text={data.describe}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default News;
