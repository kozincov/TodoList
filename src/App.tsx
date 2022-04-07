import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import {TodoList} from "./TodoList";

export const App = () => {

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<TodoListsType[]>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
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


    let addTask = (todoListId: string, title: string) => {
        let newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todoListId]:[newTask, ...tasks[todoListId]]})
    }

    let removeTask = (todoListId: string, id:string) => {
        setTasks({...tasks, [todoListId]:tasks[todoListId].filter(f => f.id !== id)})
    }

    let [filter,setFilter] = useState<FilterValuesType>('all');

    let changeFilter = (todoListId: string, value:FilterValuesType) => {
        setTodoLists(todoLists.map(m => m.id === todoListId ? {...m,filter: value} : m))
    }

    let changeTaskStatus = (todoListId: string, id: string, isDone: boolean) => {
        setTasks({...tasks,[todoListId]:tasks[todoListId].map(m => m.id === id ? {...m, isDone} : m)})
    }

    return (
        <div className="App">
            {
                todoLists.map(m=>{
                    let tasksForTodoList = tasks[m.id];

                    if (m.filter === 'active'){
                        tasksForTodoList = tasksForTodoList.filter(f => !f.isDone)
                    }

                    if (m.filter === 'completed'){
                        tasksForTodoList = tasksForTodoList.filter(f => f.isDone)
                    }
                    return (
                        <TodoList
                            key={m.id}
                            todoListId={m.id}
                            title={m.title}
                            tasks={tasksForTodoList}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            filter={m.filter}
                        />
                    )
                })
            }
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