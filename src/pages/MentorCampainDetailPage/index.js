import * as React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AppAppBar from '~/components/AppAppBar';

import LogoCollection from '~/components/LogoCollection';

import getLPTheme from '~/components/getLPTheme';
import CampaignDetail from '~/components/Campain/CampainDetail'; // Import CampaignDetail component
import ScrollToTop from '~/components/ScrollToTop'; // Import CampaignDetail component

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
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
            ></ToggleButtonGroup>
        </Box>
    );
}

ToggleCustomTheme.propTypes = {
    showCustomTheme: PropTypes.shape({
        valueOf: PropTypes.func.isRequired,
    }).isRequired,
    toggleCustomTheme: PropTypes.func.isRequired,
};

export default function CampainDetailage() {
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
        <ThemeProvider
            theme={defaultTheme}
            sx={{
                fontFamily: 'Montserrat, sans-serif',
            }}
        >
            <CssBaseline />
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
            <Divider />

            <Box sx={{ bgcolor: 'background.default' }}>
                {/* Replace CampaignList with CampaignDetail */}


                <CampaignDetail />

                <Divider />

                <Divider />
            </Box>
            <ToggleCustomTheme showCustomTheme={showCustomTheme} toggleCustomTheme={toggleCustomTheme} />
        </ThemeProvider>
    );
}
