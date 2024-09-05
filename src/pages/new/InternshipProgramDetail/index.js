import { Avatar, Card, CardHeader } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import blogBackground from '~/assets/images/blog.webp';
import homepageBackground from '~/assets/images/homepage.webp';
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

export default function InternshipProgramDetail() {
    const navigate = useNavigate();

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid sx={{ minHeight: '100vh', backgroundColor: 'white' }}>
                {/* Home Start */}
                <Grid
                    container
                    component="main"
                    item
                    sx={{
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: `url(${homepageBackground})`,
                        height: '70vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mx: 10,
                        width: '90%',
                        marginBottom: '10vh',
                        borderRadius: '20px',
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
                        sx={{
                            borderRadius: '20px',
                            backgroundColor: 'rgba(255, 255, 255, 0.0)',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'end',
                        }}
                    >
                        <Box
                            sx={{
                                // height: '100%',
                                display: 'flex',
                                bottom: 0,
                                textAlign: 'bottom',
                            }}
                        >
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{
                                    fontWeight: '900',
                                    fontSize: '72px',
                                    color: '#051D40',
                                    padding: '0 10%',
                                    height: '100%',
                                    textShadow:
                                        '2px 2px 0px #ffffff, -2px -2px 0px #ffffff, -2px 2px 0px #ffffff, 2px -2px 0px #ffffff',
                                }}
                            >
                                To shape success, keep learning the ropes
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                {/* Detail Reqs */}
                <Grid
                    container
                    component="main"
                    item
                    sx={{
                        backgroundColor: 'white',
                        height: '150vh',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 'none',
                        flexDirection: 'column',
                        gap: '5px',
                        width: '100%',
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
                        sx={{
                            borderRadius: '20px',
                            backgroundColor: 'rgba(255, 255, 255, 0.0)',
                            height: '100%',
                            width: '60%',
                        }}
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
                                About Internship Program
                            </Typography>
                            <Typography sx={{ textAlign: 'left', fontSize: '24px', width: '100%', padding: '0 8%' }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since the 1500s, when an unknown
                                printer took a galley of type and scrambled it to make a type specimen book. Lorem
                                Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                                been the industry's standard dummy text ever since the 1500s, when an unknown printer
                                took a galley of type and scrambled it to make a type specimen book.
                            </Typography>

                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{
                                    textAlign: 'left',
                                    fontWeight: '900',
                                    fontSize: '54px',
                                    color: '#051D40',
                                    padding: '0 8%',
                                    mt: 5,
                                }}
                            >
                                About Internship Program
                            </Typography>
                            <Typography sx={{ textAlign: 'left', fontSize: '24px', width: '100%', padding: '0 8%' }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since the 1500s, when an unknown
                                printer took a galley of type and scrambled it to make a type specimen book. Lorem
                                Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                                been the industry's standard dummy text ever since the 1500s, when an unknown printer
                                took a galley of type and scrambled it to make a type specimen book.
                            </Typography>

                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{
                                    textAlign: 'left',
                                    fontWeight: '900',
                                    fontSize: '54px',
                                    color: '#051D40',
                                    padding: '0 8%',
                                    mt: 5,
                                }}
                            >
                                About Internship Program
                            </Typography>
                            <Typography sx={{ textAlign: 'left', fontSize: '24px', width: '100%', padding: '0 8%' }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since the 1500s, when an unknown
                                printer took a galley of type and scrambled it to make a type specimen book. Lorem
                                Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                                been the industry's standard dummy text ever since the 1500s, when an unknown printer
                                took a galley of type and scrambled it to make a type specimen book.
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
                            borderRadius: '20px',
                            backgroundColor: 'rgba(255, 255, 255, 0.0)',
                            height: '100%',
                            width: '35%',
                        }}
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
                                TECHCOMBANK
                            </Typography>
                            <Typography sx={{ textAlign: 'left', fontSize: '24px', width: '100%', padding: '0 8%' }}>
                                The most professional Internship Program for you
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
