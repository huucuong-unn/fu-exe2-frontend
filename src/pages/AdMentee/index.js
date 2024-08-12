import * as React from 'react';
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
    Chip,
    Typography,
    Avatar,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/system';
import { useState, useEffect } from 'react';
import CompanyAPI from '~/API/CompanyAPI';
import MentorApplyAPI from '~/API/MentorApply';
import CampaignAPI from '~/API/CampaignAPI';

const AdMentee = () => {
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

    const [selectedMentee, setSelectedMentee] = useState(null);
    const [mentees, setMentees] = useState([]);
    const [menteeName, setMenteeName] = useState('');
    const [mentorName, setMentorName] = useState('');
    const [campaignId, setCampaignId] = useState(null);
    const [companyId, setCompanyId] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [params, setParams] = useState({
        menteeName: '',
        mentorFullName: '',
        campaignId: '',
        companyId: '',
        page: 1,
        limit: 10,
    });
    const [totalPage, setTotalPage] = useState(0);
    const [isPaging, setIsPaging] = useState(true);

    const handleRowClick = (mentee) => {
        setSelectedMentee(mentee);
    };

    const handleCloseModal = () => {
        setSelectedMentee(null);
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

    const handleSearch = async () => {
        try {
            const params = {
                menteeName: menteeName,
                mentorFullName: mentorName,
                campaignId: campaignId,
                companyId: companyId,
                page: 1,
                limit: 10,
            };

            const menteesData = await MentorApplyAPI.findAllByMenteeNameAndMentorFullNameAndCampaignIdAndCompanyId(
                params,
            );
            setTotalPage(menteesData.totalPage);

            setMentees(menteesData.listResult);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchData = async () => {
        try {
            const companiesData = await CompanyAPI.getAllWithStatusActiveWithoutPaging();
            const campaignsData = await CampaignAPI.getAllWithoutPaging();
            const menteesData = await MentorApplyAPI.findAllByMenteeNameAndMentorFullNameAndCampaignIdAndCompanyId(
                params,
            );
            setCompanies(companiesData);
            setCampaigns(campaignsData);
            setMentees(menteesData.listResult);
            setTotalPage(menteesData.totalPage);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [isPaging]);

    useEffect(() => {
        console.log(params);
    }, [params]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, paddingRight: 2 }}>
                <TextField
                    id="outlined-basic"
                    label="Mentee name..."
                    variant="outlined"
                    size="small"
                    value={params.menteeName}
                    onChange={(e) => setParams({ ...params, menteeName: e.target.value })}
                />
                <TextField
                    id="outlined-basic"
                    label="Mentor name..."
                    variant="outlined"
                    size="small"
                    value={params.mentorFullName}
                    onChange={(e) => setParams({ ...params, mentorFullName: e.target.value })}
                />
                <Autocomplete
                    disablePortal
                    id="campaignOption"
                    options={campaigns}
                    sx={{ width: 300 }}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => {
                        setParams({ ...params, campaignId: newValue ? newValue.id : '' });
                    }}
                    renderInput={(params) => <TextField {...params} label="Campaign name..." />}
                    size="small"
                />
                <Autocomplete
                    disablePortal
                    id="companyOption"
                    options={companies}
                    sx={{ width: 300 }}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => {
                        setParams({ ...params, companyId: newValue ? newValue.id : '' });
                    }}
                    renderInput={(params) => <TextField {...params} label="Company..." />}
                    size="small"
                />
                <Button onClick={fetchData} variant="contained" size="medium">
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
                                Mentor Name
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Campaign
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mentees.map((mentee, index) => (
                            <TableRow
                                key={mentee.mentee.id}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': {
                                        cursor: 'pointer',
                                    },
                                }}
                                onClick={() => handleRowClick(mentee)}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {mentee.mentee.student.name}
                                </TableCell>
                                <TableCell align="left">{mentee.mentee.student.account.email}</TableCell>
                                <TableCell align="left">{mentee.mentorFullName}</TableCell>
                                <TableCell align="left">{mentee.campaignName}</TableCell>
                                <TableCell align="left">
                                    <Chip
                                        label={mentee.status}
                                        sx={{
                                            backgroundColor:
                                                mentee.status === 'DONE'
                                                    ? 'success.main'
                                                    : mentee.status === 'TRAINING'
                                                    ? 'orange'
                                                    : 'default.main',
                                            color: 'white',
                                        }}
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
            <Modal open={Boolean(selectedMentee)} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 450,
                        bgcolor: '#f5f5f5',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        variant="h5"
                        component="h2"
                        gutterBottom
                        sx={{ color: '#fff', bgcolor: '#4e342e', p: 2, borderRadius: 1 }}
                    >
                        STUDENT CARD
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', gap: 4, marginTop: 3 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            {/* <Avatar
                                alt={student.name}
                                src={student.photo}
                                sx={{ width: 100, height: 100, bgcolor: '#f48fb1' }}
                            /> */}
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#795548' }}>
                                ID: {selectedMentee?.mentee.student.studentCode}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'start',
                                gap: 2,
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#795548', mr: 1 }}>
                                    Name:
                                </Typography>
                                <Typography variant="subtitle1" sx={{ color: '#795548' }}>
                                    {selectedMentee?.mentee.student.name}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#795548', mr: 1 }}>
                                    University:
                                </Typography>
                                <Typography variant="subtitle1" sx={{ color: '#795548' }}>
                                    {selectedMentee?.mentee.student.university.name}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#795548', mr: 1 }}>
                                    Date of birth:
                                </Typography>
                                <Typography variant="subtitle1" sx={{ color: '#795548' }}>
                                    {new Date(selectedMentee?.mentee.student.dob).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#795548', mr: 1 }}>
                                    Phone number:
                                </Typography>
                                {/* <Typography variant="subtitle1" sx={{ color: '#795548' }}>
                                    {selectedMentee?.mentee.student.phone}
                                </Typography> */}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default AdMentee;
