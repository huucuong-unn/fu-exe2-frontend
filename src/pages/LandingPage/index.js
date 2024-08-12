import * as React from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AppAppBar from '~/components/AppAppBar';
import Hero from '~/components/Hero';
import LogoCollection from '~/components/LogoCollection';
import Highlights from '~/components/Highlights';
import Pricing from '~/components/Pricing';
import Features from '~/components/Features';
import MentorSuggestion from '~/components/MentorSuggestion';
import FAQ from '~/components/FAQ';
import getLPTheme from '~/components/getLPTheme';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Container } from '@mui/material';

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
    const [showAlert, setShowAlert] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.state?.signupSuccess) {
            setShowAlert(true);
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 5000); // Show alert for 5 seconds
            return () => clearTimeout(timer);
        }
    }, [location.state]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100dvw',
                position: 'fixed',
                bottom: 24,
            }}
        >
            <ToggleButtonGroup
                color="primary"
                exclusive
                value={showCustomTheme}
                onChange={toggleCustomTheme}
                aria-label="Platform"
                sx={{
                    backgroundColor: 'background.default',
                    '& .Mui-selected': {
                        pointerEvents: 'none',
                    },
                }}
            >
                <ToggleButton value>
                    <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
                    Custom theme
                </ToggleButton>
                <ToggleButton value={false}>Material Design 2</ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}

ToggleCustomTheme.propTypes = {
    showCustomTheme: PropTypes.shape({
        valueOf: PropTypes.func.isRequired,
    }).isRequired,
    toggleCustomTheme: PropTypes.func.isRequired,
};

export default function LandingPage() {
    const [mode, setMode] = React.useState('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const toggleCustomTheme = () => {
        setShowCustomTheme((prev) => !prev);
    };

    return (
        <Box
        // theme={showCustomTheme ? LPtheme : defaultTheme}
        >
            <CssBaseline />
            {/* <AppAppBar mode={mode} toggleColorMode={toggleColorMode} /> */}
            <Hero />
            <Box sx={{ bgcolor: 'background.default' }}>
                <LogoCollection />
                {/* <Features />
                <Divider /> */}
                <MentorSuggestion />
                <Divider />
                {/* <Highlights />
                <Divider /> */}
                {/* <Pricing /> */}
                <FAQ />
                <Divider />
            </Box>
            {/* <ToggleCustomTheme showCustomTheme={showCustomTheme} toggleCustomTheme={toggleCustomTheme} /> */}
        </Box>
    );
}
