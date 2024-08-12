import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
    Avatar,
    CardContent,
    Checkbox,
    Chip,
    Divider,
    FormControlLabel,
    FormGroup,
    Modal,
    TextField,
    Skeleton,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import MentorAPI from '~/API/MentorAPI';

const modalItems = {
    companies: ['FPT', 'VNG', 'Nashtech', 'Tortee', 'Google', 'Facebook', 'Amazon', 'Microsoft'],
    jobTitles: ['Software Engineer', 'Product Manager', 'UX Designer', 'CTO', 'CEO', 'Founder'],
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
};

function SearchFilter({ searchKeyword, setSearchKeyword }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSearchChange = (event) => {
        setSearchKeyword(event.target.value);
    };

    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{
                pt: 2,
                width: { xs: '100%', sm: '100%%', lg: '100%' },
                display: 'flex',
                justifyContent: 'center',
                mb: 10,
            }}
        >
            <TextField
                id="outlined-basic"
                hiddenLabel
                size="medium"
                variant="outlined"
                placeholder="Search mentor name or skill"
                inputProps={{
                    autoComplete: 'off',
                    'aria-label': 'Search by company, role, or skill',
                }}
                sx={{ width: { sx: '100%', sm: '70%', lg: '60%' } }}
                value={searchKeyword}
                onChange={handleSearchChange}
            />
            <Button
                variant="contained"
                sx={{
                    width: 105,
                    borderRadius: 1,
                    backgroundColor: '#365E32',
                    '&:hover': {
                        backgroundColor: '#508D4E',
                    },
                }}
                onClick={handleOpen}
            >
                Filter
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h3"
                        sx={{ textAlign: 'center', fontWeight: 'bold' }}
                    >
                        Filters
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography id="modal-modal-title" variant="h6" component="h3" sx={{ my: 2, fontWeight: 'bold' }}>
                        Companies
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <FormGroup>
                            <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 8 }}>
                                {Array.from(modalItems.companies).map((company, index) => (
                                    <Grid item xs={2} sm={4} md={4} key={index}>
                                        <FormControlLabel control={<Checkbox />} label={company} />
                                    </Grid>
                                ))}
                            </Grid>
                        </FormGroup>
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            width: 150,
                            borderRadius: 3,
                            display: 'flex',
                            backgroundColor: '#365E32',
                            '&:hover': {
                                backgroundColor: '#508D4E',
                            },
                        }}
                        onClick={() => handleClose()}
                    >
                        Show Results
                    </Button>
                </Box>
            </Modal>
        </Stack>
    );
}

export default function Mentors() {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [mentors, setMentors] = useState([]);
    const [allMentors, setAllMentors] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
    });

    const [totalPage, setTotalPage] = useState(0);
    const [countMentor, setCountMentor] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState('');
    const navigate = useNavigate();
    const handlePageChange = (event, value) => {
        setPagination((prev) => ({
            ...prev,
            page: value,
        }));
    };

    const handleItemClick = (index, mentorId) => {
        setSelectedItemIndex(index);
        navigate(`/mentor/${mentorId}`);
    };

    useEffect(() => {
        const getAll = async () => {
            try {
                const getAllWithStatusActive = await MentorAPI.getAllWithStatusActive(pagination);
                setMentors(getAllWithStatusActive.listResult);
                setAllMentors(getAllWithStatusActive.listResult);
                setTotalPage(getAllWithStatusActive.totalPage);
                setCountMentor(getAllWithStatusActive.totalCount);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        getAll();
    }, [pagination]);

    useEffect(() => {
        const filterMentors = () => {
            if (searchKeyword === '') {
                // Nếu từ khóa tìm kiếm trống, hiển thị tất cả mentors
                setMentors(allMentors);
            } else {
                // Lọc danh sách mentors dựa trên từ khóa tìm kiếm
                const filteredMentors = allMentors.filter((mentor) => {
                    return mentor.mentorProfile.mentorDTO.account.username
                        .toLowerCase()
                        .includes(searchKeyword.toLowerCase());
                });
                setMentors(filteredMentors);
            }
        };

        filterMentors();
    }, [searchKeyword]);
    const IMGAGE_HOST = process.env.REACT_APP_IMG_HOST;

    return (
        <Container id="mentors" sx={{ py: { xs: 8, sm: 16 }, padding: { lg: 16 } }}>
            <SearchFilter searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />
            <Grid container spacing={6}>
                {loading ? (
                    Array.from(new Array(6)).map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
                            <Card
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    flexGrow: 1,
                                    p: 1,
                                }}
                            >
                                <CardContent>
                                    <Skeleton variant="text" height={30} width="80%" sx={{ mb: 1 }} />
                                    <Skeleton variant="text" height={30} width="60%" sx={{ mb: 1 }} />
                                    <Skeleton variant="text" height={30} width="40%" sx={{ mb: 1 }} />
                                </CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        pr: 2,
                                    }}
                                >
                                    <Skeleton variant="circular" width={40} height={40} />
                                    <Skeleton variant="rectangular" width={64} height={64} />
                                </Box>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12} md={12}>
                        <Typography variant="h4" sx={{ mb: { xs: 2, sm: 4 } }}>
                            {countMentor} mentors found
                        </Typography>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="flex-start"
                            spacing={2}
                            useFlexGap
                            sx={{ width: '100%', display: { xs: 8, sm: 'flex' } }}
                        >
                            {mentors.length > 0 &&
                                mentors?.map((mentor, index) => (
                                    <Card
                                        key={index}
                                        variant="outlined"
                                        component={Button}
                                        onClick={() => handleItemClick(index, mentor.mentorProfile.id)}
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
                                                    src={IMGAGE_HOST + mentor.mentorProfile.profilePicture}
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
                                                    {mentor.skills?.map((skill, index) => (
                                                        <Chip
                                                            key={index}
                                                            label={skill.skill.name}
                                                            sx={{ mr: 2, mb: 1 }}
                                                            onClick={() => {}}
                                                        />
                                                    ))}
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
                                                    <Link to={'/mentor/id'} style={{ textDecoration: 'none' }}>
                                                        <Button
                                                            variant="contained"
                                                            size="large"
                                                            sx={{
                                                                width: '100%',
                                                                height: '100%',
                                                                backgroundColor: '#365E32',
                                                                '&:hover': {
                                                                    backgroundColor: '#508D4E',
                                                                },
                                                            }}
                                                        >
                                                            View Profile
                                                        </Button>
                                                    </Link>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Card>
                                ))}
                        </Stack>
                    </Grid>
                )}
            </Grid>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
                <Pagination
                    count={totalPage}
                    page={pagination.page}
                    onChange={handlePageChange}
                    renderItem={(item) => (
                        <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
                    )}
                />
            </Box>
        </Container>
    );
}
