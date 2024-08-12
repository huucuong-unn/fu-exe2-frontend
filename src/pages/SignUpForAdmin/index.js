import {
    Button,
    CssBaseline,
    TextField,
    Paper,
    Box,
    Grid,
    Autocomplete,
    Avatar,
    Typography,
    InputLabel,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '~/assets/images/logo.png';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Tortee
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function SignUpForAdmin() {
    const defaultTheme = createTheme();
    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        background: 'linear-gradient(180deg, #9CEE8D, #0B749C)',
                    }}
                >
                    <img src={logo} style={{ width: 150, height: 150, margin: '37%' }} alt="Logo" />
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h4">
                            Sign up as admin
                        </Typography>

                        <Box component="form" sx={{ mt: 5 }}>
                            <TextField
                                type="file"
                                id="avatarUrl"
                                name="avatarUrl"
                                style={{ display: 'none' }}
                                accept="image/jpeg, image/jpg, image/png"
                            />

                            <Box
                                sx={{
                                    mt: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar
                                    alt="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.svgrepo.com%2Fsvg%2F452030%2Favatar-default&psig=AOvVaw2Eepet3Jt6CuwNIc10izZr&ust=1718112366877000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOi0-r2R0YYDFQAAAAAdAAAAABAE"
                                    sx={{ width: 90, height: 90, border: 'solid 2px black' }}
                                    helperText="Avatar"
                                />
                            </Box>
                            <Button variant="contained" sx={{ mt: 2, ml: '50%', transform: 'translate(-50%)' }}>
                                Please Choose Avatar
                            </Button>

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
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    sx={{ flex: 1 }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="FullName"
                                    name="name"
                                    autoComplete="name"
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
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                type="email"
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
                            />
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Sign Up
                            </Button>

                            <Grid container>
                                <Grid item xs>
                                    <Link to="/sign-in" variant="body2">
                                        Sign In
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default SignUpForAdmin;
