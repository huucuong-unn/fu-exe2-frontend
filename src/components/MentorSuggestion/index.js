import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';
import { Button, Chip, Skeleton } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MentorAPI from '~/API/MentorAPI';

const whiteLogos = [
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628e8573c43893fe0ace_Sydney-white.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d520d0517ae8e8ddf13_Bern-white.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f46794c159024c1af6d44_Montreal-white.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09d1f6337b1dfed14ab_colorado-white.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5caa77bf7d69fb78792e_Ankara-white.svg',
];

const darkLogos = [
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg',
];

const logoStyle = {
    width: '64px',
    height: '64px',
};

export default function MentorSuggestion() {
    const theme = useTheme();
    const logos = theme.palette.mode === 'light' ? darkLogos : whiteLogos;
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [mentors, setMentors] = useState([]);
    const IMGAGE_HOST = process.env.REACT_APP_IMG_HOST;
    const navigate = useNavigate();

    useEffect(() => {
        const getAll = async () => {
            try {
                const getAllWithStatusActive = await MentorAPI.getAllWithStatusActive({ page: 1, limit: 6 });
                setMentors(getAllWithStatusActive.listResult);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        getAll();
    }, []);

    const handleItemClick = (index, mentorId) => {
        setSelectedItemIndex(index);
        navigate(`/mentor/${mentorId}`);
    };

    useEffect(() => {
        console.log(mentors);
    }, [mentors]);

    return (
        <Container
            id="mentors"
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 3, sm: 6 },
            }}
        >
            <Box
                sx={{
                    width: { sm: '100%', md: '60%' },
                    textAlign: { sm: 'left', md: 'center' },
                }}
            >
                <Typography component="h2" variant="h4" color="text.primary">
                    Mentors
                </Typography>
            </Box>
            <Grid container spacing={2}>
                {loading
                    ? // Render Skeletons while loading
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
                    : mentors.length > 0 &&
                      mentors?.map((mentor, index) => (
                          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
                              <Card
                                  sx={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      justifyContent: 'space-between',
                                      flexGrow: 1,
                                      p: 1,
                                      ':hover': {
                                          boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
                                          cursor: 'pointer',
                                      },
                                  }}
                                  onClick={() => handleItemClick(index, mentor.mentorProfile.id)}
                              >
                                  <CardContent>
                                      {mentor.skills?.map((skill, index) => (
                                          <Chip
                                              key={index}
                                              label={skill.skill.name}
                                              sx={{ mr: 1, mb: 1 }}
                                              onClick={() => {}}
                                          />
                                      ))}
                                  </CardContent>
                                  <Box
                                      sx={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                          justifyContent: 'space-between',
                                          alignItems: 'center',
                                          pr: 2,
                                      }}
                                  >
                                      <CardHeader
                                          avatar={
                                              <Avatar
                                                  src={IMGAGE_HOST + mentor?.mentorProfile?.mentorDTO.account.avatarUrl}
                                              />
                                          }
                                          title={
                                              <Typography fontWeight="bold">
                                                  {mentor?.mentorProfile?.mentorDTO?.fullName}
                                              </Typography>
                                          }
                                          subheader={mentor?.mentorProfile?.shortDescription}
                                      />
                                      <img
                                          src={IMGAGE_HOST + mentor?.mentorProfile?.mentorDTO?.company?.avatarUrl}
                                          alt={`Logo ${index + 1}`}
                                          style={logoStyle}
                                      />
                                  </Box>
                              </Card>
                          </Grid>
                      ))}
            </Grid>
            <Box>
                <Link style={{ color: 'white', textDecoration: 'none' }} to={'/mentors'}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#1e373b',
                            '&:hover': {
                                backgroundColor: '#758694',
                            },
                        }}
                    >
                        Explore more
                    </Button>
                </Link>
            </Box>
        </Container>
    );
}
