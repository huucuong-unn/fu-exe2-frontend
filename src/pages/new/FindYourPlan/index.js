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
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function FindYourPlan() {
    const [userInfo, setUserInfo] = useState(storageService.getItem('userInfo') || null);
    const [isLoadingClickSilverTee, setIsLoadingClickSilverTee] = useState(false);
    const [isLoadingClickGoldenTee, setIsLoadingClickGoldenTee] = useState(false);
    const navigate = useNavigate();

    const handleGoCheckoutSilverTee = async (event) => {
        try {
            if (userInfo) {
                if (userInfo?.planType === 'Golden Tee' || userInfo?.planType === 'Silver Tee') return;

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
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleGoCheckoutGoldenTee = async (event) => {
        try {
            if (userInfo) {
                if (userInfo?.planType === 'Golden Tee' || userInfo?.planType === 'Silver Tee') return;

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
            } else {
                navigate('/login');
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
                    height: '100%',
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
                            Dưới đây là các gói đăng ký dành cho bạn! 🎉
                        </Typography>
                        <Typography sx={{ textAlign: 'right', marginRight: '20%', fontSize: '32px', width: '100%' }}>
                            Không ràng buộc, không phí bất ngờ!
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
                                    Gói Miễn Phí
                                </Typography>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{ fontWeight: '700', fontSize: '48px', color: 'white', marginTop: '20px' }}
                                >
                                    MIỄN PHÍ
                                </Typography>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{ fontWeight: '500', fontSize: '25px', color: 'white', marginTop: '-10px' }}
                                >
                                    không mất phí
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
                                    Gói mặc định
                                </Button>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{ fontWeight: '300', fontSize: '24px', color: '#ffffff', marginTop: '20px' }}
                                >
                                    1 lượt dùng AI Review CV
                                </Typography>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{ fontWeight: '300', fontSize: '24px', color: '#ffffff', marginTop: '20px' }}
                                >
                                    1 lượt dùng AI Cover Letter
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
                                    Gói Bạc
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
                                    tháng
                                </Typography>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    onClick={userInfo?.planType === 'Silver Tee' ? null : handleGoCheckoutSilverTee}
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
                                        'Gói hiện tại'
                                    ) : isLoadingClickSilverTee ? (
                                        <CircularProgress />
                                    ) : (
                                        'Đăng ký ngay'
                                    )}
                                </Button>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{ fontWeight: '300', fontSize: '24px', color: '#ffffff', marginTop: '20px' }}
                                >
                                    30 lượt dùng AI Review CV
                                </Typography>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{ fontWeight: '300', fontSize: '24px', color: '#ffffff', marginTop: '20px' }}
                                >
                                    20 lượt dùng AI Cover Letter
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
                                    Gói Vàng
                                </Typography>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{ fontWeight: '700', fontSize: '48px', color: 'white', marginTop: '20px' }}
                                >
                                    70.000 VND
                                </Typography>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{ fontWeight: '500', fontSize: '25px', color: 'white', marginTop: '-10px' }}
                                >
                                    tháng
                                </Typography>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    onClick={userInfo?.planType === 'Golden Tee' ? null : handleGoCheckoutGoldenTee}
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
                                        'Gói Hiện Tại'
                                    ) : isLoadingClickGoldenTee ? (
                                        <CircularProgress />
                                    ) : (
                                        'Đăng ký ngay'
                                    )}
                                </Button>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{ fontWeight: '300', fontSize: '24px', color: '#ffffff', marginTop: '20px' }}
                                >
                                    50 lượt dùng AI Review CV
                                </Typography>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{ fontWeight: '300', fontSize: '24px', color: '#ffffff', marginTop: '20px' }}
                                >
                                    40 lượt dùng AI Cover Letter
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
