import PropTypes from 'prop-types'
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary,
    onClick = true,
    outline = false,
    text= false,
    rounded= false,
    disabled= false,
    small = false,
    large = false,
    leftIcon= false,
    rightIcon= false,
    children,
    className,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    if(disabled){
        Object.keys(props).forEach((key) => {
            if(key.startsWith('on'&& typeof props[key] === 'function')){
                delete props.onClick;
            }
        })
    }
    if (to) {
        props.to = to;
        Comp = Link;
    }
    if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        small,
        large,
        text,
        disabled,
        rounded,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}


Button.propTypes = {
       to : PropTypes.string,
       href : PropTypes.string,
       className : PropTypes.string,
       children : PropTypes.node.isRequired,
       outline  : PropTypes.bool,
       primary : PropTypes.bool,
       text :  PropTypes.bool,
       rounded : PropTypes.bool,
       disabled : PropTypes.bool,
       small  : PropTypes.bool,
       large  : PropTypes.bool,
       leftIcon : PropTypes.node,
       rightIcon  : PropTypes.node,
       onClick  : PropTypes.func,
}

export default Button;
