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
    FormControlLabel,
    TextField,
    Autocomplete,
    Button,
    Modal,
    Typography,
    Avatar,
    Chip,
    CircularProgress,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { styled } from '@mui/system';

import { useState, useEffect } from 'react';
import CompanyAPI from '~/API/CompanyAPI';
import CampaignAPI from '~/API/CampaignAPI';
import MentorAPI from '~/API/MentorAPI';

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

function AdMentor() {
    const [selectedMentor, setselectedMentor] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [mentorName, setMentorName] = useState('');
    const [campaignId, setCampaignId] = useState(null);
    const [companyId, setCompanyId] = useState(null);
    const [loading, setLoading] = useState(true);
    const IMGAGE_HOST = process.env.REACT_APP_IMG_HOST;
    const [params, setParams] = useState({
        mentorName: null,
        campaignId: null,
        companyId: null,
        page: 1,
        limit: 10,
    });
    const [totalPage, setTotalPage] = useState(0);

    const handlePageChange = (event, value) => {
        setParams((prev) => ({
            ...prev,
            page: value,
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const companiesData = await CompanyAPI.getAllWithStatusActiveWithoutPaging();
                const mentorsData = await MentorAPI.getMentorsForAdminSearch(params);
                console.log(mentorsData);
                setCompanies(companiesData);
                setMentors(mentorsData.listResult);
                setTotalPage(mentorsData.totalPage);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [params]);

    const handleRowClick = (mentee) => {
        setselectedMentor(mentee);
        console.log(mentee.mentorProfile.profilePicture);
    };

    const handleCloseModal = () => {
        setselectedMentor(null);
    };

    const handleSearch = async () => {
        try {
            const params = {
                mentorName: mentorName,
                campaignId: campaignId,
                companyId: companyId,
                page: 1,
                limit: 10,
            };
            const mentorsData = await MentorAPI.getMentorsForAdminSearch(params);
            setMentors(mentorsData.listResult);
        } catch (error) {
            console.error('Error searching mentors:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, paddingRight: 2 }}>
                <TextField
                    id="outlined-basic"
                    label="Mentor name..."
                    variant="outlined"
                    size="small"
                    value={mentorName}
                    onChange={(e) => setMentorName(e.target.value)}
                />
                <Autocomplete
                    disablePortal
                    id="companyOption"
                    options={companies}
                    sx={{ width: 300 }}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => {
                        setCompanyId(newValue ? newValue.id : null);
                    }}
                    renderInput={(params) => <TextField {...params} label="Company..." />}
                    size="small"
                />
                <Button variant="contained" size="medium" onClick={handleSearch}>
                    Search
                </Button>
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
                                Email
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Company
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Number of mentees
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mentors.map((mentor, index) => (
                            <TableRow
                                key={mentor.mentorProfile.mentorDTO.id}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': {
                                        cursor: 'pointer',
                                    },
                                }}
                                onClick={() => handleRowClick(mentor)}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {mentor.mentorProfile.mentorDTO.fullName}
                                </TableCell>
                                <TableCell align="left">{mentor.mentorProfile.mentorDTO.account.email}</TableCell>
                                <TableCell align="left">{mentor.mentorProfile.mentorDTO.company.name}</TableCell>
                                <TableCell align="left">{mentor.totalMentees}</TableCell>
                                <TableCell align="left">
                                    <FormControlLabel
                                        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                                        label="Active"
                                        onClick={(event) => event.stopPropagation()}
                                    />
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
            <Modal open={Boolean(selectedMentor)} onClose={handleCloseModal}>
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
                        textAlign: 'left',
                    }}
                >
                    {selectedMentor && (
                        <>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <Avatar
                                        src={IMGAGE_HOST + selectedMentor.mentorProfile.profilePicture}
                                        sx={{ width: 180, height: 180, bgcolor: '#f48fb1' }}
                                    />
                                    <Typography variant="h5">
                                        {selectedMentor.mentorProfile.mentorDTO.companyName}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'start',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'start',
                                            borderBottom: '2px solid black',
                                            marginBottom: 0.5,
                                        }}
                                    >
                                        <Typography variant="h4">
                                            {selectedMentor.mentorProfile.mentorDTO.FullName}
                                        </Typography>
                                        <Typography variant="h6">
                                            {selectedMentor.mentorProfile.mentorDTO.jobTitle}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                            Phone:
                                        </Typography>
                                        <Typography variant="subtitle1" sx={{ color: '#795548' }}>
                                            {selectedMentor.mentorProfile.mentorDTO.phone}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                            Email:
                                        </Typography>
                                        <Typography variant="subtitle1" sx={{ color: '#795548' }}>
                                            {selectedMentor.mentorProfile.mentorDTO.account.email}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                            LinkedIn:
                                        </Typography>
                                        <Typography variant="subtitle1" sx={{ color: '#795548' }}>
                                            {selectedMentor.mentorProfile.linkedinUrl}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                            Facebook:
                                        </Typography>
                                        <Typography variant="subtitle1" sx={{ color: '#795548' }}>
                                            {selectedMentor.mentorProfile.facebookUrl}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                            Google Meet:
                                        </Typography>
                                        <Typography variant="subtitle1" sx={{ color: '#795548' }}>
                                            {selectedMentor.mentorProfile.googleMeetUrl}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ marginTop: 2 }}>
                                <Box sx={{ borderBottom: '2px solid black' }}>
                                    <Typography variant="h5">About</Typography>
                                </Box>
                                <Typography sx={{ marginTop: 1 }}>
                                    {selectedMentor.mentorProfile.shortDescription}
                                </Typography>
                            </Box>
                            <Box sx={{ marginTop: 3 }}>
                                <Box sx={{ borderBottom: '2px solid black' }}>
                                    <Typography variant="h5">Skills</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'left',
                                        alignItems: 'center',
                                        gap: 1,
                                        marginTop: 1,
                                    }}
                                >
                                    {selectedMentor.skills.map((skill, index) => (
                                        <Chip key={index} label={skill.skill.name} />
                                    ))}
                                </Box>
                            </Box>
                            <Box sx={{ marginTop: 3 }}>
                                <Box sx={{ borderBottom: '2px solid black' }}>
                                    <Typography variant="h5">Certificates</Typography>
                                </Box>
                                {/* {selectedMentor.mentorProfile.mentorDTO.certificates.map((certificate, index) => (
                                    <Typography key={index} sx={{ marginTop: 1 }}>
                                        {certificate}
                                    </Typography>
                                ))} */}
                            </Box>
                        </>
                    )}
                </Box>
            </Modal>
        </Box>
    );
}

export default AdMentor;
