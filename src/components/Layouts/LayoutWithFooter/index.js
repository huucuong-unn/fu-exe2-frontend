import Footer from '~/parts/Footer';
import classNames from 'classnames/bind';
import styles from '~/components/Layouts/DefaultLayout/DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function LayoutWithFooter({ children }) {
    return (
        <div className={cx('page-container')}>
            <div className={cx('content-container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default LayoutWithFooter;
