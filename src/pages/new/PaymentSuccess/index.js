import { Box, Button, Divider, Grid } from '@mui/material';
import SuccessCircle from '~/components/new/SuccessCircle';
import { useNavigate } from 'react-router-dom';

export default function PaymentSuccess() {
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
                        <SuccessCircle />
                    </Box>
                    <h1>Payment Successful</h1>
                    <p>Thank you for your payment. Your order is being processed.Katina</p>
                </Box>

                <Divider />
                <Box sx={{ my: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p>Amount Paid:</p>
                        <p>$99.99</p>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p>Payment Method:</p>
                        <p>Visa</p>
                    </Box>{' '}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p>Date & Time:</p>
                        <p>April 18, 2024 at 3:45 PM</p>
                    </Box>
                </Box>
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
