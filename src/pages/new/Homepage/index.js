import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import aiCVSide from '~/assets/images/aiCVSide.webp';
import aiCoverletterSide from '~/assets/images/aiCoverletterSide.webp';
import homepageBackground from '~/assets/images/homepage.webp';
import blogBackground from '~/assets/images/blog.webp';
import FAQ from '~/components/FAQ';

const defaultTheme = createTheme();

export default function Homepage() {
    const navigate = useNavigate();

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
                        backgroundImage: `url(${homepageBackground})`,
                        height: '1800px',
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
                                    lineHeight: '1.1',
                                    textShadow: `
                                        -2px -2px 0 #FFFFFF, 
                                        2px -2px 0 #FFFFFF, 
                                        -2px 2px 0 #FFFFFF, 
                                        2px 2px 0 #FFFFFF, 
                                        0px -2px 0 #FFFFFF, 
                                        0px 2px 0 #FFFFFF, 
                                        -2px 0px 0 #FFFFFF, 
                                        2px 0px 0 #FFFFFF
                                    `,
                                }}
                            >
                                CHÀO MỪNG BẠN ĐẾN VỚI TORTEE HUB!
                            </Typography>
                            <Typography
                                sx={{
                                    textAlign: 'center',
                                    fontSize: '24px',
                                    width: '100%',
                                    padding: '0 20% 10px 20%',
                                    mt: '5px',
                                    textShadow: `
                                    -2px -2px 0 #FFFFFF, 
                                    2px -2px 0 #FFFFFF, 
                                    -2px 2px 0 #FFFFFF, 
                                    2px 2px 0 #FFFFFF, 
                                    0px -2px 0 #FFFFFF, 
                                    0px 2px 0 #FFFFFF, 
                                    -2px 0px 0 #FFFFFF, 
                                    2px 0px 0 #FFFFFF
                                `,
                                    fontWeight: '500',
                                }}
                            >
                                Nền tảng AI giúp sinh viên và các chuyên gia trẻ tạo CV chuyên nghiệp và viết thư xin
                                việc cá nhân hóa. TORTEE là một người bạn đồng hành đáng tin cậy, luôn sẵn sàng hỗ trợ
                                bạn trong hành trình tìm kiếm cơ hội thực tập
                            </Typography>
                            <Button
                                onClick={() => navigate('/offer')}
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: '#051D40',
                                    color: '#fff',
                                    fontSize: '16px',
                                    padding: '15px 30px',
                                    borderRadius: '30px',
                                    ':hover': {
                                        bgcolor: '#02F18D',
                                        color: '#051D40',
                                    },
                                    mt: 2,
                                    border: '3px solid #02F18D',
                                }}
                            >
                                Khám phá ngay!
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                {/* AI Resume */}
                <Grid
                    container
                    component="main"
                    item
                    sx={{
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: '#051D40',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '100%',
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
                        sx={{
                            borderRadius: '20px',
                            backgroundColor: 'rgba(255, 255, 255, 0.0)',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                // alignItems: 'center',
                                width: '45%',
                            }}
                        >
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{
                                    textAlign: 'left',
                                    fontWeight: '900',
                                    fontSize: '32px',
                                    color: 'white',
                                    padding: '2% 0',
                                    marginLeft: '5%',
                                    borderBottom: '3px solid #02F18D',
                                    mb: '30px',
                                }}
                            >
                                AI RÉSUME CHECKER
                            </Typography>
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{
                                    textAlign: 'left',
                                    fontWeight: '900',
                                    fontSize: '72px',
                                    color: 'white',
                                    padding: '0 5%',
                                }}
                            >
                                Kiểm tra và nhận lời khuyên cho CV với AI cực nhanh!{' '}
                            </Typography>
                            <Typography
                                sx={{
                                    textAlign: 'left',
                                    fontSize: '24px',
                                    width: '100%',
                                    padding: '0 5%',
                                    mt: '30px',
                                    color: 'white',
                                }}
                            >
                                Công cụ kiểm tra và đánh giá CV thông minh sẽ phân tích CV của bạn, đưa ra các gợi ý cải
                                thiện dựa trên thông tin bạn cung cấp, giúp CV của bạn trở nên chuyên nghiệp và ấn tượng
                                hơn.
                            </Typography>
                            <Button
                                type="submit"
                                variant="contained"
                                onClick={() => navigate('/ai-resume')}
                                sx={{
                                    mt: 5,
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
                                    width: '30%',
                                    marginLeft: '5%',
                                }}
                            >
                                Thử ngay!
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                my: 8,
                                mx: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                width: '45%',
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: '#051D40',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundImage: `url(${aiCVSide})`,
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '80vh',
                            }}
                        ></Box>
                    </Grid>
                </Grid>

                {/* AI Cover Letter */}
                <Grid
                    container
                    component="main"
                    item
                    sx={{
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '100%',
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
                        sx={{
                            borderRadius: '20px',
                            backgroundColor: 'rgba(255, 255, 255, 0.0)',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        {' '}
                        <Box
                            sx={{
                                my: 8,
                                mx: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                width: '45%',
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: (t) =>
                                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundImage: `url(${aiCoverletterSide})`,
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '90vh',
                            }}
                        ></Box>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                // alignItems: 'center',
                                width: '45%',
                            }}
                        >
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{
                                    textAlign: 'left',
                                    fontWeight: '900',
                                    fontSize: '32px',
                                    color: '#051D40',
                                    padding: '2% 0',
                                    marginLeft: '5%',
                                    borderBottom: '3px solid #02F18D',
                                    mb: '30px',
                                }}
                            >
                                COVER LETTER WRITING
                            </Typography>
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{
                                    textAlign: 'left',
                                    fontWeight: '900',
                                    fontSize: '72px',
                                    color: '#051D40',
                                    padding: '0 5%',
                                }}
                            >
                                Tạo thư xin việc cá nhân hóa trong tích tắc!
                            </Typography>
                            <Typography
                                sx={{ textAlign: 'left', fontSize: '24px', width: '100%', padding: '0 5%', mt: '20px' }}
                            >
                                Dựa trên thông tin từ công việc bạn ứng tuyển và hồ sơ cá nhân, TORTEE sẽ hỗ trợ bạn
                                viết thư xin việc thật chuyên nghiệp, giúp bạn thể hiện tốt nhất bản thân trước nhà
                                tuyển dụng
                            </Typography>
                            <Button
                                type="submit"
                                variant="contained"
                                onClick={() => navigate('/ai-coverletter')}
                                sx={{
                                    mt: 5,
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
                                    width: '30%',
                                    marginLeft: '5%',
                                }}
                            >
                                Thử ngay!
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

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
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <FAQ />
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
