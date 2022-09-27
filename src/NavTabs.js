import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        secondary: {
            // This is green.A700 as hex.
            main: '#888F8E',
        },
    },
});

function LinkTab(props) {
    return (
        <Tab
            indicatorColor="secondary"
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />

    );
}

export default function NavTabs({ value, setValue }) {

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="All" {...a11yProps(0)} />
                    <Tab label="Completed" {...a11yProps(1)} />
                </Tabs>
            </Box>
        </ThemeProvider>

    );
}
