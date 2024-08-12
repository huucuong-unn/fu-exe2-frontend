import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Switch,
    Box,
    TextField,
    Button,
    Modal,
    Typography,
    Avatar,
    Chip,
    Stack,
    Stepper,
    Step,
    StepLabel,
    Card,
    Autocomplete,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {
    Apartment as ApartmentIcon,
    AccountCircle as AccountCircleIcon,
    School as SchoolIcon,
    DoDisturbOn as DoDisturbOnIcon,
    CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import CampaignAPI from '~/API/CampaignAPI';

const IOSSwitch = styled((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(
    ({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                    opacity: 1,
                    border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }),
);

const steps = ['COMPANY_APPLY', 'MENTEE_APPLY', 'TRAINING', 'CLOSE'];
const statusOptions = ['COMPANY_APPLY', 'MENTEE_APPLY', 'TRAINING', 'CLOSE'];

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

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function AdCampaign() {
    const [selectedMentee, setSelectedMentee] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isNameValid, setIsNameValid] = useState(true);
    const [campaigns, setCampaigns] = useState([]);
    const [imageError, setImageError] = useState(false);
    const [imageHelperText, setImageHelperText] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageSelected, setImageSelected] = useState(false);
    const IMGAGE_HOST = process.env.REACT_APP_IMG_HOST;
    const [searchParams, setSearchParams] = useState({
        campaignName: '',
        status: '',
        startDate: '',
        endDate: '',
    });
    const [params, setParams] = useState({
        campaignName: '',
        status: '',
        startDate: '',
        endDate: '',
        page: 1,
        limit: 10,
    });
    const [totalPage, setTotalPage] = useState(0);
    const [newCampaign, setNewCampaign] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        companyApplyStartDate: '',
        companyApplyEndDate: '',
        menteeApplyStartDate: '',
        menteeApplyEndDate: '',
        trainingStartDate: '',
        trainingEndDate: '',
    });

    const [isCompanyApplyDateValid, setIsCompanyApplyDateValid] = useState(true);
    const [isMenteeApplyDateValid, setIsMenteeApplyDateValid] = useState(true);
    const [isTranningApplyDateValid, setIsTranningApplyDateValid] = useState(true);
    const [isStartDateAndEndDateValid, setIsStartDateAndEndDateValid] = useState(true);
    const [isImgFileValid, setIsImgFileValid] = useState(true);
    const [isPaging, setIsPaging] = useState(true);

    const fetchCampaigns = async () => {
        try {
            const campaignData = await CampaignAPI.getAllForAdmin(params);
            console.log(campaignData);
            setCampaigns(campaignData.listResult);
            setTotalPage(campaignData.totalPage);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handlePageChange = (event, value) => {
        setParams((prev) => ({
            ...prev,
            page: value,
        }));

        if (isPaging === true) {
            setIsPaging(false);
        } else {
            setIsPaging(true);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, [isPaging]);

    const handleUpdateCampaignStatus = async (event, id) => {
        try {
            event.stopPropagation();
            const campaignData = await CampaignAPI.updateCampaign(id);
            fetchCampaigns();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleRowClick = (mentee) => {
        setSelectedMentee(mentee);
    };

    const handleCloseModal = () => {
        setSelectedMentee(null);
    };

    const handleOpenEditModal = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const handleSearch = () => {
        fetchCampaigns({
            campaignName: searchParams.campaignName,
            status: searchParams.status,
            startDate: searchParams.startDate,
            endDate: searchParams.endDate,
            page: 1,
            limit: 10,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const name = newCampaign.name;
        const startDate = newCampaign.startDate;
        const endDate = newCampaign.endDate;
        const companyApplyStartDate = newCampaign.companyApplyStartDate;
        const companyApplyEndDate = newCampaign.companyApplyEndDate;
        const menteeApplyStartDate = newCampaign.menteeApplyStartDate;
        const menteeApplyEndDate = newCampaign.menteeApplyEndDate;
        const trainingStartDate = newCampaign.trainingStartDate;
        const trainingEndDate = newCampaign.trainingEndDate;

        if (!imageFile) {
            setIsImgFileValid(false);
            return;
        } else {
            setIsImgFileValid(true);
        }

        if (name.length < 5 || name.length > 50) {
            setIsNameValid(false);
            return;
        } else {
            setIsNameValid(true);
        }

        if (startDate >= endDate || endDate <= startDate) {
            setIsStartDateAndEndDateValid(false);
            return;
        } else {
            setIsStartDateAndEndDateValid(true);
        }

        if (
            companyApplyStartDate < startDate ||
            companyApplyEndDate > endDate ||
            companyApplyEndDate === '' ||
            companyApplyStartDate === '' ||
            companyApplyStartDate === companyApplyEndDate
        ) {
            setIsCompanyApplyDateValid(false);
            return;
        } else {
            setIsCompanyApplyDateValid(true);
        }

        if (
            menteeApplyStartDate < companyApplyEndDate ||
            menteeApplyStartDate >= menteeApplyEndDate ||
            menteeApplyEndDate === '' ||
            menteeApplyStartDate === '' ||
            menteeApplyStartDate === menteeApplyEndDate
        ) {
            setIsMenteeApplyDateValid(false);
            return;
        } else {
            setIsMenteeApplyDateValid(true);
        }

        if (
            trainingStartDate < menteeApplyEndDate ||
            trainingStartDate >= trainingEndDate ||
            trainingStartDate === '' ||
            trainingEndDate === '' ||
            trainingStartDate === trainingEndDate
        ) {
            setIsTranningApplyDateValid(false);
        } else {
            setIsTranningApplyDateValid(true);
        }

        if (isCompanyApplyDateValid && isMenteeApplyDateValid && isTranningApplyDateValid) {
            try {
                const formData = new FormData();
                formData.append('name', newCampaign.name);
                formData.append('startDate', newCampaign.startDate);
                formData.append('endDate', newCampaign.endDate);
                formData.append('companyApplyStartDate', newCampaign.companyApplyStartDate);
                formData.append('companyApplyEndDate', newCampaign.companyApplyEndDate);
                formData.append('menteeApplyStartDate', newCampaign.menteeApplyStartDate);
                formData.append('menteeApplyEndDate', newCampaign.menteeApplyEndDate);
                formData.append('trainingStartDate', newCampaign.trainingStartDate);
                formData.append('trainingEndDate', newCampaign.trainingEndDate);
                formData.append('img', imageFile);

                console.log(formData);
                // Assuming CampaignAPI.createCampaign is a function that sends a POST request to create a new campaign
                const response = await CampaignAPI.createCampaign(formData);

                setNewCampaign(null);
                // console.log('Campaign created successfully:', response);

                // Close the modal and refresh the campaign list
                setIsCreateModalOpen(false);
                setParams({ campaignName: '', status: '', startDate: '', endDate: '', page: 1, limit: 10 });
                fetchCampaigns();
            } catch (error) {
                console.error('Error creating campaign:', error);
                // Handle error (e.g., display an error message to the user)
            }
        }
    };

    useEffect(() => {
        console.log(newCampaign);
    }, [newCampaign]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewCampaign((prev) => ({
            ...prev,
            [name]: value,
        }));
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

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Button variant="contained" size="medium" onClick={handleOpenCreateModal}>
                    Create
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, paddingRight: 2 }}>
                    <TextField
                        id="outlined-basic"
                        label="Campaign name..."
                        variant="outlined"
                        size="small"
                        value={params.campaignName}
                        onChange={(e) => setParams({ ...params, campaignName: e.target.value })}
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={statusOptions}
                        sx={{ width: '200px' }}
                        size="small"
                        value={params.status}
                        onChange={(event, newValue) => setParams({ ...params, status: newValue })}
                        renderInput={(params) => <TextField {...params} label="Status" />}
                    />
                    <Button variant="contained" size="medium" onClick={fetchCampaigns}>
                        Search
                    </Button>
                </Box>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                No
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Name
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Campaign duration
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Company apply duration
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Mentee apply duration
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Training duration
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Status
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {campaigns.map((campaign, index) => (
                            <TableRow
                                key={campaign.id}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': { cursor: 'pointer' },
                                }}
                                onClick={() => handleRowClick(campaign)}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {campaign.name}
                                </TableCell>
                                <TableCell align="left">
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
                                    })}
                                </TableCell>
                                <TableCell align="left">
                                    {new Date(campaign?.companyApplyStartDate).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}{' '}
                                    -{' '}
                                    {new Date(campaign?.companyApplyEndDate).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}
                                </TableCell>
                                <TableCell align="left">
                                    {new Date(campaign?.menteeApplyStartDate).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}{' '}
                                    -{' '}
                                    {new Date(campaign?.menteeApplyEndDate).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}
                                </TableCell>
                                <TableCell align="left">
                                    {new Date(campaign?.trainingStartDate).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}{' '}
                                    -{' '}
                                    {new Date(campaign?.trainingEndDate).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}
                                </TableCell>
                                <TableCell align="left">
                                    <Chip
                                        label={
                                            campaign.status === 'COMPANY_APPLY'
                                                ? 'Company Apply'
                                                : campaign.status === 'STUDENT_APPLY'
                                                ? 'Student Apply'
                                                : campaign.status === 'TRAINING'
                                                ? 'Training'
                                                : campaign.status === 'CLOSED'
                                                ? 'Closed'
                                                : 'default'
                                        }
                                        sx={{ mr: 2, mb: 1 }}
                                        onClick={() => {}}
                                        color={
                                            campaign.status === 'COMPANY_APPLY'
                                                ? 'primary'
                                                : campaign.status === 'STUDENT_APPLY'
                                                ? 'secondary'
                                                : campaign.status === 'TRAINING'
                                                ? 'success'
                                                : campaign.status === 'CLOSED'
                                                ? 'error'
                                                : 'default'
                                        }
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    <Button
                                        variant="contained"
                                        onClick={(event) => handleUpdateCampaignStatus(event, campaign.id)}
                                    >
                                        Change Status
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
                <Pagination
                    count={totalPage}
                    page={params.page}
                    onChange={handlePageChange}
                    renderItem={(item) => (
                        <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
                    )}
                />
            </Box>
            <Modal open={Boolean(selectedMentee)} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 'fit-content',
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
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <Avatar
                                alt="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.svgrepo.com%2Fsvg%2F452030%2Favatar-default&psig=AOvVaw2Eepet3Jt6CuwNIc10izZr&ust=1718112366877000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOi0-r2R0YYDFQAAAAAdAAAAABAE"
                                src={IMGAGE_HOST + selectedMentee?.img}
                                sx={{ width: 90, height: 90, border: 'solid 2px black' }}
                                helperText="Avatar"
                            />
                        </Box>
                        <Typography variant="h5">{selectedMentee?.name}</Typography>
                        <Stack sx={{ width: '100%' }} spacing={4}>
                            <Stepper
                                alternativeLabel
                                activeStep={steps.indexOf(selectedMentee?.status)}
                                connector={<ColorlibConnector />}
                            >
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Stack>
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
                                        textAlign: 'center',
                                    }}
                                >
                                    <Typography
                                        color="text.primary"
                                        variant="body1"
                                        fontWeight="bold"
                                        fontSize={'24px'}
                                    >
                                        General Information
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                        gap: 5,
                                        marginLeft: 2,
                                        marginRight: 2,
                                        paddingBottom: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: { md: 'center' },
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography color="gray" variant="h7">
                                            Campaign Duration
                                        </Typography>
                                        <Typography color="black" variant="h7" fontWeight="bold">
                                            {new Date(selectedMentee?.startDate).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })}{' '}
                                            -{' '}
                                            {new Date(selectedMentee?.endDate).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: { md: 'center' },
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography color="gray" variant="h7">
                                            Company Apply Duration
                                        </Typography>
                                        <Typography color="black" variant="h7" fontWeight="bold">
                                            {new Date(selectedMentee?.companyApplyStartDate).toLocaleDateString(
                                                'en-GB',
                                                {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                },
                                            )}{' '}
                                            -{' '}
                                            {new Date(selectedMentee?.companyApplyEndDate).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: { md: 'center' },
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography color="gray" variant="h7">
                                            Mentee Apply Duration
                                        </Typography>
                                        <Typography color="black" variant="h7" fontWeight="bold">
                                            {new Date(selectedMentee?.menteeApplyStartDate).toLocaleDateString(
                                                'en-GB',
                                                {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                },
                                            )}{' '}
                                            -{' '}
                                            {new Date(selectedMentee?.menteeApplyEndDate).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: { md: 'center' },
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography color="gray" variant="h7">
                                            Training Duration
                                        </Typography>
                                        <Typography color="black" variant="h7" fontWeight="bold">
                                            {new Date(selectedMentee?.trainingStartDate).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })}{' '}
                                            -{' '}
                                            {new Date(selectedMentee?.trainingEndDate).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: { md: 'center' },
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography color="gray" variant="h7">
                                            Number of Mentors
                                        </Typography>
                                        <Typography color="black" variant="h7" fontWeight="bold">
                                            {selectedMentee?.numberOfMentors}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: { md: 'center' },
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography color="gray" variant="h7">
                                            Number of Mentees
                                        </Typography>
                                        <Typography color="black" variant="h7" fontWeight="bold">
                                            {selectedMentee?.numberOfMentees}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Card>
                    </Box>
                </Box>
            </Modal>
            <Modal open={isEditModalOpen} onClose={handleCloseEditModal}>
                <Box
                    sx={{
                        position: 'relative',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 'fit-content',
                        bgcolor: '#f5f5f5',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        textAlign: 'center',
                    }}
                >
                    <Box pb={4} component="form">
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <Avatar sx={{ width: 150, height: 150, bgcolor: '#f48fb1' }} />
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload file
                                <VisuallyHiddenInput type="file" />
                            </Button>
                            <TextField id="outlined-basic" variant="outlined" label="Name" sx={{ flex: 1 }} />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 2,
                                mt: 2,
                            }}
                        ></Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 2,
                                mt: 2,
                            }}
                        >
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                label="Min offline sessions"
                                sx={{ flex: 1 }}
                            />
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                label="Min session duration"
                                sx={{ flex: 1 }}
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
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'start',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography>Start date</Typography>
                                <TextField
                                    id="startDate"
                                    name="startDate"
                                    variant="outlined"
                                    size="small"
                                    type="date"
                                />
                            </Box>
                            <Typography>to</Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'start',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography>End date</Typography>
                                <TextField id="endDate" name="endDate" variant="outlined" size="small" type="date" />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ position: 'absolute', bottom: 10, right: 10, display: 'flex', gap: 2 }}>
                        <Button variant="outlined" onClick={handleCloseEditModal}>
                            Close
                        </Button>
                        <Button variant="contained">Save</Button>
                    </Box>
                </Box>
            </Modal>
            <Modal open={isCreateModalOpen} onClose={handleCloseCreateModal}>
                <Box
                    sx={{
                        position: 'relative',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 'fit-content',
                        bgcolor: '#f5f5f5',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        textAlign: 'center',
                    }}
                    component="form"
                    onSubmit={handleSubmit}
                >
                    <Box pb={4}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <Avatar
                                alt="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.svgrepo.com%2Fsvg%2F452030%2Favatar-default&psig=AOvVaw2Eepet3Jt6CuwNIc10izZr&ust=1718112366877000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOi0-r2R0YYDFQAAAAAdAAAAABAE"
                                src={imagePreview}
                                sx={{ width: 90, height: 90, border: 'solid 2px black' }}
                                helperText="Avatar"
                            />
                            <TextField
                                type="file"
                                id="avatarUrl"
                                name="avatarUrl"
                                error={!isImgFileValid}
                                helperText={!isImgFileValid ? 'Please choose campaign picture' : ''}
                                onChange={handleImageUpload}
                                accept="image/jpeg, image/jpg, image/png"
                            />
                            <TextField
                                id="name"
                                name="name"
                                variant="outlined"
                                label="Name"
                                sx={{ flex: 1 }}
                                error={!isNameValid}
                                helperText={!isNameValid ? 'Name must be 5-50 characters long' : ''}
                                value={newCampaign?.name}
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
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'start',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography>Start date</Typography>
                                <TextField
                                    id="startDate"
                                    name="startDate"
                                    variant="outlined"
                                    size="small"
                                    type="date"
                                    error={!isStartDateAndEndDateValid}
                                    helperText={!isStartDateAndEndDateValid ? 'Start date or End date invalid' : ''}
                                    value={newCampaign?.startDate}
                                    onChange={handleInputChange}
                                />
                            </Box>
                            <Typography>to</Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'start',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography>End date</Typography>
                                <TextField
                                    id="endDate"
                                    name="endDate"
                                    variant="outlined"
                                    size="small"
                                    type="date"
                                    error={!isStartDateAndEndDateValid}
                                    helperText={!isStartDateAndEndDateValid ? 'Start date or End date invalid' : ''}
                                    value={newCampaign?.endDate}
                                    onChange={handleInputChange}
                                />
                            </Box>
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
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'start',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography>Company apply start date</Typography>
                                <TextField
                                    id="companyApplyStartDate"
                                    name="companyApplyStartDate"
                                    variant="outlined"
                                    size="small"
                                    type="date"
                                    value={newCampaign?.companyApplyStartDate}
                                    onChange={handleInputChange}
                                    error={!isCompanyApplyDateValid}
                                    helperText={!isCompanyApplyDateValid ? 'Company apply date invalid' : ''}
                                />
                            </Box>
                            <Typography>to</Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'start',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography>Company apply end date</Typography>
                                <TextField
                                    id="companyApplyEndDate"
                                    name="companyApplyEndDate"
                                    variant="outlined"
                                    size="small"
                                    type="date"
                                    value={newCampaign?.companyApplyEndDate}
                                    onChange={handleInputChange}
                                    error={!isCompanyApplyDateValid}
                                    helperText={!isCompanyApplyDateValid ? 'Company apply date invalid' : ''}
                                />
                            </Box>
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
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'start',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography>Mentee apply start date</Typography>
                                <TextField
                                    id="menteeApplyStartDate"
                                    name="menteeApplyStartDate"
                                    variant="outlined"
                                    size="small"
                                    type="date"
                                    error={!isMenteeApplyDateValid}
                                    helperText={!isMenteeApplyDateValid ? 'Mentee apply date invalid' : ''}
                                    value={newCampaign?.menteeApplyStartDate}
                                    onChange={handleInputChange}
                                />
                            </Box>
                            <Typography>to</Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'start',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography>Mentee apply end date</Typography>
                                <TextField
                                    id="menteeApplyEndDate"
                                    name="menteeApplyEndDate"
                                    variant="outlined"
                                    size="small"
                                    type="date"
                                    error={!isMenteeApplyDateValid}
                                    helperText={!isMenteeApplyDateValid ? 'Mentee apply date invalid' : ''}
                                    value={newCampaign?.menteeApplyEndDate}
                                    onChange={handleInputChange}
                                />
                            </Box>
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
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'start',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography>Training start date</Typography>
                                <TextField
                                    id="trainingStartDate"
                                    name="trainingStartDate"
                                    variant="outlined"
                                    size="small"
                                    type="date"
                                    error={!isTranningApplyDateValid}
                                    helperText={!isTranningApplyDateValid ? 'Training date invalid' : ''}
                                    value={newCampaign?.trainingStartDate}
                                    onChange={handleInputChange}
                                />
                            </Box>
                            <Typography>to</Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'start',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography>Training end date</Typography>
                                <TextField
                                    id="trainingEndDate"
                                    name="trainingEndDate"
                                    variant="outlined"
                                    size="small"
                                    type="date"
                                    error={!isTranningApplyDateValid}
                                    helperText={!isTranningApplyDateValid ? 'Training date invalid' : ''}
                                    value={newCampaign?.trainingEndDate}
                                    onChange={handleInputChange}
                                />
                            </Box>
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
                            }}
                        >
                            <TextField
                                id="description"
                                name="description"
                                label="Description"
                                multiline
                                rows={5}
                                value={newCampaign?.description}
                                sx={{ width: '100%', flex: 1 }}
                                onChange={handleInputChange}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ position: 'absolute', bottom: 4, right: 10, display: 'flex', gap: 2 }}>
                        <Button variant="outlined" onClick={handleCloseCreateModal}>
                            Close
                        </Button>
                        <Button variant="contained" type="submit">
                            Create
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}

export default AdCampaign;
