import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';

import logo from '~/assets/images/logo-outlined.png';

const logoStyle = {
    width: '100px',
    height: 'auto',
};

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" mt={1}>
            {'Copyright © '}
            <Link href="https://huucuong-un.github.io/htmlcss-1112studio/?fbclid=IwAR177w5Ref1WUBg432KBNieE9wKll9rdKw70B_YpFL8V1vJNGZZWgOlBfLE#">
                Tortee&nbsp;
            </Link>
            {new Date().getFullYear()}
        </Typography>
    );
}

export default function Footer() {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 4, sm: 8 },
                py: { xs: 8, sm: 10 },
                textAlign: { sm: 'center', md: 'left' },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    width: '100%',
                    justifyContent: 'space-between',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                        minWidth: { xs: '100%', sm: '40%' },
                    }}
                >
                    <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
                        <Box sx={{ ml: '-15px' }}>
                            <img src={logo} style={logoStyle} alt="logo of tortee" />
                            <Typography
                                variant="h1"
                                sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', md: 'row' },
                                    alignSelf: 'center',
                                    textAlign: 'center',
                                    fontSize: 'clamp(3.5rem, 10vw, 4rem)',
                                }}
                            >
                                Tor
                                <Typography
                                    component="span"
                                    variant="h1"
                                    sx={{
                                        fontSize: 'clamp(3rem, 10vw, 4rem)',
                                        color: (theme) =>
                                            theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                                    }}
                                >
                                    tee
                                </Typography>
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" mt={2}>
                            Tortee is a platform for creating and sharing your own
                            <br />
                            custom stickers, and it's completely free!
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Typography variant="body2" fontWeight={600}>
                        Product
                    </Typography>
                    <Link color="text.secondary" href="#">
                        Features
                    </Link>
                    <Link color="text.secondary" href="#">
                        Testimonials
                    </Link>
                    <Link color="text.secondary" href="#">
                        Highlights
                    </Link>
                    <Link color="text.secondary" href="#">
                        Pricing
                    </Link>
                    <Link color="text.secondary" href="#">
                        FAQs
                    </Link>
                </Box>
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Typography variant="body2" fontWeight={600}>
                        Company
                    </Typography>
                    <Link color="text.secondary" href="#">
                        About us
                    </Link>
                    <Link color="text.secondary" href="#">
                        Careers
                    </Link>
                    <Link color="text.secondary" href="#">
                        Press
                    </Link>
                </Box>
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Typography variant="body2" fontWeight={600}>
                        Legal
                    </Typography>
                    <Link color="text.secondary" href="#">
                        Terms
                    </Link>
                    <Link color="text.secondary" href="#">
                        Privacy
                    </Link>
                    <Link color="text.secondary" href="#">
                        Contact
                    </Link>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    pt: { xs: 4, sm: 8 },
                    width: '100%',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <div>
                    <Link color="text.secondary" href="#">
                        Privacy Policy
                    </Link>
                    <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
                        &nbsp;•&nbsp;
                    </Typography>
                    <Link color="text.secondary" href="#">
                        Terms of Service
                    </Link>
                    <Copyright />
                </div>
                <Stack
                    direction="row"
                    justifyContent="left"
                    spacing={1}
                    useFlexGap
                    sx={{
                        color: 'text.secondary',
                    }}
                >
                    <IconButton
                        color="inherit"
                        href="https://github.com/mui"
                        aria-label="GitHub"
                        sx={{ alignSelf: 'center' }}
                    >
                        <FacebookIcon />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        href="https://twitter.com/MaterialUI"
                        aria-label="X"
                        sx={{ alignSelf: 'center' }}
                    >
                        <TwitterIcon />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        href="https://www.linkedin.com/company/mui/"
                        aria-label="LinkedIn"
                        sx={{ alignSelf: 'center' }}
                    >
                        <LinkedInIcon />
                    </IconButton>
                </Stack>
            </Box>
        </Container>
    );
}
