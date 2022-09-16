import { Box, Button, Grid, List, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import SearchTodo from './Search';
import TodoListItem from './TodoListItem';

const TodoList = () => {

    useEffect(() => {
        fetch('http://localhost:3000/todos')
            .then(data => data.json())
            .then(res => { setTodos(res) })
    }, [])

    const [open, setOpen] = React.useState(false);
    const [todos, setTodos] = useState([]);
    const [query, setQuery] = useState('')

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddTodo = (id, title, setTodos) => {
        const newTodo = { id, title };

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
            .then(() => setTodos([...todos, newTodo]));
    }

    const handleListItemDelete = (id) => {
        return fetch(`http://localhost:3000/todos/${id}`, {
            method: 'DELETE'
        })
            .then(() => setTodos(todos.filter(todo => todo.id != id)))
    }

    const handleEditListItem = (id, title) => {

        const dataObject = {
            id,
            title
        };

        return fetch(`http://localhost:3000/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObject)
        })
            .then(res => {
                if (res.ok) { console.log("HTTP request successful") }
                else { console.log("HTTP request unsuccessful") }
                return res
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
        // .then(() => setTodos())
    }

    const filteredList = todos.filter(todo => {
        if (query === "") {
            return todo;
        } else if (todo.title.toLowerCase().includes(query.toLowerCase())) {
            return todo;
        }
    }).map(({ id, ...props }) => {
        return <TodoListItem key={id} id={id} props={props} onEdit={handleEditListItem} onDelete={() => { handleListItemDelete(id) }} />
    });

    const todosLastElementId = todos.length > 0 ? +todos.at(-1).id + 1 : 0;

    return (
        <Box sx={{ flexGrow: 1, maxWidth: 752, margin: '0 auto' }}>
            <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', mt: 5, mb: 2 }}>
                    <Typography sx={{}} variant="h6" component="div">
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
                <SearchTodo setQuery={setQuery} />
                <List>
                    {filteredList.length > 0 ? filteredList : 'No matches'}
                </List>
            </Grid >
        </Box >
    );
};

export default TodoList;