import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.css';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function FooterHome() {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <h1>tortee</h1>
                        <p className="text-justify">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer
                        </p>
                    </div>

                    <div className="col-xs-6 col-md-2">
                        <h6>About Us</h6>
                        <ul className="footer-links">
                            <li>
                                <a href="http://scanfcode.com/category/c-language/">Our Story</a>
                            </li>
                            <li>
                                <a href="http://scanfcode.com/category/front-end-development/">Why Us</a>
                            </li>
                            <li>
                                <a href="http://scanfcode.com/category/back-end-development/">Term of Use</a>
                            </li>
                            <li>
                                <a href="http://scanfcode.com/category/java-programming-language/">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="http://scanfcode.com/category/android/">FAQs</a>
                            </li>
                            <li>
                                <a href="http://scanfcode.com/category/templates/">Contact Us</a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-xs-6 col-md-2">
                        <h6>For Students</h6>
                        <ul className="footer-links">
                            <li>
                                <a href="http://scanfcode.com/category/c-language/">C</a>
                            </li>
                            <li>
                                <a href="http://scanfcode.com/category/front-end-development/">UI Design</a>
                            </li>
                            <li>
                                <a href="http://scanfcode.com/category/back-end-development/">PHP</a>
                            </li>
                            <li>
                                <a href="http://scanfcode.com/category/java-programming-language/">Java</a>
                            </li>
                            <li>
                                <a href="http://scanfcode.com/category/android/">Android</a>
                            </li>
                            <li>
                                <a href="http://scanfcode.com/category/templates/">Templates</a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-xs-6 col-md-2">
                        <h6>For Companies</h6>
                        <ul className="footer-links">
                            <li>
                                <a href="http://scanfcode.com/about/">About Us</a>
                            </li>
                            <li>
                                <a href="http://scanfcode.com/contact/">Contact Us</a>
                            </li>
                            <li>
                                <a href="http://scanfcode.com/contribute-at-scanfcode/">Contribute</a>
                            </li>
                            <li>
                                <a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="http://scanfcode.com/sitemap/">Sitemap</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-sm-6 col-xs-12">
                        <p className="copyright-text">
                            Copyright &copy; 2024 All Rights Reserved by {''}
                            <a href="#">Tortee</a>.
                        </p>
                    </div>

                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <ul className="social-icons">
                            <li>
                                <a className="facebook" href="#">
                                    <FontAwesomeIcon icon={faFacebook} />
                                </a>
                            </li>
                            <li>
                                <a className="instagram" href="#">
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
