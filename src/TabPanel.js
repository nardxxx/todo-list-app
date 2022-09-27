import React from 'react';
import { TransitionGroup } from 'react-transition-group';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (

        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <TransitionGroup>
                {children}
            </TransitionGroup>
        </div>
    );
};

export default TabPanel;