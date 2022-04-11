import {addTodoListAC, todoListsReducer} from './todo-lists-reducer';
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

