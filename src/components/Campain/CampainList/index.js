import React, { useState, useEffect } from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    Pagination,
    PaginationItem,
} from '@mui/material';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useCampaignData from '~/hooks/Campaign/useCampaignData';

const CampaignList = () => {
    const { campaigns, loading, error, page, totalPages, setPage } = useCampaignData();
    const [selectedYear, setSelectedYear] = useState('');
    const navigate = useNavigate();
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const IMGAGE_HOST = process.env.REACT_APP_IMG_HOST;

    const getUniqueYears = () => {
        const years = campaigns.map((campaign) => new Date(campaign.startDate).getFullYear());
        return [...new Set(years)];
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleItemClick = (index, campaignId) => {
        setSelectedItemIndex(index);
        navigateToCampaignDetail(campaignId);
    };

    const navigateToCampaignDetail = (campaignId) => {
        navigate(`/campaigns/${campaignId}`);
        window.scrollTo(0, 0);
    };

    const filteredCampaigns = selectedYear
        ? campaigns.filter((campaign) => new Date(campaign.startDate).getFullYear() === parseInt(selectedYear))
        : campaigns;

    useEffect(() => {
        console.log(campaigns);
    }, [campaigns]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Typography variant="body1">Error loading campaigns: {error.message}</Typography>;
    }

    if (!campaigns || campaigns.length === 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '80vh',
                    flexDirection: 'column',
                    p: 3,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Campaigns
                </Typography>
                <Box
                    sx={{
                        p: 2,
                        border: '1px solid',
                        borderColor: 'grey.300',
                        borderRadius: 1,
                        boxShadow: 1,
                        textAlign: 'center',
                        width: '80%',
                        mx: 'auto',
                    }}
                >
                    <Typography variant="body1">No campaigns available for now</Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Container id="campaign-history" sx={{ py: { xs: 8, sm: 16 }, padding: { lg: 16 } }}>
            <Grid container spacing={6}>
                <Grid item xs={12} md={12}>
                    <Typography variant="h4" sx={{ mb: { xs: 2, sm: 4 } }}>
                        Campaigns
                    </Typography>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel id="select-year-label">Select Year</InputLabel>
                            <Select
                                labelId="select-year-label"
                                id="select-year"
                                value={selectedYear}
                                label="Select Year"
                                onChange={handleYearChange}
                            >
                                <MenuItem value="">
                                    <em>All Years</em>
                                </MenuItem>
                                {getUniqueYears().map((year) => (
                                    <MenuItem key={year} value={year}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Grid container spacing={6}>
                        {filteredCampaigns.map((campaign, index) => (
                            <Grid item xs={12} md={12} key={index}>
                                <Card
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
                                                        return selectedItemIndex === index
                                                            ? 'primary.main'
                                                            : 'grey.300';
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
                                                {campaign.name}
                                            </Typography>
                                            <Typography
                                                color="text.secondary"
                                                variant="body2"
                                                sx={{ my: 1 }}
                                                fontSize={'16px'}
                                            >
                                                {campaign.startDate} - {campaign.endDate}
                                            </Typography>
                                            <Typography
                                                color="text.secondary"
                                                variant="body2"
                                                sx={{ my: 2 }}
                                                fontSize={'14px'}
                                            >
                                                {campaign.description}
                                            </Typography>
                                            <CardContent>
                                                <Chip
                                                    label={campaign.status}
                                                    sx={{ mr: 2, mb: 1 }}
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
                                            </CardContent>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                sx={{ width: { lg: '40%', md: '70%', xs: '80%' } }}
                                            >
                                                View Campaign Detail
                                            </Button>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            m: 2,
                                        }}
                                    >
                                        <Typography color="text.secondary" variant="body2" fontSize={'14px'}>
                                            Your Mentee: {campaign.numberOfMentee}
                                        </Typography>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                            renderItem={(item) => (
                                <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
                            )}
                            color="primary"
                        />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CampaignList;
