import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "./actions/actionTypes";

export const initialState = {
    todos: [],
    user: null
};

const reducer = (state, action) => {
    switch(action.type) {
        case ADD_TODO:
            return {
                ...state, 
                todos: [...state.todos, action.payload],
            };
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload),
            };
        case UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => 
                    todo.id === action.payload.id ? { ...todo, ...action.payload.updates } : todo
                )
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.user,
            }
        default:
            return state;
    }
}

export default reducer;