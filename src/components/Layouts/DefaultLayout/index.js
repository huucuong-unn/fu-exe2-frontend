import Footer from '~/parts/Footer';
import classNames from 'classnames/bind';
import styles from '~/components/Layouts/DefaultLayout/DefaultLayout.module.scss';
import AppAppBar from '~/components/AppAppBar';
import { Divider } from '@mui/material';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('page-container')}>
            <AppAppBar />
            <div className={cx('content-container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Divider />
            <Footer />
        </div>
    );
}

export default DefaultLayout;
