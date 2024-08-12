import { Box, Button, Container, Typography, TextField, Autocomplete, InputLabel, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import ApplicationAPI from '~/API/ApplicationAPI';
import storageService from '~/components/StorageService/storageService';
import { useLocation, useNavigate } from 'react-router-dom';
export const Application = () => {
    const locations = [
        'An Giang',
        'Ba Ria - Vung Tau',
        'Bac Giang',
        'Bac Kan',
        'Bac Lieu',
        'Bac Ninh',
        'Ben Tre',
        'Binh Dinh',
        'Binh Duong',
        'Binh Phuoc',
        'Binh Thuan',
        'Ca Mau',
        'Can Tho',
        'Cao Bang',
        'Da Nang',
        'Dak Lak',
        'Dak Nong',
        'Dien Bien',
        'Dong Nai',
        'Dong Thap',
        'Gia Lai',
        'Ha Giang',
        'Ha Nam',
        'Ha Noi',
        'Ha Tinh',
        'Hai Duong',
        'Hai Phong',
        'Hau Giang',
        'Hoa Binh',
        'Hung Yen',
        'Khanh Hoa',
        'Kien Giang',
        'Kon Tum',
        'Lai Chau',
        'Lam Dong',
        'Lang Son',
        'Lao Cai',
        'Long An',
        'Nam Dinh',
        'Nghe An',
        'Ninh Binh',
        'Ninh Thuan',
        'Phu Tho',
        'Phu Yen',
        'Quang Binh',
        'Quang Nam',
        'Quang Ngai',
        'Quang Ninh',
        'Quang Tri',
        'Soc Trang',
        'Son La',
        'Tay Ninh',
        'Thai Binh',
        'Thai Nguyen',
        'Thanh Hoa',
        'Thua Thien Hue',
        'Tien Giang',
        'Ho Chi Minh',
        'Tra Vinh',
        'Tuyen Quang',
        'Vinh Long',
        'Vinh Phuc',
        'Yen Bai',
    ];

    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
    const [isIntroduceValid, setIsIntroduceValid] = useState(true);
    const [isReasonApplyValid, setIsReasonApplyValid] = useState(true);
    const [studentId, setStudentId] = useState(storageService.getItem('userInfo').studentId);
    const location = useLocation();
    const { mentorId } = location.state || {};
    const [showAlertError, setShowAlertError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const username = event.target.username.value;
        const phoneNumber = event.target.phoneNumber.value;
        const introduce = event.target.introduce.value;
        const reasonApply = event.target.reasonApply.value;

        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
            setIsEmailValid(false);
        } else {
            setIsEmailValid(true);
        }

        if (username.length < 5) {
            setIsUsernameValid(false);
        } else {
            setIsUsernameValid(true);
        }

        if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneNumber)) {
            setIsPhoneNumberValid(false);
        } else {
            setIsPhoneNumberValid(true);
        }

        if (introduce.length < 50) {
            setIsIntroduceValid(false);
        } else {
            setIsIntroduceValid(true);
        }

        if (reasonApply.length < 50) {
            setIsReasonApplyValid(false);
        } else {
            setIsReasonApplyValid(true);
        }

        if (isEmailValid && isUsernameValid && isPhoneNumberValid && isIntroduceValid && isReasonApplyValid) {
            const data = new FormData(event.currentTarget);
            console.log(mentorId);
            console.log(studentId);
            data.append('mentorId', mentorId);
            data.append('studentId', studentId);
            console.log(data);
            try {
                await ApplicationAPI.createApplication(data);
                navigate('/user/history', { state: { selectApplyTab: true } });
            } catch (error) {
                console.log(error);
                setShowAlertError(true);
                const timer = setTimeout(() => {
                    setShowAlertError(false);
                }, 5000);
                return () => clearTimeout(timer);
            }
        }
    };

    useEffect(() => {
        console.log(isUsernameValid);
    }, [isUsernameValid]);

    return (
        <Container sx={{ py: 20 }}>
            <Typography variant="h4" sx={{ mb: { xs: 2, sm: 4 } }}>
                Application
            </Typography>
            {showAlertError && (
                <Alert width="50%" variant="filled" severity="error" sx={{ marginBottom: 3 }}>
                    Don't have enought point to submit !
                </Alert>
            )}
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    border: '1px solid #ccc',
                    padding: 2,
                    borderRadius: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'left',
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <TextField
                        id="username"
                        name="fullName"
                        label="Full name"
                        variant="outlined"
                        sx={{ flex: 1 }}
                        error={!isUsernameValid}
                        helperText={!isUsernameValid ? 'Username must have more than 5 characters' : ''}
                    />
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        sx={{ flex: 1 }}
                        error={!isEmailValid}
                        helperText={!isEmailValid ? 'Invalid email' : ''}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <TextField
                        id="phoneNumber"
                        name="phoneNumber"
                        label="Phone number"
                        variant="outlined"
                        sx={{ flex: 1 }}
                        error={!isPhoneNumberValid}
                        helperText={!isPhoneNumberValid ? 'Invalid phone' : ''}
                    />
                    <TextField
                        id="facebook-url"
                        name="facebookUrl"
                        label="Facebook Url"
                        variant="outlined"
                        sx={{ flex: 1 }}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <TextField id="zalo-url" name="zaloAccount" label="Zalo Url" variant="outlined" sx={{ flex: 1 }} />
                    <Autocomplete
                        disablePortal
                        id="address"
                        name="userAddress"
                        options={locations}
                        sx={{ width: 300, flex: 1 }}
                        renderInput={(params) => <TextField {...params} label="Address" />}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'start',
                            gap: 1,
                            flex: 1,
                        }}
                    >
                        <InputLabel htmlFor="upload-cv" sx={{ fontWeight: 'bold' }}>
                            Upload CV
                        </InputLabel>
                        <TextField id="upload-cv" name="cvFile" variant="outlined" type="file" sx={{ width: '100%' }} />
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <TextField
                        id="introduce"
                        name="introduce"
                        label="Introduce"
                        multiline
                        rows={5}
                        sx={{ width: '50%', flex: 1 }}
                        error={!isIntroduceValid}
                        helperText={!isIntroduceValid ? 'Introduce must have more than 50 characters' : ''}
                    />
                    <TextField
                        id="reasonApply"
                        name="reasonApply"
                        label="Reason apply"
                        multiline
                        rows={5}
                        sx={{ width: '50%', flex: 1 }}
                        error={!isReasonApplyValid}
                        helperText={!isReasonApplyValid ? 'Reason apply must have more than 50 characters' : ''}
                    />
                </Box>
                <Button
                    variant="contained"
                    size="large"
                    sx={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#365E32',
                    }}
                    type="submit"
                >
                    Submit
                </Button>
            </Box>
        </Container>
    );
};
