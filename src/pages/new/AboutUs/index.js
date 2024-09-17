import { Avatar, Card, CardHeader } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import blogBackground from '~/assets/images/blog.webp';
import aboutUsBackground from '~/assets/images/aboutus.webp';
import techcombank from '~/assets/images/techcombank.png';
import techcombanklogo from '~/assets/images/techcombanklogo.png';
import fptlogo from '~/assets/images/fptlogo.png';
import vnglogo from '~/assets/images/vnglogo.png';
import microsoftlogo from '~/assets/images/microsoftlogo.png';

const defaultTheme = createTheme();

export default function AboutUs() {
    const navigate = useNavigate();
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
                                The Destination to Your Dream Career
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
                            Feature Partners
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
                            The most professional Internship Program for you
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
                                    <img style={{ width: '50%' }} src={techcombanklogo} alt="company logo" />
                                    Techcombank
                                </Typography>
                                <Typography sx={{ width: '20%' }}>
                                    <img style={{ width: '50%' }} src={fptlogo} alt="company logo" />
                                </Typography>
                                <Typography sx={{ width: '20%' }}>
                                    <img style={{ width: '50%' }} src={vnglogo} alt="company logo" />
                                </Typography>
                                <Typography sx={{ width: '20%' }}>
                                    <img style={{ width: '50%' }} src={microsoftlogo} alt="company logo" />
                                </Typography>{' '}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

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
                </Grid>

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
                                To shape success, keep learning the ropes
                            </Typography>
                            <Typography
                                sx={{ textAlign: 'left', fontSize: '24px', width: '100%', padding: '0 5%', mt: '20px' }}
                            >
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since the 1500sLorem Ipsum is simply
                                dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                standard dummy text ever since the 1500s
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                my: 8,
                                mx: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                width: '45%',
                            }}
                        >
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{
                                    textAlign: 'left',
                                    fontWeight: '900',
                                    fontSize: '54px',
                                    color: '#051D40',
                                }}
                            >
                                To shape success, keep learning the ropes
                            </Typography>
                            <Typography sx={{ textAlign: 'center', fontSize: '24px', width: '100%', padding: '0 8%' }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since the 1500s{' '}
                            </Typography>
                        </Box>
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
                                Our Standing Feature
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
                            <Typography
                                sx={{
                                    textAlign: 'left',
                                    fontSize: '16px',
                                    width: '100%',
                                    padding: '0 8%',
                                    color: '#ccc',
                                }}
                            >
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since the 1500s
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
                                Explore Now
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
                                        Get Started
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
                                        Unlimited Job Applications
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
                                        border: '1px solid #02F18D',
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
                                                bgcolor: '#02F18D',
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
                                        sx={{
                                            fontWeight: '300',
                                            fontSize: '24px',
                                            color: '#ffffff',
                                            marginTop: '20px',
                                        }}
                                    >
                                        Unlimited Job Applications
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
                                        border: '1px solid #02F18D',
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
                                                bgcolor: '#02F18D',
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
                                        sx={{
                                            fontWeight: '300',
                                            fontSize: '24px',
                                            color: '#ffffff',
                                            marginTop: '20px',
                                        }}
                                    >
                                        Unlimited Job Applications
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
                                        80 trial of CV Reviews by AI
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
