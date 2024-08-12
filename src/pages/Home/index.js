import classNames from 'classnames/bind';
import styles from '~/pages/Home/Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    return <h2 className={cx('home')}>Home page hihi</h2>;
}

export default Home;
