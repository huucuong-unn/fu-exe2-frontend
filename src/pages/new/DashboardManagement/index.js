import { Card, CardHeader } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import AccountAPI from '~/API/AccountAPI';
import adminLoginBackground from '~/assets/images/adminlogin.webp';
import ChartUserByCountry from '~/components/new/ChartUserByCountry';
import PageViewsBarChart from '~/components/new/PageViewsBarChart';
import CustomizedTreeView from '../CustomizedTreeView';
import PaymentAPI from '~/API/PaymentAPI';
import SessionsChart from '~/components/new/SessionsChart';

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

export default function DashboardManagement() {
    const [numberOfAccounts, setNumberOfAccounts] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await AccountAPI.getAllAccount();
                setNumberOfAccounts(response.length);
            } catch (error) {
                console.log('Failed to fetch accounts: ', error);
            }
        };
        fetchBlogs();

        const fetchPaymentsDashboard = async () => {
            try {
                const response = await PaymentAPI.getPaymentsDashboard();
                setTotalRevenue(response?.totalAllPayment);
                console.log(response);
            } catch (error) {
                console.log('Failed to fetch payments: ', error);
            }
        };

        fetchBlogs();
        fetchPaymentsDashboard();
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid
                container
                component="main"
                item
                sx={{
                    // backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${adminLoginBackground})`,
                    height: '100vh',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px', padding: '5%', height: '100%' } }}>
                    {/* cards */}
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            fontWeight: '900',
                            fontSize: '46px',
                            color: '#051D40',
                            // zIndex: 1,
                            marginBottom: '30px',
                            textAlign: 'left',
                        }}
                    >
                        Overview
                    </Typography>
                    <Grid
                        key={'1'}
                        sx={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'center',
                            gap: '20px',
                            alignItems: 'space-around',
                        }}
                    >
                        <Card
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                flexGrow: 1,
                                p: 1,
                                ':hover': {
                                    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
                                    cursor: 'pointer',
                                },
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            }}
                            // onClick={() => handleItemClick(index, mentor.mentorProfile.id)}
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
                                    title={<Typography fontWeight="bold">Accounts</Typography>}
                                    subheader={numberOfAccounts}
                                />
                                {/* <CardContent>
                                    <Chip key={'1'} label={'Label'} sx={{ mr: 1, mb: 1 }} onClick={() => {}} />
                                </CardContent> */}
                            </Box>
                        </Card>
                        <Card
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                flexGrow: 1,
                                p: 1,
                                ':hover': {
                                    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
                                    cursor: 'pointer',
                                },
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            }}
                            // onClick={() => handleItemClick(index, mentor.mentorProfile.id)}
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
                                    title={<Typography fontWeight="bold">Revenue (VNĐ)</Typography>}
                                    subheader={totalRevenue}
                                />
                                {/* <CardContent>
                                    <Chip key={'1'} label={'Label'} sx={{ mr: 1, mb: 1 }} onClick={() => {}} />
                                </CardContent> */}
                            </Box>
                        </Card>
                        <Card
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                flexGrow: 1,
                                p: 1,
                                ':hover': {
                                    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
                                    cursor: 'pointer',
                                },
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            }}
                            // onClick={() => handleItemClick(index, mentor.mentorProfile.id)}
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
                                <CardHeader title={<Typography fontWeight="bold">Blogs</Typography>} subheader="3" />
                            </Box>
                        </Card>
                    </Grid>
                    <Grid
                        key={'1'}
                        sx={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'center',
                            gap: '20px',
                            alignItems: 'space-around',
                            marginTop: '20px',
                        }}
                    >
                        <Box sx={{ width: '60%' }}>
                            <ChartUserByCountry />
                        </Box>
                        <Box sx={{ width: '40%' }}>
                            <CustomizedTreeView />
                        </Box>
                    </Grid>
                    <Grid
                        sx={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'center',
                            gap: '20px',
                            alignItems: 'space-around',
                            marginTop: '20px',
                        }}
                    >
                        <Box sx={{ width: '50%' }}>
                            <SessionsChart />
                        </Box>
                        <Box sx={{ width: '50%' }}>
                            <PageViewsBarChart />
                        </Box>
                    </Grid>
                    <Copyright sx={{ my: 4 }} />
                </Box>
            </Grid>
        </ThemeProvider>
    );
}
