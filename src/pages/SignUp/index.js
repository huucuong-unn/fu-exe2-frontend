import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '~/assets/images/logo.png';
import UniversityAPI from '../../API/UniversityAPI'; // Importing your UniversityAPI
import AccountAPI from '../../API/AccountAPI';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import { InputLabel } from '@mui/material';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Tortee
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
    const [emailError, setEmailError] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState('');
    const [dobError, setDobError] = useState(false);
    const [dobHelperText, setDobHelperText] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordHelperText, setPasswordHelperText] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [confirmPasswordHelperText, setConfirmPasswordHelperText] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [usernameHelperText, setUsernameHelperText] = useState('');
    const [imageError, setImageError] = useState(false);
    const [imageHelperText, setImageHelperText] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [universities, setUniversities] = useState([]);
    const [imageSelected, setImageSelected] = useState(false);
    const [frontImagePreview, setFrontImagePreview] = useState(null);
    const [frontImageFile, setFrontImageFile] = useState(null);
    const [backImagePreview, setBackImagePreview] = useState(null);
    const [backImageFile, setBackImageFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await UniversityAPI.getAllForDropDownList();
                setUniversities(response);
            } catch (error) {
                console.error('Error fetching universities:', error);
            }
        };
        fetchData();
    }, []);

    const validateEmail = (email) => {
        const emailRegex =
            /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/i;
        return emailRegex.test(email);
    };

    const validateDOB = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age >= 17;
    };

    const validatePassword = (password) => {
        return password.length >= 10;
    };

    const validateConfirmPassword = (confirmPassword, password) => {
        return confirmPassword === password;
    };

    const validateUsername = (username) => {
        return username.length >= 5;
    };

    const handleImageUpload = (event, setImagePreview, setImageFile, setImageError, setImageHelperText) => {
        const file = event.target.files[0];
        if (file) {
            const fileType = file.type;
            const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (validImageTypes.includes(fileType)) {
                setImageError(false);
                setImageHelperText('');
                const reader = new FileReader();
                reader.onload = () => {
                    setImagePreview(reader.result);
                };
                reader.readAsDataURL(file);
                setImageFile(file);
            } else {
                setImageError(true);
                setImageHelperText('Only JPEG, JPG, and PNG files are allowed.');
                setImagePreview(null);
                setImageFile(null);
            }
        }
    };

    const handleRemoveImage = (setImagePreview, setImageFile, setImageError, setImageHelperText) => {
        setImagePreview(null);
        setImageFile(null);
        setImageError(false);
        setImageHelperText('');
    };

    const validateAllField = (data) => {
        let result = true;

        const emailValue = data.get('email');
        if (!validateEmail(emailValue)) {
            setEmailError(true);
            setEmailHelperText('Incorrect email format.');
            result = false;
        } else {
            setEmailError(false);
            setEmailHelperText('');
        }

        const dobValue = data.get('dob');
        if (!validateDOB(dobValue)) {
            setDobError(true);
            setDobHelperText('You must be at least 17 years old.');
            result = false;
        } else {
            setDobError(false);
            setDobHelperText('');
        }

        const passwordValue = data.get('password');
        if (!validatePassword(passwordValue)) {
            setPasswordError(true);
            setPasswordHelperText('Password must be at least 10 characters long.');
            result = false;
        } else {
            setPasswordError(false);
            setPasswordHelperText('');
        }

        const confirmPasswordValue = data.get('confirmPassword');
        if (!validateConfirmPassword(confirmPasswordValue, passwordValue)) {
            setConfirmPasswordError(true);
            setConfirmPasswordHelperText('Confirm password must equal password');
            result = false;
        } else {
            setPasswordError(false);
            setPasswordHelperText('');
        }

        const usernameValue = data.get('username');
        if (!validateUsername(usernameValue)) {
            setUsernameError(true);
            setUsernameHelperText('Username must be at least 5 characters long.');
            result = false;
        } else {
            setUsernameError(false);
            setUsernameHelperText('');
        }
        console.log(result);
        return result;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        data.append('roleName', 'student');

        const createAccountRequest = {
            username: data.get('username'),
            password: data.get('password'),
            email: data.get('email'),
            avatarUrl: data.get('avatarUrl'),
            roleName: data.get('roleName'),
        };

        // Append `createAccountRequest` fields to FormData
        data.append('createAccountRequest.username', createAccountRequest.username);
        data.append('createAccountRequest.password', createAccountRequest.password);
        data.append('createAccountRequest.email', createAccountRequest.email);
        data.append('createAccountRequest.avatarUrl', createAccountRequest.avatarUrl);
        data.append('createAccountRequest.roleName', createAccountRequest.roleName);

        const requestObject = {
            name: data.get('name'),
            dob: data.get('dob'),
            studentCode: data.get('studentCode'),
            universityId: '02e14861-f8a7-43d3-9c5f-8239d61d49d2',
        };

        // Append `requestObject` fields to FormData
        data.append('studentRequest.name', requestObject.name);
        data.append('studentRequest.dob', requestObject.dob);
        data.append('studentRequest.studentCode', requestObject.studentCode);
        data.append('studentRequest.universityId', requestObject.universityId);
        data.append('studentRequest.frontStudentCard', data.get('front'));
        data.append('studentRequest.backStudentCard', data.get('back'));

        if (validateAllField(data)) {
            try {
                const result = await AccountAPI.createAccount(data);
                console.log(data);

                navigate('/sign-in', { state: { signupSuccess: true } });
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        background: 'linear-gradient(180deg, #9CEE8D, #0B749C)',
                    }}
                >
                    <img src={logo} style={{ width: 150, height: 150, margin: '37%' }} alt="Logo" />
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h4">
                            Sign up as mentee
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5 }}>
                            <TextField
                                type="file"
                                id="avatarUrl"
                                name="avatarUrl"
                                style={{ display: 'none' }}
                                onChange={(e) =>
                                    handleImageUpload(
                                        e,
                                        setImagePreview,
                                        setImageFile,
                                        setImageError,
                                        setImageHelperText,
                                    )
                                }
                                accept="image/jpeg, image/jpg, image/png"
                            />

                            <Box
                                sx={{
                                    mt: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar
                                    alt="Avatar"
                                    src={imagePreview}
                                    sx={{ width: 90, height: 90, border: 'solid 2px black' }}
                                    helperText="Avatar"
                                />
                            </Box>
                            <Button
                                variant="contained"
                                sx={{ mt: 2, ml: '50%', transform: 'translate(-50%)' }}
                                onClick={
                                    imageSelected
                                        ? () =>
                                              handleRemoveImage(
                                                  setImagePreview,
                                                  setImageFile,
                                                  setImageError,
                                                  setImageHelperText,
                                              )
                                        : () => document.getElementById('avatarUrl').click()
                                }
                            >
                                {imageSelected ? 'Remove Avatar' : 'Please Choose Avatar'}
                            </Button>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'left',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'start',
                                        mt: 2,
                                        gap: 1,
                                        flex: 1,
                                    }}
                                >
                                    <InputLabel htmlFor="front" sx={{ fontWeight: 'bold' }}>
                                        Front Of Student Card
                                    </InputLabel>
                                    <TextField
                                        type="file"
                                        id="front"
                                        name="front"
                                        style={{ display: 'none' }}
                                        onChange={(e) =>
                                            handleImageUpload(
                                                e,
                                                setFrontImagePreview,
                                                setFrontImageFile,
                                                setImageError,
                                                setImageHelperText,
                                            )
                                        }
                                        accept="image/jpeg, image/jpg, image/png"
                                    />
                                    <Button
                                        variant="contained"
                                        onClick={() => document.getElementById('front').click()}
                                        sx={{ mt: 1 }}
                                    >
                                        Upload Front Image
                                    </Button>
                                    {frontImagePreview && (
                                        <img
                                            src={frontImagePreview}
                                            alt="Front of Student Card"
                                            style={{ marginTop: '10px', width: '100%', minHeight: '500px' }}
                                        />
                                    )}
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'start',
                                        mt: 2,
                                        gap: 1,
                                        flex: 1,
                                    }}
                                >
                                    <InputLabel htmlFor="back" sx={{ fontWeight: 'bold' }}>
                                        Back Of Student Card
                                    </InputLabel>
                                    <TextField
                                        type="file"
                                        id="back"
                                        name="back"
                                        style={{ display: 'none' }}
                                        onChange={(e) =>
                                            handleImageUpload(
                                                e,
                                                setBackImagePreview,
                                                setBackImageFile,
                                                setImageError,
                                                setImageHelperText,
                                            )
                                        }
                                        accept="image/jpeg, image/jpg, image/png"
                                    />
                                    <Button
                                        variant="contained"
                                        onClick={() => document.getElementById('back').click()}
                                        sx={{ mt: 1 }}
                                    >
                                        Upload Back Image
                                    </Button>
                                    {backImagePreview && (
                                        <img
                                            src={backImagePreview}
                                            alt="Back of Student Card"
                                            style={{ marginTop: '10px', width: '100%', minHeight: '500px' }}
                                        />
                                    )}
                                </Box>
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
                                    error={usernameError}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    helperText={usernameHelperText}
                                    sx={{ flex: 1 }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="FullName"
                                    name="name"
                                    autoComplete="name"
                                    sx={{ flex: 1 }}
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
                                <Autocomplete
                                    disablePortal
                                    required
                                    fullWidth
                                    id="universityId"
                                    name="universityId"
                                    options={universities}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => (
                                        <TextField {...params} label="University" margin="normal" />
                                    )}
                                />
                                <TextField
                                    error={dobError}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="dob"
                                    label="Date of Birth"
                                    type="date"
                                    defaultValue="2000-05-31"
                                    id="dob"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    helperText={dobHelperText}
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
                                <TextField margin="normal" required fullWidth name="studentCode" label="Student Code" />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone Number"
                                    name="phone"
                                    autoComplete="phone"
                                />
                            </Box>

                            <TextField
                                error={emailError}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                type="email"
                                helperText={emailHelperText}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                helperText={passwordHelperText}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                autoComplete="current-password"
                                helperText={confirmPasswordError}
                            />
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Sign Up
                            </Button>

                            <Grid container>
                                <Grid item xs>
                                    <Link to="/sign-in" variant="body2">
                                        Sign In
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
