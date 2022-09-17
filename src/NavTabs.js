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

export default function NavTabs() {
    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                    centered
                >
                    <Tab value="one" label="Active" />
                    <Tab value="two" label="Completed" />
                </Tabs>
            </Box>
        </ThemeProvider>

    );
}
