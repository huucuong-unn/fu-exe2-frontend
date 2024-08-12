import {
    Container,
    TextField,
    Button,
    Box,
    Typography as TypographyMaterial,
    Autocomplete,
    Chip,
    Avatar,
} from '@mui/material';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SkillAPI from '~/API/SkillAPI';
import AccountAPI from '~/API/AccountAPI';
import storageService from '~/components/StorageService/storageService';
import { useNavigate, useParams } from 'react-router-dom';

function CreateMentorProfile() {
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [currentSkill, setCurrentSkill] = useState('');
    const navigate = useNavigate();

    const [skills, setSkills] = useState([]);

    const [imageError, setImageError] = useState(false);
    const [imageHelperText, setImageHelperText] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageSelected, setImageSelected] = useState(false);

    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [isFullNameValid, setIsFullNameValid] = useState(true);
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isConfirmPasswordValide, setIsConfirmPasswordValide] = useState(true);
    const [isDescriptionValid, setIsDescriptionValid] = useState(true);
    const [isShortDescriptionValid, setIsShortDescriptionValid] = useState(true);
    const [isRequireValid, setIsRequireValid] = useState(true);
    const [isSkillValid, setIsSkillValid] = useState(true);
    const [isImgFileValid, setIsImgFileValid] = useState(true);

    const handleAddSkill = () => {
        if (currentSkill && !selectedSkills.includes(currentSkill)) {
            setSelectedSkills([...selectedSkills, currentSkill]);
            setCurrentSkill('');
        }
    };

    const handleDeleteSkill = (skillToDelete) => () => {
        setSelectedSkills(selectedSkills.filter((skill) => skill !== skillToDelete));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const skillData = await SkillAPI.getAll();
                setSkills(skillData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const email = data.get('email');
        const username = data.get('username');
        const phoneNumber = data.get('phoneNumber');
        const fullname = data.get('fullName');
        const description = data.get('description');
        const shortDescription = data.get('shortDescription');
        const password = data.get('password');
        const confirmPassword = data.get('confirmPassword');
        const require = data.get('requirement');
        const skill = data.get('skill');

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

        if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneNumber)) {
            setIsPhoneNumberValid(false);
        } else {
            setIsPhoneNumberValid(true);
        }

        if (fullname.length < 5 || fullname.length > 50) {
            setIsFullNameValid(false);
        } else {
            setIsFullNameValid(true);
        }

        if (description.length < 5 || description.length > 100) {
            setIsDescriptionValid(false);
        } else {
            setIsDescriptionValid(true);
        }

        if (shortDescription.length < 5 || shortDescription.length > 50) {
            setIsShortDescriptionValid(false);
        } else {
            setIsShortDescriptionValid(true);
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

        if (require.length < 5 || require.length > 50) {
            setIsRequireValid(false);
        } else {
            setIsRequireValid(true);
        }

        if (selectedSkills.length === 0) {
            setIsSkillValid(false);
        } else {
            setIsSkillValid(true);
        }

        if (
            isUsernameValid &&
            isPhoneNumberValid &&
            isEmailValid &&
            isPasswordValid &&
            isConfirmPasswordValide &&
            isFullNameValid &&
            isDescriptionValid &&
            isShortDescriptionValid &&
            isRequireValid &&
            isSkillValid &&
            isImgFileValid
        ) {
            data.append('roleName', 'mentor');
            console.log('hgfgf');
            // Append `createAccountRequest` fields to FormData
            data.append('createAccountRequest.username', data.get('username'));
            data.append('createAccountRequest.password', data.get('password'));
            data.append('createAccountRequest.email', data.get('email'));
            data.append('createAccountRequest.avatarUrl', data.get('avatarUrl'));
            data.append('createAccountRequest.roleName', data.get('roleName'));

            // Append `requestObject` fields to FormData
            data.append('mentorRequest.mentorProfileRequest.linkedinUrl', data.get('linkedinUrl'));
            data.append('mentorRequest.mentorProfileRequest.requirement', data.get('requirement'));
            data.append('mentorRequest.mentorProfileRequest.description', data.get('description'));
            data.append('mentorRequest.mentorProfileRequest.shortDescription', data.get('shortDescription'));
            data.append('mentorRequest.mentorProfileRequest.facebookUrl', data.get('facebookUrl'));
            data.append('mentorRequest.mentorProfileRequest.googleMeetUrl', data.get('googleMeetUrl'));
            data.append('mentorRequest.companyId', storageService.getItem('userInfo').companyId);
            data.append('mentorRequest.fullName', data.get('fullName'));

            data.append('mentorRequest.skillNames', selectedSkills);

            try {
                const result = await AccountAPI.createAccountForMentor(data);
                navigate('/company/create-mentor-History');
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        console.log(imageSelected);
    }, [imageSelected]);
    return (
        <Container id="companies" sx={{ py: { xs: 8, sm: 16 }, padding: { lg: 16 } }}>
            <TypographyMaterial variant="h4" sx={{ mb: { xs: 2, sm: 4 } }}>
                Create mentor profile
            </TypographyMaterial>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    justifyContent: 'center',
                    gap: 2,
                    border: '1px solid #ccc',
                    padding: 2,
                    borderRadius: 3,
                }}
            >
                <TextField
                    type="file"
                    id="avatarUrl"
                    name="avatarUrl"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                    accept="image/jpeg, image/jpg, image/png"
                />

                <Avatar
                    alt="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.svgrepo.com%2Fsvg%2F452030%2Favatar-default&psig=AOvVaw2Eepet3Jt6CuwNIc10izZr&ust=1718112366877000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOi0-r2R0YYDFQAAAAAdAAAAABAE"
                    src={imagePreview}
                    sx={{
                        width: 90,
                        height: 90,
                        border: 'solid 2px black',
                        mt: 2,
                        ml: '50%',
                        transform: 'translate(-50%)',
                    }}
                    helperText="Avatar"
                />
                <Button
                    variant="contained"
                    sx={{ mt: 2, ml: '50%', transform: 'translate(-50%)' }}
                    onClick={imageSelected ? handleRemoveImage : () => document.getElementById('avatarUrl').click()}
                >
                    {imageSelected ? 'Remove Avatar' : 'Please Choose Avatar'}
                </Button>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <TypographyMaterial color="error">
                        {!isImgFileValid ? 'Please choose mentor avatar' : ''}
                    </TypographyMaterial>
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
                        name="username"
                        id="username"
                        label="Username"
                        sx={{ width: '100%' }}
                        error={!isUsernameValid}
                        helperText={!isUsernameValid ? 'Username must have more than 5 characters' : ''}
                    />
                    <TextField
                        name="phoneNumber"
                        id="phoneNumber"
                        label="Phone number"
                        sx={{ width: '100%' }}
                        error={!isPhoneNumberValid}
                        helperText={!isPhoneNumberValid ? 'Phone number must be number' : ''}
                    />
                </Box>
                <TextField
                    name="email"
                    id="email"
                    label="Email"
                    sx={{ width: '100%' }}
                    error={!isEmailValid}
                    helperText={!isEmailValid ? 'Email invalid' : ''}
                />

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
                        name="password"
                        id="password"
                        label="Password"
                        sx={{ width: '100%' }}
                        error={!isPasswordValid}
                        helperText={!isPasswordValid ? 'Password must be 11-30 characters.' : ''}
                    />
                    <TextField
                        name="confirmPassword"
                        id="confirmPassword"
                        label="Confirm Password"
                        sx={{ width: '100%' }}
                        error={!isConfirmPasswordValide}
                        helperText={!isConfirmPasswordValide ? 'Confirm password must equal password' : ''}
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
                        name="fullName"
                        id="fullName"
                        label="Full Name"
                        sx={{ width: '100%' }}
                        error={!isFullNameValid}
                        helperText={!isFullNameValid ? 'FullName must have more than 5 characters' : ''}
                    />
                </Box>

                <TextField
                    id="description"
                    name="description"
                    label="Description"
                    multiline
                    rows={5}
                    sx={{ width: '100%' }}
                    error={!isDescriptionValid}
                    helperText={!isDescriptionValid ? 'Description must be 6-100 characters.' : ''}
                />
                <TextField
                    id="shortDescription"
                    name="shortDescription"
                    label="Short Description"
                    multiline
                    rows={3}
                    sx={{ width: '100%' }}
                    error={!isShortDescriptionValid}
                    helperText={!isShortDescriptionValid ? 'Short description must be 6-50 characters.' : ''}
                />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'center',
                        gap: 2,
                        width: '100%',
                    }}
                >
                    <TextField name="linkedinUrl" id="outlined-required" label="LinkedIn Url" sx={{ width: '100%' }} />
                    <TextField name="facebookUrl" id="outlined-required" label="Facebook Url" sx={{ width: '100%' }} />
                    <TextField
                        name="googleMeetUrl"
                        id="outlined-required"
                        label="Google Meet Url"
                        sx={{ width: '100%' }}
                    />
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'left',
                        gap: 3,
                    }}
                >
                    <Autocomplete
                        disablePortal
                        id="skill"
                        name="skill"
                        options={skills}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, newValue) => {
                            if (newValue) {
                                setCurrentSkill(newValue.name);
                            } else {
                                setCurrentSkill('');
                            }
                        }}
                        sx={{ width: '80%' }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Skill"
                                error={!isSkillValid}
                                helperText={!isSkillValid ? 'Please choose skill' : ''}
                            />
                        )}
                    />
                    <Button variant="contained" onClick={handleAddSkill}>
                        Add Skill
                    </Button>
                </Box>
                {selectedSkills.length > 0 && (
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {selectedSkills.map((skill, index) => (
                            <Chip key={index} label={skill} onDelete={handleDeleteSkill(skill)} />
                        ))}
                    </Box>
                )}
                <TextField
                    id="requirement"
                    name="requirement"
                    label="Require"
                    multiline
                    rows={3}
                    sx={{ width: '100%' }}
                    error={!isRequireValid}
                    helperText={!isRequireValid ? 'Require must be 6-50 characters.' : ''}
                />
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'right',
                        gap: 3,
                    }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: '#365E32',
                            '&:hover': {
                                backgroundColor: '#508D4E',
                            },
                        }}
                    >
                        Create
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default CreateMentorProfile;
