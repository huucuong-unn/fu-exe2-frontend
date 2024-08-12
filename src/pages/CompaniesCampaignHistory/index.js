import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, CardContent, Chip, Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CampaignAPI from '~/API/CampaignAPI';

function CompaniesCampaignHistory() {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [campaigns, setCampaigns] = useState([]);
    const navigate = useNavigate();
    const [sort, setSort] = useState({
        page: 1,
        limit: 10,
    });
    const IMGAGE_HOST = process.env.REACT_APP_IMG_HOST;

    const handlePageChange = (event, value) => {
        setSort((prev) => ({
            ...prev,
            page: value,
        }));
    };

    const handleItemClick = (index, companyId) => {
        setSelectedItemIndex(index);
        navigate(`/company/campaign-details/${companyId}`);
    };

    const mentors = [
        {
            profilePicture: 'https://ih1.redbubble.net/image.5481662153.7016/st,small,507x507-pad,600x600,f8f8f8.jpg',
            participationTime: '1/1/2024 - 1/7/2024',
            title: 'Spring Campaign 2024',
            description:
                'Passionate about technology and its social impact. Over 10 years experience delivering successful products in healthcare, eCommerce, digital media and international fundraising. Strong focus on product, user-centricity, UX and lean processes. Interested in Zen and Stoic philosophy. Enjoy deep thinking and deep work.',
            status: 'Tranning',
            numberOfMentor: 10,
        },
        {
            profilePicture:
                'https://www.shutterstock.com/image-vector/cat-meme-sassy-sassycat-white-260nw-2008304912.jpg',
            participationTime: '1/1/2024 - 1/7/2024',
            title: 'Summer Campaign 2024',
            description:
                'Passionate about technology and its social impact. Over 10 years experience delivering successful products in healthcare, eCommerce, digital media and international fundraising. Strong focus on product, user-centricity, UX and lean processes. Interested in Zen and Stoic philosophy. Enjoy deep thinking and deep work.',
            status: 'Company-apply',
            numberOfMentor: 5,
        },
        {
            profilePicture:
                'https://www.shutterstock.com/image-vector/cat-meme-sassy-sassycat-white-260nw-2008304912.jpg',
            participationTime: '1/1/2024 - 1/7/2024',
            title: 'Fall Campaign 2024',
            description:
                'Passionate about technology and its social impact. Over 10 years experience delivering successful products in healthcare, eCommerce, digital media and international fundraising. Strong focus on product, user-centricity, UX and lean processes. Interested in Zen and Stoic philosophy. Enjoy deep thinking and deep work.',
            status: 'Mentee-apply',
            numberOfMentor: 3,
        },
        {
            profilePicture:
                'https://www.shutterstock.com/image-vector/cat-meme-sassy-sassycat-white-260nw-2008304912.jpg',
            participationTime: 'CEO at Tortee',
            title: 'Winter Campaign 2024',
            description:
                'Passionate about technology and its social impact. Over 10 years experience delivering successful products in healthcare, eCommerce, digital media and international fundraising. Strong focus on product, user-centricity, UX and lean processes. Interested in Zen and Stoic philosophy. Enjoy deep thinking and deep work.',
            status: 'Close',
            numberOfMentor: 7,
        },
    ];

    useEffect(() => {
        const getAll = async () => {
            try {
                const campaignData = await CampaignAPI.getAll(sort);
                setCampaigns(campaignData.listResult);
                setTotalPage(campaignData.totalPage);
            } catch (error) {
                console.log(error);
            }
        };

        getAll();
    }, [sort]);

    useEffect(() => {
        console.log(campaigns);
    }, [campaigns]);

    return (
        <Container id="campaign-history" sx={{ py: { xs: 8, sm: 16 }, padding: { lg: 16 } }}>
            <Grid container spacing={6}>
                <Grid item xs={12} md={12}>
                    <Typography variant="h4" sx={{ mb: { xs: 2, sm: 4 } }}>
                        Campaign History
                    </Typography>
                    {campaigns.length === 0 && (
                        <div>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: { xs: 2, sm: 4 } }}>
                                No Campaign found
                            </Typography>
                        </div>
                    )}
                    {campaigns.length > 0 &&
                        campaigns?.map((campaign, index) => (
                            <Card
                                key={index}
                                variant="outlined"
                                component={Button}
                                sx={{
                                    p: 3,
                                    height: 'fit-content',
                                    width: '100%',
                                    background: 'none',

                                    position: 'relative',
                                }}
                                onClick={() => handleItemClick(index, campaign.id)}
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
                                    <Box
                                        sx={{
                                            color: (theme) => {
                                                if (theme.palette.mode === 'light') {
                                                    return selectedItemIndex === index ? 'primary.main' : 'grey.300';
                                                }
                                                return selectedItemIndex === index ? 'primary.main' : 'grey.700';
                                            },
                                        }}
                                    >
                                        <Avatar
                                            alt="avatar image"
                                            src={IMGAGE_HOST + campaign?.img}
                                            sx={{ width: 150, height: 150 }}
                                        />
                                    </Box>
                                    <Box sx={{ textTransform: 'none' }}>
                                        <Typography
                                            color="text.primary"
                                            variant="body1"
                                            fontWeight="bold"
                                            fontSize={'24px'}
                                        >
                                            {campaign?.name}
                                        </Typography>
                                        <Typography
                                            color="text.secondary"
                                            variant="body2"
                                            sx={{ my: 1 }}
                                            fontSize={'16px'}
                                        >
                                            {new Date(campaign?.startDate).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })}
                                            -{' '}
                                            {new Date(campaign?.endDate).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })}
                                        </Typography>
                                        <Typography
                                            color="text.secondary"
                                            variant="body2"
                                            sx={{ my: 2 }}
                                            fontSize={'14px'}
                                        >
                                            {campaign?.description}
                                        </Typography>
                                        <CardContent>
                                            <Chip
                                                key={index}
                                                label={campaign.status}
                                                sx={{ mr: 2, mb: 1 }}
                                                onClick={() => {}}
                                                color={
                                                    campaign.status === 'COMPANY_APPLY'
                                                        ? 'primary'
                                                        : campaign.status === 'STUDENT_APPLY'
                                                        ? 'secondary'
                                                        : campaign.status === 'TRAINING'
                                                        ? 'success'
                                                        : campaign.status === 'CLOSE'
                                                        ? 'error'
                                                        : 'default'
                                                }
                                            />
                                        </CardContent>
                                        <br />
                                        <Link to={'/company/campaign-details'}>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    width: { lg: '40%', md: '70%', xs: '80%' },
                                                    mr: '10%',
                                                    backgroundColor: '#365E32',
                                                    '&:hover': {
                                                        backgroundColor: '#508D4E',
                                                    },
                                                }}
                                            >
                                                View Campaign Detail
                                            </Button>
                                        </Link>
                                        {campaign.status === 'Company-apply' && (
                                            <Link to={'/mentor/id'}>
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    sx={{ width: { lg: '40%', md: '70%', xs: '80%' } }}
                                                >
                                                    Create Mentor
                                                </Button>
                                            </Link>
                                        )}
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        m: 2, // margin để tránh sát viền
                                    }}
                                >
                                    <Typography color="text.secondary" variant="body2" fontSize={'14px'}>
                                        {mentors[0].numberOfMentor} Mentor
                                    </Typography>
                                </Box>
                            </Card>
                        ))}
                </Grid>
            </Grid>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
                <Pagination
                    count={totalPage}
                    page={sort.page}
                    onChange={handlePageChange}
                    renderItem={(item) => (
                        <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
                    )}
                />
            </Box>
        </Container>
    );
}

export default CompaniesCampaignHistory;
