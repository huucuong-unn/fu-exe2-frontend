import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    TextField,
    Autocomplete,
    Button,
    Typography,
    Chip,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useEffect, useState } from 'react';
import TransactionAPI from '~/API/TransactionAPI';

function AdOrder() {
    const [selectedMentee, setSelectedMentee] = useState(null);
    const [orders, setOrders] = useState([]);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null);
    const [sortAmount, setSortAmount] = useState(null);
    const [sortPoint, setSortPoint] = useState(null);
    const [sortCreatedDate, setSortCreatedDate] = useState(null);
    const [params, setParams] = useState({
        email: '',
        sortAmount: '',
        sortPoint: '',
        sortCreatedDate: '',
        status: '',
        page: 1,
        limit: 10,
    });
    const [totalPage, setTotalPage] = useState(0);
    const [isPaging, setIsPaging] = useState(true);

    const fetchData = async () => {
        try {
            const ordersData = await TransactionAPI.getAllTransactionForAdmin(params);
            setOrders(ordersData.listResult);
            setTotalPage(ordersData.totalPage);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [isPaging]);

    useEffect(() => {
        console.log(params);
    }, [params]);

    const handlePageChange = (event, value) => {
        setParams((prev) => ({
            ...prev,
            page: value,
        }));

        if (isPaging === true) {
            setIsPaging(false);
        } else {
            setIsPaging(true);
        }
    };

    const handleSearch = () => {
        fetchData();
    };

    const handleRowClick = (mentee) => {
        setSelectedMentee(mentee);
    };

    const handleCloseModal = () => {
        setSelectedMentee(null);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, paddingRight: 2 }}>
                <TextField
                    id="outlined-basic"
                    label="Email..."
                    variant="outlined"
                    size="small"
                    value={params.email}
                    onChange={(e) => setParams({ ...params, email: e.target.value })}
                />
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={['SUCCESS', 'FAILED']}
                    sx={{ width: 200 }}
                    value={params.status}
                    onChange={(event, newValue) => setParams({ ...params, status: newValue })}
                    renderInput={(params) => <TextField {...params} label="Status" />}
                    size="small"
                />
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={['asc', 'desc']}
                    sx={{ width: 200 }}
                    value={params.sortAmount}
                    onChange={(event, newValue) => setParams({ ...params, sortAmount: newValue })}
                    renderInput={(params) => <TextField {...params} label="Sort by amount" />}
                    size="small"
                />
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={['asc', 'desc']}
                    sx={{ width: 200 }}
                    value={params.sortPoint}
                    onChange={(event, newValue) => setParams({ ...params, sortPoint: newValue })}
                    renderInput={(params) => <TextField {...params} label="Sort by points" />}
                    size="small"
                />
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={['asc', 'desc']}
                    sx={{ width: 200 }}
                    value={params.sortCreatedDate}
                    onChange={(event, newValue) => setParams({ ...params, sortCreatedDate: newValue })}
                    renderInput={(params) => <TextField {...params} label="Sort by createdDate" />}
                    size="small"
                />
                <Button variant="contained" size="medium" onClick={fetchData}>
                    Search
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                ID
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Amount
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Point
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Email
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Transaction Time
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders !== null ? (
                            orders.map((order) => (
                                <TableRow
                                    key={order.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        '&:hover': {
                                            cursor: 'pointer',
                                        },
                                    }}
                                    onClick={() => handleRowClick(order)}
                                >
                                    <TableCell component="th" scope="row">
                                        {order.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {order.amount}
                                    </TableCell>
                                    <TableCell align="left">{order.points}</TableCell>
                                    <TableCell align="left">{order.account.email}</TableCell>
                                    <TableCell align="left">{order.createdDate}</TableCell>
                                    <TableCell align="left">
                                        <Chip
                                            label={order.status}
                                            color={order.status === 'SUCCESS' ? 'success' : 'error'}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <div></div>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
                <Pagination
                    count={totalPage}
                    page={params.page}
                    onChange={handlePageChange}
                    renderItem={(item) => (
                        <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
                    )}
                />
            </Box>
        </Box>
    );
}

export default AdOrder;
