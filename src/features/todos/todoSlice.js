import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: [],
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo : (state, action) => {
            state.todos.push(action.payload);
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        editTodo: (state, action) => {
            const { id, text } = action.payload;
            const existingTodo = state.todos.find((todo) => todo.id === id);
            if (existingTodo) {
                existingTodo.text = text;
            } 
        },
    },
});

export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;