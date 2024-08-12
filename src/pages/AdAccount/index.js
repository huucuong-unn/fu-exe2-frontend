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
    FormControlLabel,
    Autocomplete,
    Card,
    Grid,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { Link } from 'react-router-dom';

import { styled } from '@mui/system';

import { useState, useEffect } from 'react';
import AccountAPI from '~/API/AccountAPI';
import { format } from 'date-fns';

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

const RoleChip = ({ role }) => {
    const roleMap = {
        admin: { label: 'Admin', color: 'error' },
        company: { label: 'Company', color: 'primary' },
        mentee: { label: 'Mentee', color: 'success' },
        student: { label: 'Student', color: 'warning' },
        mentor: { label: 'Mentor', color: 'info' },
    };

    const { label, color } = roleMap[role.name] || { label: 'Unknown', color: 'default' };

    return <Chip label={label} color={color} />;
};

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

const AccountModal = ({ open, handleClose, account, handleChangeStatus }) => {
    if (!account) return null;

    return (
        <Modal open={open} onClose={handleClose}>
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
                {account.status !== 'pending' && (
                    <Button
                        variant="contained"
                        sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                        }}
                        onClick={() => handleChangeStatus(account.id)}
                    >
                        Change status
                    </Button>
                )}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    <Avatar sx={{ width: 180, height: 180, bgcolor: '#f48fb1' }} />
                    <Typography variant="h5">{account.point} Point(s)</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 2, mb: 2 }}>
                    <TextField
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        size="medium"
                        sx={{ flex: 1 }}
                        defaultValue={account.username}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        size="medium"
                        defaultValue={account.email}
                        sx={{ flex: 1 }}
                    />
                </Box>
                <RoleChip role={account.role} />
            </Box>
        </Modal>
    );
};

function AdAccount() {
    const [selectedMentee, setSelectedMentee] = useState(null);
    const [selectedAccountPending, setSelectedAccountPending] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null);
    const [isCreateModal, setIsCreateModal] = useState(false);
    const [isApprove, setIsApprove] = useState(false);
    const status = ['PENDING', 'ACTIVE', 'INACTIVE'];
    const roles = ['admin', 'company', 'student', 'mentor', 'mentee'];
    const [imageError, setImageError] = useState(false);
    const [imageHelperText, setImageHelperText] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [universities, setUniversities] = useState([]);
    const [imageSelected, setImageSelected] = useState(false);
    const [isRejectModal, setIsRejectModal] = useState(false);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd MMMM , yyyy ');
    };
    const [searchParams, setSearchParams] = useState({
        userName: '',
        email: '',
        role: '',
        status: '',
    });
    const [params, setParams] = useState({
        userName: '' || null,
        email: '' || null,
        role: '' || null,
        status: '' || null,
        page: 1,
        limit: 7,
    });
    const [totalPage, setTotalPage] = useState(0);
    const [message, setMessage] = useState('');
    const [actionType, setActionType] = useState('');
    const [isPaging, setIsPaging] = useState(true);
    const IMAGE_HOST = process.env.REACT_APP_IMG_HOST;

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

    //new
    const handleOpenRejectModal = () => {
        setIsRejectModal(true);
        setMessage(null);
    };

    const handleCloseRejectModal = () => {
        setIsRejectModal(false);
        setMessage(null);
    };

    const handleConfirmRejectModal = async () => {
        // Handle confirm logic
        try {
            console.log(selectedAccountPending);
            await AccountAPI.rejectAccount(selectedAccountPending.id, message);
            await fetchData();
            setIsRejectModal(false);
            setSelectedAccountPending(null);
            setMessage(null);
        } catch (error) {
            setIsRejectModal(false);
            setMessage(null);
        }
    };

    const handleOpenCreateModal = () => {
        setIsCreateModal(true);
    };

    const handleCloseCreateModal = () => {
        setIsCreateModal(false);
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setParams((prev) => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (event, value) => {
        setParams((prev) => ({ ...prev, role: value }));
    };

    const handleStatusChange = (event, value) => {
        setParams((prev) => ({ ...prev, status: value }));
    };

    const handleRowClick = (account) => {
        setSelectedAccountPending(account);
    };

    const handleCloseModal = () => {
        setSelectedMentee(null);
        setSelectedAccountPending(null);
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

    const handleSubmit = async (event) => {
        const data = new FormData(event.currentTarget);
        data.append('roleName', 'admin');

        const createAccountRequest = {
            username: data.get('username'),
            password: data.get('password'),
            email: data.get('email'),
            avatarUrl: data.get('avatarUrl'),
            roleName: data.get('roleName'),
        };

        // Append `createAccountRequest` fields to FormData
        data.append('studentRequest.name', createAccountRequest.username);
        data.append('createAccountRequest.username', createAccountRequest.username);
        data.append('createAccountRequest.password', createAccountRequest.password);
        data.append('createAccountRequest.email', createAccountRequest.email);
        data.append('createAccountRequest.avatarUrl', createAccountRequest.avatarUrl);
        data.append('createAccountRequest.roleName', createAccountRequest.roleName);

        try {
            const result = await AccountAPI.createAccount(data);
            handleCloseCreateModal();
            await fetchData();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchData = async () => {
        try {
            const accountsData = await AccountAPI.getAccountForAdminSearch(params);
            console.log(accountsData);
            setAccounts(accountsData.listResult);
            setTotalPage(accountsData.totalPage);
        } catch (error) {
            setError('Error fetching data');
        }
    };

    useEffect(() => {
        fetchData();
    }, [isPaging]);

    useEffect(() => {
        console.log(params);
    }, [params]);

    const handleChangeStatus = async (accountId) => {
        try {
            await AccountAPI.changeStatus(accountId);
            fetchData();
        } catch (error) {
            setError('Error changing status');
        }
    };

    const PendingAccountModal = ({ open, handleClose, account }) => {
        const [isMessageModal, setIsMessageModal] = useState(false);
        if (!account) return null;

        const handleOpenMessageModal = () => {
            setIsMessageModal(true);
        };

        const handleCloseMessageModal = () => {
            setIsMessageModal(false);
            setMessage('');
        };
        const handleAccept = async () => {
            try {
                await AccountAPI.approveAccount(selectedAccountPending.id);
                setIsMessageModal(false);
                setSelectedMentee(null);
                setSelectedAccountPending(null);
                fetchData();
            } catch (error) {
                console.log(error);
            }
        };

        return (
            <Box>
                <Modal open={open} onClose={handleClose}>
                    <Box
                        sx={{
                            position: 'relative',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 700,
                            bgcolor: '#f5f5f5',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                            textAlign: 'center',
                            overflowY: 'auto',
                            maxHeight: '700px',
                        }}
                    >
                        {account.status === 'PENDING' ? (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 10,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                <Button variant="contained" color="success" onClick={handleAccept}>
                                    Approve
                                </Button>
                                <Button variant="contained" color="error" onClick={handleOpenRejectModal}>
                                    Reject
                                </Button>
                            </Box>
                        ) : (
                            <div></div>
                        )}

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <Avatar src={IMAGE_HOST + account.avatarUrl} sx={{ width: 80, height: 80 }} />
                        </Box>
                        {account.role.name === 'student' || account.role.name === 'STUDENT' ? (
                            <>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        p: 3,
                                        height: 'fit-content',
                                        width: '100%',
                                        background: 'none',
                                        mt: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '100%',
                                            display: 'flex',
                                            textAlign: 'left',
                                            flexDirection: 'column',
                                            alignItems: 'left',
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
                                            <Typography color="text.primary" variant="h5" fontWeight="bold">
                                                General Information
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(2, 1fr)',
                                                gap: 5,
                                                marginLeft: 2,
                                                marginRight: 2,
                                            }}
                                        >
                                            {[
                                                { label: 'Username', value: account.username },
                                                { label: 'Email', value: account.email },
                                                { label: 'Full Name', value: account.student.name },
                                                { label: 'University', value: account.student.university.name },
                                                { label: 'Day Of Birth', value: formatDate(account.student.dob) },
                                                { label: 'Student Code', value: account.student.studentCode },
                                            ].map((item, index) => (
                                                <Box
                                                    key={index}
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Typography color="gray" variant="h7">
                                                        {item.label}
                                                    </Typography>
                                                    <Typography color="black" variant="h7" fontWeight="bold">
                                                        {item.value}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </Card>

                                <Card
                                    variant="outlined"
                                    sx={{
                                        p: 3,
                                        height: 'fit-content',
                                        width: '100%',
                                        background: 'none',
                                        mt: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '100%',
                                            display: 'flex',
                                            textAlign: 'left',
                                            flexDirection: 'column',
                                            alignItems: 'left',
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
                                            <Typography color="text.primary" variant="h5" fontWeight="bold">
                                                Student Card
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                            <img
                                                height={300}
                                                width={300}
                                                src={`${IMAGE_HOST}${account.student.frontStudentCard}`}
                                                alt="Student Card"
                                            />
                                            <img
                                                height={300}
                                                width={300}
                                                src={`${IMAGE_HOST}${account.student.backStudentCard}`}
                                                alt="Student Card"
                                            />
                                        </Box>
                                    </Box>
                                </Card>
                            </>
                        ) : (
                            <div></div>
                        )}
                        {account.role.name === 'company' ? (
                            <>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        p: 3,
                                        height: 'fit-content',
                                        width: '100%',
                                        background: 'none',
                                        mt: 2,
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
                                            <Typography color="text.primary" variant="h5" fontWeight="bold">
                                                General information
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(3, 1fr)', // Tạo 3 cột với kích thước bằng nhau
                                                gap: 5,
                                                marginLeft: 2,
                                                marginRight: 2,
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
                                                    Company Name
                                                </Typography>
                                                <Typography color="black" variant="h7" fontWeight="bold">
                                                    {account.company.name}
                                                </Typography>
                                            </Box>
                                            <Box
                                                xs={12}
                                                sm={6}
                                                md={4}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: { md: 'center' },
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Typography color="gray" variant="h7">
                                                    Email
                                                </Typography>
                                                <Typography color="black" variant="h7" fontWeight="bold">
                                                    {account.email}
                                                </Typography>
                                            </Box>
                                            <Box
                                                xs={12}
                                                sm={6}
                                                md={4}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: { md: 'center' },
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Typography color="gray" variant="h7">
                                                    Company Type
                                                </Typography>
                                                <Typography color="black" variant="h7" fontWeight="bold">
                                                    {account.company.companyType}
                                                </Typography>
                                            </Box>
                                            <Box
                                                xs={12}
                                                sm={6}
                                                md={4}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: { md: 'center' },
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Typography color="gray" variant="h7">
                                                    Company Size
                                                </Typography>
                                                <Typography color="black" variant="h7" fontWeight="bold">
                                                    {account.company.companySize}
                                                </Typography>
                                            </Box>
                                            <Box
                                                xs={12}
                                                sm={6}
                                                md={4}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: { md: 'center' },
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Typography color="gray" variant="h7">
                                                    Country
                                                </Typography>
                                                <Typography color="black" variant="h7" fontWeight="bold">
                                                    {account.company.country}
                                                </Typography>
                                            </Box>
                                            <Box
                                                xs={12}
                                                sm={6}
                                                md={4}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: { md: 'center' },
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Typography color="gray" variant="h7">
                                                    Working Time
                                                </Typography>
                                                <Typography color="black" variant="h7" fontWeight="bold">
                                                    {account.company.workingTime}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Card>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        p: 3,
                                        height: 'fit-content',
                                        width: '100%',
                                        background: 'none',
                                        mt: 2,
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
                                            <Typography color="text.primary" variant="h5" fontWeight="bold">
                                                About
                                            </Typography>
                                        </Box>
                                        <Box sx={{ textAlign: 'center' }}>
                                            <Typography sx={{ width: '100%' }}>
                                                {account.company.description}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        p: 3,
                                        height: 'fit-content',
                                        width: '100%',
                                        background: 'none',
                                        mt: 2,
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
                                            <Typography color="text.primary" variant="h5" fontWeight="bold">
                                                Side information
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
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                    Address:
                                                </Typography>
                                                <Typography variant="subtitle1" sx={{ color: '#795548' }}>
                                                    {account.company.address}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                    Facebook Url:
                                                </Typography>
                                                <Typography variant="subtitle1" sx={{ color: '#795548' }}>
                                                    {account.company.facebookUrl}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                    Company Web Url:
                                                </Typography>
                                                <Typography variant="subtitle1" sx={{ color: '#795548' }}>
                                                    {account.company.companyWebsiteUrl}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Card>
                            </>
                        ) : (
                            <div></div>
                        )}
                        {account.role.name === 'mentor' ? (
                            <>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        p: 3,
                                        height: 'fit-content',
                                        width: '100%',
                                        background: 'none',
                                        mt: 2,
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
                                            <Typography color="text.primary" variant="h5" fontWeight="bold">
                                                General information
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(2, 1fr)', // Tạo 3 cột với kích thước bằng nhau
                                                gap: 5,
                                                marginLeft: 2,
                                                marginRight: 2,
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
                                                    Username
                                                </Typography>
                                                <Typography color="black" variant="h7" fontWeight="bold">
                                                    {account.username}
                                                </Typography>
                                            </Box>
                                            <Box
                                                xs={12}
                                                sm={6}
                                                md={4}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: { md: 'center' },
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Typography color="gray" variant="h7">
                                                    Email
                                                </Typography>
                                                <Typography color="black" variant="h7" fontWeight="bold">
                                                    {account.email}
                                                </Typography>
                                            </Box>
                                            <Box
                                                xs={12}
                                                sm={6}
                                                md={4}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: { md: 'center' },
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Typography color="gray" variant="h7">
                                                    Company
                                                </Typography>
                                                <Typography color="black" variant="h7" fontWeight="bold">
                                                    {account.mentor.company.name}
                                                </Typography>
                                            </Box>
                                            <Box
                                                xs={12}
                                                sm={6}
                                                md={4}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: { md: 'center' },
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Typography color="gray" variant="h7">
                                                    Full Name
                                                </Typography>
                                                <Typography color="black" variant="h7" fontWeight="bold">
                                                    {account.mentor.fullName}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Card>
                            </>
                        ) : (
                            <div></div>
                        )}
                    </Box>
                </Modal>
                <Modal
                    open={isRejectModal}
                    onClose={handleCloseRejectModal}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography sx={{ mt: 2 }}>What do you want to tell ?</Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            sx={{ mt: 2 }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button onClick={handleCloseRejectModal} sx={{ mr: 2 }}>
                                Cancel
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleConfirmRejectModal}>
                                Confirm
                            </Button>
                        </Box>
                    </Box>
                </Modal>

                <Modal open={isMessageModal} onClose={handleCloseMessageModal}>
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
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 2,
                            }}
                        >
                            <Typography variant="h4">Message</Typography>
                            <TextField
                                id="feedback"
                                name="feedback"
                                label="Message..."
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
            </Box>
        );
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
                        label="Username..."
                        variant="outlined"
                        size="small"
                        name="userName"
                        value={params.userName}
                        onChange={handleSearchChange}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Email..."
                        variant="outlined"
                        size="small"
                        name="email"
                        value={params.email}
                        onChange={handleSearchChange}
                    />
                    <Autocomplete
                        disablePortal
                        id="role-select"
                        options={roles}
                        sx={{ width: 200 }}
                        value={params.role}
                        onChange={handleRoleChange}
                        renderInput={(params) => <TextField {...params} label="Role..." />}
                        size="small"
                    />
                    <Autocomplete
                        disablePortal
                        id="status-select"
                        options={status}
                        sx={{ width: 200 }}
                        value={params.status}
                        onChange={handleStatusChange}
                        renderInput={(params) => <TextField {...params} label="Status..." />}
                        size="small"
                    />
                    <Button variant="contained" size="medium" onClick={fetchData}>
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
                                Username
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Email
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Role
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts.map((account, index) => (
                            <TableRow
                                key={account.id}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': {
                                        cursor: 'pointer',
                                    },
                                }}
                                onClick={() => handleRowClick(account)}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {account.username}
                                </TableCell>
                                <TableCell align="left">{account.email}</TableCell>
                                <TableCell align="left">
                                    <RoleChip role={account.role} />
                                </TableCell>
                                <TableCell align="left">
                                    {account.status === 'PENDING' ? (
                                        <Typography color="orange" fontWeight="bold">
                                            Pending
                                        </Typography>
                                    ) : account.status === 'REJECTED' ? (
                                        <Typography color="red" fontWeight="bold">
                                            Rejected
                                        </Typography>
                                    ) : (
                                        <FormControlLabel
                                            control={<IOSSwitch sx={{ m: 1 }} checked={account.status === 'ACTIVE'} />}
                                            label={account.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                                            onClick={(event) => event.stopPropagation()}
                                            onChange={() => handleChangeStatus(account.id)}
                                        />
                                    )}
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
            <AccountModal
                open={Boolean(selectedMentee)}
                handleClose={handleCloseModal}
                account={selectedMentee}
                handleChangeStatus={handleChangeStatus}
            />
            <PendingAccountModal
                open={Boolean(selectedAccountPending)}
                handleClose={handleCloseModal}
                account={selectedAccountPending}
            />
            <Modal open={isCreateModal} onClose={handleCloseCreateModal}>
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
                            // my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h4">
                            Create account for admin
                        </Typography>

                        <Box onSubmit={handleSubmit} component="form" sx={{ mt: 5 }}>
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
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar
                                    alt="Avatar"
                                    src={imagePreview}
                                    sx={{ width: 90, height: 90, border: 'solid 2px black' }}
                                    helperText="Avatar"
                                />
                            </Box>
                            <Button
                                variant="contained"
                                sx={{ mt: 2 }}
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
                                {imageSelected ? 'Remove Avatar' : 'Please Choose Avatar'}
                            </Button>
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
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    sx={{ flex: 1 }}
                                />
                            </Box>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="phone"
                                label="Phone Number"
                                name="phone"
                                autoComplete="phone"
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                type="email"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                autoComplete="current-password"
                            />
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Create{' '}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}

export default AdAccount;
