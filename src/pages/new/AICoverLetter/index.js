import {
    Alert,
    CircularProgress,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Skeleton,
    TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AIResumeAPI from '~/API/AIResumeAPI';
import AccountAPI from '~/API/AccountAPI';
import blogBackground from '~/assets/images/blog.webp';
import aiCoveletterBackground from '~/assets/images/coverletterbackground.webp';
import internshipProgramBackground from '~/assets/images/internshipprogram.webp';
import storageService from '~/components/StorageService/storageService';

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
    const [exp, setExp] = useState('');
    const [showAlertError, setShowAlertError] = useState(false);

    const [userInfo, setUserInfo] = useState(storageService.getItem('userInfo') || null);
    const [user, setUser] = useState();

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
        fetchUserNew();
    }, []);

    const fetchUserNew = async () => {
        // This useEffect is now only for updating userInfo if it changes in localStorage
        const storedUserInfo = await storageService.getItem('userInfo');
        const userResponse = await AccountAPI.getUserById(storedUserInfo?.id);
        setUser(userResponse);
    };
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

            if (user?.remainInterviewTimes <= 0) {
                setShowAlertError(true); // Show error alert
                setTimeout(() => setShowAlertError(false), 5000); // Hide
                setUploading(false); // Reset the loading state
                setFormSuggestLoading(false);

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
            fetchUserNew();
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
                        backgroundImage: `url(${aiCoveletterBackground})`,
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
                                    fontSize: '92px',
                                    color: '#051D40',
                                    padding: '0 10%',
                                }}
                            >
                                AI COVER LETTER
                            </Typography>
                            <Typography
                                sx={{ textAlign: 'center', fontSize: '24px', width: '100%', padding: '0 20% 2% 20%' }}
                            >
                                Dựa trên thông tin từ công việc bạn ứng tuyển và hồ sơ cá nhân, TORTEE sẽ hỗ trợ bạn
                                viết thư xin việc thật chuyên nghiệp, giúp bạn thể hiện tốt nhất bản thân trước nhà
                                tuyển dụng
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
                                Lợi ích nổi bật
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
                                Các lợi ích mà bạn sẽ nhận được khi sử dụng AI Resume Checker
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
                                        height: '500px',
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
                                        Nội dung rõ ràng
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
                                        Thư xin việc sẽ truyền tải rõ ràng năng lực, kinh nghiệm, và đam mê của bạn đối
                                        với công việc một cách mạch lạc và ấn tượng
                                    </Typography>
                                </Box>{' '}
                                <Box
                                    sx={{
                                        backgroundColor: '#051D40',
                                        width: '32%',
                                        height: '500px',
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
                                        Tiết kiệm thời gian
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
                                        Chỉ cần vài phút để có được một thư xin việc hoàn chỉnh mà không cần lo lắng về
                                        cách trình bày hay nội dung
                                    </Typography>
                                </Box>{' '}
                                <Box
                                    sx={{
                                        backgroundColor: '#051D40',
                                        width: '32%',
                                        height: '500px',
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
                                        Tăng sự tự tin
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
                                        Với thư xin việc được cá nhân hóa, bạn sẽ tự tin hơn khi gửi hồ sơ ứng tuyển,
                                        tạo ấn tượng mạnh mẽ với nhà tuyển dụng”
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
                                Điền vào biểu mẫu và nhận gợi ý viết thư xin việc.
                            </Typography>
                            <Typography sx={{ textAlign: 'center', fontSize: '24px', width: '100%', padding: '0 8%' }}>
                                Nhập thông tin cần thiết và nhận ngay cover letter của bạn.
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
                                            Bạn chưa đăng nhập, hoặc hết lượt sử dụng, hoặc chưa điền đầy đủ thông tin
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
                                        <FormControl sx={{ flex: 1 }}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="experience"
                                                label="Kinh nghiệm"
                                                name="experience"
                                                autoComplete="experience"
                                                onChange={(e) => setExp(e.target.value)}
                                            />
                                            <FormHelperText>Không có thì điền là Không có</FormHelperText>
                                        </FormControl>

                                        <FormControl sx={{ flex: 1, borderRadius: '25px' }}>
                                            <InputLabel id="demo-simple-select-label">Ngôn ngữ</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={language}
                                                label="Language"
                                                onChange={(event) => setLanguage(event.target.value)}
                                                sx={{ borderRadius: '25px' }}
                                            >
                                                <MenuItem value="tiếng anh">English</MenuItem>
                                                <MenuItem value="tiếng việt">Tiếng Việt</MenuItem>
                                            </Select>
                                            <FormHelperText>English là ngôn ngữ mặc định</FormHelperText>
                                        </FormControl>
                                    </Box>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            width: '80%',
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
                                        {formSuggestLoading ? <CircularProgress /> : 'Nhận gợi ý'}
                                    </Button>

                                    {userInfo ? (
                                        <Typography
                                            component="h1"
                                            variant="h4"
                                            sx={{
                                                fontWeight: '300',
                                                fontSize: '18px',
                                                color: '#051D40',
                                                marginTop: '20px',
                                                fontWeight: '700',
                                            }}
                                        >
                                            Lượt còn lại: {user?.remainInterviewTimes}
                                        </Typography>
                                    ) : (
                                        <></>
                                    )}
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
                                            Cover Letter Của Bạn!! 🎉
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
