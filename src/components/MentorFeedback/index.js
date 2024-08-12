import { Container, Typography, Box, Grid, Avatar, Divider } from '@mui/material';
import React from 'react';

const mentor = {
    profilePicture: 'https://ih1.redbubble.net/image.5481662153.7016/st,small,507x507-pad,600x600,f8f8f8.jpg',
    shortDescription: 'Director, Engineering at Tortee',
    title: 'Huu Cuong Le',
    description:
        'Passionate about technology and its social impact. Over 10 years experience delivering successful products in healthcare, eCommerce, digital media and international fundraising. Strong focus on product, user-centricity, UX and lean processes. Interested in Zen and Stoic philosophy. Enjoy deep thinking and deep work.',
    skills: ['React', 'Java', 'Nodejs'],
};

export const MentorFeedback = () => {
    return (
        <Container id="mentorabout" sx={{ py: 8 }} direction={{ xs: 'column', lg: 'row' }} useFlexGap>
            <Typography color="text.primary" variant="body1" fontWeight="bold" fontSize={'24px'} sx={{ mb: 2 }}>
                What mentees say
            </Typography>
            <Grid container spacing={6}>
                <Grid item xs={12} md={12}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'start',
                            gap: 2,
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', gap: 2 }}>
                            <Avatar
                                alt="avatar image"
                                src="https://cdn.mentorcruise.com/cdn-cgi/image/width=368,format=auto/https://cdn.mentorcruise.com/cache/3af8cef95c0e04cad011cfc860502d11/08f97e638ff0e583/1c22cb091d5b980b636e61ed0937b15e.jpg"
                                sx={{ width: 50, height: 50 }}
                            />
                            <Box>
                                <Typography color="black" fontWeight="bold">
                                    Michelle
                                </Typography>
                                <Typography color="gray">April 28, 2022</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography color="black">
                                He is very helpful in giving me confidence and good pressure to study. He also gives me
                                good guidelines and also talks about the industry in Japan in general which is not
                                knowledge easily found online.
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'start',
                            gap: 2,
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', gap: 2 }}>
                            <Avatar
                                alt="avatar image"
                                src="https://cdn.mentorcruise.com/cdn-cgi/image/width=368,format=auto/https://cdn.mentorcruise.com/cache/3af8cef95c0e04cad011cfc860502d11/08f97e638ff0e583/1c22cb091d5b980b636e61ed0937b15e.jpg"
                                sx={{ width: 50, height: 50 }}
                            />
                            <Box>
                                <Typography color="black" fontWeight="bold">
                                    Michelle
                                </Typography>
                                <Typography color="gray">April 28, 2022</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography color="black">
                                He is very helpful in giving me confidence and good pressure to study. He also gives me
                                good guidelines and also talks about the industry in Japan in general which is not
                                knowledge easily found online.
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};
