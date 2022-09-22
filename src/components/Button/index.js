import { Link } from 'react-router-dom';
import Style from './Button.module.scss';

function Button({ className, to, href, children, ...passProps }) {
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
        <Component className={className} {...props}>
            {children}
        </Component>
    );
}

export default Button;
