import React from 'react';
import { createContext, useContext, useReducer } from 'react';

export interface StateProps {
    reducer: any
    initialState: any
    children: any
}


export const StateContext = createContext({});

const StateProvider: React.FC<StateProps> = (props: StateProps) => {
    return (
        <StateContext.Provider value={useReducer(props.reducer, props.initialState)}>
            {props.children}
        </StateContext.Provider>
    )
}

export const useStateValue: any = () => useContext(StateContext);

export default StateProvider;