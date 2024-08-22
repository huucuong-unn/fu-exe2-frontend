import { Box, Button, CssBaseline, Divider, Grid, Paper, TextField, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AccountAPI from '~/API/AccountAPI';
import storageService from '~/components/StorageService/storageService';
import signupBackground from '~/assets/images/signup.webp';
import logo from '~/assets/images/logo.png';

const clientId = '478388298220-qhn8p4akrr4hsidbvnp999v5tn0u3s93.apps.googleusercontent.com';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright ©Tortee '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function RegisterUser() {
    const [value, setValue] = useState('1');
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);
    const location = useLocation();
    const [loginWithRole, setLoginWithRole] = useState('student');
    const [dobHelperText, setDobHelperText] = useState('');

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
        <Box sx={{ fontFamily: 'Kumbh Sans' }}>
            {showAlert && (
                <Alert width="50%" variant="filled" severity="success">
                    Registered Successfully
                </Alert>
            )}
            {showAlertError && (
                <Alert width="50%" variant="filled" severity="error">
                    Incorrect email or password or please check login correct role !
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
                    backgroundPosition: 'top',
                    backgroundImage: `url(${signupBackground})`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CssBaseline />

                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={8}
                    component={Paper}
                    elevation={6}
                    square
                    sx={{
                        borderRadius: '20px',
                        zIndex: '2',
                        margin: '5%',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        marginTop: '12%',
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
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{ fontWeight: '900', fontSize: '46px', color: '#051D40' }}
                        >
                            CREATE AN ACCOUNT
                        </Typography>
                        <Typography sx={{ textAlign: 'center', marginTop: '12px' }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry's standard dummy text ever since the 1500s
                        </Typography>
                        <Box sx={{ width: '100%', typography: 'body1', mt: 2 }}>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'left',
                                        alignItems: 'center',
                                        gap: 2,
                                    }}
                                >
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Full Name"
                                        name="name"
                                        autoComplete="name"
                                        sx={{ flex: 1 }}
                                    />
                                    <TextField
                                        // error={dobError}
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="dob"
                                        label="Date of Birth"
                                        type="date"
                                        defaultValue="2000-06-04"
                                        id="dob"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        helperText={dobHelperText}
                                        sx={{ flex: 1 }}
                                    />
                                </Box>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone Number"
                                    name="phone"
                                    autoComplete="phone"
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    sx={{ borderRadius: '50%' }}
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
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="current-password"
                                    // helperText={confirmPasswordError}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    // sx={{ mt: 3, mb: 2 }}
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
                                    Sign Up
                                </Button>
                                <Divider>Or sign up with</Divider>
                                <Box sx={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
                                    <GoogleOAuthProvider clientId={clientId}>
                                        <GoogleLogin
                                            onSuccess={handleGoogleLoginSuccess}
                                            onFailure={handleGoogleLoginFailure}
                                        />
                                    </GoogleOAuthProvider>
                                </Box>

                                <Grid container sx={{ display: 'flex', justifyContent: 'center', marginTop: '42px' }}>
                                    <Grid item sx={{ gap: '4px' }}>
                                        Already have an account?
                                        <Link
                                            to="/login"
                                            variant="body2"
                                            style={{ color: '#051D40', textDecoration: 'none', fontWeight: 'bold' }}
                                        >
                                            {' Login Now'}
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Copyright sx={{ mt: 10 }} />
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={false} sm={4} md={7} sx={{}}></Grid>
            </Grid>
        </Box>
    );
}
