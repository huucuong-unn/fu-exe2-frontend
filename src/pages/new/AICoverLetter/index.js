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
import { useEffect, useState } from 'react';
import {
    Alert,
    Autocomplete,
    CircularProgress,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Skeleton,
    TextField,
} from '@mui/material';
import storageService from '~/components/StorageService/storageService';
import AIResumeAPI from '~/API/AIResumeAPI';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

const defaultTheme = createTheme();

export default function AICoverLetter() {
    const [uploading, setUploading] = useState(false); // State to manage upload status'
    const [aiSuggestionsData, setAiSuggestionsData] = useState(null);
    const [formSuggestLoading, setFormSuggestLoading] = useState(false); // State to manage upload status'
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [language, setLanguage] = useState('English');
    const [exp, setExp] = useState('None');
    const [showAlertError, setShowAlertError] = useState(false);

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

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userId = userInfo?.id;
        try {
            if (!userId || !name || !email || !phone || !company || !position) {
                setShowAlertError(true);
                setTimeout(() => setShowAlertError(false), 5000); // Hide alert after 5s
                return;
            }

            const data = {
                userId: userId,
                name: name,
                email: email,
                phone: phone,
                company: company,
                position: position,
                language: language,
                experience: exp,
            };
            setFormSuggestLoading(true);
            const coverLetter = await AIResumeAPI.getCoverLetter(data);
            console.log(coverLetter);
            if (coverLetter.data) {
                setFormSuggestLoading(false);
            }
            setAiSuggestionsData(coverLetter);
            console.log('cv letter: ', coverLetter);
        } catch (error) {
            console.error('Login error:', error);
            setShowAlertError(true); // Show error alert
            setTimeout(() => setShowAlertError(false), 5000); // Hide
        }
    };

    const handleDownload = async () => {
        // Create a new Document with a single section
        const doc = new Document({
            sections: [
                {
                    children: aiSuggestionsData.data.map(
                        (line) =>
                            new Paragraph({
                                children: [new TextRun(line)],
                            }),
                    ),
                },
            ],
        });

        // Generate the document into a Blob (binary large object)
        const blob = await Packer.toBlob(doc);

        // Use FileSaver to trigger download of the .docx file
        saveAs(blob, 'coverletter.docx');
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
                                AI COVER LETTER SUPPORT
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
                                Khám phá các gói đăng ký !
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
                                Fill the form and get cover letter suggestions
                            </Typography>
                            <Typography sx={{ textAlign: 'center', fontSize: '24px', width: '100%', padding: '0 8%' }}>
                                Enter the required information and get your cover letter
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
                                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                        width: '80%',
                                        height: '55x0px',
                                        borderRadius: '20px',
                                        padding: '35px',
                                        textAlign: 'center',
                                    }}
                                >
                                    {showAlertError ? (
                                        <Alert width="50%" variant="filled" severity="error">
                                            Required logged in and fill all fields
                                        </Alert>
                                    ) : (
                                        <></>
                                    )}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'left',
                                            alignItems: 'center',
                                            gap: 2,
                                        }}
                                    >
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Họ và tên"
                                            name="name"
                                            autoComplete="name"
                                            sx={{ flex: 1 }}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Mail"
                                            name="email"
                                            autoComplete="email"
                                            sx={{ flex: 1 }}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'left',
                                            alignItems: 'center',
                                            gap: 2,
                                        }}
                                    >
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="phone"
                                            label="Số điện thoại"
                                            name="phone"
                                            autoComplete="phone"
                                            sx={{ flex: 1 }}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="company"
                                            label="Công ty bạn ứng tuyển"
                                            name="company"
                                            autoComplete="company"
                                            sx={{ flex: 1 }}
                                            onChange={(e) => setCompany(e.target.value)}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'left',
                                            alignItems: 'center',
                                            gap: 2,
                                        }}
                                    >
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="position"
                                            label="Vị trí công việc"
                                            name="position"
                                            autoComplete="position"
                                            sx={{ flex: 1 }}
                                            onChange={(e) => setPosition(e.target.value)}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'left',
                                            alignItems: 'center',
                                            gap: 2,
                                            mt: 2,
                                        }}
                                    >
                                        <FormControl sx={{ flex: 1, borderRadius: '25px' }}>
                                            <InputLabel id="demo-simple-select-label">Ngôn ngữ</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={language}
                                                label="Language"
                                                onChange={(event) => setLanguage(event.target.value)}
                                            >
                                                <MenuItem value="tiếng anh">English</MenuItem>
                                                <MenuItem value="tiếng việt">Vietnamese</MenuItem>
                                            </Select>
                                            <FormHelperText>English là ngôn ngữ mặc định</FormHelperText>
                                        </FormControl>
                                        <FormControl sx={{ flex: 1, borderRadius: '25px' }}>
                                            <InputLabel id="demo-simple-select-2">Kinh nghiệm ?</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-2"
                                                id="demo-simple-select-2"
                                                value={exp}
                                                label="Experience"
                                                onChange={(event) => setExp(event.target.value)}
                                            >
                                                <MenuItem value="không có">Không có</MenuItem>
                                                <MenuItem value="có">Có kinh nghiệm</MenuItem>
                                            </Select>
                                            <FormHelperText>
                                                Mặc định chúng tôi đang chọn là không có kinh nghiệm
                                            </FormHelperText>
                                        </FormControl>
                                    </Box>

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            mt: 3,
                                            mb: 2,
                                            bgcolor: '#051D40',
                                            borderRadius: '24px',
                                            padding: '12px 0',
                                            fontSize: '16px',
                                            ':hover': {
                                                bgcolor: '#051D40',
                                                opacity: '0.8',
                                            },
                                        }}
                                        onClick={handleSubmit}
                                    >
                                        {formSuggestLoading ? <CircularProgress /> : 'Get Your Cover Letter'}
                                    </Button>
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
                            ) : aiSuggestionsData && userInfo?.id === aiSuggestionsData?.userId ? (
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
                                            Your Cover Letter!
                                        </Typography>
                                        {aiSuggestionsData?.data?.map((item) => (
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
                                                    }}
                                                >
                                                    {item}
                                                </Typography>
                                            </Box>
                                        ))}
                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                onClick={handleDownload}
                                                sx={{
                                                    mt: 2,
                                                    bgcolor: '#02F18D',
                                                    borderRadius: '24px',
                                                    padding: '12px 0',
                                                    fontSize: '16px',
                                                    maxHeight: '54px',
                                                    width: '30%',
                                                }}
                                            >
                                                Download as .DOCX
                                            </Button>
                                        </Box>
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
