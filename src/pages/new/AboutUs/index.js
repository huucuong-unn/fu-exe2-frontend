import { Avatar, Card, CardHeader, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import blogBackground from '~/assets/images/blog.webp';
import aboutUsBackground from '~/assets/images/aboutus.webp';
import techcombanklogo from '~/assets/images/techcombanklogo.png';
import fptlogo from '~/assets/images/fptlogo.png';
import vnglogo from '~/assets/images/vnglogo.png';
import microsoftlogo from '~/assets/images/microsoftlogo.png';
import PayosAPI from '~/API/PayosAPI';
import storageService from '~/components/StorageService/storageService';
import { useState } from 'react';
import aboutusside from '~/assets/images/aboutusside.webp';

const defaultTheme = createTheme();

export default function AboutUs() {
    const navigate = useNavigate();

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
            <Grid sx={{ minHeight: '100vh', backgroundColor: 'white' }}>
                {/* About Us Start */}
                <Grid
                    container
                    component="main"
                    item
                    sx={{
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: `url(${aboutUsBackground})`,
                        height: '150vh',
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
                                sx={{
                                    textAlign: 'center',
                                    fontWeight: '900',
                                    fontSize: '72px',
                                    color: '#051D40',
                                    padding: '0 10%',
                                }}
                            >
                                Đi cùng Tortee, ghi thêm chặng đường thành công
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                {/* Feature Partners */}
                <Grid sx={{ backgroundColor: 'white', padding: '40px 0' }}>
                    <Grid
                        sx={{
                            backgroundColor: '#051D40',
                            borderRadius: '30px',
                            margin: '0 40px 0 40px',
                            padding: '40px 0',
                        }}
                    >
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{
                                textAlign: 'center',
                                fontWeight: '900',
                                fontSize: '54px',
                                color: 'white',
                                padding: '0 10%',
                            }}
                        >
                            Các đối tác đồng hành
                        </Typography>
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{
                                textAlign: 'center',
                                fontWeight: '300',
                                fontSize: '24px',
                                color: '#ccc',
                                padding: '0 10%',
                            }}
                        >
                            Cảm ơn các đối tác đã tin tưởng và hợp tác cùng Tortee
                        </Typography>
                        <Grid sx={{ color: 'white', width: '100%', my: 6 }}>
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={4}
                                sx={{ display: 'flex', justifyContent: 'space-evenly', fontSize: '16px' }}
                            >
                                <Typography sx={{ width: '20%' }}>
                                    <img style={{ width: '50%' }} src={fptlogo} alt="company logo" />
                                </Typography>
                                <Typography sx={{ width: '20%' }}>
                                    <img style={{ width: '50%' }} src={fptlogo} alt="company logo" />
                                </Typography>
                                <Typography sx={{ width: '20%' }}>
                                    <img style={{ width: '50%' }} src={fptlogo} alt="company logo" />
                                </Typography>
                                <Typography sx={{ width: '20%' }}>
                                    <img style={{ width: '50%' }} src={fptlogo} alt="company logo" />
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Advantage */}
                {/* <Grid
                    container
                    component="main"
                    item
                    sx={{
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '150vh',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 'none',
                    }}
                >
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
                                // alignItems: 'center',
                                textAlign: 'left',
                            }}
                        >
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{
                                    textAlign: 'center',
                                    fontWeight: '900',
                                    fontSize: '54px',
                                    color: '#051D40',
                                    padding: '0 8%',
                                }}
                            >
                                The Advantages Using Our Service
                            </Typography>
                            <Typography sx={{ textAlign: 'center', fontSize: '24px', width: '100%', padding: '0 8%' }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since the 1500s{' '}
                            </Typography>
                            <Grid sx={{ padding: '3% 8%' }}>
                                <Grid
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-evenly',
                                        gap: '30px',
                                        marginTop: '30px',
                                    }}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        component={Paper}
                                        elevation={6}
                                        square
                                        sx={{
                                            borderRadius: '35px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.8);',
                                            height: '100%',
                                            display: 'flex',
                                            padding: '20px  ',
                                            gap: '25px',
                                            width: '30%',
                                        }}
                                    >
                                        <Box>
                                            <img
                                                src={techcombank}
                                                alt="techcombank"
                                                style={{ width: '187px', height: '157px' }}
                                            />
                                        </Box>
                                        <Box>
                                            <Typography
                                                component="h1"
                                                variant="h4"
                                                sx={{ fontWeight: '900', fontSize: '24px', color: '#051D40' }}
                                            >
                                                Techcombank Future Gen 2025 - Develop a Future You
                                            </Typography>
                                            <Typography sx={{ my: 1, fontSize: '12px' }}>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry. Lorem Ipsum has been the industry's standard dummy text ever
                                                since the 1500s, when an unknown printer took a galley of type and
                                                scrambled it to make a type specimen book.{' '}
                                            </Typography>
                                            <Card
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    flexGrow: 1,
                                                    boxShadow: 'none',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.0);',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        pr: 2,
                                                    }}
                                                >
                                                    <CardHeader
                                                        avatar={<Avatar src={techcombank} />}
                                                        title={<Typography fontWeight="bold">Techcombank</Typography>}
                                                        subheader="Ho Chi Minh city - June 25, 2024"
                                                    />
                                                </Box>
                                            </Card>
                                            <Grid sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{
                                                        width: '30%',
                                                        bgcolor: '#051D40',
                                                        borderRadius: '24px',
                                                        padding: '12px 0',
                                                        fontSize: '12px',
                                                        ':hover': {
                                                            bgcolor: '#02F18D',
                                                            color: '#051D40',
                                                        },
                                                    }}
                                                >
                                                    Apply Now
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{
                                                        width: '30%',

                                                        bgcolor: '#051D40',
                                                        borderRadius: '24px',
                                                        padding: '12px 0',
                                                        fontSize: '12px',
                                                        ':hover': {
                                                            bgcolor: '#02F18D',
                                                            color: '#051D40',
                                                        },
                                                    }}
                                                >
                                                    Details
                                                </Button>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        component={Paper}
                                        elevation={6}
                                        square
                                        sx={{
                                            borderRadius: '35px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.8);',
                                            height: '100%',
                                            display: 'flex',
                                            padding: '20px  ',
                                            gap: '25px',
                                            width: '30%',
                                            opacity: '0.9',
                                        }}
                                    >
                                        <Box>
                                            <img
                                                src={techcombank}
                                                alt="techcombank"
                                                style={{ width: '187px', height: '157px' }}
                                            />
                                        </Box>
                                        <Box>
                                            <Typography
                                                component="h1"
                                                variant="h4"
                                                sx={{ fontWeight: '900', fontSize: '24px', color: '#051D40' }}
                                            >
                                                Techcombank Future Gen 2025 - Develop a Future You
                                            </Typography>
                                            <Typography sx={{ my: 1, fontSize: '12px' }}>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry. Lorem Ipsum has been the industry's standard dummy text ever
                                                since the 1500s, when an unknown printer took a galley of type and
                                                scrambled it to make a type specimen book.{' '}
                                            </Typography>
                                            <Card
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    flexGrow: 1,
                                                    boxShadow: 'none',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.0);',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        pr: 2,
                                                    }}
                                                >
                                                    <CardHeader
                                                        avatar={<Avatar src={techcombank} />}
                                                        title={<Typography fontWeight="bold">Techcombank</Typography>}
                                                        subheader="Ho Chi Minh city - June 25, 2024"
                                                    />
                                                </Box>
                                            </Card>
                                            <Grid sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{
                                                        width: '30%',
                                                        bgcolor: '#051D40',
                                                        borderRadius: '24px',
                                                        padding: '12px 0',
                                                        fontSize: '12px',
                                                        ':hover': {
                                                            bgcolor: '#02F18D',
                                                            color: '#051D40',
                                                        },
                                                    }}
                                                >
                                                    Apply Now
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{
                                                        width: '30%',

                                                        bgcolor: '#051D40',
                                                        borderRadius: '24px',
                                                        padding: '12px 0',
                                                        fontSize: '12px',
                                                        ':hover': {
                                                            bgcolor: '#02F18D',
                                                            color: '#051D40',
                                                        },
                                                    }}
                                                >
                                                    Details
                                                </Button>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-evenly',
                                        gap: '30px',
                                        marginTop: '30px',
                                    }}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        component={Paper}
                                        elevation={6}
                                        square
                                        sx={{
                                            borderRadius: '35px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.8);',
                                            height: '100%',
                                            display: 'flex',
                                            padding: '20px  ',
                                            gap: '25px',
                                            width: '30%',
                                        }}
                                    >
                                        <Box>
                                            <img
                                                src={techcombank}
                                                alt="techcombank"
                                                style={{ width: '187px', height: '157px' }}
                                            />
                                        </Box>
                                        <Box>
                                            <Typography
                                                component="h1"
                                                variant="h4"
                                                sx={{ fontWeight: '900', fontSize: '24px', color: '#051D40' }}
                                            >
                                                Techcombank Future Gen 2025 - Develop a Future You
                                            </Typography>
                                            <Typography sx={{ my: 1, fontSize: '12px' }}>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry. Lorem Ipsum has been the industry's standard dummy text ever
                                                since the 1500s, when an unknown printer took a galley of type and
                                                scrambled it to make a type specimen book.{' '}
                                            </Typography>
                                            <Card
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    flexGrow: 1,
                                                    boxShadow: 'none',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.0);',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        pr: 2,
                                                    }}
                                                >
                                                    <CardHeader
                                                        avatar={<Avatar src={techcombank} />}
                                                        title={<Typography fontWeight="bold">Techcombank</Typography>}
                                                        subheader="Ho Chi Minh city - June 25, 2024"
                                                    />
                                                </Box>
                                            </Card>
                                            <Grid sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{
                                                        width: '30%',
                                                        bgcolor: '#051D40',
                                                        borderRadius: '24px',
                                                        padding: '12px 0',
                                                        fontSize: '12px',
                                                        ':hover': {
                                                            bgcolor: '#02F18D',
                                                            color: '#051D40',
                                                        },
                                                    }}
                                                >
                                                    Apply Now
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{
                                                        width: '30%',

                                                        bgcolor: '#051D40',
                                                        borderRadius: '24px',
                                                        padding: '12px 0',
                                                        fontSize: '12px',
                                                        ':hover': {
                                                            bgcolor: '#02F18D',
                                                            color: '#051D40',
                                                        },
                                                    }}
                                                >
                                                    Details
                                                </Button>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        component={Paper}
                                        elevation={6}
                                        square
                                        sx={{
                                            borderRadius: '35px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.8);',
                                            height: '100%',
                                            display: 'flex',
                                            padding: '20px  ',
                                            gap: '25px',
                                            width: '30%',
                                            opacity: '0.9',
                                        }}
                                    >
                                        <Box>
                                            <img
                                                src={techcombank}
                                                alt="techcombank"
                                                style={{ width: '187px', height: '157px' }}
                                            />
                                        </Box>
                                        <Box>
                                            <Typography
                                                component="h1"
                                                variant="h4"
                                                sx={{ fontWeight: '900', fontSize: '24px', color: '#051D40' }}
                                            >
                                                Techcombank Future Gen 2025 - Develop a Future You
                                            </Typography>
                                            <Typography sx={{ my: 1, fontSize: '12px' }}>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry. Lorem Ipsum has been the industry's standard dummy text ever
                                                since the 1500s, when an unknown printer took a galley of type and
                                                scrambled it to make a type specimen book.{' '}
                                            </Typography>
                                            <Card
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    flexGrow: 1,
                                                    boxShadow: 'none',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.0);',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        pr: 2,
                                                    }}
                                                >
                                                    <CardHeader
                                                        avatar={<Avatar src={techcombank} />}
                                                        title={<Typography fontWeight="bold">Techcombank</Typography>}
                                                        subheader="Ho Chi Minh city - June 25, 2024"
                                                    />
                                                </Box>
                                            </Card>
                                            <Grid sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{
                                                        width: '30%',
                                                        bgcolor: '#051D40',
                                                        borderRadius: '24px',
                                                        padding: '12px 0',
                                                        fontSize: '12px',
                                                        ':hover': {
                                                            bgcolor: '#02F18D',
                                                            color: '#051D40',
                                                        },
                                                    }}
                                                >
                                                    Apply Now
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{
                                                        width: '30%',

                                                        bgcolor: '#051D40',
                                                        borderRadius: '24px',
                                                        padding: '12px 0',
                                                        fontSize: '12px',
                                                        ':hover': {
                                                            bgcolor: '#02F18D',
                                                            color: '#051D40',
                                                        },
                                                    }}
                                                >
                                                    Details
                                                </Button>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid> */}

                {/* Advantage */}
                <Grid
                    container
                    component="main"
                    item
                    sx={{
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '100vh',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 'none',
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        component={Paper}
                        elevation={6}
                        square
                        sx={{
                            borderRadius: '20px',
                            backgroundColor: 'rgba(255, 255, 255, 0.0)',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                // alignItems: 'center',
                                width: '45%',
                            }}
                        >
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{
                                    textAlign: 'left',
                                    fontWeight: '900',
                                    fontSize: '72px',
                                    color: '#051D40',
                                    padding: '0 5%',
                                }}
                            >
                                Để định hình thành công, hãy tiếp tục học hỏi
                            </Typography>
                            <Typography
                                sx={{ textAlign: 'left', fontSize: '24px', width: '100%', padding: '0 5%', mt: '20px' }}
                            >
                                Công cụ kiểm tra và đánh giá CV thông minh sẽ phân tích CV của bạn, đưa ra các gợi ý cải
                                thiện dựa trên thông tin bạn cung cấp, giúp CV của bạn trở nên chuyên nghiệp và ấn tượng
                                hơn.
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                my: 8,
                                mx: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                width: '45%',
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: (t) =>
                                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundImage: `url(${aboutusside})`,
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '70vh',
                            }}
                        ></Box>
                    </Grid>
                </Grid>

                {/* AI */}
                <Grid
                    container
                    component="main"
                    item
                    sx={{
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: `url(${blogBackground})`,
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '20px 20px 0 0 ',
                    }}
                >
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
                                // alignItems: 'center',
                            }}
                        >
                            <Typography
                                sx={{
                                    textAlign: 'center',
                                    fontWeight: '800',
                                    fontSize: '42px',
                                    width: '100%',
                                    padding: '0 8%',
                                    color: 'white',
                                }}
                            >
                                Tính năng nổi bật
                            </Typography>
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{
                                    textAlign: 'center',
                                    fontWeight: '900',
                                    fontSize: '72px',
                                    color: 'white',
                                    padding: '0 8%',
                                }}
                            >
                                AI RESUME CHECKER
                            </Typography>

                            <Button
                                onClick={() => navigate('/offer')}
                                type="submit"
                                variant="contained"
                                sx={{
                                    bgcolor: '#051D40',
                                    borderRadius: '24px',
                                    padding: '12px 0',
                                    fontSize: '16px',
                                    ':hover': {
                                        bgcolor: '#02F18D',
                                        color: '#051D40',
                                    },
                                    border: '1px solid #02F18D',
                                    width: '15%',
                                    margin: 'auto auto',
                                    marginTop: '20px',
                                }}
                            >
                                Khám phá ngay!
                            </Button>
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
                                        border: '1px solid #02F18D',
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
                                        sx={{
                                            fontWeight: '300',
                                            fontSize: '24px',
                                            color: '#ffffff',
                                            marginTop: '20px',
                                        }}
                                    >
                                        1 lượt dùng AI Review CV
                                    </Typography>
                                    <Typography
                                        component="h1"
                                        variant="h4"
                                        sx={{
                                            fontWeight: '300',
                                            fontSize: '24px',
                                            color: '#ffffff',
                                            marginTop: '20px',
                                        }}
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
                                        border: '1px solid #02F18D',
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
                                        {isLoadingClickSilverTee ? <CircularProgress /> : 'Gói hạng Bạc'}
                                    </Button>
                                    <Typography
                                        component="h1"
                                        variant="h4"
                                        sx={{
                                            fontWeight: '300',
                                            fontSize: '24px',
                                            color: '#ffffff',
                                            marginTop: '20px',
                                        }}
                                    >
                                        30 lượt dùng AI Review CV
                                    </Typography>
                                    <Typography
                                        component="h1"
                                        variant="h4"
                                        sx={{
                                            fontWeight: '300',
                                            fontSize: '24px',
                                            color: '#ffffff',
                                            marginTop: '20px',
                                        }}
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
                                        border: '1px solid #02F18D',
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
                                        {isLoadingClickGoldenTee ? <CircularProgress /> : 'Gói Hạng Vàng'}
                                    </Button>
                                    <Typography
                                        component="h1"
                                        variant="h4"
                                        sx={{
                                            fontWeight: '300',
                                            fontSize: '24px',
                                            color: '#ffffff',
                                            marginTop: '20px',
                                        }}
                                    >
                                        50 lượt dùng AI Review CV
                                    </Typography>
                                    <Typography
                                        component="h1"
                                        variant="h4"
                                        sx={{
                                            fontWeight: '300',
                                            fontSize: '24px',
                                            color: '#ffffff',
                                            marginTop: '20px',
                                        }}
                                    >
                                        40 lượt dùng AI Cover Letter
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
