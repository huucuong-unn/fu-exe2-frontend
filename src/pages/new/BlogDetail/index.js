import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import findYourPlanBackground from '~/assets/images/findyourplan.webp';

import { useEffect, useState } from 'react';
import BlogAPI from '~/API/BlogAPI';

const defaultTheme = createTheme();

export default function BlogDetail() {
    const navigate = useNavigate();
    const { blogId } = useParams();

    const [blog, setBlog] = useState();
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await BlogAPI.getBlogs();
                console.log(response);
                for (let i = 0; i < response.length; i++) {
                    if (response[i].id === blogId) {
                        setBlog(response[i]);
                        break;
                    }
                }
            } catch (error) {
                console.log('Failed to fetch blogs: ', error);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid sx={{ minHeight: '100vh', backgroundColor: 'white' }}>
                {/* Home Start */}
                <Grid
                    container
                    component="main"
                    item
                    sx={{
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: `url(${blog?.picture})`,
                        height: '70vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mx: 10,
                        width: '90%',
                        marginBottom: '10vh',
                        borderRadius: '20px',
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        component={Paper}
                        elevation={6}
                        square
                        sx={{
                            borderRadius: '20px',
                            backgroundColor: 'rgba(255, 255, 255, 0.0)',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'end',
                        }}
                    ></Grid>
                </Grid>

                <Grid
                    container
                    component="main"
                    item
                    sx={{
                        backgroundColor: 'white',
                        height: '80vh',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 'none',
                        flexDirection: 'column',
                        gap: '5px',
                        marginBottom: '10vh',
                    }}
                >
                    {/* <CssBaseline /> */}

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        component={Paper}
                        elevation={6}
                        square
                        sx={{
                            borderRadius: '20px',
                            backgroundColor: 'rgba(255, 255, 255, 0.0)',
                            height: '100%',
                            width: '90%',
                        }}
                    >
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{
                                    textAlign: 'left',
                                    fontWeight: '900',
                                    fontSize: '54px',
                                    color: '#051D40',
                                    padding: '0 8%',
                                }}
                            >
                                {blog?.titleName}
                            </Typography>
                            <Typography
                                sx={{
                                    textAlign: 'left',
                                    fontSize: '24px',
                                    width: '100%',
                                    padding: '0 8%',
                                    mt: 2,
                                    height: '100%',
                                }}
                            >
                                {blog?.content}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
