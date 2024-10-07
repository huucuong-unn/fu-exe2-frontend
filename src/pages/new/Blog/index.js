import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import blogpageBackground from '~/assets/images/blogbackground.webp';
import blogBackground from '~/assets/images/blog.webp';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import BlogAPI from '~/API/BlogAPI';

const defaultTheme = createTheme();

export default function Blog() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await BlogAPI.getBlogs();
                setBlogs(response);
                console.log(response);
            } catch (error) {
                console.log('Failed to fetch blogs: ', error);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid sx={{ minHeight: '100vh', backgroundColor: 'white' }}>
                {/* About Us Start */}
                <Grid
                    container
                    component="main"
                    item
                    sx={{
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: `url(${blogpageBackground})`,
                        height: '150vh',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
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
                        sx={{ borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.0)', height: '100%' }}
                    >
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{
                                    textAlign: 'center',
                                    fontWeight: '900',
                                    fontSize: '92px',
                                    color: '#051D40',
                                    padding: '0 10%',
                                }}
                            >
                                Điểm đến cho công việc của bạn
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                {/* Advantage */}
                <Grid
                    container
                    component="main"
                    item
                    sx={{
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: `url(${blogBackground})`,
                        height: '80vh',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 'none',
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
                        sx={{ borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.0)', height: '100%' }}
                    >
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                // alignItems: 'center',
                            }}
                        >
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{
                                    textAlign: 'left',
                                    fontWeight: '900',
                                    fontSize: '54px',
                                    color: 'white',
                                    padding: '0 8%',
                                }}
                            >
                                Cẩm nang nghề nghiệp
                            </Typography>
                            <Typography
                                sx={{
                                    textAlign: 'left',
                                    fontSize: '24px',
                                    width: '100%',
                                    padding: '0 8%',
                                    color: 'white',
                                }}
                            >
                                Khám phá ngay các bài viết của chúng tôi
                            </Typography>
                            <Grid sx={{ padding: '2% 8%' }}>
                                <Grid
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-evenly',
                                        gap: '30px',
                                    }}
                                >
                                    {blogs?.map((blog) => (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            component={Paper}
                                            elevation={6}
                                            square
                                            sx={{
                                                borderRadius: '35px',
                                                backgroundColor: '#051D40',
                                                height: '400px',
                                                display: 'flex',
                                                padding: '20px  ',
                                                gap: '25px',
                                                width: '30%',
                                                border: '1px solid #02F18D',
                                            }}
                                        >
                                            <Box>
                                                <img
                                                    src={blog?.picture}
                                                    alt="techcombank"
                                                    style={{ width: '250px', height: '157px' }}
                                                />
                                                <Typography
                                                    component="h1"
                                                    variant="h4"
                                                    sx={{ fontWeight: '900', fontSize: '24px', color: 'white', mt: 3 }}
                                                >
                                                    {blog?.titleName}
                                                </Typography>
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    onClick={() => navigate(`/blog/${blog?.id}`)}
                                                    sx={{
                                                        mt: 2,
                                                        bgcolor: '#051D40',
                                                        borderRadius: '24px',
                                                        padding: '12px 0',
                                                        fontSize: '16px',
                                                        ':hover': {
                                                            bgcolor: '#02F18D',
                                                            color: '#051D40',
                                                        },
                                                        border: '1px solid #02F18D',
                                                        maxHeight: '54px',
                                                    }}
                                                >
                                                    Tìm hiểu thêm
                                                </Button>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
