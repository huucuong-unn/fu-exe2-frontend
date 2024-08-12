import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Typography,
    Modal,
    TextField,
    Grid,
    Card,
    CardContent,
    Avatar,
    Container,
    IconButton,
    useTheme,
    Autocomplete,
    Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import StorageService from '~/components/StorageService/storageService'; // Import the API function
import createMentorProfile from '~/API/Campain/createMentorProfile';
import SkillAPI from '~/API/SkillAPI';
import MentorProfileAPI from '~/API/Campain/MentorProfileAPI';
import { format } from 'date-fns';

const ProfileBox = () => {
    const theme = useTheme();
    const [openModal, setOpenModal] = useState(false);
    const [profiles, setProfiles] = useState([]);
    const [newProfileInfo, setNewProfileInfo] = useState({
        id: '',
        createdDate: '',
        modifiedDate: '',
        createdBy: '',
        modifiedBy: '',
        linkedinUrl: '',
        facebookUrl: '',
        googleMeetUrl: '',
        requirement: '',
        description: '',
        shortDescription: '',
        profilePicture: '',
        status: '',
        fullName: '',
        skills: [],
        skillLevel: '',
    });
    const IMGAGE_HOST = process.env.REACT_APP_IMG_HOST;
    const avatarUrl = StorageService.getItem('userInfo').avatarUrl;

    const [editIndex, setEditIndex] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedProfileIndex, setSelectedProfileIndex] = useState(null);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
    const [isIntroduceValid, setIsIntroduceValid] = useState(true);
    const [isReasonApplyValid, setIsReasonApplyValid] = useState(true);
    const [mentorSkills, setMentorSkills] = useState([]);

    const [selectedProfileId, setSelectedProfileId] = useState(null);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [currentSkill, setCurrentSkill] = useState('');
    const [usingProfileId, setUsingProfileId] = useState('');
    const [currentOpendProfileId, setOpenCurrentProfileId] = useState('');

    const [skills, setSkills] = useState([]);
    const profilesPerPage = 6;
    const totalPages = Math.ceil(profiles.length / profilesPerPage);

    // Fetch profiles from the API
    const fetchProfiles = async () => {
        try {
            const userInfo = StorageService.getItem('userInfo');
            if (userInfo && userInfo.mentorId) {
                const profileResponse = await MentorProfileAPI.getAllMentorProfiles(userInfo.mentorId);

                if (profileResponse && profileResponse.length > 0) {
                    setProfiles(profileResponse);

                    const usingProfile = profileResponse.find(
                        (profile) =>
                            profile.mentorProfile.status === 'using' || profile.mentorProfile.status === 'USING',
                    );
                    if (usingProfile) {
                        setUsingProfileId(usingProfile.mentorProfile.id);
                        console.log(usingProfile);
                        console.log('Using profiles found');
                    }
                } else {
                    console.error('No profiles found');
                }
            } else {
                console.error('Mentor ID not found in local storage');
            }
        } catch (error) {
            console.error('Error fetching profiles:', error);
        }
    };

    const fetchSkills = async () => {
        try {
            const skillData = await SkillAPI.getAll();
            setSkills(skillData);
            console.log(skillData);
        } catch (error) {
            console.error('Error fetching skills:', error);
        }
    };

    useEffect(() => {
        // Fetch skills list from API

        fetchSkills();
        fetchProfiles();
    }, []);

    const handleProfileClick = async (newProfileId) => {
        if (usingProfileId) {
            const endpoint = `https://tortee-463vt.ondigitalocean.app/api/v1/campaign-mentor-profile/swap-mentor-profile/${usingProfileId}?newMentorProfile=${newProfileId}`;

            try {
                const response = await fetch(endpoint, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error swapping profiles: ${response.statusText}`);
                }

                const result = await response.json();
                console.log('Profile swapped successfully:', result);
                setSelectedProfileId(newProfileId);
                setUsingProfileId(newProfileId);
                fetchProfiles();
            } catch (error) {
                console.error('Error swapping profiles:', error);
                fetchProfiles();
            }
        } else {
            console.error('No "USING" profile found to swap');
        }
    };

    const handleOpenModal = (index = null) => {
        if (index !== null) {
            const profileToEdit = profiles[index];
            if (profileToEdit.mentorProfile.id) {
                setOpenCurrentProfileId(profileToEdit.mentorProfile.id);
            }
            console.log(currentOpendProfileId);
            setNewProfileInfo({
                id: profileToEdit.mentorProfile.id,
                createdDate: profileToEdit.mentorProfile.createdDate,
                modifiedDate: profileToEdit.mentorProfile.modifiedDate,
                createdBy: profileToEdit.mentorProfile.createdBy,
                modifiedBy: profileToEdit.mentorProfile.modifiedBy,
                linkedinUrl: profileToEdit.mentorProfile.linkedinUrl,
                facebookUrl: profileToEdit.mentorProfile.facebookUrl,
                googleMeetUrl: profileToEdit.mentorProfile.googleMeetUrl,
                requirement: profileToEdit.mentorProfile.requirement,
                description: profileToEdit.mentorProfile.description,
                shortDescription: profileToEdit.mentorProfile.shortDescription,
                profilePicture: profileToEdit.mentorProfile.profilePicture,
                status: profileToEdit.mentorProfile.status,
                fullName: profileToEdit.mentorProfile.fullName,
                skills: profileToEdit.skills,
                skillLevel: profileToEdit.mentorProfile.skillLevel,
            });
            console.log(newProfileInfo);
            console.log(skills);

            setEditIndex(index);

            console.log(profileToEdit);
        } else {
            setNewProfileInfo({
                id: '',
                createdDate: '',
                modifiedDate: '',
                createdBy: '',
                modifiedBy: '',
                linkedinUrl: '',
                facebookUrl: '',
                googleMeetUrl: '',
                requirement: '',
                description: '',
                shortDescription: '',
                profilePicture: '',
                status: '',
                fullName: '',
                skills: [],
                skillLevel: '',
            });
            setEditIndex(null);
            setSelectedSkills([]);
        }
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    // const handleCreateProfile = async () => {
    //     try {
    //         if (editIndex !== null) {
    //             const updatedProfiles = profiles.map((profile, index) =>
    //                 index === editIndex ? newProfileInfo : profile,
    //             );
    //             setProfiles(updatedProfiles);
    //         } else {
    //             const newProfile = { ...newProfileInfo, status: 'Active' }; // Ensure new profiles start as 'Active'
    //             const createdProfile = await createMentorProfile(newProfile); // API call to create new profile
    //             setProfiles([...profiles, createdProfile]);
    //         }
    //         setOpenModal(false);
    //         setNewProfileInfo({
    //             id: '',
    //             createdDate: '',
    //             modifiedDate: '',
    //             createdBy: '',
    //             modifiedBy: '',
    //             linkedinUrl: '',
    //             facebookUrl: '',
    //             googleMeetUrl: '',
    //             requirement: '',
    //             description: '',
    //             shortDescription: '',
    //             profilePicture: '',
    //             status: '',
    //             fullName: '',
    //             skills: [],
    //             skillLevel: '',
    //         });
    //     } catch (error) {
    //         console.error('Error creating/updating profile:', error);
    //     }
    // };
    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const mentorId = StorageService.getItem('userInfo').mentorId;
        const profilePicture = 'example.jpg';
        const status = 'ACTIVE';

        let createMentorProfileRequest = {
            mentorId,
            profilePicture,
            linkedinUrl: data.get('linkedinUrl'),
            requirement: data.get('requirement'),
            description: data.get('description'),
            shortDescription: data.get('shortDescription'),
            facebookUrl: data.get('facebookUrl'),
            googleMeetUrl: data.get('googleMeetUrl'),
            status,
        };

        if (currentOpendProfileId !== null) {
            createMentorProfileRequest = {
                ...createMentorProfileRequest,
                mentorProfileId: currentOpendProfileId,
            };
        }

        const profileData = {
            createMentorProfileRequest,
            skills: selectedSkills,
        };

        const url =
            editIndex !== null
                ? `https://tortee-463vt.ondigitalocean.app/api/v1/mentor-profile/update`
                : `https://tortee-463vt.ondigitalocean.app/api/v1/mentor-profile/create-new-mentor-profile-skills`;

        const method = editIndex !== null ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Form data submitted successfully:', result);
                handleCloseModal(); // Close the modal on successful submission
            } else {
                console.error('Error submitting form data:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form data:', error);
        } finally {
            fetchProfiles();
            setOpenModal(false);
        }
    };

    const handleAddSkill = () => {
        if (currentSkill && !selectedSkills.includes(currentSkill)) {
            console.log(currentSkill);
            setSelectedSkills([...selectedSkills, currentSkill]);
            setCurrentSkill('');
        }
    };

    const handleDeleteSkill = (skillToDelete) => () => {
        setSelectedSkills(selectedSkills.filter((skill) => skill !== skillToDelete));
    };

    // const handleProfileClick = async (oldProfileId, newProfileId) => {
    //     setSelectedProfileId(newProfileId);
    //     try {
    //         const response = await fetch(`https://tortee-463vt.ondigitalocean.app/api/v1/campaign-mentor-profile/swap-mentor-profile/${oldProfileId}?campaignId=${campaignId}&newMentorProfile=${newProfileId}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //
    //         if (response.ok) {
    //             const result = await response.json();
    //             console.log('Profile swapped successfully:', result);
    //             // Handle success (e.g., update the UI, show a success message)
    //         } else {
    //             console.error('Error swapping profile:', response.statusText);
    //         }
    //     } catch (error) {
    //         console.error('Error swapping profile:', error);
    //     }
    // };

    return (
        <Container
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    width: { sm: '100%', md: '60%' },
                    textAlign: { sm: 'left', md: 'center' },
                }}
            >
                <Typography component="h2" variant="h4" color="text.primary">
                    Your Profiles
                </Typography>
            </Box>
            <Grid container spacing={2}>
                {profiles
                    .slice(currentPage * profilesPerPage, (currentPage + 1) * profilesPerPage)
                    .map((profile, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card
                                sx={{
                                    border: profile.mentorProfile.status === 'USING' ? '2px solid green' : 'none',
                                    cursor: profile.mentorProfile.status === 'USING' ? 'not-allowed' : 'pointer',
                                    pointerEvents: profile.mentorProfile.status === 'USING' ? 'none' : 'auto',
                                }}
                                onDoubleClick={() => handleProfileClick(profile.mentorProfile.id)}
                            >
                                <CardContent>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <Avatar src={IMGAGE_HOST + avatarUrl} />
                                        <Box ml={2}>
                                            <Typography variant="h6">{profile.mentorProfile.fullName}</Typography>
                                        </Box>
                                        {profile.mentorProfile.status === 'ACTIVE' && (
                                            <IconButton
                                                onClick={() => handleOpenModal(index)}
                                                sx={{ marginLeft: 'auto' }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        )}
                                    </Box>

                                    <Typography variant="body1" gutterBottom>
                                        {`Description: ${profile.mentorProfile.shortDescription}` || 'No Description'}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        {`Created Date: ${
                                            profile.mentorProfile.createdDate
                                                ? format(new Date(profile.mentorProfile.createdDate), 'PPpp')
                                                : 'None'
                                        }`}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {`Status: ${profile.mentorProfile.status}` || 'None'}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
            <Box mt={2} display="flex" justifyContent="center">
                <Button onClick={handlePrevPage} disabled={currentPage === 0}>
                    Previous
                </Button>
                <Button onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>
                    Next
                </Button>
            </Box>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => handleOpenModal()}
                sx={{ mt: 3 }}
            >
                Add Profile
            </Button>
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '80%', sm: '60%', md: '40%' },
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h6" mb={2}>
                        {editIndex !== null ? 'Edit Profile' : 'Add Profile'}
                    </Typography>

                    <TextField
                        margin="normal"
                        fullWidth
                        multiline
                        minRows={4}
                        maxRows={6}
                        id="description"
                        label="Description"
                        name="description"
                        value={newProfileInfo.description}
                        onChange={(e) => setNewProfileInfo({ ...newProfileInfo, description: e.target.value })}
                    />

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
                            id="shortDescription"
                            label="Short Description"
                            name="shortDescription"
                            value={newProfileInfo.shortDescription}
                            onChange={(e) => setNewProfileInfo({ ...newProfileInfo, shortDescription: e.target.value })}
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
                            fullWidth
                            id="linkedinUrl"
                            label="LinkedIn URL"
                            name="linkedinUrl"
                            value={newProfileInfo.linkedinUrl}
                            onChange={(e) => setNewProfileInfo({ ...newProfileInfo, linkedinUrl: e.target.value })}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="facebookUrl"
                            label="Facebook URL"
                            name="facebookUrl"
                            value={newProfileInfo.facebookUrl}
                            onChange={(e) => setNewProfileInfo({ ...newProfileInfo, facebookUrl: e.target.value })}
                        />

                        <TextField
                            margin="normal"
                            fullWidth
                            id="googleMeetUrl"
                            label="Google Meet URL"
                            name="googleMeetUrl"
                            autoComplete="url"
                            value={newProfileInfo.googleMeetUrl}
                            onChange={(e) => setNewProfileInfo({ ...newProfileInfo, googleMeetUrl: e.target.value })}
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
                            id="combo-box-demo"
                            options={skills}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, newValue) => setCurrentSkill(newValue.name)}
                            sx={{ width: '80%' }}
                            renderInput={(params) => <TextField {...params} label="Skill" />}
                        />
                        <Button variant="contained" onClick={handleAddSkill}>
                            Add Skill
                        </Button>
                    </Box>

                    {newProfileInfo.skills.length > 0 ? (
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {newProfileInfo.skills.map((skill, index) => (
                                <Chip
                                    key={index}
                                    label={skill.skill.name}
                                    onDelete={handleDeleteSkill(skill.skill.name)}
                                />
                            ))}
                        </Box>
                    ) : (
                        selectedSkills.length > 0 && (
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {selectedSkills.map((skill, index) => (
                                    <Chip key={index} label={skill} onDelete={handleDeleteSkill(skill)} />
                                ))}
                            </Box>
                        )
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
                            fullWidth
                            id="requirement"
                            label="Requirement"
                            name="requirement"
                            value={newProfileInfo.requirement}
                            onChange={(e) => setNewProfileInfo({ ...newProfileInfo, requirement: e.target.value })}
                        />
                    </Box>

                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button onClick={handleCloseModal} sx={{ mr: 2 }}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" type="submit">
                            {editIndex !== null ? 'Save Changes' : 'Create Profile'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
};

export default ProfileBox;
