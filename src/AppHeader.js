import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import Modal from './Modal';
import NavTabs from './NavTabs';

const AppHeader = ({ todoArr, tabValue, setTabValue, setTodos }) => {
    const [open, setOpen] = React.useState(false);

    const todosLastElementId = todoArr.length > 0 ? +todoArr.at(-1).id + 1 : 0;

    const handleAddTodo = (id, title) => {
        const newTodo = { id, title, completed: false };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }

        fetch('http://localhost:3000/todos',
            {
                ...options,
                body: JSON.stringify(newTodo)
            })
            .then(() => setTodos([...todoArr, newTodo]));
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 5,
                mb: 2
            }}>
                <Typography
                    variant="h6"
                    component="div">
                    Todo list
                </Typography>

                <Button
                    onClick={handleClickOpen}
                    variant="outlined">+</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    addTodo={handleAddTodo}
                    setTodos={setTodos}
                    todoId={todosLastElementId}
                />
            </Box>
            <Box sx={{ mt: 2, mb: 2 }}>
                <NavTabs
                    value={tabValue}
                    setValue={setTabValue} />
            </Box>
        </>
    );
};

export default AppHeader;