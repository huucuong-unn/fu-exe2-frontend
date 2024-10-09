import { Box, Button, Divider, Grid } from '@mui/material';
import SuccessCircle from '~/components/new/SuccessCircle';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import storageService from '~/components/StorageService/storageService';
import AccountAPI from '~/API/AccountAPI';
import SubscriptionAPI from '~/API/SubscriptionAPI';

export default function PaymentSuccess() {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState(storageService.getItem('userInfo') || null);

    const fetchUser = async () => {
        // This useEffect is now only for updating userInfo if it changes in localStorage
        const storedUserInfo = await storageService.getItem('userInfo');

        if (storedUserInfo !== null) {
            // Remove old userInfo from local storage
            storageService.removeItem('userInfo');

            // Fetch the updated user info based on the stored user id
            const userResponse = await AccountAPI.getUserById(storedUserInfo?.id);
            const currentPlan = await SubscriptionAPI.getByUserId(userResponse?.id);
            userResponse.planType = currentPlan.planType;
            userResponse.subscriptionId = currentPlan.id;

            // Set the new user info in local storage
            storageService.setItem('userInfo', userResponse);

            // Update the state with the new user info
            setUserInfo(userResponse);

            // Optionally log the updated user info
            console.log(userResponse);
        }
    };

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
                    <p>Thank you for your payment. Your order is being processed.</p>
                </Box>

                <Divider />
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
                            fetchUser();
                            window.location.href = '/';
                        }}
                    >
                        Back to Home
                    </Button>
                </Box>
            </Box>
        </Grid>
    );
}
