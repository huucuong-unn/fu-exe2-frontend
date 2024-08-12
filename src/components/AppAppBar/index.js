import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from '../ToggleColorMode';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar'; // Import Avatar
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import storageService from '~/components/StorageService/storageService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '~/assets/images/logo-outlined.png';
import AccountAPI from '~/API/AccountAPI';

const logoStyle = {
    width: '50px',
    height: 'auto',
    cursor: 'pointer',
};

function AppAppBar({ mode, toggleColorMode }) {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openForUserOption = Boolean(anchorEl);
    const navigate = useNavigate();
    const [point, setPoint] = useState(0);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleLogout = () => {
        setAnchorEl(null);
        // Remove user information from localStorage
        localStorage.removeItem('userInfo');

        // Redirect to the sign-up page
        navigate('/sign-in');
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        setAnchorEl(null);
        // Remove user information from localStorage
        localStorage.removeItem('userInfo');

        // Redirect to the sign-up page
        navigate('/sign-in');
    };

    const handleCloseProfile = () => {
        setAnchorEl(null);
        switch (userInfo?.role) {
            case 'mentor':
                navigate('/mentor-manage-profile');
                break;
            case 'company':
                navigate('/user/profile');
                break;
            case 'student':
                navigate('/user/profile');
                break;
        }
    };

    const handleCloseHistory = () => {
        setAnchorEl(null);
        navigate('/user/history');
    };

    const handleCloseForPoint = () => {
        setAnchorEl(null);
        navigate('/payment');
    };
    const IMGAGE_HOST = process.env.REACT_APP_IMG_HOST;

    // Initialize userInfo with localStorage value
    const [userInfo, setUserInfo] = useState(storageService.getItem('userInfo') || null);

    useEffect(() => {
        const fetchPoints = async () => {
            // This useEffect is now only for updating userInfo if it changes in localStorage
            const storedUserInfo = await storageService.getItem('userInfo');
            if (storedUserInfo !== null) {
                const pointResponse = await AccountAPI.getPoint(storedUserInfo.id);
                console.log(pointResponse);
                setPoint(pointResponse);
            }

            if (storedUserInfo !== null) {
                setUserInfo(storedUserInfo);
                console.log(storedUserInfo);
                console.log(userInfo);
            }
        };
        fetchPoints();
    }, []);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const scrollToSection = (sectionId) => {
        const sectionElement = document.getElementById(sectionId);
        const offset = 128;
        if (sectionElement) {
            const targetScroll = sectionElement.offsetTop - offset;
            sectionElement.scrollIntoView({ behavior: 'smooth' });
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth',
            });
            setOpen(false);
        }
    };

    return (
        <div>
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: 0,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                    mt: 2,
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar
                        variant="regular"
                        sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                            borderRadius: '999px',
                            bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(24px)',
                            maxHeight: 40,
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow:
                                theme.palette.mode === 'light'
                                    ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                    : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                        })}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                alignItems: 'center',
                                ml: '-18px',
                                px: 0,
                            }}
                        >
                            <Link to="/">
                                <img src={logo} style={logoStyle} alt="logo of tortee" />
                            </Link>
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                {userInfo?.role !== 'company' && userInfo?.role !== 'mentor' ? (
                                    <MenuItem sx={{ py: '6px', px: '12px', borderRadius: '999px' }}>
                                        <Link to="/mentors" style={{ textDecoration: 'none' }}>
                                            <Typography variant="body2" color="text.primary" fontSize="16px">
                                                Mentors
                                            </Typography>
                                        </Link>
                                    </MenuItem>
                                ) : (
                                    ''
                                )}
                                {userInfo?.role === 'mentor' ? (
                                    <MenuItem sx={{ py: '6px', px: '12px', borderRadius: '999px' }}>
                                        <Link to="/campaigns" style={{ textDecoration: 'none' }}>
                                            <Typography variant="body2" color="text.primary" fontSize="16px">
                                                Campaigns
                                            </Typography>
                                        </Link>
                                    </MenuItem>
                                ) : (
                                    ''
                                )}
                                <Divider orientation="vertical" variant="middle" flexItem />
                                <Divider orientation="vertical" variant="middle" flexItem />
                                {userInfo?.role === 'company' ? (
                                    <MenuItem
                                        onClick={() => scrollToSection('companies')}
                                        sx={{ py: '6px', px: '12px', borderRadius: '999px' }}
                                    >
                                        <Link to="/company/campaign-history" style={{ textDecoration: 'none' }}>
                                            <Typography variant="body2" color="text.primary" fontSize="16px">
                                                Campaign History
                                            </Typography>
                                        </Link>
                                    </MenuItem>
                                ) : (
                                    ''
                                )}
                                <Divider orientation="vertical" variant="middle" flexItem />

                                {/* <MenuItem onClick={() => scrollToSection('features')} sx={{ py: '6px', px: '12px' }}>
                                    <a href="/#features" style={{ textDecoration: 'none' }}>
                                        <Typography variant="body2" color="text.primary">
                                            Features
                                        </Typography>
                                    </a>
                                </MenuItem> */}
                                <MenuItem
                                    onClick={() => scrollToSection('companies')}
                                    sx={{ py: '6px', px: '12px', borderRadius: '999px' }}
                                >
                                    {userInfo?.role !== 'mentor' && userInfo?.role !== 'company' ? (
                                        <Link to="/company" style={{ textDecoration: 'none' }}>
                                            <Typography variant="body2" color="text.primary" fontSize="16px">
                                                Companies
                                            </Typography>
                                        </Link>
                                    ) : (
                                        ''
                                    )}
                                </MenuItem>
                                {/* handle for show/hide points */}
                                {userInfo?.role !== 'mentor' ? (
                                    <MenuItem
                                        onClick={() => scrollToSection('companies')}
                                        sx={{ py: '6px', px: '12px', borderRadius: '999px' }}
                                    >
                                        <Link to="/payment" style={{ textDecoration: 'none' }}>
                                            <Typography variant="body2" color="text.primary" fontSize="16px">
                                                Point
                                            </Typography>
                                        </Link>
                                    </MenuItem>
                                ) : (
                                    ''
                                )}
                            </Box>
                        </Box>
                        {userInfo !== null ? (
                            <React.Fragment>
                                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                    <Tooltip title="Account settings">
                                        <IconButton
                                            onClick={handleClick}
                                            size="small"
                                            sx={{ ml: 2 }}
                                            aria-controls={openForUserOption ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={openForUserOption ? 'true' : undefined}
                                        >
                                            <Avatar src={IMGAGE_HOST + userInfo?.avatarUrl} />
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
                                        <Avatar src="https://cdn-icons-png.flaticon.com/128/12340/12340380.png" />
                                        Profile
                                    </MenuItem>
                                    {userInfo?.role !== 'mentor' ? (
                                        <MenuItem onClick={handleCloseHistory}>
                                            <Avatar src="https://cdn-icons-png.flaticon.com/128/10357/10357920.png" />
                                            History
                                        </MenuItem>
                                    ) : (
                                        ''
                                    )}
                                    {userInfo?.role !== 'mentor' ? (
                                        <MenuItem onClick={handleCloseForPoint}>
                                            <Avatar src="https://cdn-icons-png.flaticon.com/128/4671/4671969.png" />
                                            {point ? point : 0} Points
                                        </MenuItem>
                                    ) : (
                                        ''
                                    )}
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
                            <Box
                                sx={{
                                    display: { xs: 'none', md: 'flex' },
                                    gap: 0.5,
                                    alignItems: 'center',
                                }}
                            >
                                {/* <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} /> */}
                                <Link to={'/sign-in'}>
                                    <Button color="primary" variant="text" size="small" component="a" target="_blank">
                                        Sign in
                                    </Button>
                                </Link>
                                <Link to={'/sign-up'}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        component="a"
                                        target="_blank"
                                        sx={{
                                            backgroundColor: '#1e373b',
                                            '&:hover': {
                                                backgroundColor: '#758694',
                                            },
                                        }}
                                    >
                                        Sign up
                                    </Button>
                                </Link>
                            </Box>
                        )}
                        <Box sx={{ display: { sm: '', md: 'none' } }}>
                            <Button
                                variant="text"
                                color="primary"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                                sx={{ minWidth: '30px', p: '4px' }}
                            >
                                <MenuIcon />
                            </Button>
                            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                                <Box
                                    sx={{
                                        minWidth: '60dvw',
                                        p: 2,
                                        backgroundColor: 'background.paper',
                                        flexGrow: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'end',
                                            flexGrow: 1,
                                        }}
                                    >
                                        <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                                    </Box>
                                    <MenuItem onClick={() => scrollToSection('features')}>Features</MenuItem>
                                    {/* <MenuItem onClick={() => scrollToSection('mentors')}>Mentors</MenuItem> */}
                                    <MenuItem onClick={() => scrollToSection('highlights')}>Highlights</MenuItem>
                                    <MenuItem onClick={() => scrollToSection('pricing')}>Pricing</MenuItem>
                                    <MenuItem onClick={() => scrollToSection('faq')}>FAQ</MenuItem>
                                    <Divider />
                                    <>
                                        <MenuItem>
                                            <Button
                                                color="primary"
                                                variant="contained"
                                                component="a"
                                                href="/sign-up/"
                                                target="_blank"
                                                sx={{ width: '100%' }}
                                            >
                                                Sign up
                                            </Button>
                                        </MenuItem>
                                        <MenuItem>
                                            <Button
                                                color="primary"
                                                variant="outlined"
                                                component="a"
                                                href="/sign-in/"
                                                target="_blank"
                                                sx={{ width: '100%' }}
                                            >
                                                Sign in
                                            </Button>
                                        </MenuItem>
                                    </>
                                </Box>
                            </Drawer>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

AppAppBar.propTypes = {
    mode: PropTypes.oneOf(['dark', 'light']).isRequired,
    toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;
