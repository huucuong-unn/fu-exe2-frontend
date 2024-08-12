import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';
import Title from '../Title';

// Generate Mentorship Transactions Data
function createData(id, date, companyName, campaign, mentor, mentee, amountPaid) {
  return { id, date, companyName, campaign, mentor, mentee, amountPaid };
}

const rows = [
  createData(
    0,
    '16 Mar, 2023',
    'ABC Corp',
    'Spring Internship',
    'John Doe',
    'Jane Smith',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2023',
    'XYZ Ltd',
    'Summer Bootcamp',
    'Alice Johnson',
    'Bob Brown',
    700.00,
  ),
  createData(
    2,
    '15 Mar, 2023',
    'Example Inc',
    'Data Science Workshop',
    'Michael Lee',
    'Sara Davis',
    800.00,
  ),
  createData(
    3,
    '15 Mar, 2023',
    'Tech Solutions',
    'Cyber Security Webinar',
    'Chris Martin',
    'Emma Wilson',
    600.00,
  ),
  createData(
    4,
    '13 Mar, 2023',
    'NextGen Corp',
    'Leadership Workshop',
    'Olivia White',
    'Liam Thompson',
    212.79,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function MentorshipTransactions() {
  return (
    <React.Fragment>
      <Title>Mentorship Transactions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>Campaign</TableCell>
            <TableCell>Mentor</TableCell>
            <TableCell>Mentee</TableCell>
            <TableCell align="right">Amount Paid</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.companyName}</TableCell>
              <TableCell>{row.campaign}</TableCell>
              <TableCell>{row.mentor}</TableCell>
              <TableCell>{row.mentee}</TableCell>
              <TableCell align="right">{`$${row.amountPaid.toFixed(2)}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more transactions
      </Link>
    </React.Fragment>
  );
}
