import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import Style from './Button.module.scss';

function Button({ className, to, href, children, ...passProps }, ref) {
    let Component = 'button';
    const props = {
        ...passProps,
    };
    if (to) {
        Component = Link;
        props.to = to;
    } else if (href) {
        Component = 'a';
        props.href = href;
    }
    return (
        <Component className={className} {...props} ref={ref}>
            {children}
        </Component>
    );
}

export default forwardRef(Button);
