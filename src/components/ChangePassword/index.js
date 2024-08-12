import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React from 'react';

export const ChangePassword = () => {
    return (
        <Container sx={{ py: 6 }}>
            <Typography variant="h5" component="h3" sx={{ mb: 3 }}>
                Change Your Password
            </Typography>
            <Box sx={{ border: '1px solid #ccc', borderRadius: 5 }}>
                <Box sx={{ p: 3 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="New Password"
                        type="password"
                        id="password"
                        autoComplete="password"
                        sx={{ width: '50%' }}
                    />
                    <br />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm New Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="confirmPassword"
                        sx={{ width: '50%' }}
                    />
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            width: { lg: '15%', md: '20%', xs: '80%' },
                            my: 4,
                            backgroundColor: '#365E32',
                            '&:hover': {
                                backgroundColor: '#508D4E',
                            },
                        }}
                    >
                        Save Changes
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};
