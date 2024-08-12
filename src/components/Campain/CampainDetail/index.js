import React, { useState, useEffect } from 'react';
import {
    Grid,
    Box,
    Typography,
    Avatar,
    Card,
    CardContent,
    Stepper,
    Step,
    StepLabel,
    Pagination,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Tooltip,
    IconButton,
    Modal,
    Paper,
    Container,
    Chip,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon from @material-ui/icons

import StarIcon from '@mui/icons-material/Star';
import MenteeSection from '~/components/Campain/CampainDetailMenteeList'; // Adjust the import path as necessary
import { useNavigate, useParams } from 'react-router-dom';
import getCampaignDetail from '~/API/Campain/getCampaignDetail'; // Adjust the import path as necessary
import getMenteesToApprove from '~/API/Campain/getMenteesToApprove';
import StorageService from '~/components/StorageService/storageService'; // Adjust the import path as necessary
import getMenteesFromMentorAndCampaign from '~/API/Campain/getMenteeFromMentorAndCampaign'; // Adjust the import path as necessary
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import PropTypes from 'prop-types';

import {
    Apartment as ApartmentIcon,
    AccountCircle as AccountCircleIcon,
    School as SchoolIcon,
    DoDisturbOn as DoDisturbOnIcon,
    CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
const CampaignDetail = () => {
    const { campaignId } = useParams();
    const [campaign, setCampaign] = useState({});
    const [filterStatus, setFilterStatus] = useState('All');
    const [mentees, setMentees] = useState([]); // State for mentees

    const [page, setPage] = useState(1);
    const [menteesPerPage] = useState(5); // Number of mentees per page
    const [topMenteeIds, setTopMenteeIds] = useState([]);
    const [selectedMentee, setSelectedMentee] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [showApprovalList, setShowApprovalList] = useState(false);

    const steps = ['COMPANY_APPLY', 'STUDENT_APPLY', 'TRAINING', 'CLOSED'];
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const IMAGE_HOST = process.env.REACT_APP_IMG_HOST;
    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const campaignData = await getCampaignDetail(campaignId);
                setCampaign(campaignData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCampaign();
    }, [campaignId]);

    useEffect(() => {
        fetchMentees();
    }, [campaignId, page, menteesPerPage]);
    const fetchMentees = async () => {
        try {
            // Assuming mentorId is stored in session storage
            const mentorId = StorageService.getItem('userInfo').mentorId;

            if (!mentorId) {
                throw new Error('MentorId not found in storage.');
            }

            const menteesData = await getMenteesFromMentorAndCampaign(mentorId, campaignId, page, menteesPerPage);
            setMentees(menteesData.mentees);
        } catch (error) {
            console.error('Error fetching mentees from mentor and campaign:', error);
        }
    };
    // Handler for selecting a mentee
    const handleSelectMentee = (mentee) => {
        console.log('Selected Mentee:', mentee);
        setSelectedMentee(mentee);
        setModalOpen(true);
    };

    // Handler for changing filter status
    const handleFilterChange = (event) => {
        setFilterStatus(event.target.value);
        setPage(1); // Reset page to 1 when filter changes
    };

    // Handler for changing page
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    // Handler for mentee actions (approve/reject)
    const handleAction = (menteeId, action) => {
        // Implement your action logic here
        console.log(`Action ${action} performed for mentee with ID: ${menteeId}`);
    };

    // Handler for moving a mentee to the top of the list
    const handleMoveToTop = (index, menteeId) => {
        const updatedTopMenteeIds = [...topMenteeIds];

        // Check if menteeId is already in the list, remove it; otherwise add it
        const existingIndex = updatedTopMenteeIds.indexOf(menteeId);
        if (existingIndex !== -1) {
            updatedTopMenteeIds.splice(existingIndex, 1);
        } else {
            updatedTopMenteeIds.push(menteeId);
        }

        // Update state with the new list of top mentee IDs
        setTopMenteeIds(updatedTopMenteeIds);
    };

    // If campaign or mentees haven't been fetched yet, return null or a loading state
    if (!campaign.id) {
        return (
            <Box>
                <Typography variant="h6" align="center">
                    No mentee in mentee list
                </Typography>
            </Box>
        );
    }

    // Filter and sort mentees based on current filter status and top mentees
    const filteredMentees = mentees.filter((mentee) => {
        if (filterStatus === 'All') {
            return true;
        }
        return mentee.status === filterStatus;
    });

    // Sort mentees based on topMenteeIds
    const sortedMentees = [...filteredMentees].sort((a, b) => {
        const aIsTop = topMenteeIds.includes(a.id);
        const bIsTop = topMenteeIds.includes(b.id);
        if (aIsTop && !bIsTop) return -1;
        if (!aIsTop && bIsTop) return 1;
        return 0;
    });

    // Paginate mentees
    const startIndex = (page - 1) * menteesPerPage;
    const paginatedMentees = sortedMentees.slice(startIndex, startIndex + menteesPerPage);

    // Calculate total pages for pagination component
    const totalPages = Math.ceil(filteredMentees.length / menteesPerPage);

    const handleItemClick = (index, mentorId) => {
        setSelectedItemIndex(index);
        navigate(`/mentor/${mentorId}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCreateMentor = () => {
        navigate('/company/create-mentor-account');
        window.scrollTo(0, 0);
    };

    const handleRowClick = (mentor) => {
        setSelectedMentee(mentor);
    };

    const handleCloseModal = () => {
        setSelectedMentee(null);
    };
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
                                    src={IMAGE_HOST + campaign?.img}
                                    sx={{ width: 150, height: 150 }}
                                />
                            </Box>
                            <Box sx={{ textTransform: 'none' }}>
                                <Typography color="text.primary" variant="body1" fontWeight="bold" fontSize={'24px'}>
                                    Spring Campaign 2024
                                </Typography>
                                <Typography color="text.secondary" variant="body2" sx={{ my: 1 }} fontSize={'16px'}>
                                    1/1/2024 - 1/7/2024
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
                                        Training
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

            <>
                {campaign.status === "STUDENT_APPLY" && (
                    <Box
                        mb={2}
                        sx={{
                            marginLeft: 2,
                            marginRight: 2,
                            marginTop: 1,
                        }}
                    >
                        <Typography color="text.primary" variant="body1" fontWeight="bold" fontSize={'24px'}>
                            Application list:
                        </Typography>
                        <Button
                            variant="contained"
                            color={showApprovalList ? 'secondary' : 'primary'}
                            onClick={() => setShowApprovalList((prev) => !prev)}
                        >
                            {showApprovalList ? 'Hide Mentees Needing Approval' : 'Show Mentees Needing Approval'}
                        </Button>
                    </Box>
                )}

                {showApprovalList && campaign.status === "STUDENT_APPLY" && (
                    <MenteesNeedingApproval
                        mentees={mentees}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        fetchMentees={fetchMentees}
                    />
                )}
            </>

            <Box mb={2}>
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                    <InputLabel id="filter-status-label">Filter by Status</InputLabel>
                    <Select
                        labelId="filter-status-label"
                        id="filter-status"
                        value={filterStatus}
                        onChange={handleFilterChange}
                        label="Filter by Status"
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="ACTIVE">Active</MenuItem>
                        <MenuItem value="INACTIVE">Inactive</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Typography color="text.primary" variant="body1" fontWeight="bold" fontSize={'24px'}>
                Your Mentees:
            </Typography>
            {paginatedMentees.length === 0 && (
                <Box
                    sx={{
                        mt: 2,
                        p: 3,
                        border: '2px solid #1976d2',
                        borderRadius: '8px',
                        textAlign: 'center',
                        backgroundColor: '#f5f5f5',
                    }}
                >
                    <Typography variant="h4" color="primary">
                        No mentees for now.
                    </Typography>
                </Box>
            )}

            {paginatedMentees.length > 0 && (
                <Box sx={{ border: '1px solid #ccc', borderRadius: 1, overflow: 'hidden' }}>
                    {paginatedMentees.map((mentee, index) => (
                        <Box
                            key={mentee.id}
                            sx={{
                                p: 2,
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: index % 2 === 0 ? '#ffffff' : '#f0f0f0',
                                borderBottom: '1px solid #ccc',
                            }}
                        >
                            <Box
                                sx={{
                                    minWidth: 40,
                                    height: 40,
                                    backgroundColor: '#333',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: 2,
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: '#fff',
                                }}
                            >
                                {startIndex + index + 1}
                            </Box>

                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <Avatar
                                            src={IMAGE_HOST + mentee.studentAvatarUrl}
                                            alt={mentee.studentName}
                                            sx={{ width: 100, height: 100, borderBottom: '3px solid #007bff' }}
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="h4">{mentee.menteeName}</Typography>
                                        <Chip
                                            label={`Status: ${mentee.status}`}
                                            color={mentee.status === 'active' || 'ACTIVE' ? 'success' : 'error'}
                                            sx={{ fontSize: '1rem' }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                            {/* Star Icon for moving mentee to top */}
                            <Tooltip title="Move to Top">
                                <IconButton
                                    color={topMenteeIds.includes(mentee.id) ? 'primary' : 'default'}
                                    onClick={() => handleMoveToTop(startIndex + index, mentee.id)}
                                    sx={{ mr: 1 }}
                                >
                                    <StarIcon />
                                </IconButton>
                            </Tooltip>

                            {/* Show Details Button */}
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => handleSelectMentee(mentee)}
                                sx={{ textTransform: 'none', ml: 1 }}
                            >
                                Show Details
                            </Button>
                        </Box>
                    ))}
                </Box>
            )}

            {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
                </Box>
            )}

            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="mentee-details-modal"
                aria-describedby="mentee-details-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%', // Adjust width as needed
                        maxWidth: 600, // Maximum width for larger screens
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 8, // Rounded corners
                    }}
                >
                    {/* Close button */}
                    <IconButton
                        aria-label="close"
                        onClick={() => setModalOpen(false)}
                        sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            color: 'text.secondary',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h6" id="modal-modal-title" sx={{ mb: 2 }}>
                        Mentee Details
                    </Typography>
                    {selectedMentee && (
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                {/* Display mentee's avatar with underline */}
                                <Avatar
                                    src={IMAGE_HOST + selectedMentee.menteeAvatarUrl}
                                    alt={selectedMentee.menteeName}
                                    sx={{ width: 120, height: 120, borderBottom: '3px solid #007bff' }}
                                />
                            </Grid>
                            <Grid item xs>
                                {/* Display mentee's name and status */}
                                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    {selectedMentee.menteeName}
                                </Typography>
                                <Chip
                                    label={`Status: ${
                                        selectedMentee.status.charAt(0).toUpperCase() + selectedMentee.status.slice(1)
                                    }`}
                                    color={selectedMentee.status === 'active' || 'ACTIVE' ? 'success' : 'error'}
                                    sx={{ fontSize: '1rem' }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                {/* Display mentee's email and university */}
                                <Typography variant="body1"> Email: {selectedMentee.menteeEmail}</Typography>
                                <Typography variant="body1"> University: {selectedMentee.menteeUniversity}</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ textAlign: 'center', pt: 2 }}>
                                <Box
                                    sx={{
                                        marginLeft: 2,
                                        marginRight: 2,
                                        paddingBottom: 2,
                                        borderBottom: '1px dashed #e0e0e0',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Typography color="text.primary" variant="h5" fontWeight="bold">
                                        Student Card
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                    <img
                                        height={200}
                                        width={300}
                                        src={`${IMAGE_HOST}${selectedMentee.frontStudentCard}`}
                                        alt="Student Card"
                                    />
                                    <img
                                        height={200}
                                        width={300}
                                        src={`${IMAGE_HOST}${selectedMentee.backStudentCard}`}
                                        alt="Student Card"
                                    />
                                </Box>
                            </Grid>
                            {/*/!* View CV button *!/*/}
                            {/*<Grid item xs={12} sx={{ textAlign: 'center', pt: 2 }}>*/}
                            {/*    <Button*/}
                            {/*        variant="contained"*/}
                            {/*        color="primary"*/}
                            {/*        component="a"*/}
                            {/*        href={`https://tortee-image-upload.s3.ap-southeast-1.amazonaws.com/${selectedMentee.cvFile}`}*/}
                            {/*        target="_blank"*/}
                            {/*        rel="noopener noreferrer"*/}
                            {/*        sx={{*/}
                            {/*            textDecoration: 'none',*/}
                            {/*            color: 'white',*/}
                            {/*            textTransform: 'none',*/}
                            {/*            py: 2,*/}
                            {/*            px: 4,*/}
                            {/*            fontSize: '1.2rem',*/}
                            {/*        }}*/}
                            {/*    >*/}
                            {/*        View CV*/}
                            {/*    </Button>*/}
                            {/*</Grid>*/}

                            {/* Additional mentee details */}
                            <Grid item xs={12}>
                                {/* Add more details here if needed */}
                            </Grid>
                            {/* Add more sections as necessary */}
                        </Grid>
                    )}
                </Box>
            </Modal>
        </Container>
    );
};

const MenteesNeedingApproval = ({ mentees, fetchMentees }) => (
    <Paper sx={{ p: 2, borderRadius: 1, boxShadow: 1, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
            Mentees Needing Approval
        </Typography>
        <MenteeSection mentees={mentees} fetchMentees={fetchMentees} handleAction={() => {}} hideFilter />
    </Paper>
);

export default CampaignDetail;
