import {
    Button,
    CssBaseline,
    TextField,
    Paper,
    Box,
    Grid,
    Autocomplete,
    Avatar,
    Typography,
    InputLabel,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '~/assets/images/logo.png';
import AccountAPI from '~/API/AccountAPI';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

function SignUpForCompany() {
    const navigate = useNavigate();
    const defaultTheme = createTheme();
    const dateInWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [avatar, setAvatar] = useState(null);
    const [imageError, setImageError] = useState(false);
    const [imageHelperText, setImageHelperText] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageSelected, setImageSelected] = useState(false);
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        name: '',
        companyType: '',
        companySize: '',
        country: '',
        phone: '',
        start: '',
        end: '',
        description: '',
        address: '',
        companyWebsiteUrl: '',
        facebookUrl: '',
    });
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [isFullNameValid, setIsFullNameValid] = useState(true);
    const [isCompanySizeValid, setIsCompanySizeValid] = useState(true);
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
    const [isDescriptionValid, setIsDescriptionValid] = useState(true);
    const [isAddressValid, setIsAddressValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isConfirmPasswordValide, setIsConfirmPasswordValide] = useState(true);
    const [isCompanyTypeValid, setIsCompanyTypeValid] = useState(true);
    const [isCountryValid, setIsCountryValid] = useState(true);
    const [isImgFileValid, setIsImgFileValid] = useState(true);
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://countriesnow.space/api/v0.1/countries/flag/images')
            .then(response => {
                setCountries(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
                setLoading(false);
            });
    }, []);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleImageUpload = (event) => {
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
                setImageSelected(true);
            } else {
                setImageError(true);
                setImageHelperText('Only JPEG, JPG, and PNG files are allowed.');
                setImagePreview(null);
                setImageFile(null);
            }
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        setImageFile(null);
        setImageError(false);
        setImageHelperText('');
        setImageSelected(false);
        document.getElementById('avatarUrl').value = null;
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const username = data.get('username');
        const phoneNumber = data.get('phoneNumber');
        const fullname = data.get('fullname');
        const companySize = data.get('companySize');
        const description = data.get('description');
        const address = data.get('address');
        const password = data.get('password');
        const confirmPassword = data.get('confirmPassword');
        const companyType = formValues.companyType;
        const country = formValues.country;
        const startDate = formValues.start;
        const endDate = formValues.end;

        if (!imageFile) {
            setIsImgFileValid(false);
        } else {
            setIsImgFileValid(true);
        }

        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
            setIsEmailValid(false);
        } else {
            setIsEmailValid(true);
        }

        if (username.length < 5 || username.length > 50) {
            setIsUsernameValid(false);
        } else {
            setIsUsernameValid(true);
        }

        if (phoneNumber === '') {
            setIsPhoneNumberValid(false);
        } else {
            setIsPhoneNumberValid(true);
        }

        if (fullname.length < 5 || fullname.length > 50) {
            setIsFullNameValid(false);
        } else {
            setIsFullNameValid(true);
        }

        if (!/^[0-9]+$/.test(companySize)) {
            setIsCompanySizeValid(false);
        } else {
            setIsCompanySizeValid(true);
        }

        if (description.length < 5 || description.length > 500) {
            setIsDescriptionValid(false);
        } else {
            setIsDescriptionValid(true);
        }

        if (address.length < 5 || description.length > 500) {
            setIsAddressValid(false);
        } else {
            setIsAddressValid(true);
        }

        if (password.length < 10 || password.length > 30) {
            setIsPasswordValid(false);
        } else {
            setIsPasswordValid(true);
        }

        if (!(confirmPassword === password)) {
            setIsConfirmPasswordValide(false);
        } else {
            setIsConfirmPasswordValide(true);
        }

        if (companyType === '' || companyType === null) {
            setIsCompanyTypeValid(false);
        } else {
            setIsCompanyTypeValid(true);
        }

        if (country === '' || country === null) {
            setIsCountryValid(false);
        } else {
            setIsCountryValid(true);
        }

        if (
            isUsernameValid &&
            isFullNameValid &&
            isCompanySizeValid &&
            isPhoneNumberValid &&
            isDescriptionValid &&
            isAddressValid &&
            isEmailValid &&
            isPasswordValid &&
            isConfirmPasswordValide &&
            isCompanyTypeValid &&
            isCountryValid &&
            isImgFileValid
        ) {
            event.preventDefault();

            data.append('roleName', 'student');

            const createAccountRequest = {
                username: data.get('username'),
                password: data.get('password'),
                email: data.get('email'),
                avatarUrl: data.get('avatarUrl'),
                roleName: 'company',
            };

            // Append `createAccountRequest` fields to FormData
            data.append('createAccountRequest.username', createAccountRequest.username);
            data.append('createAccountRequest.password', createAccountRequest.password);
            data.append('createAccountRequest.email', createAccountRequest.email);
            data.append('createAccountRequest.avatarUrl', data.get('avatarUrl'));
            data.append('createAccountRequest.roleName', createAccountRequest.roleName);

            // Append `requestObject` fields to FormData
            data.append('createCompanyRequest.name', data.get('fullname'));
            data.append('createCompanyRequest.country', formValues.country);
            data.append('createCompanyRequest.address', data.get('address'));
            data.append('createCompanyRequest.avatarUrl', data.get('avatarUrl'));
            data.append('createCompanyRequest.facebookUrl', data.get('facebookUrl'));

            data.append('createCompanyRequest.companyWebsiteUrl', data.get('companyWebsiteUrl'));

            data.append('createCompanyRequest.description', data.get('description'));

            data.append('createCompanyRequest.workingTime', formValues.start + '-' + formValues.end);

            data.append('createCompanyRequest.companySize', data.get('companySize'));
            data.append('createCompanyRequest.companyType', formValues.companyType);

            try {
                const result = await AccountAPI.createAccountForCompany(data);
                navigate('/sign-in', { state: { signupSuccess: true } });
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        console.log(formValues);
    }, [formValues]);

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
                            Sign up as company
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5 }}>
                            <TextField
                                type="file"
                                id="avatarUrl"
                                name="avatarUrl"
                                style={{ display: 'none' }}
                                onChange={handleImageUpload}
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
                                    alt="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.svgrepo.com%2Fsvg%2F452030%2Favatar-default&psig=AOvVaw2Eepet3Jt6CuwNIc10izZr&ust=1718112366877000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOi0-r2R0YYDFQAAAAAdAAAAABAE"
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
                                        ? handleRemoveImage
                                        : () => document.getElementById('avatarUrl').click()
                                }
                            >
                                {imageSelected ? 'Remove Logo' : 'Please Choose Logo'}
                            </Button>
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                <Typography color="error">
                                    {!isImgFileValid ? 'Please choose mentor avatar' : ''}
                                </Typography>
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
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    error={!isUsernameValid}
                                    helperText={!isUsernameValid ? 'Username must have more than 5 characters' : ''}
                                    onChange={handleInputChange}
                                    sx={{ flex: 1 }}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="fullname"
                                    label="Full Name"
                                    name="fullname"
                                    autoComplete="name"
                                    error={!isFullNameValid}
                                    helperText={!isFullNameValid ? 'FullName must have more than 5 characters' : ''}
                                    onChange={handleInputChange}
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
                                    fullWidth
                                    defaultValue=""
                                    id="companyType"
                                    name="companyType"
                                    options={['IT Product', 'Finance', 'Entertain']}
                                    getOptionLabel={(option) => option}
                                    value={formValues.companyType}
                                    onChange={(event, newValue) =>
                                        setFormValues({ ...formValues, companyType: newValue })
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Company Type"
                                            margin="normal"
                                            error={!isCompanyTypeValid}
                                            helperText={!isCompanyTypeValid ? 'Please choose company type' : ''}
                                        />
                                    )}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="companySize"
                                    label="Company Size"
                                    id="companySize"
                                    error={!isCompanySizeValid}
                                    helperText={!isCompanySizeValid ? 'Company must be number' : ''}
                                    onChange={handleInputChange}
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
                                    fullWidth
                                    id="country"
                                    name="country"
                                    loading={loading}
                                    options={countries}
                                    getOptionLabel={(option) => option.name}
                                    value={formValues.country ? countries.find(country => country.name === formValues.country) : null}
                                    onChange={(event, newValue) => setFormValues({ ...formValues, country: newValue ? newValue.name : '' })}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Country"
                                            margin="normal"
                                            error={!isCountryValid}
                                            helperText={!isCountryValid ? 'Please choose country' : ''}
                                        />
                                    )}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="phone"
                                    label="Phone Number"
                                    name="phone"
                                    autoComplete="phone"
                                    error={!isPhoneNumberValid}
                                    helperText={!isPhoneNumberValid ? 'Phone number must be number' : ''}
                                    onChange={handleInputChange}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'end',
                                    justifyContent: 'center',
                                    gap: 2,
                                    border: '1px solid #ccc',
                                    borderRadius: 2,
                                    padding: 2,
                                    mt: 2,
                                    mb: 3,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'start',
                                        justifyContent: 'center',
                                        flex: 1,
                                    }}
                                >
                                    <Typography>Start</Typography>
                                    <Autocomplete
                                        disablePortal
                                        required
                                        fullWidth
                                        id="start"
                                        name="start"
                                        options={dateInWeek}
                                        onChange={(event, newValue) =>
                                            setFormValues({ ...formValues, start: newValue })
                                        }
                                        renderInput={(params) => (
                                            <TextField {...params} label="Start" margin="normal" />
                                        )}
                                    />
                                </Box>
                                <Typography>to</Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'start',
                                        justifyContent: 'center',
                                        flex: 1,
                                    }}
                                >
                                    <Typography>End</Typography>
                                    <Autocomplete
                                        disablePortal
                                        required
                                        fullWidth
                                        id="end"
                                        name="end"
                                        options={dateInWeek}
                                        onChange={(event, newValue) => setFormValues({ ...formValues, end: newValue })}
                                        renderInput={(params) => <TextField {...params} label="End" margin="normal" />}
                                    />
                                </Box>
                            </Box>

                            <TextField
                                id="description"
                                name="description"
                                label="Description"
                                multiline
                                rows={5}
                                sx={{ width: '100%', flex: 1 }}
                                error={!isDescriptionValid}
                                helperText={!isDescriptionValid ? 'Description must be 6-100 characters.' : ''}
                                onChange={handleInputChange}
                            />

                            <TextField
                                margin="normal"
                                fullWidth
                                id="address"
                                label="Address"
                                name="address"
                                autoComplete="address"
                                error={!isAddressValid}
                                helperText={!isAddressValid ? 'Address must be 6-100 characters.' : ''}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="companyWebsiteUrl"
                                label="Company Website Url"
                                name="companyWebsiteUrl"
                                autoComplete="companyWebsiteUrl"
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="facebookUrl"
                                label="Facebook Url"
                                name="facebookUrl"
                                autoComplete="facebookUrl"
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                type="email"
                                error={!isEmailValid}
                                helperText={!isEmailValid ? 'Email invalid' : ''}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                error={!isPasswordValid}
                                helperText={!isPasswordValid ? 'Password must be 11-30 characters.' : ''}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                error={!isConfirmPasswordValide}
                                helperText={!isConfirmPasswordValide ? 'Confirm password must equal password' : ''}
                                onChange={handleInputChange}
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

export default SignUpForCompany;
