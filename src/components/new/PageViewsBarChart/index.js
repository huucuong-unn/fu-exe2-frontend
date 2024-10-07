import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';

export default function PageViewsBarChart() {
    const theme = useTheme();
    const colorPalette = [
        (theme.vars || theme).palette.primary.dark,
        (theme.vars || theme).palette.primary.main,
        (theme.vars || theme).palette.primary.light,
    ];

    // Helper function to get current date in 'YYYY-MM-DD' format
    const getCurrentDate = () => {
        const date = new Date();
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(
            2,
            '0',
        )}`;
    };

    // Helper function to get the name of the day (e.g., "Monday", "Tuesday")
    const getDayName = (date) => {
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    };

    // Load page view data from localStorage or initialize it
    const loadPageViewData = () => {
        const pageViews = JSON.parse(localStorage.getItem('pageViewData')) || {};
        const today = getCurrentDate();

        // Increment page view count for today
        if (!pageViews[today]) {
            pageViews[today] = 1; // If no entry for today, start with 1
        } else {
            pageViews[today] += 1; // Increment page view count
        }

        // Save updated data back to localStorage
        localStorage.setItem('pageViewData', JSON.stringify(pageViews));

        return pageViews;
    };

    // Get page view data and day names for the past week (or more if needed)
    const getPageViewsForChart = (pageViewData) => {
        const last7Days = [];
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
                date.getDate(),
            ).padStart(2, '0')}`;
            last7Days.push({
                day: getDayName(date), // Get the day name (e.g., "Monday")
                count: pageViewData[dateString] || 0, // Get page view count for the date, or 0 if none
            });
        }

        return last7Days;
    };

    // Call function to load page view data
    const pageViewData = loadPageViewData();
    const pageViewCounts = getPageViewsForChart(pageViewData);
    const dayNames = pageViewCounts.map((dayData) => dayData.day);
    const pageViewValues = pageViewCounts.map((dayData) => dayData.count);

    return (
        <Card variant="outlined" sx={{ width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                    Page views per day
                </Typography>
                <Stack sx={{ justifyContent: 'space-between' }}>
                    <Stack
                        direction="row"
                        sx={{
                            alignContent: { xs: 'center', sm: 'flex-start' },
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <Typography variant="h4" component="p">
                            {pageViewValues.reduce((a, b) => a + b, 0)} {/* Total page views */}
                        </Typography>
                        <Chip size="small" color="error" label="-8%" />
                    </Stack>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Page views for the last 7 days
                    </Typography>
                </Stack>
                <BarChart
                    borderRadius={8}
                    colors={colorPalette}
                    xAxis={[
                        {
                            scaleType: 'band',
                            categoryGapRatio: 0.5,
                            data: dayNames, // Use actual day names instead of "Day 1", "Day 2"
                        },
                    ]}
                    series={[
                        {
                            id: 'pageViews',
                            label: 'Page views',
                            data: pageViewValues, // Page view counts corresponding to the day names
                            stack: 'A',
                        },
                    ]}
                    height={250}
                    margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
                    grid={{ horizontal: true }}
                    slotProps={{
                        legend: {
                            hidden: true,
                        },
                    }}
                />
            </CardContent>
        </Card>
    );
}
