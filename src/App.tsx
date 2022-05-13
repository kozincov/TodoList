import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from '@mui/icons-material';
import {addTodoListTC, fetchTodoListsTC, TodoListEntityType} from "./state/todo-lists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType} from './api/todoLists-api';
import LinearProgress from "@mui/material/LinearProgress";
import {RequestStatusType} from "./app-reducer";

export const App = () => {

    const todoLists = useSelector<AppRootStateType, TodoListEntityType[]>(state => state.todoLists)
    const dispatch = useDispatch();

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])

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
            {status === 'loading' && <LinearProgress color={'secondary'}/>}
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

export type TasksStateType = {
    [key: string]: TaskType[],
}