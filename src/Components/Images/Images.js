import PropTypes from 'prop-types'
import { forwardRef, useState } from 'react';
import images from '~/assets/images';
import styles from './Images.module.scss';
import classNames from 'classnames';

const Image = forwardRef(({ src, alt, className, ...props }, ref) => {
    const [fallBack, setFallback] = useState('');
    const handleError = () => {
        setFallback(images.noImage);
    };

    return (
        <img
            className={classNames(styles.wrapper, className)}
            ref={ref}
            src={fallBack || src}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
});

Image.propTypes = {
     src : PropTypes.string,
     alt : PropTypes.string,
     className : PropTypes.string,
}

export default Image;
