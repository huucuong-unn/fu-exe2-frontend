import React from 'react';
import Pagination from '@mui/material/Pagination';
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Paper,
    IconButton,
    Tooltip,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const CampaignDetail = () => {
    // Simulated campaign data
    const campaign = {
        id: 1,
        name: 'Sample Campaign',
        description: 'Campaign Description',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        status: 'ACTIVE',
        mentees: [
            { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
            { id: 3, name: 'Alice Brown', email: 'alice@example.com', status: 'Needs Approval' },
            { id: 4, name: 'Bob Johnson', email: 'bob@example.com', status: 'Needs Approval' },
            // Add more mentees as needed
        ],
    };

    const [filterStatus, setFilterStatus] = React.useState('All');
    const [page, setPage] = React.useState(1);
    const [menteesPerPage] = React.useState(5); // Number of mentees per page
    const [showApprovalList, setShowApprovalList] = React.useState(false);

    // Handler for selecting a mentee
    const handleSelectMentee = (mentee) => {
        console.log('Selected Mentee:', mentee);
        // Implement further logic if needed
    };

    // Handler for changing filter status
    const handleFilterChange = (event) => {
        setFilterStatus(event.target.value);
        setPage(1); // Reset page to 1 when filter changes
    };

    // Handler for changing page
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    // Handler for mentee actions (approve/reject)
    const handleAction = (menteeId, action) => {
        // Implement your action logic here
        console.log(`Action ${action} performed for mentee with ID: ${menteeId}`);
    };

    // Filter mentees based on status
    const filteredMentees = campaign.mentees.filter((mentee) => {
        if (filterStatus === 'All') {
            return true;
        }
        return mentee.status === filterStatus;
    });

    // Mentees needing approval
    const menteesNeedingApproval = campaign.mentees.filter((mentee) => mentee.status === 'Needs Approval');

    // Combine mentees needing approval and other mentees
    const allMentees = [
        ...menteesNeedingApproval,
        ...filteredMentees.filter((mentee) => mentee.status !== 'Needs Approval'),
    ];

    // Pagination calculation
    const indexOfLastMentee = page * menteesPerPage;
    const indexOfFirstMentee = indexOfLastMentee - menteesPerPage;
    const currentMentees = allMentees.slice(indexOfFirstMentee, indexOfLastMentee);
    const totalPages = Math.ceil(allMentees.length / menteesPerPage);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Campaign Details
            </Typography>
            <Paper sx={{ p: 2, borderRadius: 1, boxShadow: 1, mb: 3 }}>
                <Typography variant="h6">{campaign.name}</Typography>
                <Typography variant="body2" gutterBottom>
                    Description: {campaign.description}
                </Typography>
                <Typography variant="body2">Start Date: {campaign.startDate}</Typography>
                <Typography variant="body2">End Date: {campaign.endDate}</Typography>
                <Typography
                    variant="body2"
                    sx={{ fontWeight: 'bold', color: campaign.status === 'ACTIVE' ? 'green' : 'red' }}
                >
                    Status: {campaign.status}
                </Typography>
            </Paper>
            <Box mb={2}>
                <Button
                    variant="contained"
                    color={showApprovalList ? 'secondary' : 'primary'}
                    onClick={() => setShowApprovalList((prev) => !prev)}
                >
                    {showApprovalList ? 'Hide Mentees Needing Approval' : 'Show Mentees Needing Approval'}
                </Button>
            </Box>
            {showApprovalList && (
                <Paper sx={{ p: 2, borderRadius: 1, boxShadow: 1, mb: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        Mentees Needing Approval
                    </Typography>
                    {menteesNeedingApproval.length > 0 ? (
                        <MenteeSection
                            mentees={menteesNeedingApproval}
                            filterStatus="Needs Approval"
                            onSelectMentee={handleSelectMentee}
                            handleAction={handleAction}
                        />
                    ) : (
                        <Typography variant="body2">No mentees need approval at the moment.</Typography>
                    )}
                </Paper>
            )}
            <Paper sx={{ p: 2, borderRadius: 1, boxShadow: 1 }}>
                <Typography variant="h5" gutterBottom>
                    All Mentees
                </Typography>
                <MenteeSection
                    mentees={currentMentees}
                    filterStatus={filterStatus}
                    onSelectMentee={handleSelectMentee}
                    onFilterChange={handleFilterChange}
                    totalPages={totalPages}
                    currentPage={page}
                    onPageChange={handlePageChange}
                    handleAction={handleAction}
                />
            </Paper>
        </Box>
    );
};

const MenteeSection = ({
    mentees,
    filterStatus,
    onSelectMentee,
    onFilterChange,
    totalPages,
    currentPage,
    onPageChange,
    handleAction,
}) => {
    return (
        <>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="filter-status-label">Filter by Status</InputLabel>
                <Select
                    labelId="filter-status-label"
                    id="filter-status"
                    value={filterStatus}
                    onChange={onFilterChange}
                    label="Filter by Status"
                >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                    <MenuItem value="Needs Approval">Needs Approval</MenuItem>
                </Select>
            </FormControl>
            {mentees.length > 0 ? (
                <>
                    <Box sx={{ border: '1px solid #ccc', borderRadius: 1, overflow: 'hidden' }}>
                        {mentees.map((mentee, index) => (
                            <Box
                                key={mentee.id}
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#f0f0f0',
                                    borderBottom: '1px solid #ccc',
                                }}
                            >
                                <Box
                                    sx={{
                                        minWidth: 40,
                                        height: 40,
                                        backgroundColor: '#333',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: 2,
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        color: '#fff',
                                    }}
                                >
                                    {index + 1}
                                </Box>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="body1">{mentee.name}</Typography>
                                    <Typography variant="body2">Status: {mentee.status}</Typography>
                                </Box>
                                {mentee.status === 'Needs Approval' && (
                                    <Tooltip title="Approve">
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleAction(mentee.id, 'approve')}
                                            sx={{ mr: 1 }}
                                        >
                                            <CheckIcon />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                {mentee.status === 'Needs Approval' && (
                                    <Tooltip title="Reject">
                                        <IconButton color="secondary" onClick={() => handleAction(mentee.id, 'reject')}>
                                            <ClearIcon />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </Box>
                        ))}
                    </Box>
                    {totalPages > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <Pagination count={totalPages} page={currentPage} onChange={onPageChange} color="primary" />
                        </Box>
                    )}
                </>
            ) : (
                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                    No mentees found matching the selected filter criteria.
                </Typography>
            )}
        </>
    );
};

export default CampaignDetail;
