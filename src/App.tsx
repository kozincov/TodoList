import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {addTodoListAC} from "./state/todo-lists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export const App = () => {

    const todoLists = useSelector<AppRootStateType, TodoListsType[]>(state => state.todoLists)
    const dispatch = useDispatch();

    const addTodoList = (title: string) => {
        dispatch(addTodoListAC(title))
    }

    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        News
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(m => {
                            return <Grid item key={m.id}>
                                <Paper style={{padding: "10px"}}>
                                    <TodoList
                                        todoListId={m.id}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export  type FilterValuesType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type TodoListsType = {
    id: string,
    title: string,
    filter: string,
}

export type TasksStateType = {
    [key: string]: TaskType[],
}