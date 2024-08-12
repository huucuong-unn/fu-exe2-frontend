import * as React from 'react';
import { styled, createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

import { CssBaseline, Box, Toolbar, List, Typography, Divider, Badge, IconButton, Menu, MenuItem } from '@mui/material';

import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useNavigate } from 'react-router-dom';

import { MainListItems, SecondaryListItems } from '~/components/listItems';

import { useState } from 'react';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

const defaultTheme = createTheme();

export function NavbarAdmin() {
    const [open, setOpen] = useState(true);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const toggleDrawer = () => {
        setOpen(!open);
    };

    function notificationsLabel(count) {
        if (count === 0) {
            return 'no notifications';
        }
        if (count > 99) {
            return 'more than 99 notifications';
        }
        return `${count} notifications`;
    }

    return (
        <AppBar position="absolute" open={open}>
            <Toolbar
                sx={{
                    pr: '24px',
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: '36px',
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>

                {/*<IconButton color="inherit" aria-label={notificationsLabel(100)} onClick={handleOpenUserMenu}>*/}
                {/*    <Badge badgeContent={100} color="secondary">*/}
                {/*        <NotificationsIcon />*/}
                {/*    </Badge>*/}
                {/*</IconButton>*/}
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Box>
                            <Typography></Typography>
                        </Box>
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

export function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove user information from localStorage
        localStorage.removeItem('userInfo');

        // Redirect to the sign-up page
        navigate('/admin/sign-in');
    };
    const [open, setOpen] = useState(true);
    const theme = useTheme();

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ textAlign: 'center' }}>
                        Hi Admin
                    </Typography>
                </Box>
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                <MainListItems />
                <Divider sx={{ my: 1 }} />
            </List>
            <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>{' '}
        </Drawer>
    );
}

export default function AdminLayout({ children }) {
    const theme = useTheme();
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <NavbarAdmin />
                <Sidebar />
                <Box
                    component="main"
                    sx={{
                        backgroundColor:
                            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                        padding: theme.spacing(3),
                    }}
                >
                    <Toolbar />
                    {children}
                </Box>
            </Box>
        </ThemeProvider>
    );
}
