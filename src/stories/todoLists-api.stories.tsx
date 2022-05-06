import React, {useEffect, useState} from 'react'
import {TaskType, todoListsAPI} from "../api/todoLists-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'a8f18ed9-cd22-42f9-b24e-d66a98812746'
    }
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsAPI.getTodoLists()
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsAPI.createTodoList('YO-YO')
            .then(res => {
                setState(res.data.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoListId = '5de066d3-a390-4aec-8da2-976e7c7753e8'
        todoListsAPI.removeTodoList(todoListId)
            .then(res => {
                setState(res.data.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoListId = '76cc0cd7-b4b6-46b9-9fbc-4c7138055051'
        todoListsAPI.updateTodoList(todoListId, 'Update')
            .then(res => {
                setState(res.data.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTask = () => {
    const [state, setState] = useState<TaskType[]>([])

    useEffect(() => {
        let todoListId = '957b8742-e62e-431d-86ef-939e6cae77f6'
        todoListsAPI.getTasks(todoListId)
            .then(res => {

                 setState(res.data.items);
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        let todoListId = '957b8742-e62e-431d-86ef-939e6cae77f'
        let taskId = '77ea5ad6-464c-4908-b3e9-cd930d202b69'
        todoListsAPI.deleteTask(todoListId, taskId)
            .then(res => {
                setState(res.data.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
