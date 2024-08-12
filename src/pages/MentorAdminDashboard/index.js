import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {MainListItems} from '~/components/listItems';
import {SecondaryListItems} from '~/components/listItems';
import NotificationsIcon from '@mui/icons-material/Notifications';

import {
    Avatar,
    CardContent,
    Checkbox,
    Chip,
    Divider,
    FormControlLabel,
    FormGroup,
    Modal,
    TextField,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


 const mentors = [
    {
        profilePicture: 'https://ih1.redbubble.net/image.5481662153.7016/st,small,507x507-pad,600x600,f8f8f8.jpg',
        shortDescription: 'Director, Engineering at Tortee',
        title: 'Huu Cuong Le',
        description:
            'Passionate about technology and its social impact. Over 10 years experience delivering successful products in healthcare, eCommerce, digital media and international fundraising. Strong focus on product, user-centricity, UX and lean processes. Interested in Zen and Stoic philosophy. Enjoy deep thinking and deep work.',
        skills: ['React', 'Java', 'Nodejs'],
    },
    {
        profilePicture: 'https://www.shutterstock.com/image-vector/cat-meme-sassy-sassycat-white-260nw-2008304912.jpg',
        shortDescription: 'CEO at Tortee',
        title: 'Ut Be',
        description:
            'Passionate about technology and its social impact. Over 10 years experience delivering successful products in healthcare, eCommerce, digital media and international fundraising. Strong focus on product, user-centricity, UX and lean processes. Interested in Zen and Stoic philosophy. Enjoy deep thinking and deep work.',
        skills: ['Marketing Research', 'Adobe Photoshop', 'Adobe Illustrator'],
    },
    {
        profilePicture: 'https://www.shutterstock.com/image-vector/cat-meme-sassy-sassycat-white-260nw-2008304912.jpg',
        shortDescription: 'CEO at Tortee',
        title: 'Hoang Huy',
        description:
            'Passionate about technology and its social impact. Over 10 years experience delivering successful products in healthcare, eCommerce, digital media and international fundraising. Strong focus on product, user-centricity, UX and lean processes. Interested in Zen and Stoic philosophy. Enjoy deep thinking and deep work.',
        skills: ['Marketing Research', 'Adobe Photoshop', 'Adobe Illustrator'],
    },
];

const modalItems = {
    companies: ['FPT', 'VNG', 'Nashtech', 'Tortee', 'Google', 'Facebook', 'Amazon', 'Microsoft'],
    jobTitles: ['Software Engineer', 'Product Manager', 'UX Designer', 'CTO', 'CEO', 'Founder'],
};


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://tortee.vercel.app/sign-in">
                Tortee
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
};


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function SearchFilter() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{
                pt: 2,
                width: { xs: '100%', sm: '100%%', lg: '100%' },
                display: 'flex',
                justifyContent: 'center',
                mb: 10,
            }}
        >
            <TextField
                id="outlined-basic"
                hiddenLabel
                size="medium"
                variant="outlined"
                placeholder="Search by company, role, or skill"
                inputProps={{
                    autoComplete: 'off',
                    'aria-label': 'Search by company, role, or skill',
                }}
                sx={{ width: { sx: '100%', sm: '70%', lg: '60%' } }}
            />
            <Button variant="contained" color="primary" sx={{ width: 105, borderRadius: 5 }} onClick={handleOpen}>
                Filter
            </Button>
            <Link to={'/company/create-mentor-account'}>
            <Button variant="contained" color="primary" sx={{ width: 150, borderRadius: 5}}>
                Create Mentor
            </Button>
            </Link>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h3"
                        sx={{ textAlign: 'center', fontWeight: 'bold' }}
                    >
                        Filters
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography id="modal-modal-title" variant="h6" component="h3" sx={{ my: 2, fontWeight: 'bold' }}>
                        Companies
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <FormGroup>
                            <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 8 }}>
                                {Array.from(modalItems.companies).map((company, index) => (
                                    <Grid item xs={2} sm={4} md={4} key={index}>
                                        <FormControlLabel control={<Checkbox />} label={company} />
                                    </Grid>
                                ))}
                            </Grid>
                        </FormGroup>
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography id="modal-modal-title" variant="h6" component="h3" sx={{ my: 2, fontWeight: 'bold' }}>
                        Job Titles
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <FormGroup>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 8 }}>
                                {Array.from(modalItems.jobTitles).map((jobTitle, index) => (
                                    <Grid item xs={2} sm={4} md={4} key={index}>
                                        <FormControlLabel control={<Checkbox />} label={jobTitle} />
                                    </Grid>
                                ))}
                            </Grid>
                        </FormGroup>
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ width: 150, borderRadius: 3, display: 'flex' }}
                        onClick={() => handleClose()}
                    >
                        Show Results
                    </Button>                    
                </Box>

            </Modal>
        </Stack>
    );
}

export default function Dashboard() {
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const handleItemClick = (index) => {
        setSelectedItemIndex(index);
    };
    return (
       
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                            Mentors
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" sx={{ textAlign: 'center' }}>
                                Hi Admin
                            </Typography>
                        </Box>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {MainListItems}
                        <Divider sx={{ my: 1 }} />
                        {SecondaryListItems}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />     
                    <SearchFilter />                     
                    <Container id="mentors">
                    <Grid container spacing={6}>
    <Grid item xs={12} md={12}>
        <div>
            <Typography variant="body1" color="text.secondary" sx={{ mb: { xs: 2, sm: 4 } }}>
                404 mentors found
            </Typography>
        </div>
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            useFlexGap
            sx={{ width: '100%', display: { xs: 8, sm: 'flex' } }}
        >
            {mentors?.map((mentor, index) => (
                <Card
                    key={index}
                    variant="outlined"
                    component={Button}
                    onClick={() => handleItemClick(index)}
                    sx={{
                        p: 3,
                        height: 'fit-content',
                        width: '100%',
                        background: 'none',
                        backgroundColor: selectedItemIndex === index ? 'action.selected' : undefined,
                        borderColor: (theme) => {
                            if (theme.palette.mode === 'light') {
                                return selectedItemIndex === index ? 'primary.light' : 'grey.200';
                            }
                            return selectedItemIndex === index ? 'primary.dark' : 'grey.800';
                        },
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
                                src={mentor.profilePicture}
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
                                {mentor?.title}
                            </Typography>
                            <Typography
                                color="text.secondary"
                                variant="body2"
                                sx={{ my: 1 }}
                                fontSize={'16px'}
                            >
                                {mentor?.shortDescription}
                            </Typography>
                            <Typography
                                color="text.secondary"
                                variant="body2"
                                sx={{ my: 2 }}
                                fontSize={'14px'}
                            >
                                {mentor?.description}
                            </Typography>
                            <CardContent>
                                {mentor?.skills?.map((skill, index) => (
                                    <Chip
                                        key={index}
                                        label={skill}
                                        sx={{ mr: 2, mb: 1 }}
                                        onClick={() => {}}
                                    />
                                ))}
                            </CardContent>
                            <br />
                            <Link to={'/mentor/id'}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ width: { lg: '40%', md: '70%', xs: '80%' } }}
                                >
                                    View Profile
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                </Card>
            ))}
        </Stack>
    </Grid>
</Grid>
</Container>             
                </Box>
            </Box>  
            <Copyright sx={{ pt: 4 }} />          
        </ThemeProvider>
    );
}
