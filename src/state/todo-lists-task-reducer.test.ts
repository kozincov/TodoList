import {addTodoListAC, removeTodoListAC, todoListsReducer} from './todo-lists-reducer';
import {TasksStateType, TodoListsType} from '../App';
import {TasksReducer} from "./tasks-reducer";

test('id should be equals', () => {
    const startTaskState: TasksStateType = {};
    const startTodoListState: TodoListsType[] = [];

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
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todoListId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = removeTodoListAC("todoListId2");

    const endState = TasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todoListId2"]).not.toBeDefined();
});

