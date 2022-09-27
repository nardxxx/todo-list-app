import { Box, List, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';

const Sidebar = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (e, i) => {
        setSelectedIndex(i);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 100, bgcolor: 'background.paper' }}>
            <List component="ul" aria-label="sidebar">
                <ListItemButton
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)} component="a" >
                    <ListItemText
                        primary="Add" />
                </ListItemButton>
                <ListItemButton
                    component="b"
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}  >
                    <ListItemText
                        primary="Delete" />
                </ListItemButton>
            </List>
        </Box>
    );
};

export default Sidebar;