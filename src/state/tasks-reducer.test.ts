import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksReducer} from './tasks-reducer';
import {TasksStateType} from '../App';
import {addTodoListAC} from "./todo-lists-reducer";

let startState: TasksStateType = {}

beforeEach(() => {
    startState = {
        "todoListId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todoListId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    };
})

test('correct task should be deleted from correct array', () => {

    const endState = TasksReducer(startState, removeTaskAC("todoListId2", "2"))

    expect(endState).toEqual({
        "todoListId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todoListId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "3", title: "tea", isDone: false}
        ]
    });

});

test('correct task should be added to correct array', () => {

    const endState = TasksReducer(startState, addTaskAC("todoListId2", "beer"))

    expect(endState["todoListId1"].length).toBe(3);
    expect(endState["todoListId2"].length).toBe(4);
    expect(endState["todoListId2"][0].id).toBeDefined();
    expect(endState["todoListId2"][0].title).toBe("beer");
    expect(endState["todoListId2"][0].isDone).toBe(false);
});

test('status of specified task should be changed', () => {

    const endState = TasksReducer(startState, changeTaskStatusAC("todoListId2", "2", false))

    expect(endState["todoListId1"][1].isDone).toBe(true);
    expect(endState["todoListId2"][1].isDone).toBe(false);
});

test('title of specified task should be changed', () => {

    const endState = TasksReducer(startState, changeTaskTitleAC("todoListId2", "2", "beer"))

    expect(endState["todoListId1"][1].title).toBe("JS");
    expect(endState["todoListId2"][1].title).toBe("beer");
});

test('new array should be added when new todoList is added', () => {
    
    const endState = TasksReducer(startState, addTodoListAC("new todoList"))

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todoListId1" && k !== "todoListId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
