import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import findYourPlanBackground from '~/assets/images/findyourplan.webp';

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

export default function Homepage() {
    const navigate = useNavigate();

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid sx={{ minHeight: '500vh' }}>
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
                                sx={{
                                    textAlign: 'center',
                                    fontWeight: '900',
                                    fontSize: '72px',
                                    color: '#051D40',
                                    padding: '0 10%',
                                }}
                            >
                                To shape success, keep learning the ropes
                            </Typography>
                            <Typography
                                sx={{ textAlign: 'center', fontSize: '24px', width: '100%', padding: '3% 20%' }}
                            >
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since the 1500s
                            </Typography>
                            <Button
                                onClick={() => navigate('/offer')}
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: '#051D40',
                                    color: '#fff',
                                    fontSize: '16px',
                                    padding: '15px 30px',
                                    borderRadius: '30px',
                                    ':hover': {
                                        bgcolor: '#02F18D',
                                        color: '#051D40',
                                    },
                                }}
                            >
                                Explore
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <Grid sx={{ backgroundColor: '#051D40', padding: '40px 0' }}>
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            textAlign: 'left',
                            fontWeight: '900',
                            fontSize: '54px',
                            color: 'white',
                            padding: '0 10%',
                        }}
                    >
                        Feature Companies
                    </Typography>
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            textAlign: 'left',
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
                            <Typography>Techcombank</Typography>
                            <Typography>Techcombank</Typography>
                            <Typography>Techcombank</Typography>
                            <Typography>Techcombank</Typography>
                            <Typography>Techcombank</Typography>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={4}
                            sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 4, fontSize: '16px' }}
                        >
                            <Typography>Techcombank</Typography>
                            <Typography>Techcombank</Typography>
                            <Typography>Techcombank</Typography>
                            <Typography>Techcombank</Typography>
                            <Typography>Techcombank</Typography>
                        </Grid>
                    </Grid>
                </Grid>
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
                                Outstanding Internship Program
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
