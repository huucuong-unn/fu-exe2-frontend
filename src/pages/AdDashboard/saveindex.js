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

const chartSettingForBarChart = {
    xAxis: [{ label: 'application' }],
    width: 600,
    height: 400,
};

const datasetForBarChar = [
    // Data truncated for brevity
    { london: 59, paris: 57, newYork: 86, seoul: 21, month: 'Jan' },
    // More data...
];

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

const dataset = [
    { london: 59, paris: 57, newYork: 86, seoul: 21, month: 'Spring 2024' },
    // More data...
];

const rows = [
    { name: 1, calories: 159, fat: 6.0 },
    // More data...
];

const valueFormatter = (value) => `${value}`;
const revenueFormatter = (value) => {
    if (value >= 1e9) {
        return `${(value / 1e9).toFixed(1)}B`;
    } else if (value >= 1e6) {
        return `${(value / 1e6).toFixed(1)}M`;
    }
    return value.toString();
};

function AdDashboard() {
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
                            { dataKey: 'london', label: 'Mentee', valueFormatter },
                            { dataKey: 'paris', label: 'Mentor', valueFormatter },
                            { dataKey: 'newYork', label: 'Company', valueFormatter },
                        ]}
                        {...chartSetting}
                    />
                </ChartBox>

                <ChartBox title="Monthly Revenue - 2024">
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
                        series={[{ data: [11, 5.5, 2, 8.5, 1.5, 5, 11, 5.5, 2, 8.5, 1.5, 5] }]}
                        width={600}
                        height={400}
                    />
                </ChartBox>

                <ChartBox title="Student Applications by Month">
                    <BarChart
                        dataset={datasetForBarChar}
                        yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                        series={[{ dataKey: 'seoul', label: 'Application', valueFormatter }]}
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
                                {rows.map((row) => (
                                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">{row.name}</TableCell>
                                        <TableCell align="left">{row.calories}</TableCell>
                                        <TableCell align="left">{row.fat}</TableCell>
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

export default AdDashboard;