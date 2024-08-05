import reducer, { initialState } from './todoReducer';
import React, { createContext, useContext, useReducer } from 'react';


export const StateContext = createContext();

export const StateProvider = ({ children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        { children }
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);