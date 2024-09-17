import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import blogBackground from '~/assets/images/blog.webp';
import homepageBackground from '~/assets/images/homepage.webp';
import internshipProgramBackground from '~/assets/images/internshipprogram.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress, Skeleton } from '@mui/material';
import storageService from '~/components/StorageService/storageService';

const defaultTheme = createTheme();

export default function AIResumeChecker() {
    const [uploading, setUploading] = useState(false); // State to manage upload status'
    const [aiSuggestionsData, setAiSuggestionsData] = useState(null);
    const [formSuggestLoading, setFormSuggestLoading] = useState(false); // State to manage upload status'
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

    // Function to call API and upload the file
    const uploadFile = async (file) => {
        setUploading(true); // Show a loading state when the upload starts
        setFormSuggestLoading(true);

        // Prepare form data
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', userInfo?.id);

        try {
            const response = await axios.post('https://orca-app-7tb86.ondigitalocean.app/api/v1/coze/file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File uploaded successfully:', response.data);
            if (response.data) {
                setFormSuggestLoading(false);
            }
            setAiSuggestionsData(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setUploading(false); // Reset the loading state
        }
    };

    const navigate = useNavigate();

    // Handle file change and call upload function immediately
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            uploadFile(selectedFile); // Upload the file once it's selected
        }
    };
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
                                Get your resume check now!
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
                                        width: '40%',
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
                                        fullWidth
                                        variant="contained"
                                        disabled={uploading} // Disable the button when uploading
                                        sx={{
                                            mt: 2,
                                            bgcolor: '#051D40', // Change color when uploading
                                            borderRadius: '24px',
                                            padding: '12px 0',
                                            fontSize: '16px',
                                            ':hover': {
                                                bgcolor: '#02F18D',
                                                color: '#051D40',
                                            },
                                            border: '1px solid #02F18D',
                                            color: 'white',
                                        }}
                                    >
                                        {uploading ? <CircularProgress /> : 'Upload your resume'}
                                        <input
                                            type="file"
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange} // Call API immediately after file selection
                                        />
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
                            {formSuggestLoading ? (
                                <Box
                                    sx={{
                                        backgroundColor: '#051D40',
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '20px',
                                        padding: '35px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        mt: 6,
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Skeleton sx={{ bgcolor: 'grey.600', width: '70%', mt: 2 }} />
                                    <Skeleton sx={{ bgcolor: 'grey.600', width: '70%', mt: 2 }} />
                                    <Skeleton sx={{ bgcolor: 'grey.600', width: '70%', mt: 2 }} />
                                    <Skeleton sx={{ bgcolor: 'grey.600', width: '70%', mt: 2 }} />
                                </Box>
                            ) : aiSuggestionsData &&
                              (aiSuggestionsData?.spelling ||
                                  aiSuggestionsData?.sentences ||
                                  aiSuggestionsData?.positions) &&
                              userInfo?.id === aiSuggestionsData?.userId ? (
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

                                        {aiSuggestionsData?.spelling?.map((item) => (
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

                                        {aiSuggestionsData?.sentences?.map((item) => (
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

                                        {aiSuggestionsData?.positions?.map((item) => (
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
                            ) : (
                                <></>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
