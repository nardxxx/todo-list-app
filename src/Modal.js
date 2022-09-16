import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';

const Modal = ({ onClose, open, addTodo, setTodos, todoId }) => {
    const [title, setTitle] = useState('');


    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle sx={{ paddingBottom: '0' }}>Todo title</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    sx={{ marginBottom: '10px' }}
                    id="title"
                    // label="Title"
                    placeholder='Title'
                    type="text"
                    fullWidth
                    variant="standard"
                    value={title}
                    onInput={(e) => setTitle(e.target.value)}
                />
                <Button fullWidth onClick={() => {
                    onClose();
                    addTodo(todoId, title, setTodos)
                }} variant="outlined">Add</Button>
            </DialogContent>
        </Dialog>
    );
};


export default Modal