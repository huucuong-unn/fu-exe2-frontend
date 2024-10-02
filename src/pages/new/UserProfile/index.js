import { Box, Grid, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import signupBackground from '~/assets/images/signup.webp';
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

export default function UserProfile() {
    const [userInfo, setUserInfo] = useState(storageService.getItem('userInfo') || null);

    useEffect(() => {
        const fetchUser = async () => {
            // This useEffect is now only for updating userInfo if it changes in localStorage
            const storedUserInfo = await storageService.getItem('userInfo');

            if (storedUserInfo !== null) {
                setUserInfo(storedUserInfo);
                console.log(storedUserInfo);
                console.log(userInfo);
            }
        };
        fetchUser();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Get the UTC date parts
        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
        const year = date.getUTCFullYear();

        return `${day}/${month}/${year}`; // Format to dd/mm/yyyy
    };

    return (
        <Box sx={{ fontFamily: 'Kumbh Sans' }}>
            <Grid
                container
                component="main"
                sx={{
                    height: '100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                    backgroundSize: 'cover',
                    backgroundPosition: 'top',
                    backgroundImage: `url(${signupBackground})`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={8}
                    component={Paper}
                    elevation={6}
                    square
                    sx={{
                        borderRadius: '20px',
                        zIndex: '2',
                        margin: '5%',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        marginTop: '12%',
                    }}
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '0 30px',
                        }}
                    >
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{ fontWeight: '900', fontSize: '46px', color: '#051D40' }}
                        >
                            YOUR PROFILE
                        </Typography>
                        <Typography sx={{ textAlign: 'center', marginTop: '12px', fontSize: '20px' }}>
                            {userInfo?.planType} Plan
                        </Typography>
                        <Box sx={{ width: '100%', typography: 'body1', mt: 2 }}>
                            <Box sx={{ mt: 1 }}>
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
                                        id="name"
                                        label="Full Name"
                                        name="name"
                                        autoComplete="name"
                                        sx={{ flex: 1 }}
                                        value={userInfo?.name}
                                        focused
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="dob"
                                        label="Date of birth"
                                        name="dob"
                                        autoComplete="dob"
                                        sx={{ flex: 1 }}
                                        value={userInfo?.dob ? formatDate(userInfo.dob) : ''}
                                        focused
                                    />
                                </Box>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    sx={{ borderRadius: '50%' }}
                                    value={userInfo?.email}
                                    focused
                                />

                                <Copyright sx={{ mt: 10 }} />
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={false} sm={4} md={7} sx={{}}></Grid>
            </Grid>
        </Box>
    );
}
