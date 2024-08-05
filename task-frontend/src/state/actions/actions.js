import axios from 'axios';
import { toast } from 'react-toastify';
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "./actionTypes";

export const addTodo = (todo) => ({
    type: ADD_TODO,
    payload: todo,
});

export const removeTodo = (id) => ({
    type: REMOVE_TODO,
    payload: id,
});

export const updateTodo = (id, updates) => ({
    type: UPDATE_TODO,
    payload: { id, updates },
})