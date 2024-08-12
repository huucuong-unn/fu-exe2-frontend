import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const MenteeDetails = ({ mentee }) => {
    if (!mentee) return <Typography>Select a mentee to view details</Typography>;

    return (
        <Box>
            <Typography variant="h4">{mentee.name}</Typography>
            <Typography>Email: {mentee.email}</Typography>
            <Typography>Status: {mentee.status}</Typography>
            <Button>Edit</Button>
            <Button>Delete</Button>
        </Box>
    );
};

export default MenteeDetails;