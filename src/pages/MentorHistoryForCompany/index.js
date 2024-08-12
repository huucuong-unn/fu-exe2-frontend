import { Container, Box, Typography, Chip, Grid, Card, Avatar, CardContent } from '@mui/material';
import MentorAPI from '~/API/MentorAPI';
import { useEffect, useState } from 'react';
import storageService from '~/components/StorageService/storageService';

function MentorHistoryForCompany() {
    const [mentors, setMentors] = useState([]);
    const [userInfo, setUserInfo] = useState(storageService.getItem('userInfo'));
    const IMGAGE_HOST = process.env.REACT_APP_IMG_HOST;
    const fetchMentor = async () => {
        try {
            const params = {
                companyId: userInfo.companyId,
                page: 1,
                limit: 10,
            };
            console.log(params);
            const mentorsData = await MentorAPI.getMentorsForAdminSearch(params);
            console.log(mentorsData);
            setMentors(mentorsData.listResult);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchMentor();
    }, []);

    return (
        <Container id="companies" sx={{ py: { xs: 8, sm: 16 }, padding: { lg: 16 } }}>
            <Typography variant="h4" sx={{ mb: { xs: 2, sm: 4 } }}>
                Our mentors
            </Typography>
            <Grid container spacing={6}>
                {mentors.map((mentor, index) => (
                    <Grid item xs={12} md={12} key={index}>
                        <Card
                            variant="outlined"
                            sx={{
                                p: 3,
                                height: 'fit-content',
                                width: '100%',
                                background: 'none',
                            }}
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
                                        src={IMGAGE_HOST + mentor.mentorProfile.mentorDTO.account.avatarUrl} // Assuming you have avatar URL in the mentor data
                                        sx={{ width: 150, height: 150 }}
                                    />
                                </Box>
                                <Box sx={{ textTransform: 'none', width: '100%' }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        <Typography
                                            color="text.primary"
                                            variant="body1"
                                            fontWeight="bold"
                                            fontSize={'24px'}
                                        >
                                            {mentor.mentorProfile.mentorDTO.fullName}
                                        </Typography>
                                        <Chip label="Top Mentor" color="success" />
                                    </Box>
                                    <Typography color="text.secondary" variant="body2" sx={{ my: 1 }} fontSize={'16px'}>
                                        {mentor.mentorProfile.shortDescription}{' '}
                                    </Typography>

                                    <Typography color="black" variant="body2" sx={{ my: 1 }} fontSize={'16px'}>
                                        {mentor.mentorProfile.description}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'left',
                                            alignItems: 'center',
                                            gap: 2,
                                            paddingBottom: 2,
                                        }}
                                    >
                                        {mentor.skills.map((skill, skillIndex) => (
                                            <Chip key={skillIndex} label={skill.skill.name} />
                                        ))}
                                    </Box>
                                    <CardContent>
                                        {mentor.mentorProfile.mentorDTO.account.status !== 'PENDING' &&
                                            mentor.mentorProfile.mentorDTO.account.status != 'REJECTED' && (
                                                <Chip label="Approve" color="success" />
                                            )}
                                        {mentor.mentorProfile.mentorDTO.account.status === 'PENDING' && (
                                            <Chip label="Pending" color="warning" />
                                        )}
                                        {mentor.mentorProfile.mentorDTO.account.status === 'REJECTED' && (
                                            <Chip label="Reject" color="error" />
                                        )}
                                    </CardContent>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default MentorHistoryForCompany;
