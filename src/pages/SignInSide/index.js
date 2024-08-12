import React, { useEffect, useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Button, CssBaseline, TextField, Paper, Box, Grid, Typography, Divider, Tab } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AccountAPI from '~/API/AccountAPI';
import Alert from '@mui/material/Alert';
import storageService from '~/components/StorageService/storageService';
import logo from '~/assets/images/logo.png';
import { jwtDecode } from 'jwt-decode';

const clientId = '478388298220-qhn8p4akrr4hsidbvnp999v5tn0u3s93.apps.googleusercontent.com';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Tortee
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function SignInSide() {
    const [value, setValue] = useState('1');
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);
    const location = useLocation();
    const [loginWithRole, setLoginWithRole] = useState('student');

    useEffect(() => {
        if (location.state?.signupSuccess) {
            setShowAlert(true);
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [location.state]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        switch (newValue) {
            case '1':
                setLoginWithRole('student');
                break;
            case '2':
                setLoginWithRole('mentor');
                break;
            case '3':
                setLoginWithRole('company');
                break;
            default:
                setLoginWithRole('');
        }
    };

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            data.append('loginWithRole', loginWithRole);
            const userInfo = await AccountAPI.login(data);

            if (userInfo) {
                storageService.setItem('userInfo', userInfo);
                switch (loginWithRole) {
                    case 'mentor':
                        navigate('/campaigns');
                        break;
                    case 'student':
                        navigate('/');
                        break;
                    case 'admin':
                        navigate('/admin/dashboard');
                        break;
                    case 'company':
                        navigate('/company/campaign-history');
                        break;
                    default:
                        navigate('/');
                }
            }
        } catch (error) {
            console.log(error);
            setShowAlertError(true);
            const timer = setTimeout(() => {
                setShowAlertError(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    };

    const handleGoogleLoginSuccess = async (response) => {
        try {
            const token = '';
            const decoded = jwtDecode(response?.credential);
            console.log('Google login success:', response);
            console.log('Google login success:', decoded);
            const data = {
                emailOrUsername: decoded.email,
                loginWithRole: loginWithRole,
            };

            const userInfo = await AccountAPI.loginWithGoogle(data);

            if (userInfo) {
                storageService.setItem('userInfo', userInfo);
                switch (loginWithRole) {
                    case 'mentor':
                        navigate('/campaigns');
                        break;
                    case 'student':
                        navigate('/');
                        break;
                    case 'admin':
                        navigate('/admin/dashboard');
                        break;
                    case 'company':
                        navigate('/company/campaign-history');
                        break;
                    default:
                        navigate('/');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleGoogleLoginFailure = (error) => {
        console.log('Google login failure:', error);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            {showAlert && (
                <Alert width="50%" variant="filled" severity="success">
                    Registered Successfully
                </Alert>
            )}
            {showAlertError && (
                <Alert width="50%" variant="filled" severity="error">
                    Incorrect username or password or please check login correct role !
                </Alert>
            )}
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        background: 'linear-gradient(180deg, #9CEE8D, #0B749C)',
                    }}
                >
                    <img src={logo} style={{ width: 150, height: 150, margin: '37%' }} alt="Logo" />
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h4">
                            Sign in
                        </Typography>
                        <Box sx={{ width: '100%', typography: 'body1', mt: 5 }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="I'm a mentee" value="1" />
                                        <Tab label="I'm a mentor" value="2" />
                                        <Tab label="I'm a business" value="3" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="emailOrUsername"
                                            label="Email Or Username"
                                            name="emailOrUsername"
                                            autoComplete="emailOrUsername"
                                            autoFocus
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                        />
                                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                            Sign In
                                        </Button>
                                        <Divider>Or</Divider>
                                        <GoogleOAuthProvider clientId={clientId}>
                                            <GoogleLogin
                                                onSuccess={handleGoogleLoginSuccess}
                                                onFailure={handleGoogleLoginFailure}
                                            />
                                        </GoogleOAuthProvider>
                                        <Grid container>
                                            <Grid item xs>
                                                <Link to="/forgot-password" variant="body2">
                                                    Forgot password?
                                                </Link>
                                            </Grid>
                                            <Grid item>
                                                <Link to="/sign-up" variant="body2">
                                                    {"Don't have an account? Sign Up"}
                                                </Link>
                                                <Divider></Divider>
                                                <Link to="/company/sign-up" variant="body2">
                                                    {'Sign up as company'}
                                                </Link>
                                            </Grid>
                                        </Grid>
                                        <Copyright sx={{ mt: 5 }} />
                                    </Box>
                                </TabPanel>
                                <TabPanel value="2">
                                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="emailOrUsername"
                                            autoComplete="email"
                                            autoFocus
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                        />
                                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                            Sign In
                                        </Button>
                                        <Grid container>
                                            <Grid item xs>
                                                <Link href="#" variant="body2">
                                                    Forgot password?
                                                </Link>
                                            </Grid>
                                        </Grid>
                                        <Copyright sx={{ mt: 5 }} />
                                    </Box>
                                </TabPanel>
                                <TabPanel value="3">
                                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="3"
                                            label="Email or Username"
                                            name="emailOrUsername"
                                            autoComplete="email"
                                            autoFocus
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                        />
                                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                            Sign In
                                        </Button>
                                        <Grid container>
                                            <Grid item xs>
                                                <Link to="#" variant="body2">
                                                    Forgot password?
                                                </Link>
                                            </Grid>
                                            <Grid item>
                                                <Link href="#" variant="body2">
                                                    {"Don't have an account? Sign Up"}
                                                </Link>
                                            </Grid>
                                        </Grid>
                                        <Copyright sx={{ mt: 5 }} />
                                    </Box>
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
