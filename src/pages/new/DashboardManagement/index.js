import { Avatar, Card, CardContent, CardHeader, Chip, Skeleton, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import BlogAPI from '~/API/BlogAPI';

import adminLoginBackground from '~/assets/images/adminlogin.webp';
import CustomizedTreeView from '../CustomizedTreeView';
import ChartUserByCountry from '~/components/new/ChartUserByCountry';

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
    const data = [
        {
            title: 'Users',
            value: '14k',
            interval: 'Last 30 days',
            trend: 'up',
            data: [
                200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380, 360, 400, 380, 420, 400,
                640, 340, 460, 440, 480, 460, 600, 880, 920,
            ],
        },
        {
            title: 'Conversions',
            value: '325',
            interval: 'Last 30 days',
            trend: 'down',
            data: [
                1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820, 780, 800, 760, 380, 740,
                660, 620, 840, 500, 520, 480, 400, 360, 300, 220,
            ],
        },
        {
            title: 'Event count',
            value: '200k',
            interval: 'Last 30 days',
            trend: 'neutral',
            data: [
                500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530, 520, 410, 530, 520, 610,
                530, 520, 610, 530, 420, 510, 430, 520, 510,
            ],
        },
    ];

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
                                    subheader="150"
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
                                    title={<Typography fontWeight="bold">Accounts</Typography>}
                                    subheader="150"
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
                                    title={<Typography fontWeight="bold">Accounts</Typography>}
                                    subheader="150"
                                />
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
                    <Copyright sx={{ my: 4 }} />
                </Box>
            </Grid>
        </ThemeProvider>
    );
}
