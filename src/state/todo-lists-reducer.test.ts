import {addTodoListAC, changeTitleTodoListAC, removeTodoListAC, todoListsReducer} from './todo-lists-reducer';
import {v1} from 'uuid';
import {TodoListsType} from '../App';

test('correct todoList should be removed', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    const startState: TodoListsType[] = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, removeTodoListAC(todoListId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
});

test('correct todoList should be added', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let newTodoListTitle = "New TodoList"

    const startState: TodoListsType[] = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, addTodoListAC(newTodoListTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodoListTitle);
});

test("correct todoList should change its name", () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let newTodoListTitle = "New TodoList"

    const startState: TodoListsType[] = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, changeTitleTodoListAC(todoListId2, newTodoListTitle))

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodoListTitle);
})