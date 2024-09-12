import {
    Autocomplete,
    Avatar,
    Card,
    CardHeader,
    Input,
    OutlinedInput,
    Pagination,
    PaginationItem,
    TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import blogBackground from '~/assets/images/blog.webp';
import homepageBackground from '~/assets/images/homepage.webp';
import techcombank from '~/assets/images/techcombank.png';
import internshipProgramBackground from '~/assets/images/internshipprogram.webp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';
import { white } from '@mui/material/colors';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright ©Tortee '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function InternshipProgram() {
    const navigate = useNavigate();

    const options = [
        { title: 'All Cities' },
        { title: 'Ho Chi Minh' },
        { title: 'Ha Noi' },
        { title: 'Da Nang' },
        { title: 'Others' },
    ];

    const [sort, setSort] = useState({
        page: 1,
        limit: 9,
        name: '',
        address: '',
    });
    const [totalPage, setTotalPage] = useState(5);

    const handlePageChange = (event, value) => {
        setSort((prev) => ({
            ...prev,
            page: value,
        }));
    };

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
                        height: '70vh',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mx: 10,
                        width: '90%',
                        marginBottom: '10vh',
                        borderRadius: '20px',
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
                            display: 'flex',
                            alignItems: 'end',
                        }}
                    >
                        <Box
                            sx={{
                                // height: '100%',
                                display: 'flex',
                                bottom: 0,
                                textAlign: 'bottom',
                            }}
                        >
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{
                                    fontWeight: '900',
                                    fontSize: '72px',
                                    color: '#051D40',
                                    padding: '0 10%',
                                    height: '100%',
                                    textShadow:
                                        '2px 2px 0px #ffffff, -2px -2px 0px #ffffff, -2px 2px 0px #ffffff, 2px -2px 0px #ffffff',
                                }}
                            >
                                To shape success, keep learning the ropes
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                {/* Program */}
                <Grid
                    container
                    component="main"
                    item
                    sx={{
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: `url(${internshipProgramBackground})`,
                        height: '150vh',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 'none',
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
                                    color: '#051D40',
                                    padding: '0 8%',
                                }}
                            >
                                Outstanding Internship Program
                            </Typography>
                            <Typography sx={{ textAlign: 'left', fontSize: '24px', width: '100%', padding: '0 8%' }}>
                                The most professional Internship Program for you
                            </Typography>
                            <Grid sx={{ padding: '3% 8%' }}>
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
                                        backgroundColor: 'rgba(255, 255, 255, 0.7);',
                                        height: '100%',
                                        display: 'flex',
                                        padding: '20px  ',
                                        gap: '25px',
                                    }}
                                >
                                    <Box>
                                        <img
                                            src={techcombank}
                                            alt="techcombank"
                                            style={{ width: '560px', height: '470px' }}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography
                                            component="h1"
                                            variant="h4"
                                            sx={{ fontWeight: '900', fontSize: '42px', color: '#051D40' }}
                                        >
                                            Techcombank Future Gen 2025 - Develop a Future You
                                        </Typography>
                                        <Typography sx={{ my: 3, fontSize: '18px' }}>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            Lorem Ipsum has been the industry's standard dummy text ever since the
                                            1500s, when an unknown printer took a galley of type and scrambled it to
                                            make a type specimen book.{' '}
                                        </Typography>
                                        <Card
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                flexGrow: 1,
                                                boxShadow: 'none',
                                                my: 2,
                                                backgroundColor: 'rgba(255, 255, 255, 0.0);',
                                            }}
                                        >
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
                                                    avatar={<Avatar src={techcombank} />}
                                                    title={<Typography fontWeight="bold">Techcombank</Typography>}
                                                    subheader="Ho Chi Minh city - June 25, 2024"
                                                />
                                            </Box>
                                        </Card>
                                        <Grid sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{
                                                    width: '40%',
                                                    bgcolor: '#051D40',
                                                    borderRadius: '24px',
                                                    padding: '12px 0',
                                                    fontSize: '16px',
                                                    ':hover': {
                                                        bgcolor: '#02F18D',
                                                        color: '#051D40',
                                                    },
                                                }}
                                            >
                                                Apply Now
                                            </Button>{' '}
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{
                                                    width: '40%',
                                                    bgcolor: '#051D40',
                                                    borderRadius: '24px',
                                                    padding: '12px 0',
                                                    fontSize: '16px',
                                                    ':hover': {
                                                        bgcolor: '#02F18D',
                                                        color: '#051D40',
                                                    },
                                                }}
                                            >
                                                Details
                                            </Button>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-evenly',
                                        gap: '30px',
                                        marginTop: '30px',
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
                                            borderRadius: '35px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.8);',
                                            height: '100%',
                                            display: 'flex',
                                            padding: '20px  ',
                                            gap: '25px',
                                            width: '30%',
                                        }}
                                    >
                                        <Box>
                                            <img
                                                src={techcombank}
                                                alt="techcombank"
                                                style={{ width: '187px', height: '157px' }}
                                            />
                                        </Box>
                                        <Box>
                                            <Typography
                                                component="h1"
                                                variant="h4"
                                                sx={{ fontWeight: '900', fontSize: '24px', color: '#051D40' }}
                                            >
                                                Techcombank Future Gen 2025 - Develop a Future You
                                            </Typography>
                                            <Typography sx={{ my: 1, fontSize: '12px' }}>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry. Lorem Ipsum has been the industry's standard dummy text ever
                                                since the 1500s, when an unknown printer took a galley of type and
                                                scrambled it to make a type specimen book.{' '}
                                            </Typography>
                                            <Card
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    flexGrow: 1,
                                                    boxShadow: 'none',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.0);',
                                                }}
                                            >
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
                                                        avatar={<Avatar src={techcombank} />}
                                                        title={<Typography fontWeight="bold">Techcombank</Typography>}
                                                        subheader="Ho Chi Minh city - June 25, 2024"
                                                    />
                                                </Box>
                                            </Card>
                                            <Grid sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{
                                                        width: '40%',
                                                        bgcolor: '#051D40',
                                                        borderRadius: '24px',
                                                        padding: '12px 0',
                                                        fontSize: '12px',
                                                        ':hover': {
                                                            bgcolor: '#02F18D',
                                                            color: '#051D40',
                                                        },
                                                    }}
                                                >
                                                    Apply Now
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{
                                                        width: '40%',

                                                        bgcolor: '#051D40',
                                                        borderRadius: '24px',
                                                        padding: '12px 0',
                                                        fontSize: '12px',
                                                        ':hover': {
                                                            bgcolor: '#02F18D',
                                                            color: '#051D40',
                                                        },
                                                    }}
                                                >
                                                    Details
                                                </Button>
                                            </Grid>
                                        </Box>
                                    </Grid>
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
                                            backgroundColor: 'rgba(255, 255, 255, 0.8);',
                                            height: '100%',
                                            display: 'flex',
                                            padding: '20px  ',
                                            gap: '25px',
                                            width: '30%',
                                            opacity: '0.9',
                                        }}
                                    >
                                        <Box>
                                            <img
                                                src={techcombank}
                                                alt="techcombank"
                                                style={{ width: '187px', height: '157px' }}
                                            />
                                        </Box>
                                        <Box>
                                            <Typography
                                                component="h1"
                                                variant="h4"
                                                sx={{ fontWeight: '900', fontSize: '24px', color: '#051D40' }}
                                            >
                                                Techcombank Future Gen 2025 - Develop a Future You
                                            </Typography>
                                            <Typography sx={{ my: 1, fontSize: '12px' }}>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry. Lorem Ipsum has been the industry's standard dummy text ever
                                                since the 1500s, when an unknown printer took a galley of type and
                                                scrambled it to make a type specimen book.{' '}
                                            </Typography>
                                            <Card
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    flexGrow: 1,
                                                    boxShadow: 'none',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.0);',
                                                }}
                                            >
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
                                                        avatar={<Avatar src={techcombank} />}
                                                        title={<Typography fontWeight="bold">Techcombank</Typography>}
                                                        subheader="Ho Chi Minh city - June 25, 2024"
                                                    />
                                                </Box>
                                            </Card>
                                            <Grid sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{
                                                        width: '40%',
                                                        bgcolor: '#051D40',
                                                        borderRadius: '24px',
                                                        padding: '12px 0',
                                                        fontSize: '12px',
                                                        ':hover': {
                                                            bgcolor: '#02F18D',
                                                            color: '#051D40',
                                                        },
                                                    }}
                                                >
                                                    Apply Now
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{
                                                        width: '40%',
                                                        bgcolor: '#051D40',
                                                        borderRadius: '24px',
                                                        padding: '12px 0',
                                                        fontSize: '12px',
                                                        ':hover': {
                                                            bgcolor: '#02F18D',
                                                            color: '#051D40',
                                                        },
                                                    }}
                                                >
                                                    Details
                                                </Button>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>

                {/* All Internship Program */}
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
                        borderRadius: '20px 20px 0 0 ',
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
                                All Internship Program
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
                                The most professional Internship Program for you{' '}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: '10px', margin: '2% 8%' }}>
                                <Autocomplete
                                    options={options}
                                    getOptionLabel={(option) => option.title}
                                    sx={{
                                        width: '30%',
                                        backgroundColor: 'white',
                                        borderRadius: '5px',
                                        border: '1px solid #02F18D',
                                    }}
                                    renderInput={(params) => <TextField {...params} label="All Cities" />}
                                />
                                <OutlinedInput
                                    placeholder="Enter keyword skill (Java, PHP, ...), company name, job title, ..."
                                    name="search"
                                    sx={{
                                        width: '50%',
                                        backgroundColor: 'white',
                                        borderRadius: '5px',
                                        border: '1px solid #02F18D',
                                    }}
                                />
                                <Button
                                    sx={{
                                        width: '20%',
                                        backgroundColor: '#02F18D',
                                        borderRadius: '5px',
                                        color: '#051D40',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                        ':hover': {
                                            bgcolor: '#051D40',
                                            color: '#02F18D',
                                        },
                                    }}
                                >
                                    Search
                                </Button>
                            </Box>
                            <Grid sx={{ padding: '3% 8%' }}>
                                <Grid
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-evenly',
                                        gap: '30px',
                                        marginTop: '30px',
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
                                            borderRadius: '35px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.8);',
                                            height: '100%',
                                            display: 'flex',
                                            padding: '20px  ',
                                            gap: '25px',
                                            width: '30%',
                                        }}
                                    >
                                        <Box>
                                            <img
                                                src={techcombank}
                                                alt="techcombank"
                                                style={{ width: '187px', height: '157px' }}
                                            />
                                        </Box>
                                        <Box>
                                            <Typography
                                                component="h1"
                                                variant="h4"
                                                sx={{ fontWeight: '900', fontSize: '24px', color: '#051D40' }}
                                            >
                                                Techcombank Future Gen 2025 - Develop a Future You
                                            </Typography>
                                            <Typography sx={{ my: 1, fontSize: '12px' }}>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry. Lorem Ipsum has been the industry's standard dummy text ever
                                                since the 1500s, when an unknown printer took a galley of type and
                                                scrambled it to make a type specimen book.{' '}
                                            </Typography>
                                            <Card
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    flexGrow: 1,
                                                    boxShadow: 'none',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.0);',
                                                }}
                                            >
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
                                                        avatar={<Avatar src={techcombank} />}
                                                        title={<Typography fontWeight="bold">Techcombank</Typography>}
                                                        subheader="Ho Chi Minh city - June 25, 2024"
                                                    />
                                                </Box>
                                            </Card>
                                            <Grid sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{
                                                        width: '40%',
                                                        bgcolor: '#051D40',
                                                        borderRadius: '24px',
                                                        padding: '12px 0',
                                                        fontSize: '12px',
                                                        ':hover': {
                                                            bgcolor: '#02F18D',
                                                            color: '#051D40',
                                                        },
                                                    }}
                                                >
                                                    Apply Now
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{
                                                        width: '40%',

                                                        bgcolor: '#051D40',
                                                        borderRadius: '24px',
                                                        padding: '12px 0',
                                                        fontSize: '12px',
                                                        ':hover': {
                                                            bgcolor: '#02F18D',
                                                            color: '#051D40',
                                                        },
                                                    }}
                                                >
                                                    Details
                                                </Button>
                                            </Grid>
                                        </Box>
                                    </Grid>
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
                                            backgroundColor: 'rgba(255, 255, 255, 0.8);',
                                            height: '100%',
                                            display: 'flex',
                                            padding: '20px  ',
                                            gap: '25px',
                                            width: '30%',
                                            opacity: '0.9',
                                        }}
                                    >
                                        <Box>
                                            <img
                                                src={techcombank}
                                                alt="techcombank"
                                                style={{ width: '187px', height: '157px' }}
                                            />
                                        </Box>
                                        <Box>
                                            <Typography
                                                component="h1"
                                                variant="h4"
                                                sx={{ fontWeight: '900', fontSize: '24px', color: '#051D40' }}
                                            >
                                                Techcombank Future Gen 2025 - Develop a Future You
                                            </Typography>
                                            <Typography sx={{ my: 1, fontSize: '12px' }}>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry. Lorem Ipsum has been the industry's standard dummy text ever
                                                since the 1500s, when an unknown printer took a galley of type and
                                                scrambled it to make a type specimen book.{' '}
                                            </Typography>
                                            <Card
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    flexGrow: 1,
                                                    boxShadow: 'none',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.0);',
                                                }}
                                            >
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
                                                        avatar={<Avatar src={techcombank} />}
                                                        title={<Typography fontWeight="bold">Techcombank</Typography>}
                                                        subheader="Ho Chi Minh city - June 25, 2024"
                                                    />
                                                </Box>
                                            </Card>
                                            <Grid sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{
                                                        width: '40%',
                                                        bgcolor: '#051D40',
                                                        borderRadius: '24px',
                                                        padding: '12px 0',
                                                        fontSize: '12px',
                                                        ':hover': {
                                                            bgcolor: '#02F18D',
                                                            color: '#051D40',
                                                        },
                                                    }}
                                                >
                                                    Apply Now
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{
                                                        width: '40%',
                                                        bgcolor: '#051D40',
                                                        borderRadius: '24px',
                                                        padding: '12px 0',
                                                        fontSize: '12px',
                                                        ':hover': {
                                                            bgcolor: '#02F18D',
                                                            color: '#051D40',
                                                        },
                                                    }}
                                                >
                                                    Details
                                                </Button>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-evenly',
                                        gap: '30px',
                                        marginTop: '30px',
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
                                            borderRadius: '35px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.8);',
                                            height: '100%',
                                            display: 'flex',
                                            padding: '20px  ',
                                            gap: '25px',
                                            width: '30%',
                                        }}
                                    >
                                        <Box>
                                            <img
                                                src={techcombank}
                                                alt="techcombank"
                                                style={{ width: '187px', height: '157px' }}
                                            />
                                        </Box>
                                        <Box>
                                            <Typography
                                                component="h1"
                                                variant="h4"
                                                sx={{ fontWeight: '900', fontSize: '24px', color: '#051D40' }}
                                            >
                                                Techcombank Future Gen 2025 - Develop a Future You
                                            </Typography>
                                            <Typography sx={{ my: 1, fontSize: '12px' }}>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry. Lorem Ipsum has been the industry's standard dummy text ever
                                                since the 1500s, when an unknown printer took a galley of type and
                                                scrambled it to make a type specimen book.{' '}
                                            </Typography>
                                            <Card
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    flexGrow: 1,
                                                    boxShadow: 'none',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.0);',
                                                }}
                                            >
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
                                                        avatar={<Avatar src={techcombank} />}
                                                        title={<Typography fontWeight="bold">Techcombank</Typography>}
                                                        subheader="Ho Chi Minh city - June 25, 2024"
                                                    />
                                                </Box>
                                            </Card>
                                            <Grid sx={{ display: 'flex', justifyContent: 'space-around' }}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{
                                                        width: '40%',
                                                        bgcolor: '#051D40',
                                                        borderRadius: '24px',
                                                        padding: '12px 0',
                                                        fontSize: '12px',
                                                        ':hover': {
                                                            bgcolor: '#02F18D',
                                                            color: '#051D40',
                                                        },
                                                    }}
                                                >
                                                    Apply Now
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{
                                                        width: '40%',

                                                        bgcolor: '#051D40',
                                                        borderRadius: '24px',
                                                        padding: '12px 0',
                                                        fontSize: '12px',
                                                        ':hover': {
                                                            bgcolor: '#02F18D',
                                                            color: '#051D40',
                                                        },
                                                    }}
                                                >
                                                    Details
                                                </Button>
                                            </Grid>
                                        </Box>
                                    </Grid>
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
                                            backgroundColor: 'rgba(255, 255, 255, 0.8);',
                                            height: '100%',
                                            display: 'flex',
                                            padding: '20px  ',
                                            gap: '25px',
                                            width: '30%',
                                            opacity: '0.9',
                                        }}
                                    >
                                        <Box>
                                            <img
                                                src={techcombank}
                                                alt="techcombank"
                                                style={{ width: '187px', height: '157px' }}
                                            />
                                        </Box>
                                        <Box>
                                            <Typography
                                                component="h1"
                                                variant="h4"
                                                sx={{ fontWeight: '900', fontSize: '24px', color: '#051D40' }}
                                            >
                                                Techcombank Future Gen 2025 - Develop a Future You
                                            </Typography>
                                            <Typography sx={{ my: 1, fontSize: '12px' }}>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry. Lorem Ipsum has been the industry's standard dummy text ever
                                                since the 1500s, when an unknown printer took a galley of type and
                                                scrambled it to make a type specimen book.{' '}
                                            </Typography>
                                            <Card
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    flexGrow: 1,
                                                    boxShadow: 'none',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.0);',
                                                }}
                                            >
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
                                                        avatar={<Avatar src={techcombank} />}
                                                        title={<Typography fontWeight="bold">Techcombank</Typography>}
                                                        subheader="Ho Chi Minh city - June 25, 2024"
                                                    />
                                                </Box>
                                            </Card>
                                            <Grid sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{
                                                        width: '40%',
                                                        bgcolor: '#051D40',
                                                        borderRadius: '24px',
                                                        padding: '12px 0',
                                                        fontSize: '12px',
                                                        ':hover': {
                                                            bgcolor: '#02F18D',
                                                            color: '#051D40',
                                                        },
                                                    }}
                                                >
                                                    Apply Now
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{
                                                        width: '40%',
                                                        bgcolor: '#051D40',
                                                        borderRadius: '24px',
                                                        padding: '12px 0',
                                                        fontSize: '12px',
                                                        ':hover': {
                                                            bgcolor: '#02F18D',
                                                            color: '#051D40',
                                                        },
                                                    }}
                                                >
                                                    Details
                                                </Button>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 2,
                                    backgroundColor: 'white',
                                    color: 'white',
                                    borderRadius: '20px',
                                    opacity: 0.6,
                                }}
                            >
                                <Pagination
                                    count={totalPage}
                                    page={sort.page}
                                    onChange={handlePageChange}
                                    renderItem={(item) => (
                                        <PaginationItem
                                            slots={{
                                                previous: ArrowBackIcon,
                                                next: ArrowForwardIcon,
                                            }}
                                            {...item}
                                        />
                                    )}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
