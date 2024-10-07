import { Box, Button, CircularProgress, CssBaseline, Divider, Grid, Paper, TextField, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AccountAPI from '~/API/AccountAPI';
import signupBackground from '~/assets/images/signup.webp';
import storageService from '~/components/StorageService/storageService';

const clientId = '478388298220-qhn8p4akrr4hsidbvnp999v5tn0u3s93.apps.googleusercontent.com';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright ©Tortee '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function RegisterUser() {
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);
    const location = useLocation();
    const [loginWithRole, setLoginWithRole] = useState('student');
    const [dobHelperText, setDobHelperText] = useState('');
    const [role, setRole] = useState('student'); //default role is student]
    const [loginLoading, setLoginLoading] = useState(false);

    useEffect(() => {
        if (location.state?.signupSuccess) {
            setShowAlert(true);
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [location.state]);

    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Get the UTC date parts
        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
        const year = date.getUTCFullYear();

        return `${day}/${month}/${year}`; // Format to dd/mm/yyyy
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoginLoading(true); // Start the loading spinner
        try {
            const data = new FormData(event.currentTarget);
            data.append('role', role);
            data.append('uniStudentRequest.fullName', data.get('name'));
            data.append('uniStudentRequest.university', 'fpt');
            data.append('uniStudentRequest.major', 'ktpm');
            // Getting the file from the input element
            const fileInput = document.getElementById('profilePicture');
            const file = fileInput.files[0]; // First selected file (if multiple not allowed)

            // Appending the file to FormData
            data.append('uniStudentRequest.profilePicture', file);
            const formattedDob = formatDate(data.get('dob'));
            data.delete('dob');
            data.append('dob', formattedDob);

            if (data.get('password') !== data.get('confirmPassword') || data.get('password').length < 8) {
                setLoginLoading(false);
                setShowAlertError(true); // Show error alert
                setTimeout(() => setShowAlertError(false), 5000); // Hide alert after 5s
                return;
            }

            if (
                data.get('dob') === '' ||
                data.get('name') === '' ||
                data.get('email') === '' ||
                data.get('password') === '' ||
                data.get('confirmPassword') === '' ||
                file === undefined
            ) {
                setLoginLoading(false);
                setShowAlertError(true); // Show error alert
                setTimeout(() => setShowAlertError(false), 5000); // Hide alert after 5s
                return;
            }

            console.log('file:', file);

            //Make the API call
            const account = await AccountAPI.register(data);

            // If status is 200, login successful
            if (account) {
                setLoginLoading(false); // Stop loading spinner
                navigate('/login'); // Navigate to home page
            } else {
                // If login fails (non-200 status)
                setLoginLoading(false);
                setShowAlertError(true); // Show error alert
                setTimeout(() => setShowAlertError(false), 5000); // Hide alert after 5s
            }
        } catch (error) {
            // Handle API errors (network issues, server errors, etc.)
            console.error('Register error:', error);
            setLoginLoading(false);
            setShowAlertError(true); // Show error alert
            setTimeout(() => setShowAlertError(false), 5000); // Hide alert after 5s
        }
    };

    const handleGoogleLoginSuccess = async (response) => {
        try {
            const token = '';
            const decoded = jwtDecode(response?.credential);
            console.log('Google login success:', response);
            console.log('Google login success:', decoded);
            const data = {
                emailOrUsername: decoded.email,
                loginWithRole: loginWithRole,
            };

            const userInfo = await AccountAPI.loginWithGoogle(data);

            if (userInfo) {
                storageService.setItem('userInfo', userInfo);
                switch (loginWithRole) {
                    case 'mentor':
                        navigate('/campaigns');
                        break;
                    case 'student':
                        navigate('/');
                        break;
                    case 'admin':
                        navigate('/admin/dashboard');
                        break;
                    case 'company':
                        navigate('/company/campaign-history');
                        break;
                    default:
                        navigate('/');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleGoogleLoginFailure = (error) => {
        console.log('Google login failure:', error);
    };

    return (
        <Box sx={{ fontFamily: 'Montserrat' }}>
            {showAlert && (
                <Alert width="50%" variant="filled" severity="success">
                    Đăng ký thành công
                </Alert>
            )}
            {showAlertError && (
                <Alert width="50%" variant="filled" severity="error">
                    Đăng ký thất bại, cần nhâp lại thông tin đăng ký
                </Alert>
            )}

            {loginLoading ? (
                <Grid sx={{ width: '100%', height: '100vh', opacity: 0.8, backgroundColor: 'white' }}>
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex', // Enable flexbox
                            justifyContent: 'center', // Center horizontally
                            alignItems: 'center', // Center vertically
                        }}
                    >
                        <CircularProgress />
                    </Box>
                </Grid>
            ) : (
                <Grid
                    container
                    component="main"
                    sx={{
                        height: '100%',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'top',
                        backgroundImage: `url(${signupBackground})`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <CssBaseline />

                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={8}
                        component={Paper}
                        elevation={6}
                        square
                        sx={{
                            borderRadius: '20px',
                            zIndex: '2',
                            margin: '5%',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            marginTop: '12%',
                        }}
                    >
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '0 30px',
                            }}
                        >
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{ fontWeight: '900', fontSize: '46px', color: '#051D40' }}
                            >
                                ĐĂNG KÝ TÀI KHOẢN
                            </Typography>
                            <Typography sx={{ textAlign: 'center', marginTop: '12px' }}>
                                TORTEE là nền tảng AI thông minh giúp bạn tối ưu hóa CV và tạo thư xin việc chỉ trong
                                vài phút. Hãy tham gia cùng chúng tôi ngay hôm nay để bắt đầu hành trình chuẩn bị cho
                                những cơ hội thực tập và công việc mơ ước
                            </Typography>
                            <Box sx={{ width: '100%', typography: 'body1', mt: 2 }}>
                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                    Ảnh đại diện: <input type="file" id="profilePicture" required />
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
                                        />
                                        <TextField
                                            // error={dobError}
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="dob"
                                            label="Ngày sinh"
                                            type="date"
                                            defaultValue="2000-06-04"
                                            id="dob"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            helperText={dobHelperText}
                                            sx={{ flex: 1 }}
                                        />
                                    </Box>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        sx={{ borderRadius: '50%' }}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Mật khẩu (Từ 8 ký tự)"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        label="Nhập lại mật khẩu"
                                        type="password"
                                        id="confirmPassword"
                                        autoComplete="current-password"
                                        // helperText={confirmPasswordError}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        // sx={{ mt: 3, mb: 2 }}
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
                                    >
                                        Đăng ký
                                    </Button>
                                    {/* <Divider>Hoặc đăng ký với</Divider>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
                                        <GoogleOAuthProvider clientId={clientId}>
                                            <GoogleLogin
                                                onSuccess={handleGoogleLoginSuccess}
                                                onFailure={handleGoogleLoginFailure}
                                            />
                                        </GoogleOAuthProvider>
                                    </Box> */}
                                    <Grid
                                        container
                                        sx={{ display: 'flex', justifyContent: 'center', marginTop: '42px' }}
                                    >
                                        <Grid item sx={{ gap: '4px' }}>
                                            Bạn đã có tài khoản?
                                            <Link
                                                to="/login"
                                                variant="body2"
                                                style={{ color: '#051D40', textDecoration: 'none', fontWeight: 'bold' }}
                                            >
                                                {' Đăng nhập ngay'}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                    <Copyright sx={{ mt: 10 }} />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={false} sm={4} md={7} sx={{}}></Grid>
                </Grid>
            )}
        </Box>
    );
}
