
export enum DeviceType {
    Tap  = 0,
    Veth = 1
}

export interface ISDNAdapterPortProps {
    name: string
    ip: string
    subnet: string
    mac: string
    onState: boolean,
    type: DeviceType
}

export interface IApplicationState {
    auth: any
    loading: boolean
    theme: string
    navbarTabId: any
    clientPortProps: ISDNAdapterPortProps
    serverPortProps: ISDNAdapterPortProps
}



export const ApplicationReducer = (state: IApplicationState, payload: any) => {
    const newState = {...state, ...payload};
    // persist state to localStorage
    // ...
    localStorage.setItem("navbarTabId", newState.navbarTabId );
    localStorage.setItem("theme", newState.theme);
    // ...
    //
    return newState;
}