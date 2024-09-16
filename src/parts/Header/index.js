import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.scss';
import logo from '~/assets/images/logo.png';
import { useEffect, useState } from 'react';
import storageService from '~/components/StorageService/storageService';
import { Button } from '@mui/material';

const NAV_ITEMS = [
    { name: 'Internship Program', path: '/internship-program' },
    { name: 'AI Resume Checker', path: '/ai-resume' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Blog', path: '/blog' },
];

function Header() {
    const [scroll, setScroll] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove user information from localStorage
        localStorage.removeItem('userInfo');

        // Redirect to the sign-up page
        navigate('/login');
    };

    useEffect(() => {
        const handleScroll = () => setScroll(window.scrollY > 70);

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial scroll position

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            // This useEffect is now only for updating userInfo if it changes in localStorage
            const storedUserInfo = await storageService.getItem('userInfo');

            if (storedUserInfo !== null) {
                setUserInfo(storedUserInfo);
                console.log(storedUserInfo);
                console.log(userInfo);
            }
        };
        fetchUser();
    }, []);

    const [userInfo, setUserInfo] = useState(storageService.getItem('userInfo') || null);

    return (
        <div
            style={{
                display: 'flex',
                gap: 30,
                width: '100%',
                height: '80px',
                fontSize: '18px',
                // color: 'white',
                position: 'fixed',
                zIndex: 100,
                top: 0,
                backgroundColor: scroll ? 'white' : 'transparent',
                justifyContent: 'space-around',
                alignItems: 'center',
                boxShadow: scroll ? '0 -6px 10px 5px rgba(0,0,0,0.5)' : 'none',
                opacity: 0.9,
            }}
        >
            <div>
                <Link to="/home">
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
            {userInfo ? (
                <div>
                    Login success
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
            ) : (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Link to="/login" className="button btn-outline">
                        Log in
                    </Link>
                    <Link to="/register" className="button btn-filled">
                        Sign up
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Header;
