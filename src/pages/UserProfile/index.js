import { Box, Container } from '@mui/material';
import React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Profile } from '~/components/Profile';
import { ChangePassword } from '~/components/ChangePassword';

export const UserProfile = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container sx={{ pt: 14 }}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Profile" value="1" />
                            <Tab label="Password" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Profile />
                    </TabPanel>
                    <TabPanel value="2">
                        <ChangePassword />
                    </TabPanel>
                </TabContext>
            </Box>
        </Container>
    );
};
