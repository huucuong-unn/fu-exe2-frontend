import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
// Generate Order Data
function createData(id, date, companyName, Campain, paymentMethod, transactionId,amountPaid) {
    return { id, date, companyName, Campain, paymentMethod, transactionId,amountPaid };
  }
  
  const rows = [
    createData(
      0,
      '16 Mar, 2019',
      'ABC Corp',
      'Spring Internship',
      'VISA **** 1234',
      'TXN0001',
      312.44,
    ),
    createData(
      1,
      '16 Mar, 2023',
      'XYZ Ltd ',
      'Summer Bootcamp',
      'MC **** 5678',
      'TXN0002 ',
      700.00,
    ),
    createData(2, '15 Mar, 2023', 'Example Inc', 'Data Science Workshop', 'PayPal','TXN0003', 800.00),
    createData(
      3,
      '15 Mar, 2023',
      'Tech Solutions',
      ' Cyber Security Webinar',
      'VISA **** 4321',
      'TXN0004',
      600.00,
    ),
    createData(
      4,
      '13 Mar, 2023',
      'NextGen Corp',
      'Leadership Workshop',
      'VISA **** 5678',
      'TXN0007',
      212.79,
    ),
  ]
  

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>Campain</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell>Transaction ID</TableCell>
            <TableCell align="right">Amount Paid</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.companyName}</TableCell>
              <TableCell>{row.Campain}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell>{row.transactionId}</TableCell>
              <TableCell align="right">{`$${row.amountPaid}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}