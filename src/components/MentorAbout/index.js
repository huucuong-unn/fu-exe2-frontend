import { Container, Typography, Box } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import React from 'react';

const mentor = {
    profilePicture: 'https://ih1.redbubble.net/image.5481662153.7016/st,small,507x507-pad,600x600,f8f8f8.jpg',
    shortDescription: 'Director, Engineering at Tortee',
    title: 'Huu Cuong Le',
    description:
        'Passionate about technology and its social impact. Over 10 years experience delivering successful products in healthcare, eCommerce, digital media and international fundraising. Strong focus on product, user-centricity, UX and lean processes. Interested in Zen and Stoic philosophy. Enjoy deep thinking and deep work.',
    skills: ['React', 'Java', 'Nodejs'],
};

export const MentorAbout = ({ description }) => {
    return (
        <Container id="mentorabout" sx={{ py: 8 }} direction={{ xs: 'column', lg: 'row' }} useFlexGap>
            <Typography color="text.primary" variant="body1" fontWeight="bold" fontSize={'24px'} sx={{ mb: 2 }}>
                About
            </Typography>
            <Typography color="text.primary" variant="body1" fontSize={'16px'} textAlign={'justify'}>
                {description}
            </Typography>
        </Container>
    );
};
