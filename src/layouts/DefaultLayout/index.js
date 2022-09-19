import classNames from 'classnames/bind';
import Style from './DefaultLayout.module.scss';
const cx = classNames.bind(Style);
function DefaultLayout({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

export default DefaultLayout;
