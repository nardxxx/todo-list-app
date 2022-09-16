import { Checkbox, IconButton, ListItem, ListItemText, TextField } from '@mui/material';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { Box } from '@mui/system';

const TodoListItem = ({ id, props, onDelete, onEdit }) => {
    const [secondary, setSecondary] = React.useState(false);
    const [title, setTitle] = useState(props.title);
    const [editedTitle, setEditedTitle] = useState(title);
    const [visible, setVisible] = useState(false);

    const editTodo = () => {
        setTitle(editedTitle)
        onEdit(id, editedTitle);
    }

    return (
        <ListItem
            button={true}
            secondaryAction={
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                    <IconButton
                        edge="end"
                        aria-label="edit"
                        sx={{ display: visible ? 'none' : 'inline-flex' }}
                        onClick={() => { setVisible(true); }}>
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        edge="end"
                        aria-label="done"
                        sx={{ display: visible ? 'inline-flex' : 'none' }}
                        onClick={(e) => { setVisible(false); editTodo() }}>
                        <DoneIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={onDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            }
        >
            <Checkbox sx={{
                backgroundColor: 'transparent', '&:hover': { backgroundColor: "transparent" }
            }} />
            <ListItemText
                sx={{ display: visible ? 'none' : 'block' }}
                primary={title}
                secondary={secondary ? 'Secondary text' : null}
            />
            <TextField
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                type={'text'}
                color={'success'}
                size={'small'}
                sx={{ display: visible ? 'block' : 'none', height: '100%' }} />
        </ListItem>
    );
};

export default TodoListItem;