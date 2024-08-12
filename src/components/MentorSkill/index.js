import { Box, Chip, Container, Typography } from '@mui/material';
import React from 'react';

const mentor = {
    profilePicture: 'https://ih1.redbubble.net/image.5481662153.7016/st,small,507x507-pad,600x600,f8f8f8.jpg',
    shortDescription: 'Director, Engineering at Tortee',
    title: 'Huu Cuong Le',
    description:
        'Passionate about technology and its social impact. Over 10 years experience delivering successful products in healthcare, eCommerce, digital media and international fundraising. Strong focus on product, user-centricity, UX and lean processes. Interested in Zen and Stoic philosophy. Enjoy deep thinking and deep work.',
    skills: ['React', 'Java', 'Nodejs'],
};

export const MentorSkill = ({ skills }) => {
    return (
        <Container id="mentorskill" sx={{ py: 8 }} direction={{ xs: 'column', lg: 'row' }} useFlexGap>
            <Typography color="text.primary" variant="body1" fontWeight="bold" fontSize={'24px'} sx={{ mb: 2 }}>
                Skills
            </Typography>
            <Box>
                {skills?.map((skill, index) => (
                    <Chip
                        key={index}
                        label={skill.skill.name}
                        sx={{ mr: 1, mb: 1, p: 2, fontSize: '14px' }}
                        onClick={() => {}}
                        size="large"
                    />
                ))}
            </Box>
        </Container>
    );
};
