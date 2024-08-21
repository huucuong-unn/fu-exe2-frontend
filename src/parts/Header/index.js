import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
import logo from '~/assets/images/logo.png';

const NAV_ITEMS = [
    { name: 'Internship Program', path: '/test/header' },
    { name: 'AI Resume Checker', path: '/ai-resume' },
    { name: 'About us', path: '/about-us' },
    { name: 'Blog', path: '/blog' },
];

function Header() {
    return (
        <div
            style={{
                display: 'flex',
                gap: 30,
                width: '100%',
                height: '80px',
                // backgroundColor: 'black',
                fontSize: '18px',
                // color: 'white',
                justifyContent: 'space-around',
                borderBottom: '1px solid #e0e0e0',
                alignItems: 'center',
            }}
        >
            <div>
                <Link to="/">
                    <img src={logo} alt="Logo" style={{ width: '120px' }} />
                </Link>
            </div>
            <div>
                <ul
                    style={{
                        display: 'flex',
                        gap: 50,
                        height: '100%',
                        listStyleType: 'none',
                        marginBottom: 0,
                        fontWeight: '500',
                    }}
                >
                    {NAV_ITEMS.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.path}
                                style={({ isActive }) => ({
                                    textDecoration: 'none',
                                    color: '#051d40',
                                    paddingBottom: '2px',
                                    borderBottom: isActive ? '2px solid #02F18D' : 'none',
                                })}
                            >
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
                <Link to="/login" className="button btn-outline">
                    Log in
                </Link>
                <Link to="/register" className="button btn-filled">
                    Sign up
                </Link>
            </div>
        </div>
    );
}

export default Header;
