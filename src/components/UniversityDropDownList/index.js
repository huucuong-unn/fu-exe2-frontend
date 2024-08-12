import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import UniversityAPI from '../../API/UniversityAPI'; // Importing your UniversityAPI

export default function UniversityDropDownList({ widthOfParent, universityName, onSelectUniversity }) {
    const [universities, setUniversities] = useState([]);
    const [filteredUniversities, setFilteredUniversities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await UniversityAPI.getAllForDropDownList();
                setUniversities(response);
                // Assuming API response data is an array of universities
            } catch (error) {
                console.error('Error fetching universities:', error);
            }
        };
        fetchData(); // Call the async function to fetch data
    }, []); // Empty dependency array ensures useEffect runs only once when component mounts

    useEffect(() => {
        let filtered = [];
        if (universityName !== '') {
            filtered = universities.filter((university) =>
                university.name.toLowerCase().includes(universityName.toLowerCase()),
            );
        } else {
            filtered = universities;
        }
        // Filter universities based on search term
        setFilteredUniversities(filtered);
    }, [universityName, universities]);

    // Render function for each item in the list
    function renderRow({ index, style }) {
        try {
            const university = filteredUniversities[index];
            if (!university) return null; // Handle if university is undefined
            return (
                <ListItem style={style} key={index} component="div" disablePadding>
                    <ListItemButton onMouseEnter={() => onSelectUniversity(university.name)}>
                        <ListItemText primary={university.name} />
                    </ListItemButton>
                </ListItem>
            );
        } catch (error) {
            console.error(error);
            return null; // Return null or handle error appropriately
        }
    }

    return (
        <Box sx={{ width: '100%', height: 400, maxWidth: '100%', bgcolor: 'background.paper' }}>
            <FixedSizeList
                height={400}
                width={widthOfParent}
                itemSize={46}
                itemCount={filteredUniversities.length}
                overscanCount={5}
            >
                {renderRow}
            </FixedSizeList>
        </Box>
    );
}
