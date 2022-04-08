import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';

export const App = () => {

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<TodoListsType[]>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    let updateTodoList = (todoListId: string, title: string) => {
        setTodoLists(todoLists.map(m => m.id === todoListId ? {...m, title} : m))
    }

    let updateTask = (todoListId: string, id: string, title: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(m => m.id === id ? {...m, title} : m)})
    }

    let removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(f => f.id !== todoListId))
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    let addTask = (todoListId: string, title: string) => {
        let newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    let removeTask = (todoListId: string, id: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(f => f.id !== id)})
    }

    let changeFilter = (todoListId: string, value: FilterValuesType) => {
        setTodoLists(todoLists.map(m => m.id === todoListId ? {...m, filter: value} : m))
    }

    let changeTaskStatus = (todoListId: string, id: string, isDone: boolean) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(m => m.id === id ? {...m, isDone} : m)})
    }

    let addTodoList = (title: string) => {
        let newTodoListId = v1();
        let newTodoList = {id: newTodoListId, title, filter: 'all'}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoListId]: []})
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
                            let tasksForTodoList = tasks[m.id];

                            if (m.filter === 'active') {
                                tasksForTodoList = tasksForTodoList.filter(f => !f.isDone)
                            }

                            if (m.filter === 'completed') {
                                tasksForTodoList = tasksForTodoList.filter(f => f.isDone)
                            }
                            return <Grid item key={m.id}>
                                <Paper style={{padding: "10px"}}>
                                    <TodoList
                                        todoListId={m.id}
                                        title={m.title}
                                        tasks={tasksForTodoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={m.filter}
                                        removeTodoList={removeTodoList}
                                        updateTodoList={updateTodoList}
                                        updateTask={updateTask}
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

export type TaskStateType = {
    [key: string]: TaskType[],
}