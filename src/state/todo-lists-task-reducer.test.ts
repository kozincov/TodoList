import {addTodoListAC, removeTodoListAC, TodoListEntityType, todoListsReducer} from './todo-lists-reducer';
import {TasksReducer} from "./tasks-reducer";
import {TasksStateType} from "../App";
import {TaskStatuses, TodoTaskPriority} from "../api/todoLists-api";

test('id should be equals', () => {
    const startTaskState: TasksStateType = {};
    const startTodoListState: TodoListEntityType[] = [];

    const action = addTodoListAC('new todoList');

    const endTaskState = TasksReducer(startTaskState, action);
    const endTodoListState = todoListsReducer(startTodoListState, action);

    const keys = Object.keys(endTaskState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListState[0].id;

    expect(idFromTasks).toBe(action.payload.todoListId);
    expect(idFromTodoLists).toBe(action.payload.todoListId);
});

test('property with todoListId should be deleted', () => {
    const startState: TasksStateType = {
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

    const action = removeTodoListAC("todoListId2");

    const endState = TasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todoListId2"]).not.toBeDefined();
});

