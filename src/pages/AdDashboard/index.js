import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { BarChart, LineChart, axisClasses } from '@mui/x-charts';

function AdDashboard() {
    const [topCompanies, setTopCompanies] = useState([]);
    const [applicationsByMonth, setApplicationsByMonth] = useState([]);
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);

    useEffect(() => {
        fetch('https://tortee-463vt.ondigitalocean.app/api/v1/dashboard')
            .then(response => response.json())
            .then(data => {
                setTopCompanies(data.topFiveCompany);
                setApplicationsByMonth(data.applicationByMonth);
                setMonthlyRevenue(data.monthlyRevenue);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const valueFormatter = (value) => `${value}`;
    const dataset = [
        { mentee: 21, mentor: 10, company: 1, seoul: 2, month: 'Fall 2023' },
        { mentee: 42, mentor: 12, company: 3, seoul: 5, month: 'Spring 2024' },
        { mentee: 50, mentor: 25, company: 6, seoul: 1, month: 'Summer 2024' },


    ];

    const revenueFormatter = (value) => {
        if (value >= 1e9) {
            return `${(value / 1e9).toFixed(1)}B`;
        } else if (value >= 1e6) {
            return `${(value / 1e6).toFixed(1)}M`;
        }
        return value.toString();
    };
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                gap: 4,
                width: '100%',
                minHeight: '600px',
                padding: 2,
            }}
        >
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, width: '100%' }}>
                <ChartBox title="Mentorship Campaign Participation - Quarterly Breakdown">
                    <BarChart
                        dataset={dataset}
                        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                        series={[
                            { dataKey: 'mentee', label: 'Mentee', valueFormatter },
                            { dataKey: 'mentor', label: 'Mentor', valueFormatter },
                            { dataKey: 'company', label: 'Company', valueFormatter },
                        ]}
                        {...chartSetting}
                    />
                </ChartBox>

                <ChartBox title="Monthly Revenue - 2024">
                    <LineChart
                        xAxis={[{ data: monthlyRevenue.map(data => data.month) }]}
                        yAxis={[{  valueFormatter: revenueFormatter }]}
                        series={[{ data: monthlyRevenue.map(data => data.revenue) }]}
                        width={600}
                        height={400}
                    />
                </ChartBox>

                <ChartBox title="Student Applications by Month">
                    <BarChart
                        dataset={applicationsByMonth.map(data => ({ month: data.month, applicationCount: data.applicationCount }))}
                        yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                        series={[{ dataKey: 'applicationCount', label: 'Application', valueFormatter }]}
                        layout="horizontal"
                        grid={{ vertical: true }}
                        {...chartSettingForBarChart}
                    />
                </ChartBox>

                <Box
                    sx={{
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        width: '600px',
                        height: '500px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        padding: 2,
                    }}
                >
                    <Typography variant="h6">TOP 5 COMPANIES WITH THE MOST APPLICATIONS</Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 550 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" sx={{ fontWeight: 'bold' }}>No</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: 'bold' }}>Company</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: 'bold' }}>Number of applications</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {topCompanies.map((company, index) => (
                                    <TableRow key={company.companyName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">{index + 1}</TableCell>
                                        <TableCell align="left">{company.companyName}</TableCell>
                                        <TableCell align="left">{company.applicationCount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    );
}

const ChartBox = ({ title, children }) => (
    <Box
        sx={{
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            width: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            padding: 2,
        }}
    >
        {children}
        <Box sx={{ padding: 1 }}>
            <Typography variant="h5">{title}</Typography>
        </Box>
    </Box>
);

const chartSettingForBarChart = {
    xAxis: [{ label: 'application' }],
    width: 600,
    height: 400,
};

const chartSetting = {
    yAxis: [{ label: '' }],
    width: 600,
    height: 400,
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-20px, 0)',
        },
    },
};

export default AdDashboard;
