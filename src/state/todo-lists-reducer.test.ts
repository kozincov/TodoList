import {
    addTodoListAC,
    changeFilterTodoListAC,
    changeTitleTodoListAC, FilterValuesType,
    removeTodoListAC, TodoListEntityType,
    todoListsReducer
} from './todo-lists-reducer';
import {v1} from 'uuid';

let todoListId1: string;
let todoListId2: string;

let startState: TodoListEntityType[] = []

beforeEach(() => {
    todoListId1 = v1();
    todoListId2 = v1();

    startState = [
        {id: todoListId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todoListId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ]
})

test('correct todoList should be removed', () => {

    const endState = todoListsReducer(startState, removeTodoListAC(todoListId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
});

test('correct todoList should be added', () => {

    let newTodoListTitle = "New TodoList"

    const endState = todoListsReducer(startState, addTodoListAC(newTodoListTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodoListTitle);
});

test("correct todoList should change its name", () => {

    let newTodoListTitle = "New TodoList"

    const endState = todoListsReducer(startState, changeTitleTodoListAC(todoListId2, newTodoListTitle))

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodoListTitle);
})

test("correct filter of todoList should be change", () => {

    let newFilter: FilterValuesType = "completed"

    const endState = todoListsReducer(startState, changeFilterTodoListAC(todoListId2, newFilter))

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
})
