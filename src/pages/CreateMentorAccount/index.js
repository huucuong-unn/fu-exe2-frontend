import { Container, TextField, Button, Box, Typography as TypographyMaterial } from '@mui/material';

import { Link } from 'react-router-dom';

function CreateMentorAccount() {
    return (
        <Container id="companies" sx={{ py: { xs: 8, sm: 16 }, padding: { lg: 16 } }}>
            <TypographyMaterial variant="h4" sx={{ mb: { xs: 2, sm: 4 } }}>
                Create account for mentor
            </TypographyMaterial>
            <Box
                component="form"
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    justifyContent: 'center',
                    gap: 3,
                }}
            >
                <TextField required id="outlined-required" label="Username" sx={{ width: '50%' }} />
                <TextField required id="outlined-required" label="Password" sx={{ width: '50%' }} />
                <TextField required id="outlined-required" label="Confirm Password" sx={{ width: '50%' }} />
                <Box
                    sx={{

                        display: 'flex',
                        justifyContent: 'right',
                        gap: 3,
                        width: '50%',
                    }}
                >
                    <Link to="/company/create-mentor-profile">
                        <Button type="submit" variant="contained" sx={{ backgroundColor: '#365E32' }}>
                            Register and Next
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Container>
    );
}

export default CreateMentorAccount;
