import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

function MenuItem({ children, content, placement, isPC }) {
    if (isPC) {
        return <Tippy content={content} placement={placement}></Tippy>;
    }
    return children;
}

export default MenuItem;
