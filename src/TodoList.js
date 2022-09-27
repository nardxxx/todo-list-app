import { Box, Collapse, Grid, List } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AppHeader from './AppHeader';
import SearchTodo from './Search';
import TabPanel from './TabPanel';
import TodoListItem from './TodoListItem';

const TodoList = () => {

    useEffect(() => {
        fetch('http://localhost:3000/todos')
            .then(data => data.json())
            .then(res => { setTodos(res) })
    }, [])

    const [todos, setTodos] = useState([]);

    const [tabValue, setTabValue] = React.useState(0);
    const [query, setQuery] = useState('')

    const createList = (arr) => {
        return arr.map((todo) => {
            const { id, ...props } = todo;
            return <Collapse key={id}>
                <TodoListItem
                    id={id}
                    key={id}
                    setTodos={setTodos}
                    props={props}
                    todoArr={todos}
                />
            </Collapse>

        })
    }

    let filteredTodos = todos.filter(todo => {
        if (todo.completed === true) return false
        if (todos.length < 1) return 'Add new todo'
        if (query === "") {
            return todo;
        } else if (todo.title.toLowerCase().includes(query.toLowerCase())) {
            return todo;
        }
        return false;
    })
    let completedTodos = todos.filter(todo => {
        if (todos.length < 1) return 'There are no completed todos'
        if (todo.completed === false) return false
        if (query === "") {
            return todo;
        } else if (todo.title.toLowerCase().includes(query.toLowerCase()) && todo.completed === true) {
            return todo;
        }
        return false;
    })

    const filteredList = createList(filteredTodos);
    const completedList = createList(completedTodos);


    return (
        <Box sx={{ flexGrow: 1, maxWidth: 752, margin: '0 auto' }}>
            <Grid item xs={12} md={6}>
                <AppHeader
                    todoArr={todos}
                    setTodos={setTodos}
                    tabValue={tabValue}
                    setTabValue={setTabValue}
                />
                <SearchTodo setQuery={setQuery} />
                <List>
                    <TabPanel
                        children={filteredList}
                        value={tabValue}
                        index={0}
                    />
                    <TabPanel
                        children={completedList}
                        value={tabValue}
                        index={1}
                    />
                </List>
            </Grid >
        </Box >
    );
};

export default TodoList;