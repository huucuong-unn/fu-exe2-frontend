import { Box, Button, Container, Grid, TextField, Typography, Avatar, InputLabel,CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import AccountAPI from '~/API/AccountAPI';
import { format } from 'date-fns';
import StorageService from '~/components/StorageService/storageService';

export const Profile = () => {
    const [profiles, setProfiles] = useState(null);
    const [loading, setLoading] = useState(true);
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
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const studentId = StorageService.getItem('userInfo').studentId;
                const responses = await AccountAPI.getAccountProfile(studentId);
                setProfiles(responses);
                console.log(responses);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
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


            } catch (error) {
                console.log(error);
            }
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'MMMM dd, yyyy hh:mm a');
    };


    return (
        <Container sx={{ py: 6 }}>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid item xs={12} sm={10} md={8} elevation={6} square>
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
                        Your profiles
                    </Typography>
                    <Typography component="h1" color="text.secondary" sx={{ mt: 2 }}>
                        {`Created Date: ${profiles ? formatDate(profiles.account.createdDate) : 'None'}`}
                    </Typography>


                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5, width: '100%' }}>
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
                                justifyContent: 'left',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar
                                alt="Avatar"
                                src={`https://tortee-image-upload.s3.ap-southeast-1.amazonaws.com/${profiles.account.avatarUrl}`}
                                sx={{ width: 200, height: 200, border: 'solid 2px black' }}
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
                            {imageSelected ? 'Remove Avatar' : 'Change Avatar'}
                        </Button>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'left',
                                alignItems: 'center',
                                gap: 2,

                            }}
                        >
                            <TextField margin="normal" required fullWidth name="studentCode" label="Student Code"
                                        focused value={profiles.studentCode}
                                />

                            <TextField margin="normal" required fullWidth name="university" label="University"
                                       focused value={profiles.university.name}
                            />


                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'left',
                                alignItems: 'center',
                                gap: 2,
                                width: '100%',
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
                                focused
                                value={profiles.account.username}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="FullName"
                                name="name"
                                autoComplete="name"
                                focused
                                 value={profiles.name}
                                sx={{ flex: 1 }}
                            />
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'left',
                                alignItems: 'center',
                                gap: 2,
                                width: '100%',
                            }}
                        >

                            <TextField
                                error={dobError}
                                margin="normal"
                                required
                                fullWidth
                                name="dob"
                                label="Date of Birth"
                                type="date"
                                 focused
                                 value={profiles.dob}
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
                                width: '100%',
                            }}
                        >

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
                                 focused
                                 value={profiles.account.email}
                                helperText={emailHelperText}
                            />
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space',
                                alignItems: 'center',
                                gap: 2,
                                width: '100%',
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

                                <img
                                    src={`https://tortee-image-upload.s3.ap-southeast-1.amazonaws.com/${profiles.frontStudentCard}`}
                                    alt="Front of Student Card"
                                    style={{ marginTop: '10px', width: 300, height: 300 }}
                                />

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

                                <img
                                     src={`https://tortee-image-upload.s3.ap-southeast-1.amazonaws.com/${profiles.backStudentCard}`}
                                    alt="Back of Student Card"
                                    style={{ marginTop: '10px', width: 300, height: 300 }}
                                />

                            </Box>

                        </Box>


                    </Box>
                    <Button
                        variant="contained"
                        size="medium"
                        sx={{
                            my: 4,
                            backgroundColor: '#365E32',
                            '&:hover': {
                                backgroundColor: '#508D4E',
                            },
                        }}
                    >
                        Save Changes
                    </Button>
                </Box>
            </Grid>
                )}
        </Container>
    );
};
{/*<Box sx={{ border: '1px solid #ccc', borderRadius: 5 }}>*/}
{/*    <Box sx={{ p: 3 }}>*/}
{/*        <Typography variant="h6" component="h3">*/}
{/*            Personal Information*/}
{/*        </Typography>*/}
{/*        <Box*/}
{/*            sx={{*/}
{/*                width: '100%',*/}
{/*                mb: 2,*/}
{/*                display: 'flex',*/}
{/*                flexDirection: 'column',*/}
{/*                justifyContent: 'center',*/}
{/*                alignItems: 'center',*/}
{/*                gap: 1,*/}
{/*            }}*/}
{/*        >*/}
{/*            <Avatar*/}
{/*                sx={{ width: 100, height: 100, bgcolor: '#f48fb1' }} // Tăng kích thước Avatar*/}
{/*            />*/}
{/*            <Typography variant="h5">150 point</Typography>*/}
{/*        </Box>*/}

{/*        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>*/}
{/*            <Grid item xs={6}>*/}
{/*                <TextField*/}
{/*                    margin="normal"*/}
{/*                    required*/}
{/*                    fullWidth*/}
{/*                    id="fullName"*/}
{/*                    label="Full Name"*/}
{/*                    name="fullName"*/}
{/*                    autoComplete="fullName"*/}
{/*                    autoFocus*/}
{/*                />*/}
{/*            </Grid>*/}
{/*            <Grid item xs={6}>*/}
{/*                <TextField*/}
{/*                    margin="normal"*/}
{/*                    required*/}
{/*                    fullWidth*/}
{/*                    name="email"*/}
{/*                    label="Email"*/}
{/*                    type="email"*/}
{/*                    id="email"*/}
{/*                    autoComplete="email"*/}
{/*                />*/}
{/*            </Grid>*/}
{/*            <Grid item xs={6}>*/}
{/*                <TextField*/}
{/*                    margin="normal"*/}
{/*                    required*/}
{/*                    fullWidth*/}
{/*                    name="phone"*/}
{/*                    label="Phone Number"*/}
{/*                    type="number"*/}
{/*                    id="phone"*/}
{/*                    autoComplete="phone"*/}
{/*                />*/}
{/*            </Grid>*/}
{/*            <Grid item xs={6}>*/}
{/*                <TextField*/}
{/*                    margin="normal"*/}
{/*                    required*/}
{/*                    fullWidth*/}
{/*                    name="university"*/}
{/*                    label="University"*/}
{/*                    type="text"*/}
{/*                    id="university"*/}
{/*                    autoComplete="university"*/}
{/*                />*/}
{/*            </Grid>*/}
{/*            <Grid item xs={6}>*/}
{/*                <TextField*/}
{/*                    margin="normal"*/}
{/*                    required*/}
{/*                    fullWidth*/}
{/*                    name="studentCode"*/}
{/*                    label="Student Code"*/}
{/*                    type="text"*/}
{/*                    id="studentCode"*/}
{/*                    autoComplete="studentCode"*/}
{/*                />*/}
{/*            </Grid>*/}
{/*        </Grid>*/}