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
import internshipProgramBackground from '~/assets/images/internshipprogram.webp';

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

export default function Blog() {
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
                        height: '220vh',
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
                                    padding: '0 8%',
                                }}
                            >
                                Outstanding Blog
                            </Typography>
                            <Typography sx={{ textAlign: 'left', fontSize: '24px', width: '100%', padding: '0 8%' }}>
                                The most professional Internship Program for you
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
                                        </Box>
                                    </Grid>{' '}
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
                                        </Box>
                                    </Grid>{' '}
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
                                        }}
                                    >
                                        <Box>
                                            <img
                                                src={techcombank}
                                                alt="techcombank"
                                                style={{ width: '187px', height: '157px' }}
                                            />
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
                                        </Box>
                                    </Grid>{' '}
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
                                        </Box>
                                    </Grid>{' '}
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
                                        </Box>
                                    </Grid>{' '}
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
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
