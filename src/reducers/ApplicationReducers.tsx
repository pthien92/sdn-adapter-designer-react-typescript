


export interface IApplicationState {
    auth: any
    loading: boolean
    theme: string
    navbarTabId: any
}



export const ApplicationReducer = (state: IApplicationState, payload: any) => {
    const newState = {...state, ...payload};
    // persist state to localStorage
    // ...
    localStorage.setItem("navbarTabId", newState.navbarTabId );
    // ...
    //
    return newState;
}