import { Avatar, Card, CardHeader } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import blogBackground from '~/assets/images/blog.webp';
import homepageBackground from '~/assets/images/homepage.webp';
import techcombank from '~/assets/images/techcombank.png';
import internshipProgramBackground from '~/assets/images/internshipprogram.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

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

const aiSuggestionsData = {
    spelling: [
        {
            incorrect: 'Builted',
            correct: 'Built',
        },
        {
            incorrect: 'Gitlad',
            correct: 'GitLab',
        },
        {
            incorrect: 'apllying',
            correct: 'applying',
        },
    ],
    sentences: [
        {
            original:
                'In the FPT Software HCM section, the sentence Worked with English-language documentation for technical and project requirements could be rephrased for better flow.',
            revised: 'I utilized English-language documentation for both technical and project requirements.',
        },
    ],
    positions: [
        "Based on your CV, you're showcasing a strong skillset in full-stack development. You've demonstrated experience with various technologies, including ReactJS, Spring Boot, ASP.NET Core, and databases like MySQL and PostgreSQL. You've also participated in multiple projects, showcasing your ability to work in a team environment.",
        'Full-Stack Developer: This is a natural fit given your skills and experience.',
        'Software Engineer: This is a broader term, but your CV demonstrates the technical skills needed for this role.',
        'Web Developer: If you want to highlight your front-end expertise, this is a good option.',
    ],
};

export default function AIResumeChecker() {
    const navigate = useNavigate();

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid sx={{ minHeight: '100vh', backgroundColor: 'white' }}>
                {/* AI Start */}
                <Grid
                    container
                    component="main"
                    item
                    sx={{
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: `url(${homepageBackground})`,
                        height: '200vh',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {/* <CssBaseline /> */}

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        component={Paper}
                        elevation={6}
                        square
                        sx={{ borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.0)', height: '100%' }}
                    >
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{
                                    textAlign: 'center',
                                    fontWeight: '900',
                                    fontSize: '72px',
                                    color: '#051D40',
                                    padding: '0 10%',
                                }}
                            >
                                AI RÉSUME CHECKER
                            </Typography>
                            <Typography
                                sx={{ textAlign: 'center', fontSize: '24px', width: '100%', padding: '3% 20%' }}
                            >
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since the 1500s
                            </Typography>
                            <Button
                                onClick={() => navigate('/offer')}
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: '#051D40',
                                    color: '#fff',
                                    fontSize: '16px',
                                    padding: '15px 30px',
                                    borderRadius: '30px',
                                    ':hover': {
                                        bgcolor: '#02F18D',
                                        color: '#051D40',
                                    },
                                }}
                            >
                                Explore
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                {/* AI Feature Benefits*/}
                <Grid
                    container
                    component="main"
                    item
                    sx={{
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: `url(${blogBackground})`,
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '20px 20px 0 0 ',
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        component={Paper}
                        elevation={6}
                        square
                        sx={{ borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.0)', height: '100%' }}
                    >
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                // alignItems: 'center',
                            }}
                        >
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{
                                    textAlign: 'left',
                                    fontWeight: '900',
                                    fontSize: '54px',
                                    color: 'white',
                                    padding: '0 8%',
                                }}
                            >
                                Featured Benefit
                            </Typography>
                            <Typography
                                sx={{
                                    textAlign: 'left',
                                    fontSize: '24px',
                                    width: '100%',
                                    padding: '0 8%',
                                    color: '#ccc',
                                }}
                            >
                                The most professional Internship Program for you
                            </Typography>
                            <Box
                                sx={{
                                    width: '100%',
                                    typography: 'body1',
                                    mt: 6,
                                    padding: '0 8%',
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    alignContent: 'center',
                                    gap: '20px',
                                }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: '#051D40',
                                        width: '32%',
                                        height: '400px',
                                        borderRadius: '20px',
                                        padding: '40px',
                                        textAlign: 'left',
                                        border: '1px solid #02F18D',
                                    }}
                                >
                                    <Typography
                                        component="h1"
                                        variant="h4"
                                        sx={{
                                            fontWeight: '700',
                                            fontSize: '48px',
                                            color: 'white',
                                            marginTop: '20px',
                                            borderBottom: '2px solid #02F18D',
                                            padding: '10px',
                                        }}
                                    >
                                        Benefit 1
                                    </Typography>

                                    <Typography
                                        component="h1"
                                        variant="h4"
                                        sx={{
                                            fontWeight: '300',
                                            fontSize: '24px',
                                            color: '#ffffff',
                                            textAlign: 'justify',
                                            marginTop: '20px',
                                        }}
                                    >
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard dummy text ever since the 1500s
                                    </Typography>
                                </Box>{' '}
                                <Box
                                    sx={{
                                        backgroundColor: '#051D40',
                                        width: '32%',
                                        height: '400px',
                                        borderRadius: '20px',
                                        padding: '40px',
                                        textAlign: 'left',
                                        border: '1px solid #02F18D',
                                    }}
                                >
                                    <Typography
                                        component="h1"
                                        variant="h4"
                                        sx={{
                                            fontWeight: '700',
                                            fontSize: '48px',
                                            color: 'white',
                                            marginTop: '20px',
                                            borderBottom: '2px solid #02F18D',
                                            padding: '10px',
                                        }}
                                    >
                                        Benefit 1
                                    </Typography>

                                    <Typography
                                        component="h1"
                                        variant="h4"
                                        sx={{
                                            fontWeight: '300',
                                            fontSize: '24px',
                                            color: '#ffffff',
                                            textAlign: 'justify',
                                            marginTop: '20px',
                                        }}
                                    >
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard dummy text ever since the 1500s
                                    </Typography>
                                </Box>{' '}
                                <Box
                                    sx={{
                                        backgroundColor: '#051D40',
                                        width: '32%',
                                        height: '400px',
                                        borderRadius: '20px',
                                        padding: '40px',
                                        textAlign: 'left',
                                        border: '1px solid #02F18D',
                                    }}
                                >
                                    <Typography
                                        component="h1"
                                        variant="h4"
                                        sx={{
                                            fontWeight: '700',
                                            fontSize: '48px',
                                            color: 'white',
                                            marginTop: '20px',
                                            borderBottom: '2px solid #02F18D',
                                            padding: '10px',
                                        }}
                                    >
                                        Benefit 1
                                    </Typography>

                                    <Typography
                                        component="h1"
                                        variant="h4"
                                        sx={{
                                            fontWeight: '300',
                                            fontSize: '24px',
                                            color: '#ffffff',
                                            textAlign: 'justify',
                                            marginTop: '20px',
                                        }}
                                    >
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard dummy text ever since the 1500s
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                {/* Get Score */}
                <Grid
                    container
                    component="main"
                    item
                    sx={{
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: `url(${internshipProgramBackground})`,
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 'none',
                    }}
                >
                    {/* <CssBaseline /> */}

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        component={Paper}
                        elevation={6}
                        square
                        sx={{ borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.0)', height: '100%' }}
                    >
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                // alignItems: 'center',
                            }}
                        >
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{
                                    textAlign: 'center',
                                    fontWeight: '900',
                                    fontSize: '72px',
                                    color: '#051D40',
                                    padding: '0 8%',
                                }}
                            >
                                Get your resume score now!
                            </Typography>
                            <Typography sx={{ textAlign: 'center', fontSize: '24px', width: '100%', padding: '0 8%' }}>
                                Upload your resume and you’ll get a personalized email with an actionable tasklist.{' '}
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    mt: 6,
                                }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: '#051D40',
                                        width: '45%',
                                        height: '300px',
                                        borderRadius: '20px',
                                        padding: '35px',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Typography
                                        component="h1"
                                        variant="h4"
                                        sx={{ fontWeight: '700', fontSize: '42px', color: 'white', marginTop: '20px' }}
                                    >
                                        <FontAwesomeIcon icon={faUpload} />
                                        {/* UPLOAD */}
                                    </Typography>

                                    <Button
                                        component="label"
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            mt: 2,
                                            bgcolor: '#051D40',
                                            borderRadius: '24px',
                                            padding: '12px 0',
                                            fontSize: '16px',
                                            ':hover': {
                                                bgcolor: '#02F18D',
                                                color: '#051D40',
                                            },
                                            border: '1px solid #02F18D',
                                        }}
                                    >
                                        Upload your resume
                                        <input type="file" style={{ display: 'none' }} />
                                    </Button>
                                    <Typography
                                        component="h1"
                                        variant="h4"
                                        sx={{
                                            fontWeight: '300',
                                            fontSize: '18px',
                                            color: '#ffffff',
                                            marginTop: '20px',
                                        }}
                                    >
                                        Drop your resume here or choose a file. PDF only. Max 2MB file size
                                    </Typography>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    mt: 6,
                                }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: '#051D40',
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '20px',
                                        padding: '35px',
                                        textAlign: 'left',
                                    }}
                                >
                                    <Typography
                                        component="h1"
                                        variant="h4"
                                        sx={{
                                            textAlign: 'center',
                                            fontWeight: '900',
                                            fontSize: '52px',
                                            color: 'white',
                                            padding: '0 8%',
                                        }}
                                    >
                                        Our Suggestions !
                                    </Typography>
                                    <Typography
                                        component="h1"
                                        variant="h4"
                                        sx={{
                                            textAlign: 'left',
                                            fontWeight: '900',
                                            fontSize: '36px',
                                            color: 'white',
                                            padding: '0 8%',
                                            my: 2,
                                        }}
                                    >
                                        * Spelling
                                    </Typography>

                                    {aiSuggestionsData.spelling.map((item) => (
                                        <Box
                                            sx={{
                                                padding: '0 8%',
                                                my: 2,
                                            }}
                                        >
                                            <Typography
                                                component="h1"
                                                variant="h4"
                                                sx={{
                                                    textAlign: 'left',
                                                    fontWeight: '500',
                                                    fontSize: '24px',
                                                    color: 'lightcoral',
                                                }}
                                            >
                                                Incorrect: {item.incorrect}
                                            </Typography>
                                            <Typography
                                                component="h1"
                                                variant="h4"
                                                sx={{
                                                    textAlign: 'left',
                                                    fontWeight: '500',
                                                    fontSize: '24px',
                                                    color: 'lightgreen',
                                                }}
                                            >
                                                Correct: {item.correct}
                                            </Typography>
                                        </Box>
                                    ))}

                                    <Typography
                                        component="h1"
                                        variant="h4"
                                        sx={{
                                            textAlign: 'left',
                                            fontWeight: '900',
                                            fontSize: '36px',
                                            color: 'white',
                                            padding: '0 8%',
                                            my: 2,
                                            mt: 5,
                                        }}
                                    >
                                        * Sentences
                                    </Typography>

                                    {aiSuggestionsData.sentences.map((item) => (
                                        <Box
                                            sx={{
                                                padding: '0 8%',
                                                my: 2,
                                            }}
                                        >
                                            <Typography
                                                component="h1"
                                                variant="h4"
                                                sx={{
                                                    textAlign: 'left',
                                                    fontWeight: '500',
                                                    fontSize: '24px',
                                                    color: 'lightcoral',
                                                }}
                                            >
                                                Original: {item.original}
                                            </Typography>
                                            <Typography
                                                component="h1"
                                                variant="h4"
                                                sx={{
                                                    textAlign: 'left',
                                                    fontWeight: '500',
                                                    fontSize: '24px',
                                                    color: 'lightgreen',
                                                }}
                                            >
                                                Our advise: {item.revised}
                                            </Typography>
                                        </Box>
                                    ))}
                                    <Typography
                                        component="h1"
                                        variant="h4"
                                        sx={{
                                            textAlign: 'left',
                                            fontWeight: '900',
                                            fontSize: '36px',
                                            color: 'white',
                                            padding: '0 8%',
                                            my: 2,
                                            mt: 5,
                                        }}
                                    >
                                        * Suggestions
                                    </Typography>

                                    {aiSuggestionsData.positions.map((item) => (
                                        <Box
                                            sx={{
                                                padding: '0 8%',
                                                my: 2,
                                            }}
                                        >
                                            <Typography
                                                component="h1"
                                                variant="h4"
                                                sx={{
                                                    textAlign: 'left',
                                                    fontWeight: '500',
                                                    fontSize: '24px',
                                                    color: 'white',
                                                    mt: 5,
                                                }}
                                            >
                                                - {item}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}