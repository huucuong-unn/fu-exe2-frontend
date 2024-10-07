import * as React from 'react';
import PropTypes from 'prop-types';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import PaymentAPI from '~/API/PaymentAPI';

const StyledText = styled('text', {
    shouldForwardProp: (prop) => prop !== 'variant',
})(({ theme }) => ({
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fill: (theme.vars || theme).palette.text.secondary,
    variants: [
        {
            props: {
                variant: 'primary',
            },
            style: {
                fontSize: theme.typography.h5.fontSize,
            },
        },
        {
            props: ({ variant }) => variant !== 'primary',
            style: {
                fontSize: theme.typography.body2.fontSize,
            },
        },
        {
            props: {
                variant: 'primary',
            },
            style: {
                fontWeight: theme.typography.h5.fontWeight,
            },
        },
        {
            props: ({ variant }) => variant !== 'primary',
            style: {
                fontWeight: theme.typography.body2.fontWeight,
            },
        },
    ],
}));

function PieCenterLabel({ primaryText, secondaryText }) {
    const { width, height, left, top } = useDrawingArea();
    const primaryY = top + height / 2 - 10;
    const secondaryY = primaryY + 24;

    return (
        <React.Fragment>
            <StyledText variant="primary" x={left + width / 2} y={primaryY}>
                {primaryText}
            </StyledText>
            <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
                {secondaryText}
            </StyledText>
        </React.Fragment>
    );
}

PieCenterLabel.propTypes = {
    primaryText: PropTypes.string.isRequired,
    secondaryText: PropTypes.string.isRequired,
};

// const colors = ['hsl(220, 20%, 65%)', 'hsl(220, 20%, 42%)', 'hsl(220, 20%, 35%)', 'hsl(220, 20%, 25%)'];
const colors = ['#02F18D', '#051D40'];

export default function ChartUserByCountry() {
    const [paymentDashBoard, setPaymentDashBoard] = React.useState([]);
    const [totalAllPayment, setTotalAllPayment] = React.useState(0);
    const data = [
        { label: 'Silver Tee', value: paymentDashBoard?.[0]?.total || 0 },
        { label: 'Golden Tee', value: paymentDashBoard?.[1]?.total || 0 },
    ];

    React.useEffect(() => {
        const fetchPaymentsDashboard = async () => {
            try {
                const response = await PaymentAPI.getPaymentsDashboard();
                setPaymentDashBoard(response?.paymentDashBoard);
                setTotalAllPayment(response?.totalAllPayment);
                console.log(response);
            } catch (error) {
                console.log('Failed to fetch payments: ', error);
            }
        };

        fetchPaymentsDashboard();
    }, []);

    return (
        <Card
            variant="outlined"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                flexGrow: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }}
        >
            <CardContent>
                <Typography component="h2" variant="subtitle2">
                    Silver Plan vs Golden Plan
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PieChart
                        colors={colors}
                        margin={{
                            left: 80,
                            right: 80,
                            top: 80,
                            bottom: 80,
                        }}
                        series={[
                            {
                                data,
                                innerRadius: 75,
                                outerRadius: 100,
                                paddingAngle: 0,
                                highlightScope: { faded: 'global', highlighted: 'item' },
                            },
                        ]}
                        height={260}
                        width={260}
                        slotProps={{
                            legend: { hidden: true },
                        }}
                    >
                        <PieCenterLabel
                            primaryText={totalAllPayment ? totalAllPayment + 'đ' : 0}
                            secondaryText="Total"
                        />
                    </PieChart>
                </Box>
                {paymentDashBoard?.map((plan, index) => (
                    <Stack key={index} direction="row" sx={{ alignItems: 'center', gap: 2, pb: 2 }}>
                        <Stack sx={{ gap: 1, flexGrow: 1 }}>
                            <Stack
                                direction="row"
                                sx={{
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <Typography variant="body2" sx={{ fontWeight: '500' }}>
                                    {plan?.tierName}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {(plan?.total / totalAllPayment) * 100}%
                                </Typography>
                            </Stack>
                            <LinearProgress
                                variant="determinate"
                                aria-label="Number of users by country"
                                value={(plan?.total / totalAllPayment) * 100}
                                sx={{
                                    [`& .${linearProgressClasses.bar}`]: {
                                        backgroundColor: colors[index],
                                    },
                                }}
                            />
                        </Stack>
                    </Stack>
                ))}
            </CardContent>
        </Card>
    );
}
