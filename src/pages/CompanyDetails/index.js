import {
    Container,
    Grid,
    Typography,
    Card,
    Box,
    Avatar,
    CardContent,
    Button,
    Tabs,
    Tab,
    Chip,
    Stack,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import FacebookIcon from '@mui/icons-material/Facebook';
import LanguageIcon from '@mui/icons-material/Language';
import StarIcon from '@mui/icons-material/Star';

import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CompanyAPI from '~/API/CompanyAPI';
import MentorAPI from '~/API/MentorAPI';
import SkillAPI from '~/API/SkillAPI';

function CompanyDetails() {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const { companyId } = useParams();
    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    const [company, setCompany] = useState({});
    const [similarMentor, setSimilarMentor] = useState([]);
    const [skills, setSkills] = useState([]);
    const IMGAGE_HOST = process.env.REACT_APP_IMG_HOST;
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleItemClick = (index, mentorId) => {
        setSelectedItemIndex(index);
        navigate(`/mentor/${mentorId}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToSection = (sectionId) => {
        const sectionElement = document.getElementById(sectionId);
        const offset = 128;
        if (sectionElement) {
            const targetScroll = sectionElement.offsetTop - offset;
            sectionElement.scrollIntoView({ behavior: 'smooth' });
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        const getCompanyById = async () => {
            try {
                const companyData = await CompanyAPI.getCompanyById(companyId);
                setCompany(companyData);
            } catch (error) {
                console.log(error);
            }
        };
        getCompanyById();
    }, [companyId]);

    useEffect(() => {
        const getMentorsByCompanyId = async () => {
            try {
                const mentorData = await MentorAPI.getMentorsByCompanyId(companyId);
                const skillData = await SkillAPI.getALLByCompanyId(companyId);
                setSkills(skillData);
                setSimilarMentor(mentorData);
            } catch (error) {
                console.log(error);
            }
        };

        getMentorsByCompanyId();
    }, [company, companyId]);

    useEffect(() => {
        console.log(similarMentor);
    }, [similarMentor]);

    return (
        <Container id="company" sx={{ py: { xs: 8, sm: 16 }, padding: { lg: 16 } }}>
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
                                    src={IMGAGE_HOST + company.account.avatarUrl}
                                    sx={{ width: 150, height: 150 }}
                                />
                            </Box>
                            <Box sx={{ textTransform: 'none', width: '100%' }}>
                                <Typography color="text.primary" variant="body1" fontWeight="bold" fontSize={'24px'}>
                                    {company.name}
                                </Typography>
                                <Typography color="text.secondary" variant="body2" sx={{ my: 1 }} fontSize={'16px'}>
                                    {company.address}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', textTransform: 'none', gap: 1 }}>
                                    <PersonIcon />
                                    <Typography color="text.secondary" variant="body2" sx={{ my: 1 }} fontSize={'16px'}>
                                        {similarMentor.length} Mentor Available
                                    </Typography>
                                </Box>
                                <CardContent>
                                    <Button
                                        variant="contained"
                                        onClick={() => scrollToSection('mentors')}
                                        sx={{
                                            width: '100%',
                                            mr: '10%',
                                            backgroundColor: '#365E32',
                                            '&:hover': {
                                                backgroundColor: '#508D4E',
                                            },
                                        }}
                                    >
                                        To Ours Mentor
                                    </Button>
                                </CardContent>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Overview" {...a11yProps(0)} />
                    </Tabs>
                </Box>
                <CustomTabPanel
                    value={value}
                    index={0}
                    sx={{
                        paddingLeft: 0,
                        paddingRight: 0,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
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
                                    <Typography color="gray" variant="h7">
                                        Company type
                                    </Typography>
                                    <Typography color="black" variant="h6" fontWeight="bold">
                                        {company?.companyType}
                                    </Typography>
                                </Box>
                                <Box xs={12} sm={6} md={4}>
                                    <Typography color="gray" variant="h7">
                                        Company size
                                    </Typography>
                                    <Typography color="black" variant="h6" fontWeight="bold">
                                        {company?.companySize} employees
                                    </Typography>
                                </Box>
                                <Box xs={12} sm={6} md={4}>
                                    <Typography color="gray" variant="h7">
                                        Country
                                    </Typography>
                                    <Typography color="black" variant="h6" fontWeight="bold">
                                        {company?.country}
                                    </Typography>
                                </Box>
                                <Box xs={12} sm={6} md={4}>
                                    <Typography color="gray" variant="h7">
                                        Working days
                                    </Typography>
                                    <Typography color="black" variant="h6" fontWeight="bold">
                                        {company.workingTime}
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
                            paddingLeft: 0,
                            paddingRight: 0,
                            marginTop: 2,
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
                                    Company Overview
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
                                <Typography color="text.primary">{company.description}</Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'left',
                                    alignItems: 'center',
                                    gap: 4,
                                    marginLeft: 2,
                                    marginRight: 2,
                                    paddingBottom: 2,
                                }}
                            >
                                {company?.companyWebsiteUrl && (
                                    <Box
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: 1,
                                            '&:hover': {
                                                textDecoration: 'underline',
                                                cursor: 'pointer',
                                            },
                                        }}
                                    >
                                        <LanguageIcon />
                                        <a style={{ textDecoration: 'none' }} href={company?.companyWebsiteUrl}>
                                            <Typography color="gray" variant="h7">
                                                Company website
                                            </Typography>
                                        </a>
                                    </Box>
                                )}
                                {company?.facebookUrl && (
                                    <Box
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: 1,
                                            '&:hover': {
                                                textDecoration: 'underline',
                                                cursor: 'pointer',
                                            },
                                        }}
                                    >
                                        <FacebookIcon />
                                        <a style={{ textDecoration: 'none' }} href={company.facebookUrl}>
                                            <Typography color="gray" variant="h7">
                                                Fanpage Facebook
                                            </Typography>
                                        </a>
                                    </Box>
                                )}
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
                            paddingLeft: 0,
                            paddingRight: 0,
                            marginTop: 2,
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
                                    Our key skills
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'left',
                                    alignItems: 'center',
                                    gap: 2,
                                    marginLeft: 2,
                                    marginRight: 2,
                                    paddingBottom: 2,
                                }}
                            >
                                {skills.length > 0 &&
                                    skills.map((skill, index) => <Chip label={skill?.skillName} key={index} />)}
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
                            paddingLeft: 0,
                            paddingRight: 0,
                            marginTop: 2,
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
                                paddingLeft: 2,
                                paddingRight: 2,
                                paddingBottom: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    paddingBottom: 2,
                                    borderBottom: '1px dashed #e0e0e0',
                                }}
                            >
                                <Typography color="text.primary" variant="body1" fontWeight="bold" fontSize={'24px'}>
                                    Mentor Available
                                </Typography>
                            </Box>
                            <Grid container spacing={2} id="mentors">
                                {similarMentor.length > 0 &&
                                    similarMentor?.map((mentor, index) => (
                                        <Grid item xs={12} md={12} key={index}>
                                            <Stack
                                                direction="column"
                                                justifyContent="center"
                                                alignItems="flex-start"
                                                spacing={2}
                                                useFlexGap
                                                sx={{ width: '100%', display: { xs: 8, sm: 'flex' } }}
                                            >
                                                <Card
                                                    variant="outlined"
                                                    component={Button}
                                                    sx={{
                                                        p: 3,
                                                        height: 'fit-content',
                                                        width: '100%',
                                                        background: 'none',
                                                    }}
                                                    onClick={() => handleItemClick(index, mentor.mentorProfile.id)}
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
                                                                src={mentor?.mentorProfile?.profilePicture}
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
                                                                    {
                                                                        mentor?.mentorProfile?.mentorDTO?.account
                                                                            ?.username
                                                                    }
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
                                                                {mentor?.mentorProfile?.shortDescription}
                                                            </Typography>

                                                            <Typography
                                                                color="text.secondary"
                                                                variant="body2"
                                                                sx={{ my: 2 }}
                                                                fontSize={'14px'}
                                                            >
                                                                {mentor?.mentorProfile?.description}
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
                                                                    {mentor.skills?.map((skill, index) => (
                                                                        <Chip label={skill.skill.name} key={index} />
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
                                                                <Button
                                                                    variant="contained"
                                                                    size="large"
                                                                    sx={{
                                                                        height: '100%',
                                                                        backgroundColor: '#365E32',
                                                                    }}
                                                                >
                                                                    View Profile
                                                                </Button>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Card>
                                            </Stack>
                                        </Grid>
                                    ))}
                            </Grid>
                        </Box>
                    </Card>
                </CustomTabPanel>
            </Box>
        </Container>
    );
}

export default CompanyDetails;
