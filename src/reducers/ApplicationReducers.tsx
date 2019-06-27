
export enum DeviceType {
    Tap  = 0,
    Veth = 1
}

export interface ISDNAdapterPortProps {
    name: string        // interface name
    peerName: string    // interface peer name
    ip: string
    subnet: string
    mac: string
    onState: boolean,
    type: DeviceType
}

export interface INetworkTranslationProps {
    serverList: {},
    inPorts: number[],
    outPortMap: {}
    serverMap: {} // this feature is pending,
    adapterName: string
    adapterDpid: string
    adapterControllerPort: string
}

export interface IApplicationState {
    auth: any
    loading: boolean
    theme: string
    navbarTabId: any
    shouldUpdateDrawing: boolean
    clientPortProps: ISDNAdapterPortProps
    serverPortProps: ISDNAdapterPortProps
    networkTranslation: INetworkTranslationProps
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