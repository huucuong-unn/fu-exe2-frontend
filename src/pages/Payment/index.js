import React, { useState } from 'react';
import {
    Container,
    Box,
    Grid,
    Paper,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import VNPayAPI from '~/API/VNPayAPI'; // Assuming you are using uuid library
import storageService from '~/components/StorageService/storageService';
const paymentMethods = [
    {
        id: 1,
        name: 'VNPAY',
        icon: 'https://play-lh.googleusercontent.com/2WHgcuwhtbmfrDEF-D-lYQ4sAk0TlI-aFtqx7lJXK5KV7f8smnofaedP_Opcd3edR2c',
    },
];

const prices = [
    { id: 1, price: '10 000 VND', points: 20 },
    { id: 2, price: '20 000 VND', points: 40 },
    { id: 3, price: '50 000 VND', points: 100 },
    { id: 4, price: '100 000 VND', points: 200 },
    { id: 5, price: '200 000 VND', points: 400 },
    { id: 6, price: '500 000 VND', points: 1000 },
    { id: 7, price: '1 000 000 VND', points: 2000 },
    { id: 8, price: '2 000 000 VND', points: 4000 },
    { id: 9, price: '5 000 000 VND', points: 10000 },
];

const Payment = () => {
    const [selectedPrice, setSelectedPrice] = useState(prices[0]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0]);
    const [userInfo, setUserInfo] = useState(storageService.getItem('userInfo'));
    const handlePriceChange = (event) => {
        const selected = prices.find((price) => price.id === parseInt(event.target.value));
        setSelectedPrice(selected);
    };

    const handlePaymentMethodChange = (event) => {
        const selected = paymentMethods.find((method) => method.id === parseInt(event.target.value));
        setSelectedPaymentMethod(selected);
    };

    const handlePayment = async () => {
        const paymentData = {
            amount: parseFloat(selectedPrice.price.replace(/[^0-9.-]+/g, '')), // Convert price string to number
            points: selectedPrice.points,
            accountId: userInfo.id, // Generate a UUID for accountId
        };

        try {
            const response = await VNPayAPI.doPay(paymentData);
            window.location.href = response;

            const result = await response.json();
            alert('Payment successful!');
        } catch (error) {
            alert('Payment failed: ' + error.message);
        }
    };

    return (
        <Container id="companies" sx={{ py: { xs: 8, sm: 16 }, padding: { lg: 16 } }}>
            <Box>
                <Typography variant="h4" gutterBottom>
                    Exchange Points
                </Typography>
                <Paper
                    elevation={2}
                    sx={{
                        mb: 2,
                        p: 2,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Select Payment Method
                    </Typography>
                    <RadioGroup value={selectedPaymentMethod.id.toString()} onChange={handlePaymentMethodChange} row>
                        {paymentMethods.map((method) => (
                            <FormControlLabel
                                key={method.id}
                                value={method.id.toString()}
                                control={<Radio />}
                                sx={{ ml: 1 }}
                                label={
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            paddingRight: 1,
                                            paddingLeft: 1,
                                        }}
                                    >
                                        <img
                                            src={method.icon}
                                            alt={method.name}
                                            style={{ width: 24, height: 24, marginRight: 8 }}
                                        />
                                        {method.name}
                                    </Box>
                                }
                                style={{
                                    border:
                                        selectedPaymentMethod.id === method.id
                                            ? '1px solid #365E32'
                                            : '1px solid transparent',
                                    borderRadius: '4px',
                                    marginRight: '10px',
                                    transition: 'border 0.3s',
                                }}
                            />
                        ))}
                    </RadioGroup>
                </Paper>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        <Paper elevation={2}>
                            <Box p={2}>
                                <Typography variant="h6" gutterBottom>
                                    Select Amount
                                </Typography>
                                <RadioGroup value={selectedPrice.id.toString()} onChange={handlePriceChange}>
                                    {prices.map((price, index) => (
                                        <React.Fragment key={price.id}>
                                            <FormControlLabel
                                                value={price.id.toString()}
                                                control={<Radio />}
                                                label={`${price.price} - Point × ${price.points}`}
                                                style={{
                                                    border:
                                                        selectedPrice.id === price.id
                                                            ? '1px solid #365E32'
                                                            : '1px solid transparent',
                                                    borderRadius: '4px',
                                                    transition: 'border 0.3s',
                                                }}
                                            />
                                            {index < prices.length - 1 && <Divider />}
                                        </React.Fragment>
                                    ))}
                                </RadioGroup>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={2}>
                            <Box p={2}>
                                <Typography variant="h6" gutterBottom>
                                    Transaction Details
                                </Typography>
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary="Selected Product"
                                            secondary={`Point × ${selectedPrice.points}`}
                                        />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText primary="Price" secondary={selectedPrice.price} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText primary="Payment Method" secondary={selectedPaymentMethod.name} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText primary="Account" secondary={userInfo.username} />
                                    </ListItem>
                                </List>
                                <Box mt={2}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={handlePayment}
                                        sx={{
                                            backgroundColor: '#365E32',
                                            '&:hover': {
                                                backgroundColor: '#508D4E',
                                            },
                                        }}
                                    >
                                        Process Payment
                                    </Button>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Payment;
