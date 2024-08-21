import Header from '~/parts/Header';
import FooterHome from '~/parts/FooterHome';

function FullLayout({ children }) {
    return (
        <div>
            <Header />
            <div>{children}</div>
            <FooterHome />
        </div>
    );
}

export default FullLayout;
