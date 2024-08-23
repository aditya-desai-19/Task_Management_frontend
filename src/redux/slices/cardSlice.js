import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    todo: [],
    inProgress: [],
    done: []
}

export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        addTodoItem: (state, action) => {
            const newCards = [...state.todo, ...action.payload];
            state.todo = newCards;
        }, 
        deleteTodoItem: (state, action) => {
            const id = action.payload;
            state.todo = state.todo.filter(item => item._id !== id);
        },
        addInProgressItem: (state, action) => {
            const newCards = [...state.inProgress, ...action.payload];
            state.inProgress = newCards;
        }, 
        deleteInProgressItem: (state, action) => {
            const id = action.payload;
            state.inProgress = state.inProgress.filter(item => item._id !== id);
        },
        addDoneItem: (state, action) => {
            const newCards = [...state.done, ...action.payload];
            state.done = newCards;
        }, 
        deleteDoneItem: (state, action) => {
            const id = action.payload;
            state.done = state.done.filter(item => item._id !== id);
        }, 
        clearTasks: (state) => {
            state.todo = [];
            state.inProgress = [];
            state.done = [];
        }
    },
})

export const { addDoneItem, addInProgressItem, addTodoItem, deleteDoneItem, deleteInProgressItem, deleteTodoItem, clearTasks } = cardSlice.actions

export default cardSlice.reducer