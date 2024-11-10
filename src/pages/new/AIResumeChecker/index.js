import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import blogBackground from '~/assets/images/blog.webp';
import aiCVBackground from '~/assets/images/aicvbackground.webp';
import internshipProgramBackground from '~/assets/images/internshipprogram.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, CircularProgress, Skeleton } from '@mui/material';
import storageService from '~/components/StorageService/storageService';
import AccountAPI from '~/API/AccountAPI';

const defaultTheme = createTheme();

export default function AIResumeChecker() {
    const [uploading, setUploading] = useState(false); // State to manage upload status'
    const [aiSuggestionsData, setAiSuggestionsData] = useState(null);
    const [formSuggestLoading, setFormSuggestLoading] = useState(false); // State to manage upload status'
    const [userInfo, setUserInfo] = useState(storageService.getItem('userInfo') || null);
    const [showAlertError, setShowAlertError] = useState(false);
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

    // Function to call API and upload the file
    const uploadFile = async (file) => {
        setUploading(true); // Show a loading state when the upload starts
        setFormSuggestLoading(true);

        if (!userInfo) {
            setShowAlertError(true); // Show error alert
            setTimeout(() => setShowAlertError(false), 5000); // Hide
            setUploading(false); // Reset the loading state
            setFormSuggestLoading(false);

            return;
        }

        if (user?.remainReviewCVTimes <= 0) {
            setShowAlertError(true); // Show error alert
            setTimeout(() => setShowAlertError(false), 5000); // Hide
            setUploading(false); // Reset the loading state
            setFormSuggestLoading(false);

            return;
        }

        // Prepare form data
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', userInfo?.id);

        try {
            const response = await axios.post('https://lionfish-app-axajp.ondigitalocean.app/api/v1/coze/file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File uploaded successfully:', response.data);
            if (response.data) {
                setFormSuggestLoading(false);
            }
            setAiSuggestionsData(response.data);
            fetchUserNew();
        } catch (error) {
            console.error('Error uploading file:', error);
            setShowAlertError(true); // Show error alert
            setTimeout(() => setShowAlertError(false), 5000); // Hide
        } finally {
            setUploading(false); // Reset the loading state
        }
    };

    const fetchUserNew = async () => {
        // This useEffect is now only for updating userInfo if it changes in localStorage
        const storedUserInfo = await storageService.getItem('userInfo');
        if (storedUserInfo === null) {
            return;
        }
        const userResponse = await AccountAPI.getUserById(storedUserInfo?.id);
        setUser(userResponse);
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
                        backgroundImage: `url(${aiCVBackground})`,
                        height: '1500px',
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
                                    textShadow: `
                                    -2px -2px 0 #FFFFFF, 
                                    2px -2px 0 #FFFFFF, 
                                    -2px 2px 0 #FFFFFF, 
                                    2px 2px 0 #FFFFFF, 
                                    0px -2px 0 #FFFFFF, 
                                    0px 2px 0 #FFFFFF, 
                                    -2px 0px 0 #FFFFFF, 
                                    2px 0px 0 #FFFFFF
                                `,
                                }}
                            >
                                AI RÉSUME CHECKER
                            </Typography>
                            <Typography
                                sx={{
                                    textAlign: 'center',
                                    fontSize: '24px',
                                    width: '100%',
                                    padding: '0 20% 2% 20%',
                                    textShadow: `
                                    -2px -2px 0 #FFFFFF, 
                                    2px -2px 0 #FFFFFF, 
                                    -2px 2px 0 #FFFFFF, 
                                    2px 2px 0 #FFFFFF, 
                                    0px -2px 0 #FFFFFF, 
                                    0px 2px 0 #FFFFFF, 
                                    -2px 0px 0 #FFFFFF, 
                                    2px 0px 0 #FFFFFF
                                `,
                                    fontWeight: '500',
                                }}
                            >
                                Công cụ kiểm tra và đánh giá CV thông minh sẽ phân tích CV của bạn, đưa ra các gợi ý cải
                                thiện dựa trên thông tin bạn cung cấp, giúp CV của bạn trở nên chuyên nghiệp và ấn tượng
                                hơn.
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
                                    border: '3px solid #02F18D',
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
                                        height: '450px',
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
                                        Nhận gợi ý chi tiết
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
                                        Gợi ý về cách sắp xếp thông tin, làm nổi bật kỹ năng và kinh nghiệm của bạn một
                                        cách hợp lý và chuyên nghiệp
                                    </Typography>
                                </Box>{' '}
                                <Box
                                    sx={{
                                        backgroundColor: '#051D40',
                                        width: '32%',
                                        height: '450px',
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
                                        Thay vì phải tự mình kiểm tra và chỉnh sửa CV, bạn chỉ cần vài phút để nhận được
                                        những phản hồi chính xác từ AI
                                    </Typography>
                                </Box>{' '}
                                <Box
                                    sx={{
                                        backgroundColor: '#051D40',
                                        width: '32%',
                                        height: '450px',
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
                                        Tối ưu hóa CV
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
                                        CV của bạn sẽ trở nên chuyên nghiệp và ấn tượng hơn, thu hút sự chú ý của nhà
                                        tuyển dụng ngay từ cái nhìn đầu tiên
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
                            {showAlertError ? (
                                <Alert width="50%" variant="filled" severity="error">
                                    Bạn chưa đăng nhập, hoặc hết lượt sử dụng
                                </Alert>
                            ) : (
                                <></>
                            )}
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
                                Kiểm tra CV của bạn ngay!
                            </Typography>
                            <Typography sx={{ textAlign: 'center', fontSize: '24px', width: '100%', padding: '0 8%' }}>
                                Upload CV và nhận những góp ý từ AI CV Checker
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
                                        {uploading ? <CircularProgress /> : 'Upload CV'}
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
                                        Chọn CV ngay. Định dạng PDF, dung lượng tối đa 2MB
                                    </Typography>
                                    {userInfo ? (
                                        <Typography
                                            component="h1"
                                            variant="h4"
                                            sx={{
                                                fontSize: '18px',
                                                color: '#ffffff',
                                                marginTop: '20px',
                                                fontWeight: '700',
                                            }}
                                        >
                                            Lượt còn lại: {user?.remainReviewCVTimes}
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
                                            Gợi Ý Từ AI Của Chúng Tôi 🤓
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
                                            * Chính tả
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
                                                    <b style={{ fontWeight: '700' }}>Chưa đúng:</b> {item.incorrect}
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
                                                    <b style={{ fontWeight: '700' }}>Gợi ý của chúng tôi:</b>{' '}
                                                    {item.correct}
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
                                            * Chỉnh sửa câu
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
                                                    <b style={{ fontWeight: '700' }}>Version của bạn:</b>{' '}
                                                    {item.original}
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
                                                    <b style={{ fontWeight: '700' }}>Gợi ý của chúng tôi:</b>{' '}
                                                    {item.revised}
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
                                            * Các gợi ý khác
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
