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
    const [title, setTitle] = useState<string>('')

    const createTask = () => {
        todoListsAPI.createTodoList(title)
            .then(res => {
                setState(res.data.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input
                placeholder={'title'}
                value={title}
                onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}
            />
            <button onClick={createTask}>create todoList</button>
        </div>
    </div>
}

export const DeleteTodoLists = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<string>('')

    const deleteTodoList = () => {
        todoListsAPI.removeTodoList(todoListId)
            .then(res => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input
                placeholder={'todoListId'}
                value={todoListId}
                onChange={(e) => {
                    setTodoListId(e.currentTarget.value)
                }}
            />
            <button onClick={deleteTodoList}>delete todoList</button>
        </div>
    </div>
}

export const UpdateTodoLists = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const updateTodoList = () => {
        todoListsAPI.updateTodoList(todoListId, title)
            .then(res => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input
                placeholder={'todoListId'}
                value={todoListId}
                onChange={(e) => {
                    setTodoListId(e.currentTarget.value)
                }}
            />
            <input
                placeholder={'title'}
                value={title}
                onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}
            />
            <button onClick={updateTodoList}>Update TodoList</button>
        </div>
    </div>
}

export const GetTask = () => {
    const [state, setState] = useState<TaskType[]>([])
    const [todoListId, setTodoListId] = useState<string>('')

    const getTasks = () => {
        todoListsAPI.getTasks(todoListId)
            .then((res) => {
                setState(res.data.items)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input
                placeholder={'todoListId'}
                value={todoListId}
                onChange={(e) => {
                    setTodoListId(e.currentTarget.value)
                }}
            />
            <button onClick={getTasks}>Get Tasks</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTask = () => {
        todoListsAPI.deleteTask(todoListId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input
                placeholder={'todoListId'}
                value={todoListId}
                onChange={(e) => {
                    setTodoListId(e.currentTarget.value)
                }}
            />
            <input
                placeholder={'todoListId'}
                value={taskId}
                onChange={(e) => {
                    setTaskId(e.currentTarget.value)
                }}
            />
            <button onClick={deleteTask}>Delete Task</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const updateTask = () => {
        todoListsAPI.updateTask(todoListId, taskId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input
                placeholder={'todoListId'}
                value={todoListId}
                onChange={(e) => {
                    setTodoListId(e.currentTarget.value)
                }}
            />
            <input
                placeholder={'taskId'}
                value={taskId}
                onChange={(e) => {
                    setTaskId(e.currentTarget.value)
                }}
            />
            <input
                placeholder={'title'}
                value={title}
                onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}
            />
            <button onClick={updateTask}>Update Task</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const createTask = () => {
        todoListsAPI.createTask(todoListId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input
                placeholder={'todoListId'}
                value={todoListId}
                onChange={(e) => {
                    setTodoListId(e.currentTarget.value)
                }}
            />
            <input
                placeholder={'title'}
                value={title}
                onChange={(e) => {setTitle(e.currentTarget.value)}}
            />
            <button onClick={createTask}>Create Task</button>
        </div>
    </div>
}
