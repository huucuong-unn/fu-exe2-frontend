import { Box, Button, Grid } from '@mui/material';
import FailedCircle from '~/components/new/FailedCircle';
import { useNavigate } from 'react-router-dom';

export default function PaymentFailed() {
    const navigate = useNavigate();

    return (
        <Grid
            sx={{
                minHeight: '100vh',
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    width: '500px',
                    height: '500px',
                    borderRadius: '5px',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    padding: '2%',
                }}
            >
                <Box>
                    <Box>
                        <FailedCircle />
                    </Box>
                    <h1>Payment Failed</h1>
                    <p>Some error occur, please check again</p>
                </Box>

                <Box></Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            width: '40%',
                            bgcolor: '#051D40',
                            borderRadius: '10px',
                            padding: '12px 0',
                            fontSize: '14px',
                            ':hover': {
                                bgcolor: '#02F18D',
                                color: '#051D40',
                            },
                        }}
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        Back to Home
                    </Button>
                </Box>
            </Box>
        </Grid>
    );
}
