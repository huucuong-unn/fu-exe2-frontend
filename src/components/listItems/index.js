import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const MainListItems = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
        window.scrollTo(0, 0); // Cuộn lên đầu trang
    };

    return (
        <React.Fragment>
            <ListItemButton onClick={() => handleNavigate('/admin/dashboard')}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton onClick={() => handleNavigate('/admin/orders')}>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
            </ListItemButton>
            <ListItemButton onClick={() => handleNavigate('/admin/mentor')}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Mentor" />
            </ListItemButton>
            <ListItemButton onClick={() => handleNavigate('/admin/mentee')}>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Mentee" />
            </ListItemButton>
            <ListItemButton onClick={() => handleNavigate('/admin/campaign')}>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Campaign" />
            </ListItemButton>
            <ListItemButton onClick={() => handleNavigate('/admin/account')}>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Account" />
            </ListItemButton>
        </React.Fragment>
    );
};

export const SecondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Saved reports
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItemButton>
    </React.Fragment>
);
