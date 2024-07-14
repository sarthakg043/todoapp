import { createContext, useContext } from "react";

const TodoContext = createContext({
    todos : [
        {
            id : 1, 
            title : "My Task",
            description : "The task is quite complex",
            targetDate : "2024-8-20",
            isCompleted : false
        },
    ],
    darkMode : false,
    toggleDarkMode : () => {},
    addTodo : (todo) => {},
    updateTodo : (id, todo) => {},
    // getTodo : () => {},
    removeTodo : (id) => {},
    toggleComplete: (id) => {},
});

export const TodoContextProvider = TodoContext.Provider;

export const useTodoContext = () => {
    return useContext(TodoContext)
}