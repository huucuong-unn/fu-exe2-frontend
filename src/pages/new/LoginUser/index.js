import { Box, Button, CssBaseline, Divider, Grid, Paper, TextField, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AccountAPI from '~/API/AccountAPI';
import storageService from '~/components/StorageService/storageService';
import menteeLoginBackground from '~/assets/images/menteelogin.png';

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

export default function LoginUser() {
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
            <Grid
                container
                component="main"
                sx={{
                    height: '100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${menteeLoginBackground})`,
                    justifyContent: 'right',
                }}
            >
                <CssBaseline />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                    sx={{
                        borderRadius: '20px',
                        zIndex: '2',
                        float: 'right',
                        margin: '5%',
                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    }}
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '0 30px',
                        }}
                    >
                        {/* <img src={logo} alt="Logo" /> */}
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{ fontWeight: '900', fontSize: '46px', color: '#051D40' }}
                        >
                            WELCOME BACK!
                        </Typography>
                        <Typography sx={{ textAlign: 'center', marginTop: '12px' }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry's standard dummy text ever since the 1500s
                        </Typography>
                        <Box sx={{ width: '100%', typography: 'body1', mt: 2 }}>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    sx={{ borderRadius: '10px' }}
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
                                <Typography sx={{ textAlign: 'right' }}>Forget Password?</Typography>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 3,
                                        mb: 2,
                                        bgcolor: '#051D40',
                                        borderRadius: '24px',
                                        padding: '12px 0',
                                        fontSize: '16px',
                                        ':hover': {
                                            bgcolor: '#051D40',
                                            opacity: '0.8',
                                        },
                                    }}
                                >
                                    Login
                                </Button>
                                <Divider>Or continue with</Divider>
                                <Box sx={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
                                    <GoogleOAuthProvider clientId={clientId}>
                                        <GoogleLogin
                                            onSuccess={handleGoogleLoginSuccess}
                                            onFailure={handleGoogleLoginFailure}
                                        />
                                    </GoogleOAuthProvider>
                                </Box>

                                <Grid container sx={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
                                    <Grid item sx={{ gap: '4px' }}>
                                        Not a member?
                                        <Link
                                            to="/register"
                                            variant="body2"
                                            style={{ color: '#051D40', textDecoration: 'none', fontWeight: 'bold' }}
                                        >
                                            {' Register now'}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
