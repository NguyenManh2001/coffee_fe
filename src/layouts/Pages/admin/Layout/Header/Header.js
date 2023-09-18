import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { MdOpenWith } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import {IoIosLogOut} from 'react-icons/io';
import {AiOutlineCaretUp} from 'react-icons/ai';
// import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import config from '~/config/config';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header({handlefullscreen}) {
   
    const navigate = useNavigate();
    const handleSupmit = () => {
        // Cookies.remove('token');
        navigate(config.routers.Login);
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('containerLeft')}>
                    <div className={cx('MenuIcon')}>
                        <FiMenu />
                    </div>
                    <div className={cx('MenuIcon')}>
                        <MdOpenWith onClick={handlefullscreen} />
                    </div>
                </div>
                <div className={cx('containerRight')}>
                    <div className={cx('avatar')}>
                        <Tippy
                            interactive
                            delay={[50, 500]}
                            render={(attrs) => (
                                <div className="box" tabIndex="-1" {...attrs}>
                                    <div className={cx('TippyContainer')}>
                                        <div className={cx('iconUp')}><AiOutlineCaretUp /></div>
                                        <div className={cx('Menu')}>
                                            <div className={cx('MenuItem')}>
                                                <div className={cx('Icon')}>
                                                    <FaUserCircle />
                                                </div>
                                                <div className={cx('Name')}>
                                                    <a href="#" className={cx('link')}>
                                                        Thông tin cá nhân
                                                    </a>
                                                </div>
                                            </div>
                                            <div className={cx('MenuItem')}>
                                                <div className={cx('Icon')}>
                                                    <IoIosLogOut />
                                                </div>
                                                <div className={cx('Name')}>
                                                    <a onClick={handleSupmit} className={cx('link')}>
                                                       Đăng xuất
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        >
                            <img className={cx('IconAvatar')} src={require('~/assets/images/cf-10-1.jpg')} />
                        </Tippy>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
