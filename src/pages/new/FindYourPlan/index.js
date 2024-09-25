import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import storageService from '~/components/StorageService/storageService';
import findYourPlanBackground from '~/assets/images/findyourplan.webp';
import PayosAPI from '~/API/PayosAPI';
import { CircularProgress } from '@mui/material';

const defaultTheme = createTheme();

export default function FindYourPlan() {
    const [userInfo, setUserInfo] = useState(storageService.getItem('userInfo') || null);
    const [isLoadingClickSilverTee, setIsLoadingClickSilverTee] = useState(false);
    const [isLoadingClickGoldenTee, setIsLoadingClickGoldenTee] = useState(false);

    const handleGoCheckoutSilverTee = async (event) => {
        try {
            if (userInfo) {
                setIsLoadingClickSilverTee(true);
                const response = await PayosAPI.goCheckout({
                    productName: 'Silver Tee',
                    userId: userInfo?.id,
                });
                console.log(response);
                if (response.data.checkoutUrl) {
                    setIsLoadingClickSilverTee(false);
                    window.location.href = response.data.checkoutUrl;
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleGoCheckoutGoldenTee = async (event) => {
        try {
            if (userInfo) {
                setIsLoadingClickGoldenTee(true);

                const response = await PayosAPI.goCheckout({
                    productName: 'Golden Tee',
                    userId: userInfo?.id,
                });
                console.log(response);
                if (response.data.checkoutUrl) {
                    setIsLoadingClickGoldenTee(false);
                    window.location.href = response.data.checkoutUrl;
                }
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
                                            bgcolor: '#02F18D',
                                            color: '#051D40',
                                        },
                                        border: '1px solid #02F18D',
                                    }}
                                >
                                    Default Plan
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
                                    20.000 VND
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
                                    onClick={handleGoCheckoutSilverTee}
                                    sx={{
                                        mt: 2,
                                        bgcolor: '#051D40',
                                        borderRadius: '24px',
                                        padding: '12px 0',
                                        fontSize: '16px',
                                        ':hover': {
                                            bgcolor: '#02F18D',
                                            color: '#051D40',
                                        },
                                        border: '1px solid #02F18D',
                                        maxHeight: '54px',
                                    }}
                                >
                                    {userInfo?.planType === 'Silver Tee' ? (
                                        'Current Plan'
                                    ) : isLoadingClickSilverTee ? (
                                        <CircularProgress />
                                    ) : (
                                        'Get Started'
                                    )}
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
                                    20 trial of CV Reviews by AI
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
                                    40.000 VND
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
                                    onClick={handleGoCheckoutGoldenTee}
                                    sx={{
                                        mt: 2,
                                        bgcolor: '#051D40',
                                        borderRadius: '24px',
                                        padding: '12px 0',
                                        fontSize: '16px',
                                        ':hover': {
                                            bgcolor: '#02F18D',
                                            color: '#051D40',
                                        },
                                        border: '1px solid #02F18D',
                                        maxHeight: '54px',
                                    }}
                                >
                                    {userInfo?.planType === 'Golden Tee' ? (
                                        'Current Plan'
                                    ) : isLoadingClickGoldenTee ? (
                                        <CircularProgress />
                                    ) : (
                                        'Get Started'
                                    )}
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
                                    50 trial of CV Reviews by AI
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
