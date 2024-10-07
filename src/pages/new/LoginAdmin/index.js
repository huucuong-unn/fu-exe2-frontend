import Alert from '@mui/material/Alert';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountAPI from '~/API/AccountAPI';
import adminLoginBackground from '~/assets/images/adminlogin.webp';
import storageService from '~/components/StorageService/storageService';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright ©Tortee '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function LoginAdmin() {
    const [showAlertError, setShowAlertError] = useState(false);
    const [role, setRole] = useState('admin'); //default role is student
    const [loginLoading, setLoginLoading] = useState(false);

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoginLoading(true); // Start the loading spinner
        try {
            const data = new FormData(event.currentTarget);
            data.append('role', role);

            // Make the API call
            const userInfo = await AccountAPI.login(data);

            console.log(userInfo);

            // If status is 200, login successful
            if (userInfo) {
                setLoginLoading(false);

                storageService.setItem('userInfo', userInfo); // Store user info

                navigate('/admin/payment-management'); // Navigate to home page
            } else {
                // If login fails (non-200 status)
                setLoginLoading(false);
                setShowAlertError(true); // Show error alert
                setTimeout(() => setShowAlertError(false), 5000); // Hide alert after 5s
            }
        } catch (error) {
            // Handle API errors (network issues, server errors, etc.)
            console.error('Login error:', error);
            setLoginLoading(false);
            setShowAlertError(true); // Show error alert
            setTimeout(() => setShowAlertError(false), 5000); // Hide alert after 5s
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            {showAlertError && (
                <Alert width="50%" variant="filled" severity="error">
                    Incorrect username or password or please check login correct role !
                </Alert>
            )}
            {loginLoading ? (
                <Grid sx={{ width: '100%', height: '100vh', opacity: 0.8, backgroundColor: 'white' }}>
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex', // Enable flexbox
                            justifyContent: 'center', // Center horizontally
                            alignItems: 'center', // Center vertically
                        }}
                    >
                        <CircularProgress />
                    </Box>
                </Grid>
            ) : (
                <Grid
                    container
                    component="main"
                    item
                    sx={{
                        // backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: `url(${adminLoginBackground})`,
                        height: '100vh',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {/* <CssBaseline /> */}

                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={5}
                        component={Paper}
                        elevation={6}
                        square
                        sx={{ borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                    >
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{ fontWeight: '900', fontSize: '46px', color: '#051D40' }}
                            >
                                ADMIN LOGIN
                            </Typography>
                            <Box sx={{ width: '100%', typography: 'body1', mt: 2, padding: '0 10%' }}>
                                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="3"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Mật khẩu"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
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
                                        Đăng nhập
                                    </Button>

                                    <Copyright sx={{ mt: 5 }} />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            )}
        </ThemeProvider>
    );
}
