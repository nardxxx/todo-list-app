import React, { useState } from 'react';
import { Checkbox, IconButton, ListItem, ListItemText, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { Box } from '@mui/system';
import request from './services/fetch';

const TodoListItem = ({ id, props, todoArr, setTodos }) => {
    const [completed, setCompleted] = useState(props.completed);
    const [title, setTitle] = useState(props.title);
    const [editedTitle, setEditedTitle] = useState(props.title);
    const [visible, setVisible] = useState(false);

    const handleListItemDelete = (id) => {
        request(`http://localhost:3000/todos/${id}`,
            'delete'
        )
            .then(() => setTodos(todoArr.filter(todo => todo.id !== id)))
    }

    const handleEditListItem = (id, title) => {
        const currentIndexOfTodo = todoArr.findIndex((item) => item.id === id);

        if (title === todoArr[currentIndexOfTodo].title) return

        const newArr = [
            ...todoArr,
        ]

        newArr[currentIndexOfTodo].title = title;

        request(`http://localhost:3000/todos/${id}`,
            'PUT',
            newArr[currentIndexOfTodo]
        )

            .then(res => {
                if (res.ok) { console.log("HTTP request successful") }
                else { console.log("HTTP request unsuccessful") }
            })
            .then(res => {
                setTodos(newArr);
            })
            .catch(error => console.log(error))
    }

    const handleCheck = (id, completed) => {

        const currentIndexOfTodo = todoArr.findIndex((item) => item.id === id);

        const newArr = [
            ...todoArr
        ]
        newArr[currentIndexOfTodo].completed = !completed;
        request(`http://localhost:3000/todos/${id}`,
            'put',
            newArr[currentIndexOfTodo]
        )
            .then(res => {
                setTodos(newArr);
                setCompleted(() => !completed);
            })
            .catch(error => console.log(error))
    }

    const editTodo = () => {
        setTitle(editedTitle)
        handleEditListItem(id, editedTitle);
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
                    <IconButton edge="end" aria-label="delete" onClick={() => { handleListItemDelete(id) }}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            }
        >
            <Checkbox
                checked={completed}
                sx={{
                    backgroundColor: 'transparent', '&:hover': { backgroundColor: "transparent" }
                }}
                onClick={() => {
                    handleCheck(id, completed);
                }}
            />
            <ListItemText
                sx={{ display: visible ? 'none' : 'block' }}
                primary={title}
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