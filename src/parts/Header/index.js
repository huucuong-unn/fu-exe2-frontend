import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.scss';
import logo from '~/assets/images/logo.png';
import React, { useEffect, useState } from 'react';
import storageService from '~/components/StorageService/storageService';
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { Logout } from '@mui/icons-material';

const NAV_ITEMS = [
    // { name: 'Internship Program', path: '/internship-program' },
    { name: 'AI Resume Checker', path: '/ai-resume' },
    { name: 'AI Subscription Plans  🎉', path: '/offer' },
    { name: 'Blog', path: '/blog' },
    { name: 'About Us', path: '/about-us' },
];

function Header() {
    const [scroll, setScroll] = useState(false);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openForUserOption = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleLogout = () => {
        setAnchorEl(null);
        // Remove user information from localStorage
        localStorage.removeItem('userInfo');

        // Redirect to the sign-up page
        navigate('/login');
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        const handleScroll = () => setScroll(window.scrollY > 70);

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial scroll position

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleCloseProfile = () => {
        setAnchorEl(null);
    };

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
                <React.Fragment>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        {userInfo?.name}
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={openForUserOption ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openForUserOption ? 'true' : undefined}
                            >
                                {userInfo?.pictureUrl ? (
                                    <Avatar src={userInfo?.pictureUrl} />
                                ) : (
                                    <Avatar src="https://cdn-icons-png.flaticon.com/128/12340/12340380.png" />
                                )}{' '}
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={openForUserOption}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                minWidth: 200,
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleCloseProfile}>
                            {userInfo?.pictureUrl ? (
                                <Avatar src={userInfo?.pictureUrl} />
                            ) : (
                                <Avatar src="https://cdn-icons-png.flaticon.com/128/12340/12340380.png" />
                            )}
                            Profile
                        </MenuItem>
                        <MenuItem>{userInfo?.planType} Member</MenuItem>
                        <Divider />
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </React.Fragment>
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
