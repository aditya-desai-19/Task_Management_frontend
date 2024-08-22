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
            const newCard = action.payload;
            const newCardList = [newCard, ...state.todo];
            state.todo = newCardList;
        }, 
        deleteTodoItem: (state, action) => {
            const id = action.payload;
            state.todo = state.todo.filter(item => item.id !== id);
        },
        addInProgressItem: (state, action) => {
            const newCard = action.payload;
            const newCardList = [newCard, ...state.inProgress];
            state.inProgress = newCardList;
        }, 
        deleteInProgressItem: (state, action) => {
            const id = action.payload;
            state.inProgress = state.inProgress.filter(item => item.id !== id);
        },
        addDoneItem: (state, action) => {
            const newCard = action.payload;
            const newCardList = [newCard, ...state.done];
            state.done = newCardList;
        }, 
        deleteDoneItem: (state, action) => {
            const id = action.payload;
            state.done = state.done.filter(item => item.id !== id);
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