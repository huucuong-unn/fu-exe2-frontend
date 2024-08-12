import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography as TypographyMaterial, Grid, Box, Container, Avatar } from '@mui/material';

import CompanyAPI from '~/API/CompanyAPI';

const logoStyle = {
    width: '100px',
    height: '80px',
    margin: '0 32px',
    opacity: 0.7,
};

export default function LogoCollection() {
    // const theme = useTheme();
    // const logos = theme.palette.mode === 'light' ? darkLogos : whiteLogos;
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const [companies, setCompanies] = useState([]);
    const [sort, setSort] = useState({
        page: 1,
        limit: 5,
        name: '',
        address: '',
    });
    const navigate = useNavigate();
    const IMGAGE_HOST = process.env.REACT_APP_IMG_HOST;

    const avatarSize = {
        xs: { width: 80, height: 80 },
        sm: { width: 100, height: 100 },
        md: { width: 120, height: 120 },
    };

    const handleItemClick = (index, companyId) => {
        setSelectedItemIndex(index);
        navigate(`/company/${companyId}`);
    };

    useEffect(() => {
        const getAllWithStatusActive = async () => {
            try {
                const companiesData = await CompanyAPI.searchSortCompany(sort);
                setCompanies(companiesData.listResult);
            } catch (error) {
                console.log(error);
            }
        };
        getAllWithStatusActive();
    }, [sort]);

    return (
        <Container id="logoCollection" sx={{ py: 4 }}>
            <TypographyMaterial component="p" variant="subtitle2" align="center" color="text.secondary">
                Trusted by the best companies
            </TypographyMaterial>
            <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ marginTop: 2 }}>
                {companies.length > 0 &&
                    companies.map((company, index) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={2.4}
                            container
                            justifyContent="center"
                            alignItems="center"
                            key={index}
                        >
                            <Avatar
                                src={IMGAGE_HOST + company?.account.avatarUrl}
                                sx={{
                                    width: {
                                        xs: avatarSize.xs.width,
                                        sm: avatarSize.sm.width,
                                        md: avatarSize.md.width,
                                    },
                                    height: {
                                        xs: avatarSize.xs.height,
                                        sm: avatarSize.sm.height,
                                        md: avatarSize.md.height,
                                    },
                                }}
                            />
                        </Grid>
                    ))}
            </Grid>
        </Container>
    );
}
