import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { styled } from '@mui/system';

const mentees = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { id: 3, name: 'Emily Johnson', email: 'emily.johnson@example.com', status: 'Active' },
    { id: 4, name: 'Michael Brown', email: 'michael.brown@example.com', status: 'Inactive' },
    { id: 5, name: 'Sarah Davis', email: 'sarah.davis@example.com', status: 'Active' },
    { id: 6, name: 'David Wilson', email: 'david.wilson@example.com', status: 'Inactive' },
    { id: 7, name: 'Laura Martinez', email: 'laura.martinez@example.com', status: 'Active' },
    { id: 8, name: 'James Anderson', email: 'james.anderson@example.com', status: 'Inactive' },
    { id: 9, name: 'Patricia Thomas', email: 'patricia.thomas@example.com', status: 'Active' },
    { id: 10, name: 'Robert Taylor', email: 'robert.taylor@example.com', status: 'Inactive' },
];

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    marginTop: theme?.spacing?.(4) ?? 32,
    boxShadow: theme?.shadows?.[3] ?? '0px 1px 3px rgba(0,0,0,0.2)',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
}));

const ActionButton = styled(Button)(({ theme }) => ({
    margin: theme?.spacing?.(0.5) ?? '4px',
}));

const StatusButton = styled(Button)(({ theme, status }) => ({
    backgroundColor:
        status === 'Active' ? theme?.palette?.success?.main ?? 'green' : theme?.palette?.error?.main ?? 'red',
    color: theme?.palette?.common?.white ?? 'white',
    '&:hover': {
        backgroundColor:
            status === 'Active'
                ? theme?.palette?.success?.dark ?? 'darkgreen'
                : theme?.palette?.error?.dark ?? 'darkred',
    },
}));

const MenteeList = ({ onSelectMentee }) => {
    return (
        <StyledTableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Status</StyledTableCell>
                        <StyledTableCell align="center">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mentees.map((mentee) => (
                        <TableRow key={mentee.id}>
                            <TableCell>{mentee.id}</TableCell>
                            <TableCell>{mentee.name}</TableCell>
                            <TableCell>{mentee.email}</TableCell>
                            <TableCell>
                                <StatusButton status={mentee.status}>{mentee.status}</StatusButton>
                            </TableCell>
                            <TableCell align="center">
                                <ActionButton color="primary" onClick={() => onSelectMentee(mentee)}>
                                    VIEW
                                </ActionButton>
                                <ActionButton color="secondary">EDIT</ActionButton>
                                <ActionButton color="error">DELETE</ActionButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </StyledTableContainer>
    );
};

export default MenteeList;
