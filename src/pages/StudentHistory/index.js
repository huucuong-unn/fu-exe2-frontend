import {
    Typography,
    Container,
    Tab,
    Tabs,
    Box,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Modal,
    TextField,
    Button,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import PaymentIcon from '@mui/icons-material/Payment';
import SchoolIcon from '@mui/icons-material/School';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ApplicationAPI from '~/API/ApplicationAPI';
import TransactionAPI from '~/API/TransactionAPI';
import storageService from '~/components/StorageService/storageService';
import MentorApplyAPI from '~/API/MentorApply';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function StudentHistory() {
    const location = useLocation();
    const [value, setValue] = useState(0);
    const [selectedMentee, setSelectedMentee] = useState(null);
    const [selectedApply, setSelectedApply] = useState(null);
    const [userInfo, setUserInfo] = useState(storageService.getItem('userInfo'));
    const [applys, setApplys] = useState([]);
    const [mentorApplys, setMentorApplys] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (location.state && location.state.selectApplyTab) {
            setValue(1); // Select the "APPLYS" tab
        }
    }, [location]);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    useEffect(() => {
        // Fetch data only when the "APPLYS" tab is selected
        const fetchApplications = async () => {
            try {
                const params = {
                    page: 1,
                    limit: 10,
                    mentorName: '',
                    companyId: '',
                    createdDate: 'desc',
                };
                const response = await ApplicationAPI.getApplicationByStudentId(userInfo.studentId, params, false);
                console.log(response);

                setApplys(response.listResult);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchApplications();
    }, []);

    useEffect(() => {
        // Fetch data only when the "APPLYS" tab is selected
        const fetchTransactions = async () => {
            try {
                const params = {
                    page: 1,
                    limit: 10,
                    status: 'ALL',
                    companyId: '',
                    mentorName: '',
                    createdDate: 'desc',
                };
                const response = await TransactionAPI.getTransactionByAccountId(userInfo.id, params, false);
                const response2 = await MentorApplyAPI.findMentorApplysByStudentId(userInfo.studentId);
                console.log(response2);

                setMentorApplys(response2);
                setTransactions(response.listResult);

                console.log(transactions);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchTransactions();
    }, []);

    useEffect(() => {
        console.log(mentorApplys);
    }, [mentorApplys]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleRowClick = (mentee) => {
        setSelectedMentee(mentee);
    };

    const handleRowApplyClick = (applys) => {
        setSelectedApply(applys);
    };

    const handleCloseModal = () => {
        setSelectedMentee(null);
        setSelectedApply(null);
    };

    return (
        <Container id="companies" sx={{ py: { xs: 8, sm: 16 }, padding: { lg: 16 } }}>
            <Typography variant="h4" sx={{ mb: { xs: 2, sm: 4 } }}>
                History
            </Typography>
            <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
                <Tab icon={<PaymentIcon />} label="PAYMENTS" />
                <Tab
                    disabled={userInfo.role !== 'student'}
                    icon={userInfo.role === 'student' ? <SchoolIcon /> : null}
                    label={userInfo.role === 'student' ? 'APPLICATIONS' : null}
                />
                <Tab
                    disabled={userInfo.role !== 'student'}
                    icon={userInfo.role === 'student' ? <SchoolIcon /> : null}
                    label={userInfo.role === 'student' ? 'APPLYS' : null}
                />
            </Tabs>
            <CustomTabPanel value={value} index={0}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Transaction Time</StyledTableCell>
                                <StyledTableCell align="left">Receipt No.</StyledTableCell>
                                <StyledTableCell align="left">Point</StyledTableCell>
                                <StyledTableCell align="left">Status</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.length > 0 ? (
                                transactions.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.createdDate}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{row.id}</StyledTableCell>
                                        <StyledTableCell align="left">{row.points}</StyledTableCell>
                                        <StyledTableCell align="left">
                                            <Chip
                                                label={row.status}
                                                sx={{
                                                    backgroundColor:
                                                        row.status === 'SUCCESS'
                                                            ? 'success.main'
                                                            : row.status === 'In Progress'
                                                            ? 'info.main'
                                                            : row.status === 'FAILED'
                                                            ? 'error.main'
                                                            : 'default.main',
                                                    color: 'white',
                                                }}
                                            />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))
                            ) : (
                                <div></div>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">Send Day</StyledTableCell>
                                <StyledTableCell align="left">Mentor</StyledTableCell>
                                <StyledTableCell align="left">Company</StyledTableCell>
                                <StyledTableCell align="left">Status</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {applys.length > 0 ? (
                                applys.map((apply) => (
                                    <StyledTableRow
                                        key={apply.id} // Assuming 'id' is a unique identifier for each application
                                        onClick={() => handleRowClick(apply)}
                                        sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                            '&:hover': {
                                                cursor: 'pointer',
                                            },
                                        }}
                                    >
                                        <StyledTableCell component="th" scope="row">
                                            {apply.createdDate}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{apply.mentor.fullName}</StyledTableCell>
                                        <StyledTableCell align="left">{apply.mentor.company.name}</StyledTableCell>
                                        <StyledTableCell align="left">
                                            <Chip
                                                label={apply.status}
                                                sx={{
                                                    backgroundColor:
                                                        apply.status === 'APPROVED'
                                                            ? 'success.main'
                                                            : apply.status === 'IN PROCESS'
                                                            ? 'info.main'
                                                            : apply.status === 'REJECTED'
                                                            ? 'error.main'
                                                            : 'default.main',
                                                    color: 'white',
                                                }}
                                            />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))
                            ) : (
                                <div></div>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CustomTabPanel>
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
                        textAlign: 'left',
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
                        <Typography variant="h3">Message</Typography>
                        <Box sx={{ border: '2px solid #ccc', padding: 2, borderRadius: 3 }}>
                            <Typography>
                                Passionate about technology and its social impact. Over 10 years experience delivering
                                successful products in healthcare, eCommerce, digital media and international
                                fundraising. Strong focus on product, user-centricity, UX and lean processes. Interested
                                in Zen and Stoic philosophy. Enjoy deep thinking and deep work.
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Modal>
            <CustomTabPanel value={value} index={2}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">Tranning Time</StyledTableCell>
                                <StyledTableCell align="left">Mentor</StyledTableCell>
                                <StyledTableCell align="left">Company</StyledTableCell>
                                <StyledTableCell align="left">Status</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mentorApplys.map((apply) => (
                                <StyledTableRow
                                    key={apply.id} // Assuming 'id' is a unique identifier for each application
                                    onClick={() => handleRowApplyClick(apply)}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        '&:hover': {
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {new Date(apply.campaign.trainingStartDate).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        })}
                                        -{' '}
                                        {new Date(apply.campaign.trainingEndDate).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        })}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{apply.application.mentor.fullName}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        {apply.application.mentor.company.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Chip
                                            label={apply.status}
                                            sx={{
                                                backgroundColor:
                                                    apply.status === 'DONE'
                                                        ? 'success.main'
                                                        : apply.status === 'TRAINING'
                                                        ? 'info.main'
                                                        : 'default.main',
                                                color: 'white',
                                            }}
                                        />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Modal open={Boolean(selectedApply)} onClose={handleCloseModal}>
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
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 2,
                            }}
                        >
                            <Typography variant="h4">Feedback</Typography>
                            <TextField
                                id="feedback"
                                name="feedback"
                                label="Feedback"
                                multiline
                                rows={3}
                                sx={{ minWidth: '600px', flex: 1 }}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center', width: '100%' }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: '#365E32',
                                    }}
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
            </CustomTabPanel>
        </Container>
    );
}

export default StudentHistory;
