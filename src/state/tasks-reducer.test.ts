import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    setTasksAC,
    TasksReducer
} from './tasks-reducer';
import {TasksStateType} from '../App';
import {addTodoListAC, setTodoListsAC} from "./todo-lists-reducer";
import {TaskStatuses, TodoTaskPriority} from "../api/todoLists-api";

let startState: TasksStateType = {}

beforeEach(() => {
    startState = {
        "todoListId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, deadline: '', description: '',
                priority: TodoTaskPriority.Low, startDate: '', todoListId: "todoListId1", addedDate: '',
                order: 0
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, deadline: '', description: '',
                priority: TodoTaskPriority.Low, startDate: '', todoListId: "todoListId1", addedDate: '',
                order: 0
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, deadline: '', description: '',
                priority: TodoTaskPriority.Low, startDate: '', todoListId: "todoListId1", addedDate: '',
                order: 0
            }
        ],
        "todoListId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, deadline: '', description: '',
                priority: TodoTaskPriority.Low, startDate: '', todoListId: "todoListId2", addedDate: '',
                order: 0
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, deadline: '', description: '',
                priority: TodoTaskPriority.Low, startDate: '', todoListId: "todoListId2", addedDate: '',
                order: 0
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, deadline: '', description: '',
                priority: TodoTaskPriority.Low, startDate: '', todoListId: "todoListId2", addedDate: '',
                order: 0
            }
        ]
    };
})

test('correct task should be deleted from correct array', () => {

    const endState = TasksReducer(startState, removeTaskAC("todoListId2", "2"))

    expect(endState).toEqual({
        "todoListId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, deadline: '', description: '',
                priority: TodoTaskPriority.Low, startDate: '', todoListId: "todoListId1", addedDate: '',
                order: 0
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, deadline: '', description: '',
                priority: TodoTaskPriority.Low, startDate: '', todoListId: "todoListId1", addedDate: '',
                order: 0
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, deadline: '', description: '',
                priority: TodoTaskPriority.Low, startDate: '', todoListId: "todoListId1", addedDate: '',
                order: 0
            }
        ],
        "todoListId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, deadline: '', description: '',
                priority: TodoTaskPriority.Low, startDate: '', todoListId: "todoListId2", addedDate: '',
                order: 0
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, deadline: '', description: '',
                priority: TodoTaskPriority.Low, startDate: '', todoListId: "todoListId2", addedDate: '',
                order: 0
            }
        ]
    });

});

test('correct task should be added to correct array', () => {

    const endState = TasksReducer(startState, addTaskAC({
        id: "2", title: "beer", status: TaskStatuses.New, deadline: '', description: '',
        priority: TodoTaskPriority.Low, startDate: '', todoListId: "todoListId2", addedDate: '',
        order: 0
    }))

    expect(endState["todoListId1"].length).toBe(3);
    expect(endState["todoListId2"].length).toBe(4);
    expect(endState["todoListId2"][0].id).toBeDefined();
    expect(endState["todoListId2"][0].title).toBe("beer");
    expect(endState["todoListId2"][0].status).toBe(TaskStatuses.New);
});

test('status of specified task should be changed', () => {

    const endState = TasksReducer(startState, changeTaskStatusAC("todoListId2", "2", TaskStatuses.New))

    expect(endState["todoListId1"][1].status).toBe(TaskStatuses.Completed);
    expect(endState["todoListId2"][1].status).toBe(TaskStatuses.New);
});

test('title of specified task should be changed', () => {

    const endState = TasksReducer(startState, changeTaskTitleAC("todoListId2", "2", "beer"))

    expect(endState["todoListId1"][1].title).toBe("JS");
    expect(endState["todoListId2"][1].title).toBe("beer");
});

test('new array should be added when new todoList is added', () => {

    const endState = TasksReducer(startState, addTodoListAC({
        id: 'any id',
        title: 'new todoList',
        addedDate: '',
        order: 0
    }))

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todoListId1" && k !== "todoListId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('empty arrays should be added when we set todoLists', () => {
    const action = setTodoListsAC([
        {id: '1', title: 'title 1', order: 0, addedDate: ''},
        {id: '2', title: 'title 2', order: 0, addedDate: ''}
    ])

    const endState = TasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})

test('tasks should be added for todoLists', () => {
    const action = setTasksAC('todoListId1', startState["todoListId1"])

    const endState = TasksReducer({
        'todoListId2': [],
        'todoListId1': [],
    }, action)

    expect(endState['todoListId1'].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(0)
})
