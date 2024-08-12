import {
    Container,
    Grid,
    Typography,
    Card,
    Box,
    Avatar,
    CardContent,
    Step,
    Stepper,
    StepLabel,
    Stack,
    Button,
    Chip,
    Modal,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CampaignAPI from '~/API/CampaignAPI';
import { green } from '@mui/material/colors';
import MentorAPI from '~/API/MentorAPI';
import CampaignMentorProfileAPI from '~/API/CampaignMentorProfileAPI';
import storageService from '~/components/StorageService/storageService';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import {
    Apartment as ApartmentIcon,
    AccountCircle as AccountCircleIcon,
    School as SchoolIcon,
    DoDisturbOn as DoDisturbOnIcon,
    CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

function CompaniesCampaignDetail() {
    const steps = ['COMPANY_APPLY', 'STUDENT_APPLY', 'TRAINING', 'CLOSED'];
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const { campaignId } = useParams();
    const [campaign, setCampaign] = useState({});
    const [selectedMentee, setSelectedMentee] = useState(null);
    const [isChooseModal, setIsChooseModal] = useState(false);
    const [mentorsChooseList, setMentorsChooseList] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [userInfo, setUserInfo] = useState(storageService.getItem('userInfo'));

    const handleRowClick = (mentor) => {
        setSelectedMentee(mentor);
    };

    const IMGAGE_HOST = process.env.REACT_APP_IMG_HOST;

    const handleCloseModal = () => {
        setSelectedMentee(null);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleOpenChooseModal = () => {
        setIsChooseModal(true);
    };

    const handleCloseChooseModal = () => {
        setIsChooseModal(false);
    };

    const handleItemClick = (index, mentorId) => {
        setSelectedItemIndex(index);
        navigate(`/mentor/${mentorId}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCreateMentor = () => {
        navigate('/company/create-mentor-profile');
        navigate('/company/create-mentor-profile');
        window.scrollTo(0, 0);
    };

    const handleChooseMentor = async (mentorProfileId) => {
        const params = {
            campaignId: campaignId,
            mentorProfileId: mentorProfileId,
        };

        await CampaignMentorProfileAPI.chooseMentor(params);
        handleCloseChooseModal();
        await fetchMentorList();
        await fetchMentorListChoose();
    };

    useEffect(() => {
        const getById = async () => {
            try {
                const campaignData = await CampaignAPI.getById(campaignId);
                setCampaign(campaignData);
            } catch (error) {
                console.log(error);
            }
        };
        getById();
    }, [campaignId]);

    const fetchMentorListChoose = async () => {
        try {
            const mentorListChooseData = await MentorAPI.getMentorsSearch(userInfo.companyId);
            console.log(mentorListChooseData);
            setMentorsChooseList(mentorListChooseData);
            console.log(mentorListChooseData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchMentorList = async () => {
        try {
            const params = {
                companyId: userInfo.companyId,
                campaignId: campaignId,
                page: 1,
                limit: 100,
            };
            console.log(params);
            const mentorListChooseData = await MentorAPI.getMentorsForAdminSearch(params);
            console.log(mentorListChooseData);
            setMentors(mentorListChooseData.listResult);
            console.log(mentors);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchMentorListChoose();
        fetchMentorList();
    }, [campaignId]);

    useEffect(() => {
        console.log(campaign);
    }, [campaign]);

    const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
            top: 22,
        },
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
            },
        },
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
            },
        },
        [`& .${stepConnectorClasses.line}`]: {
            height: 3,
            border: 0,
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
            borderRadius: 1,
        },
    }));

    const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        ...(ownerState.active && {
            backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        }),
        ...(ownerState.completed && {
            backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        }),
    }));

    function ColorlibStepIcon(props) {
        const { active, completed, className } = props;

        const icons = {
            1: <ApartmentIcon />,
            2: <AccountCircleIcon />,
            3: <SchoolIcon />,
            4: <DoDisturbOnIcon />,
        };

        return (
            <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
                {icons[String(props.icon)]}
            </ColorlibStepIconRoot>
        );
    }

    ColorlibStepIcon.propTypes = {
        active: PropTypes.bool,
        className: PropTypes.string,
        completed: PropTypes.bool,
        icon: PropTypes.node,
    };

    return (
        <Container id="mentors" sx={{ py: { xs: 8, sm: 16 }, padding: { lg: 16 } }}>
            <Grid container spacing={6}>
                <Grid item xs={12} md={12}>
                    <Card
                        variant="outlined"
                        sx={{
                            p: 3,
                            height: 'fit-content',
                            width: '100%',
                            background: 'none',
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                textAlign: 'left',
                                flexDirection: { xs: 'column', md: 'row' },
                                alignItems: { md: 'center' },
                                gap: 2.5,
                            }}
                        >
                            <Box>
                                <Avatar
                                    alt="avatar image"
                                    src={IMGAGE_HOST + campaign?.img}
                                    sx={{ width: 150, height: 150 }}
                                />
                            </Box>
                            <Box sx={{ textTransform: 'none' }}>
                                <Typography color="text.primary" variant="body1" fontWeight="bold" fontSize={'24px'}>
                                    {campaign.name}
                                </Typography>
                                <Typography color="text.secondary" variant="body2" sx={{ my: 1 }} fontSize={'16px'}>
                                    {new Date(campaign?.startDate).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}{' '}
                                    -{' '}
                                    {new Date(campaign?.endDate).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}{' '}
                                </Typography>
                                <CardContent></CardContent>
                            </Box>
                        </Box>
                        <Box sx={{ width: '100%', marginTop: 2 }}>
                            <Stepper
                                alternativeLabel
                                activeStep={steps.indexOf(campaign?.status)}
                                connector={<ColorlibConnector />}
                            >
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
            <Box sx={{ width: '100%', marginTop: 2 }}>
                <Card
                    variant="outlined"
                    sx={{
                        p: 3,
                        height: 'fit-content',
                        width: '100%',
                        background: 'none',
                        paddingLeft: 0,
                        paddingRight: 0,
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            textAlign: 'left',
                            flexDirection: 'column',
                            alignItems: { md: 'left' },
                            gap: 2.5,
                        }}
                    >
                        <Box
                            sx={{
                                marginLeft: 2,
                                marginRight: 2,
                                paddingBottom: 2,
                                borderBottom: '1px dashed #e0e0e0',
                            }}
                        >
                            <Typography color="text.primary" variant="body1" fontWeight="bold" fontSize={'24px'}>
                                General information
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)', // Tạo 3 cột với kích thước bằng nhau
                                gap: 2, // Khoảng cách giữa các ô
                                marginLeft: 2,
                                marginRight: 2,
                                paddingBottom: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    textAlign: 'left',
                                    flexDirection: 'column',
                                    alignItems: { md: 'start' },
                                    justifyContent: 'left',
                                }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', gap: 1 }}>
                                    <Typography color="gray" variant="h7">
                                        Company apply date
                                    </Typography>
                                </Box>
                                <Typography color="black" variant="h6" fontWeight="bold">
                                    {new Date(campaign?.companyApplyStartDate).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}
                                    -{' '}
                                    {new Date(campaign?.companyApplyEndDate).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    textAlign: 'left',
                                    flexDirection: 'column',
                                    alignItems: { md: 'start' },
                                    justifyContent: 'left',
                                }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', gap: 1 }}>
                                    <Typography color="gray" variant="h7">
                                        Student apply date
                                    </Typography>
                                </Box>
                                <Typography color="black" variant="h6" fontWeight="bold">
                                    {new Date(campaign?.menteeApplyStartDate).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}
                                    -{' '}
                                    {new Date(campaign?.menteeApplyEndDate).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    textAlign: 'left',
                                    flexDirection: 'column',
                                    alignItems: { md: 'start' },
                                    justifyContent: 'left',
                                }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', gap: 1 }}>
                                    <Typography color="gray" variant="h7">
                                        Tranning
                                    </Typography>
                                </Box>
                                <Typography color="black" variant="h6" fontWeight="bold">
                                    {new Date(campaign?.trainingStartDate).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}
                                    -{' '}
                                    {new Date(campaign?.trainingEndDate).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Card>
            </Box>
            <Box sx={{ width: '100%', marginTop: 2 }}>
                <Card
                    variant="outlined"
                    sx={{
                        p: 3,
                        height: 'fit-content',
                        width: '100%',
                        background: 'none',
                        paddingLeft: 0,
                        paddingRight: 0,
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            textAlign: 'left',
                            flexDirection: 'column',
                            alignItems: { md: 'left' },
                            gap: 2.5,
                        }}
                    >
                        <Box
                            sx={{
                                marginLeft: 2,
                                marginRight: 2,
                                paddingBottom: 2,
                                borderBottom: '1px dashed #e0e0e0',
                            }}
                        >
                            <Typography color="text.primary" variant="body1" fontWeight="bold" fontSize={'24px'}>
                                Campaign Overview
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                marginLeft: 2,
                                marginRight: 2,
                                paddingBottom: 2,
                                borderBottom: '1px dashed #e0e0e0',
                            }}
                        >
                            <Typography color="text.primary">{campaign?.description}</Typography>
                        </Box>
                    </Box>
                </Card>
            </Box>
            <Box sx={{ width: '100%', marginTop: 2 }}>
                <Card
                    variant="outlined"
                    sx={{
                        p: 3,
                        height: 'fit-content',
                        width: '100%',
                        background: 'none',
                        paddingLeft: 0,
                        paddingRight: 0,
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            textAlign: 'left',
                            flexDirection: 'column',
                            alignItems: { md: 'left' },
                            gap: 2.5,
                        }}
                    >
                        <Box
                            sx={{
                                marginLeft: 2,
                                marginRight: 2,
                                paddingBottom: 2,
                                borderBottom: '1px dashed #e0e0e0',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography color="text.primary" variant="body1" fontWeight="bold" fontSize={'24px'}>
                                Our Mentors
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                                <Button variant="contained" color="primary" onClick={handleOpenChooseModal}>
                                    Choose Mentor
                                </Button>
                                <Button variant="contained" color="primary" onClick={handleCreateMentor}>
                                    Create Mentor
                                </Button>
                            </Box>
                        </Box>
                        <Grid container spacing={6}>
                            {mentors.map((mentor, index) => (
                                <Grid item xs={12} md={12} key={index}>
                                    <Stack
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start"
                                        spacing={2}
                                        useFlexGap
                                        sx={{
                                            width: '100%',
                                            display: { xs: 'block', sm: 'flex' },
                                            paddingLeft: 2,
                                            paddingRight: 2,
                                        }}
                                    >
                                        <Card
                                            variant="outlined"
                                            component={Button}
                                            sx={{
                                                p: 3,
                                                height: 'fit-content',
                                                background: 'none',
                                                width: '100%',
                                                position: 'relative',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    textAlign: 'left',
                                                    flexDirection: { xs: 'column', md: 'row' },
                                                    alignItems: { md: 'center' },
                                                    gap: 2.5,
                                                }}
                                            >
                                                <Box>
                                                    <Avatar
                                                        alt="avatar image"
                                                        src={
                                                            IMGAGE_HOST +
                                                            mentor.mentorProfile.mentorDTO.account.avatarUrl
                                                        }
                                                        sx={{ width: 150, height: 150 }}
                                                    />
                                                </Box>
                                                <Box sx={{ textTransform: 'none', width: '100%' }}>
                                                    <Box
                                                        sx={{
                                                            color: (theme) =>
                                                                theme.palette.mode === 'light'
                                                                    ? 'primary.main'
                                                                    : 'primary.main',
                                                            display: 'flex',
                                                            justifyContent: {
                                                                xs: 'center',
                                                                md: 'flex-start',
                                                                lg: 'flex-start',
                                                            },
                                                            alignItems: 'center',
                                                            gap: 5,
                                                        }}
                                                    >
                                                        <Typography
                                                            color="text.primary"
                                                            variant="body1"
                                                            fontWeight="bold"
                                                            fontSize={'24px'}
                                                        >
                                                            {mentor.mentorProfile.mentorDTO.fullName}
                                                        </Typography>
                                                        <Chip
                                                            avatar={
                                                                <Avatar sx={{ bgcolor: 'transparent' }}>
                                                                    <StarIcon sx={{ color: '#4CAF50' }} />
                                                                </Avatar>
                                                            }
                                                            label="Top Mentor"
                                                            sx={{
                                                                backgroundColor: '#E0F2F1',
                                                                color: '#004D40',
                                                                fontWeight: 'bold',
                                                                padding: '8px',
                                                                borderRadius: '16px',
                                                                fontSize: '14px',
                                                            }}
                                                            size="medium"
                                                        />
                                                    </Box>
                                                    <Typography
                                                        color="text.secondary"
                                                        variant="body2"
                                                        sx={{ my: 1 }}
                                                        fontSize={'16px'}
                                                    >
                                                        {mentor.mentorProfile.shortDescription}
                                                    </Typography>
                                                    <Typography
                                                        color="text.secondary"
                                                        variant="body2"
                                                        sx={{ my: 2 }}
                                                        fontSize={'14px'}
                                                    >
                                                        {mentor.mentorProfile.description}
                                                    </Typography>
                                                    <CardContent>
                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                            {mentor.skills.map((skill, index) => (
                                                                <Chip key={index} label={skill.skill.name} />
                                                            ))}
                                                        </Box>
                                                    </CardContent>
                                                    <br />
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'left',
                                                            alignItems: 'center',
                                                            width: '100%',
                                                            gap: 2,
                                                        }}
                                                    ></Box>
                                                </Box>
                                            </Box>
                                        </Card>
                                    </Stack>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Card>
            </Box>
            <Modal open={Boolean(selectedMentee)} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 'fix-content',
                        bgcolor: '#f5f5f5',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        textAlign: 'center',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                        }}
                    >
                        <Typography variant="h4">Choose profile</Typography>
                        <Grid container spacing={6} sx={{ minWidth: '900px', overflowY: 'auto', maxHeight: '700px' }}>
                            <Grid item xs={12} md={12}>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="flex-start"
                                    spacing={2}
                                    useFlexGap
                                    sx={{
                                        width: '100%',
                                        display: { xs: 8, sm: 'flex' },
                                        paddingLeft: 2,
                                        paddingRight: 2,
                                    }}
                                >
                                    <Card
                                        variant="outlined"
                                        component={Button}
                                        sx={{
                                            p: 3,
                                            height: 'fit-content',
                                            background: 'none',
                                            width: '100%',
                                            position: 'relative',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: '100%',
                                                display: 'flex',
                                                textAlign: 'left',
                                                flexDirection: { xs: 'column', md: 'row' },
                                                alignItems: { md: 'center' },
                                                gap: 2.5,
                                            }}
                                        >
                                            <Box>
                                                <Avatar alt="avatar image" src="" sx={{ width: 150, height: 150 }} />
                                            </Box>
                                            <Box sx={{ textTransform: 'none', width: '100%' }}>
                                                <Box
                                                    sx={{
                                                        color: (theme) => {
                                                            return theme.palette.mode === 'light'
                                                                ? 'primary.main'
                                                                : 'primary.main';
                                                        },
                                                        display: 'flex',
                                                        justifyContent: {
                                                            xs: 'center',
                                                            md: 'flex-start',
                                                            lg: 'flex-start',
                                                        },
                                                        alignItems: 'center',
                                                        gap: 5,
                                                    }}
                                                >
                                                    <Typography
                                                        color="text.primary"
                                                        variant="body1"
                                                        fontWeight="bold"
                                                        fontSize={'24px'}
                                                    >
                                                        Ahihi
                                                    </Typography>
                                                    <Chip
                                                        avatar={
                                                            <Avatar sx={{ bgcolor: 'transparent' }}>
                                                                <StarIcon sx={{ color: '#4CAF50' }} />
                                                            </Avatar>
                                                        }
                                                        label="Top Mentor"
                                                        sx={{
                                                            backgroundColor: '#E0F2F1', // Màu nền xanh nhạt
                                                            color: '#004D40', // Màu chữ xanh đậm
                                                            fontWeight: 'bold',
                                                            padding: '8px',
                                                            borderRadius: '16px',
                                                            fontSize: '14px',
                                                        }}
                                                        size="medium"
                                                    />
                                                </Box>
                                                <Typography
                                                    color="text.secondary"
                                                    variant="body2"
                                                    sx={{ my: 1 }}
                                                    fontSize={'16px'}
                                                >
                                                    Short Descrition
                                                </Typography>

                                                <Typography
                                                    color="text.secondary"
                                                    variant="body2"
                                                    sx={{ my: 2 }}
                                                    fontSize={'14px'}
                                                >
                                                    Description
                                                </Typography>

                                                <CardContent>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'left',
                                                            alignItems: 'center',
                                                            gap: 2,
                                                        }}
                                                    >
                                                        <Chip label="Java" />
                                                    </Box>
                                                </CardContent>
                                                <br />
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'left',
                                                        alignItems: 'center',
                                                        width: '100%',
                                                        gap: 2,
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            // flex: 1,
                                                            display: 'flex',
                                                            alignItems: 'baseline',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="h4"
                                                            sx={{
                                                                color: '#182F5D',
                                                                fontWeight: 'bold',
                                                                marginRight: '4px',
                                                            }}
                                                        >
                                                            150 point
                                                        </Typography>
                                                        <Typography
                                                            variant="body1"
                                                            sx={{
                                                                color: '#182F5D',
                                                                fontSize: '16px',
                                                            }}
                                                        >
                                                            / acceptance
                                                        </Typography>
                                                    </Box>
                                                    {/* <Button
                                                        variant="contained"
                                                        size="large"
                                                        sx={{
                                                            height: '100%',
                                                            backgroundColor: '#365E32',
                                                        }}
                                                    >
                                                        View Profile
                                                    </Button> */}
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Card>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="flex-start"
                                    spacing={2}
                                    useFlexGap
                                    sx={{
                                        width: '100%',
                                        display: { xs: 8, sm: 'flex' },
                                        paddingLeft: 2,
                                        paddingRight: 2,
                                    }}
                                >
                                    <Card
                                        variant="outlined"
                                        component={Button}
                                        sx={{
                                            p: 3,
                                            height: 'fit-content',
                                            background: 'none',
                                            width: '100%',
                                            position: 'relative',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: '100%',
                                                display: 'flex',
                                                textAlign: 'left',
                                                flexDirection: { xs: 'column', md: 'row' },
                                                alignItems: { md: 'center' },
                                                gap: 2.5,
                                            }}
                                        >
                                            <Box>
                                                <Avatar alt="avatar image" src="" sx={{ width: 150, height: 150 }} />
                                            </Box>
                                            <Box sx={{ textTransform: 'none', width: '100%' }}>
                                                <Box
                                                    sx={{
                                                        color: (theme) => {
                                                            return theme.palette.mode === 'light'
                                                                ? 'primary.main'
                                                                : 'primary.main';
                                                        },
                                                        display: 'flex',
                                                        justifyContent: {
                                                            xs: 'center',
                                                            md: 'flex-start',
                                                            lg: 'flex-start',
                                                        },
                                                        alignItems: 'center',
                                                        gap: 5,
                                                    }}
                                                >
                                                    <Typography
                                                        color="text.primary"
                                                        variant="body1"
                                                        fontWeight="bold"
                                                        fontSize={'24px'}
                                                    >
                                                        Ahihi
                                                    </Typography>
                                                    <Chip
                                                        avatar={
                                                            <Avatar sx={{ bgcolor: 'transparent' }}>
                                                                <StarIcon sx={{ color: '#4CAF50' }} />
                                                            </Avatar>
                                                        }
                                                        label="Top Mentor"
                                                        sx={{
                                                            backgroundColor: '#E0F2F1', // Màu nền xanh nhạt
                                                            color: '#004D40', // Màu chữ xanh đậm
                                                            fontWeight: 'bold',
                                                            padding: '8px',
                                                            borderRadius: '16px',
                                                            fontSize: '14px',
                                                        }}
                                                        size="medium"
                                                    />
                                                </Box>
                                                <Typography
                                                    color="text.secondary"
                                                    variant="body2"
                                                    sx={{ my: 1 }}
                                                    fontSize={'16px'}
                                                >
                                                    Short Descrition
                                                </Typography>

                                                <Typography
                                                    color="text.secondary"
                                                    variant="body2"
                                                    sx={{ my: 2 }}
                                                    fontSize={'14px'}
                                                >
                                                    Description
                                                </Typography>

                                                <CardContent>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'left',
                                                            alignItems: 'center',
                                                            gap: 2,
                                                        }}
                                                    >
                                                        <Chip label="Java" />
                                                    </Box>
                                                </CardContent>
                                                <br />
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'left',
                                                        alignItems: 'center',
                                                        width: '100%',
                                                        gap: 2,
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            // flex: 1,
                                                            display: 'flex',
                                                            alignItems: 'baseline',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="h4"
                                                            sx={{
                                                                color: '#182F5D',
                                                                fontWeight: 'bold',
                                                                marginRight: '4px',
                                                            }}
                                                        >
                                                            150 point
                                                        </Typography>
                                                        <Typography
                                                            variant="body1"
                                                            sx={{
                                                                color: '#182F5D',
                                                                fontSize: '16px',
                                                            }}
                                                        >
                                                            / acceptance
                                                        </Typography>
                                                    </Box>
                                                    {/* <Button
                                                        variant="contained"
                                                        size="large"
                                                        sx={{
                                                            height: '100%',
                                                            backgroundColor: '#365E32',
                                                        }}
                                                    >
                                                        View Profile
                                                    </Button> */}
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Card>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="flex-start"
                                    spacing={2}
                                    useFlexGap
                                    sx={{
                                        width: '100%',
                                        display: { xs: 8, sm: 'flex' },
                                        paddingLeft: 2,
                                        paddingRight: 2,
                                    }}
                                >
                                    <Card
                                        variant="outlined"
                                        component={Button}
                                        sx={{
                                            p: 3,
                                            height: 'fit-content',
                                            background: 'none',
                                            width: '100%',
                                            position: 'relative',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: '100%',
                                                display: 'flex',
                                                textAlign: 'left',
                                                flexDirection: { xs: 'column', md: 'row' },
                                                alignItems: { md: 'center' },
                                                gap: 2.5,
                                            }}
                                        >
                                            <Box>
                                                <Avatar alt="avatar image" src="" sx={{ width: 150, height: 150 }} />
                                            </Box>
                                            <Box sx={{ textTransform: 'none', width: '100%' }}>
                                                <Box
                                                    sx={{
                                                        color: (theme) => {
                                                            return theme.palette.mode === 'light'
                                                                ? 'primary.main'
                                                                : 'primary.main';
                                                        },
                                                        display: 'flex',
                                                        justifyContent: {
                                                            xs: 'center',
                                                            md: 'flex-start',
                                                            lg: 'flex-start',
                                                        },
                                                        alignItems: 'center',
                                                        gap: 5,
                                                    }}
                                                >
                                                    <Typography
                                                        color="text.primary"
                                                        variant="body1"
                                                        fontWeight="bold"
                                                        fontSize={'24px'}
                                                    >
                                                        Ahihi
                                                    </Typography>
                                                    <Chip
                                                        avatar={
                                                            <Avatar sx={{ bgcolor: 'transparent' }}>
                                                                <StarIcon sx={{ color: '#4CAF50' }} />
                                                            </Avatar>
                                                        }
                                                        label="Top Mentor"
                                                        sx={{
                                                            backgroundColor: '#E0F2F1', // Màu nền xanh nhạt
                                                            color: '#004D40', // Màu chữ xanh đậm
                                                            fontWeight: 'bold',
                                                            padding: '8px',
                                                            borderRadius: '16px',
                                                            fontSize: '14px',
                                                        }}
                                                        size="medium"
                                                    />
                                                </Box>
                                                <Typography
                                                    color="text.secondary"
                                                    variant="body2"
                                                    sx={{ my: 1 }}
                                                    fontSize={'16px'}
                                                >
                                                    Short Descrition
                                                </Typography>

                                                <Typography
                                                    color="text.secondary"
                                                    variant="body2"
                                                    sx={{ my: 2 }}
                                                    fontSize={'14px'}
                                                >
                                                    Description
                                                </Typography>

                                                <CardContent>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'left',
                                                            alignItems: 'center',
                                                            gap: 2,
                                                        }}
                                                    >
                                                        <Chip label="Java" />
                                                    </Box>
                                                </CardContent>
                                                <br />
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'left',
                                                        alignItems: 'center',
                                                        width: '100%',
                                                        gap: 2,
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            // flex: 1,
                                                            display: 'flex',
                                                            alignItems: 'baseline',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="h4"
                                                            sx={{
                                                                color: '#182F5D',
                                                                fontWeight: 'bold',
                                                                marginRight: '4px',
                                                            }}
                                                        >
                                                            150 point
                                                        </Typography>
                                                        <Typography
                                                            variant="body1"
                                                            sx={{
                                                                color: '#182F5D',
                                                                fontSize: '16px',
                                                            }}
                                                        >
                                                            / acceptance
                                                        </Typography>
                                                    </Box>
                                                    {/* <Button
                                                        variant="contained"
                                                        size="large"
                                                        sx={{
                                                            height: '100%',
                                                            backgroundColor: '#365E32',
                                                        }}
                                                    >
                                                        View Profile
                                                    </Button> */}
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Card>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Modal>
            <Modal open={isChooseModal} onClose={handleCloseChooseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 'fix-content',
                        bgcolor: '#f5f5f5',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        textAlign: 'center',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                        }}
                    >
                        <Typography variant="h4">Choose Mentor</Typography>
                        <Grid container spacing={6} sx={{ minWidth: '900px', overflowY: 'auto', maxHeight: '700px' }}>
                            {mentorsChooseList.map((mentor) => (
                                <Grid item xs={12} md={12}>
                                    <Stack
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start"
                                        spacing={2}
                                        useFlexGap
                                        sx={{
                                            width: '100%',
                                            display: { xs: 8, sm: 'flex' },
                                            paddingLeft: 2,
                                            paddingRight: 2,
                                        }}
                                    >
                                        {/* handle choose mentor */}
                                        <Card
                                            variant="outlined"
                                            component={Button}
                                            sx={{
                                                p: 3,
                                                height: 'fit-content',
                                                background: 'none',
                                                width: '100%',
                                                position: 'relative',
                                            }}
                                            onClick={() => handleChooseMentor(mentor.mentorProfile.id)}
                                        >
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    textAlign: 'left',
                                                    flexDirection: { xs: 'column', md: 'row' },
                                                    alignItems: { md: 'center' },
                                                    gap: 2.5,
                                                }}
                                            >
                                                <Box>
                                                    <Avatar
                                                        alt="avatar image"
                                                        src={
                                                            IMGAGE_HOST +
                                                            mentor.mentorProfile.mentorDTO.account.avatarUrl
                                                        }
                                                        sx={{ width: 150, height: 150 }}
                                                    />
                                                </Box>
                                                <Box sx={{ textTransform: 'none', width: '100%' }}>
                                                    <Box
                                                        sx={{
                                                            color: (theme) => {
                                                                return theme.palette.mode === 'light'
                                                                    ? 'primary.main'
                                                                    : 'primary.main';
                                                            },
                                                            display: 'flex',
                                                            justifyContent: {
                                                                xs: 'center',
                                                                md: 'flex-start',
                                                                lg: 'flex-start',
                                                            },
                                                            alignItems: 'center',
                                                            gap: 5,
                                                        }}
                                                    >
                                                        <Typography
                                                            color="text.primary"
                                                            variant="body1"
                                                            fontWeight="bold"
                                                            fontSize={'24px'}
                                                        >
                                                            {mentor.mentorProfile.mentorDTO.fullName}
                                                        </Typography>
                                                        <Chip
                                                            avatar={
                                                                <Avatar sx={{ bgcolor: 'transparent' }}>
                                                                    <StarIcon sx={{ color: '#4CAF50' }} />
                                                                </Avatar>
                                                            }
                                                            label="Top Mentor"
                                                            sx={{
                                                                backgroundColor: '#E0F2F1', // Màu nền xanh nhạt
                                                                color: '#004D40', // Màu chữ xanh đậm
                                                                fontWeight: 'bold',
                                                                padding: '8px',
                                                                borderRadius: '16px',
                                                                fontSize: '14px',
                                                            }}
                                                            size="medium"
                                                        />
                                                    </Box>
                                                    <Typography
                                                        color="text.secondary"
                                                        variant="body2"
                                                        sx={{ my: 1 }}
                                                        fontSize={'16px'}
                                                    >
                                                        {mentor.mentorProfile.shortDescription}
                                                    </Typography>

                                                    <Typography
                                                        color="text.secondary"
                                                        variant="body2"
                                                        sx={{ my: 2 }}
                                                        fontSize={'14px'}
                                                    >
                                                        {mentor.mentorProfile.description}
                                                    </Typography>

                                                    <CardContent>
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                justifyContent: 'left',
                                                                alignItems: 'center',
                                                                gap: 2,
                                                            }}
                                                        >
                                                            {mentor.skills.map((skill, index) => (
                                                                <Chip key={index} label={skill.skill.name} />
                                                            ))}{' '}
                                                        </Box>
                                                    </CardContent>
                                                    <br />
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'left',
                                                            alignItems: 'center',
                                                            width: '100%',
                                                            gap: 2,
                                                        }}
                                                    >
                                                        {/* <Button
                                                        variant="contained"
                                                        size="large"
                                                        sx={{
                                                            height: '100%',
                                                            backgroundColor: '#365E32',
                                                        }}
                                                    >
                                                        View Profile
                                                    </Button> */}
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Card>
                                    </Stack>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
}

export default CompaniesCampaignDetail;
