import {
    Container,
    Grid,
    TextField,
    Button,
    Typography as TypographyMaterial,
    Autocomplete,
    Skeleton,
    CardContent,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { AspectRatio, Avatar, Box, Card, IconButton, Typography, Link } from '@mui/joy';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

import { useState, useEffect } from 'react';
import CompanyAPI from '~/API/CompanyAPI';

function Companies() {
    const locations = [
        'An Giang',
        'Ba Ria - Vung Tau',
        'Bac Giang',
        'Bac Kan',
        'Bac Lieu',
        'Bac Ninh',
        'Ben Tre',
        'Binh Dinh',
        'Binh Duong',
        'Binh Phuoc',
        'Binh Thuan',
        'Ca Mau',
        'Can Tho',
        'Cao Bang',
        'Da Nang',
        'Dak Lak',
        'Dak Nong',
        'Dien Bien',
        'Dong Nai',
        'Dong Thap',
        'Gia Lai',
        'Ha Giang',
        'Ha Nam',
        'Ha Noi',
        'Ha Tinh',
        'Hai Duong',
        'Hai Phong',
        'Hau Giang',
        'Hoa Binh',
        'Hung Yen',
        'Khanh Hoa',
        'Kien Giang',
        'Kon Tum',
        'Lai Chau',
        'Lam Dong',
        'Lang Son',
        'Lao Cai',
        'Long An',
        'Nam Dinh',
        'Nghe An',
        'Ninh Binh',
        'Ninh Thuan',
        'Phu Tho',
        'Phu Yen',
        'Quang Binh',
        'Quang Nam',
        'Quang Ngai',
        'Quang Ninh',
        'Quang Tri',
        'Soc Trang',
        'Son La',
        'Tay Ninh',
        'Thai Binh',
        'Thai Nguyen',
        'Thanh Hoa',
        'Thua Thien Hue',
        'Tien Giang',
        'Ho Chi Minh',
        'Tra Vinh',
        'Tuyen Quang',
        'Vinh Long',
        'Vinh Phuc',
        'Yen Bai',
    ];
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState({
        page: 1,
        limit: 9,
        name: '',
        address: '',
    });
    const [totalPage, setTotalPage] = useState(0);
    const [countCompany, setCountCompany] = useState(0);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    const IMGAGE_HOST = process.env.REACT_APP_IMG_HOST;

    const handlePageChange = (event, value) => {
        setSort((prev) => ({
            ...prev,
            page: value,
        }));
    };

    const handleItemClick = (index, companyId) => {
        setSelectedItemIndex(index);
        navigate(`/company/${companyId}`);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleAddressChange = (event, value) => {
        setAddress(value);
    };

    const handleFindCompany = () => {
        setSort({
            ...sort,
            name: name,
            address: address,
        });
    };

    useEffect(() => {
        const getAllWithStatusActive = async () => {
            try {
                const companiesData = await CompanyAPI.searchSortCompany(sort);
                setCompanies(companiesData.listResult);
                setTotalPage(companiesData.totalPage);
                setCountCompany(companiesData.totalCount);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getAllWithStatusActive();
    }, [sort]);

    useEffect(() => {
        console.log(companies);
    }, [companies]);

    return (
        <Container id="companies" sx={{ py: { xs: 8, sm: 16 }, padding: { lg: 16 } }}>
            <TypographyMaterial variant="h4" sx={{ mb: { xs: 2, sm: 4 } }}>
                {countCompany} Companies in Total
            </TypographyMaterial>
            <Grid container spacing={6}>
                <Grid
                    item
                    xs={12}
                    md={12}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                    }}
                >
                    <TextField
                        id="outlined-basic"
                        hiddenLabel
                        size="medium"
                        variant="outlined"
                        placeholder="Search by name"
                        inputProps={{
                            autoComplete: 'off',
                            'aria-label': 'Search by company',
                        }}
                        value={name}
                        onChange={handleNameChange}
                        sx={{ width: { xs: '100%', sm: 'auto' }, flexGrow: 1 }}
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={locations}
                        sx={{ minWidth: 180, width: { xs: '100%', sm: 'auto' } }}
                        renderInput={(params) => <TextField {...params} label="Locations" />}
                        onChange={handleAddressChange}
                        value={address}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            width: { xs: '100%', sm: 'auto' },
                            flexGrow: { xs: 1, sm: 0 },
                            height: '100%',
                            backgroundColor: '#365E32',
                            '&:hover': {
                                backgroundColor: '#508D4E',
                            },
                        }}
                        onClick={handleFindCompany}
                    >
                        Find Company
                    </Button>
                </Grid>
            </Grid>

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: 4 }}>
                {loading
                    ? Array.from(new Array(6)).map((_, index) => (
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
                    : companies.length > 0 &&
                      companies.map((company, index) => (
                          <Grid item xs={12} sm={6} md={4} key={index}>
                              <Box sx={{ minHeight: 350 }}>
                                  <Card
                                      variant="outlined"
                                      sx={(theme) => ({
                                          width: 300,
                                          gridColumn: 'span 2',
                                          flexDirection: 'row',
                                          flexWrap: 'wrap',
                                          overflow: 'hidden',
                                          gap: 'clamp(0px, (100% - 360px + 32px) * 999, 16px)',
                                          transition: 'transform 0.3s, border 0.3s',
                                          '&:hover': {
                                              borderColor: theme.vars.palette.primary.outlinedHoverBorder,
                                              transform: 'translateY(-2px)',
                                          },
                                          '& > *': { minWidth: 'clamp(0px, (360px - 100%) * 999,100%)' },
                                      })}
                                      onClick={() => handleItemClick(index, company.id)}
                                  >
                                      <AspectRatio
                                          variant="soft"
                                          sx={{
                                              flexGrow: 1,
                                              display: 'contents',
                                              '--AspectRatio-paddingBottom':
                                                  'clamp(0px, (100% - 360px) * 999, min(calc(100% / (16 / 9)), 300px))',
                                          }}
                                      >
                                          <img
                                              src="https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2000"
                                              loading="lazy"
                                              alt=""
                                          />
                                      </AspectRatio>
                                      <Box
                                          sx={{
                                              display: 'flex',
                                              flexDirection: 'column',
                                              gap: 2,
                                              maxWidth: 200,
                                          }}
                                      >
                                          <Box sx={{ display: 'flex' }}>
                                              <div>
                                                  <Typography level="title-lg">
                                                      <Link
                                                          overlay
                                                          underline="none"
                                                          sx={{
                                                              color: 'text.primary',
                                                              '&.Mui-focusVisible:after': { outlineOffset: '-4px' },
                                                          }}
                                                      >
                                                          {company.name}
                                                      </Link>
                                                  </Typography>
                                                  <Typography level="body-sm">{company.address}</Typography>
                                              </div>
                                          </Box>
                                          <AspectRatio
                                              variant="soft"
                                              sx={{
                                                  '--AspectRatio-paddingBottom':
                                                      'clamp(0px, (100% - 200px) * 999, 200px)',
                                                  pointerEvents: 'none',
                                              }}
                                          >
                                              <img alt="" src={IMGAGE_HOST + company.account.avatarUrl} />
                                          </AspectRatio>
                                          <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto' }}>
                                              <div>
                                                  <Typography level="body-xs">
                                                      Participated in {company.NumberOfCampaignsParticipated} campaigns
                                                  </Typography>
                                              </div>
                                          </Box>
                                      </Box>
                                  </Card>
                              </Box>
                          </Grid>
                      ))}
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

export default Companies;
