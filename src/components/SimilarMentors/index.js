import { Container, Grid, Typography, Card, Box, Avatar, CardContent, Button, Chip, Stack } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MentorAPI from '~/API/MentorAPI';

function SimilarMentor({ similarMentor }) {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const navigate = useNavigate();
    const IMGAGE_HOST = process.env.REACT_APP_IMG_HOST;
    const handleItemClick = (index, mentorId) => {
        setSelectedItemIndex(index);
        navigate(`/mentor/${mentorId}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Container id="mentorabout" sx={{ py: 8 }} direction={{ xs: 'column', lg: 'row' }} useFlexGap>
            <Typography color="text.primary" variant="body1" fontWeight="bold" fontSize={'24px'} sx={{ mb: 2 }}>
                Similar mentors
            </Typography>
            <Grid container spacing={6}>
                {similarMentor.length > 0 &&
                    similarMentor?.map((mentor, index) => (
                        <Grid item xs={12} md={12} key={index}>
                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="flex-start"
                                spacing={2}
                                useFlexGap
                                sx={{ width: '100%', display: { xs: 8, sm: 'flex' } }}
                            >
                                <Card
                                    variant="outlined"
                                    component={Button}
                                    sx={{
                                        p: 3,
                                        height: 'fit-content',
                                        width: '100%',
                                        background: 'none',
                                    }}
                                    onClick={() => handleItemClick(index, mentor.mentorProfile.id)}
                                >
                                    <Box
                                        sx={{
                                            width: '100%',
                                            display: 'flex',
                                            textAlign: 'left',
                                            flexDirection: { xs: 'column', md: 'row' },
                                            alignItems: { md: 'center' },
                                            gap: 2.5,
                                        }}
                                    >
                                        <Box>
                                            <Avatar
                                                alt="avatar image"
                                                src={IMGAGE_HOST + mentor?.mentorProfile?.mentorDTO.account.avatarUrl}
                                                sx={{ width: 150, height: 150 }}
                                            />
                                        </Box>
                                        <Box sx={{ textTransform: 'none', width: '100%' }}>
                                            <Box
                                                sx={{
                                                    color: (theme) => {
                                                        return theme.palette.mode === 'light'
                                                            ? 'primary.main'
                                                            : 'primary.main';
                                                    },
                                                    display: 'flex',
                                                    justifyContent: {
                                                        xs: 'center',
                                                        md: 'flex-start',
                                                        lg: 'flex-start',
                                                    },
                                                    alignItems: 'center',
                                                    gap: 5,
                                                }}
                                            >
                                                <Typography
                                                    color="text.primary"
                                                    variant="body1"
                                                    fontWeight="bold"
                                                    fontSize={'24px'}
                                                >
                                                    {mentor?.mentorProfile?.mentorDTO?.fullName}
                                                </Typography>
                                                <Chip
                                                    avatar={
                                                        <Avatar sx={{ bgcolor: 'transparent' }}>
                                                            <StarIcon sx={{ color: '#4CAF50' }} />
                                                        </Avatar>
                                                    }
                                                    label="Top Mentor"
                                                    sx={{
                                                        backgroundColor: '#E0F2F1', // Màu nền xanh nhạt
                                                        color: '#004D40', // Màu chữ xanh đậm
                                                        fontWeight: 'bold',
                                                        padding: '8px',
                                                        borderRadius: '16px',
                                                        fontSize: '14px',
                                                    }}
                                                    size="medium"
                                                />
                                            </Box>
                                            <Typography
                                                color="text.secondary"
                                                variant="body2"
                                                sx={{ my: 1 }}
                                                fontSize={'16px'}
                                            >
                                                {mentor?.mentorProfile?.shortDescription}
                                            </Typography>

                                            <Typography
                                                color="text.secondary"
                                                variant="body2"
                                                sx={{ my: 2 }}
                                                fontSize={'14px'}
                                            >
                                                {mentor?.mentorProfile?.description}
                                            </Typography>

                                            <CardContent>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'left',
                                                        alignItems: 'center',
                                                        gap: 2,
                                                    }}
                                                >
                                                    {mentor.skills?.map((skill, index) => (
                                                        <Chip label={skill.skill.name} key={index} />
                                                    ))}
                                                </Box>
                                            </CardContent>
                                            <br />
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'left',
                                                    alignItems: 'center',
                                                    width: '100%',
                                                    gap: 2,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        // flex: 1,
                                                        display: 'flex',
                                                        alignItems: 'baseline',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <Typography
                                                        variant="h4"
                                                        sx={{
                                                            color: '#182F5D',
                                                            fontWeight: 'bold',
                                                            marginRight: '4px',
                                                        }}
                                                    >
                                                        150 point
                                                    </Typography>
                                                    <Typography
                                                        variant="body1"
                                                        sx={{
                                                            color: '#182F5D',
                                                            fontSize: '16px',
                                                        }}
                                                    >
                                                        / acceptance
                                                    </Typography>
                                                </Box>
                                                <Link to={'/mentor/id'} style={{ textDecoration: 'none' }}>
                                                    <Button
                                                        variant="contained"
                                                        size="large"
                                                        sx={{
                                                            width: '100%',
                                                            height: '100%',
                                                            backgroundColor: '#365E32',
                                                            '&:hover': {
                                                                backgroundColor: '#508D4E',
                                                            },
                                                        }}
                                                    >
                                                        View Profile
                                                    </Button>
                                                </Link>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Card>
                            </Stack>
                        </Grid>
                    ))}
            </Grid>
        </Container>
    );
}

export default SimilarMentor;
