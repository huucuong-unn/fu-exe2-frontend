import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AccountAPI from '~/API/AccountAPI';
import storageService from '~/components/StorageService/storageService';
import findYourPlanBackground from '~/assets/images/findyourplan.jpg';

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

export default function FindYourPlan() {
    const [value, setValue] = useState('1');
    const [showAlert, setShowAlert] = useState(false);
    const location = useLocation();
    const [loginWithRole, setLoginWithRole] = useState('admin');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            data.append('loginWithRole', loginWithRole);
            const userInfo = await AccountAPI.login(data);

            // Check if userInfo is not undefined or null
            if (userInfo) {
                // Store user information in local storage
                storageService.setItem('userInfo', userInfo);
                navigate('/admin/dashboard');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid
                container
                component="main"
                item
                sx={{
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${findYourPlanBackground})`,
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
                    sm={12}
                    md={12}
                    component={Paper}
                    elevation={6}
                    square
                    sx={{ borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.0)', height: '100%' }}
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
                            sx={{ fontWeight: '900', fontSize: '72px', color: '#051D40', padding: '0 10%' }}
                        >
                            Here are the offers created for you! 🎉
                        </Typography>
                        <Typography sx={{ textAlign: 'right', marginRight: '20%', fontSize: '32px', width: '100%' }}>
                            No contracts, no surprise fees!
                        </Typography>
                        <Box
                            sx={{
                                width: '100%',
                                typography: 'body1',
                                mt: 6,
                                padding: '0 2%',
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignContent: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: '#051D40',
                                    width: '32%',
                                    height: '400px',
                                    borderRadius: '20px',
                                    padding: '35px',
                                    textAlign: 'center',
                                }}
                            >
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{ fontWeight: '700', fontSize: '28px', color: 'white' }}
                                >
                                    Free Tee
                                </Typography>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{ fontWeight: '700', fontSize: '48px', color: 'white', marginTop: '20px' }}
                                >
                                    FREE
                                </Typography>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{ fontWeight: '500', fontSize: '25px', color: 'white', marginTop: '-10px' }}
                                >
                                    forever free
                                </Typography>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 2,
                                        bgcolor: '#051D40',
                                        borderRadius: '24px',
                                        padding: '12px 0',
                                        fontSize: '16px',
                                        ':hover': {
                                            bgcolor: '#fff',
                                            color: '#051D40',
                                        },
                                        border: '1px solid #02F18D',
                                    }}
                                >
                                    Get Started
                                </Button>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{ fontWeight: '300', fontSize: '24px', color: '#ffffff', marginTop: '20px' }}
                                >
                                    Unlimited Job Applications
                                </Typography>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{ fontWeight: '300', fontSize: '24px', color: '#ffffff', marginTop: '20px' }}
                                >
                                    1 trial of CV Reviews by AI
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: '#051D40',
                                    width: '32%',
                                    height: '400px',
                                    borderRadius: '20px',
                                    padding: '35px',
                                    textAlign: 'center',
                                }}
                            >
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{ fontWeight: '700', fontSize: '28px', color: 'white' }}
                                >
                                    Silver Tee
                                </Typography>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{ fontWeight: '700', fontSize: '48px', color: 'white', marginTop: '20px' }}
                                >
                                    50.000 VND
                                </Typography>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{ fontWeight: '500', fontSize: '25px', color: 'white', marginTop: '-10px' }}
                                >
                                    monthly
                                </Typography>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 2,
                                        bgcolor: '#051D40',
                                        borderRadius: '24px',
                                        padding: '12px 0',
                                        fontSize: '16px',
                                        ':hover': {
                                            bgcolor: '#fff',
                                            color: '#051D40',
                                        },
                                        border: '1px solid #02F18D',
                                    }}
                                >
                                    Get Started
                                </Button>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{ fontWeight: '300', fontSize: '24px', color: '#ffffff', marginTop: '20px' }}
                                >
                                    Unlimited Job Applications
                                </Typography>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{ fontWeight: '300', fontSize: '24px', color: '#ffffff', marginTop: '20px' }}
                                >
                                    30 trial of CV Reviews by AI
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: '#051D40',
                                    width: '32%',
                                    height: '400px',
                                    borderRadius: '20px',
                                    padding: '35px',
                                    textAlign: 'center',
                                }}
                            >
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{ fontWeight: '700', fontSize: '28px', color: 'white' }}
                                >
                                    Golden Tee
                                </Typography>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{ fontWeight: '700', fontSize: '48px', color: 'white', marginTop: '20px' }}
                                >
                                    75.000 VND
                                </Typography>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{ fontWeight: '500', fontSize: '25px', color: 'white', marginTop: '-10px' }}
                                >
                                    monthly
                                </Typography>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 2,
                                        bgcolor: '#051D40',
                                        borderRadius: '24px',
                                        padding: '12px 0',
                                        fontSize: '16px',
                                        ':hover': {
                                            bgcolor: '#fff',
                                            color: '#051D40',
                                        },
                                        border: '1px solid #02F18D',
                                    }}
                                >
                                    Get Started
                                </Button>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{ fontWeight: '300', fontSize: '24px', color: '#ffffff', marginTop: '20px' }}
                                >
                                    Unlimited Job Applications
                                </Typography>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{ fontWeight: '300', fontSize: '24px', color: '#ffffff', marginTop: '20px' }}
                                >
                                    80 trial of CV Reviews by AI
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
