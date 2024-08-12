import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const AddMenteeForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('Active');

    const handleSubmit = (e) => {
        e.preventDefault();
       
        console.log({ name, email, status });
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h5">Add New Mentee</Typography>
            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </Box>
    );
};

export default AddMenteeForm;