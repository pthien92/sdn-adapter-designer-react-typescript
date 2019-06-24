import React from 'react';
import { Row, Col } from 'reactstrap';
import { StateContext } from '../StateProvider/StateProvider';
import styled from 'styled-components';
import { Button, Intent } from '@blueprintjs/core';
import { Validator } from 'ip-num';
import { AppNotification } from '../Notifications/Notifications';

const SelectContainer = styled.div`
    display: block !important;
`
const VerticalSpacer = styled.div`
    padding: 3px;
`

export class ServerTranslation extends React.Component<any,any> {
    static contextType = StateContext;

    constructor(props: any) {
        super(props);
        this.state = {
            isAddingServer: false,
            newServerIP: "",
            newServerMac: "",
            selectedValue: 0,
            // port map states
            isAddingPortMap: false,
            newInPort: "",
            newOutPort: "",
            selectedOutPortValue: 0
        }
    }

    handleServerSelectChange = (index: number) => {
        this.setState({selectedValue: index});
    }

    handleAddNewIPChange = (newIP: any) => {
        this.setState({newServerIP: newIP})
    }

    handleAddNewMACChange = (newMAC: any) => {
        this.setState({newServerMac: newMAC})
        // AppNotification.show({icon: 'tick-circle', message: "IPv4/subnet is correct", intent: Intent.SUCCESS})
    }

    handleAddServer = () => {
        this.setState({isAddingServer: !this.state.isAddingServer})
    }

    handleDeleteServer = () => {
        const [state, dispatch] = this.context;
        let newServerList = {...state.networkTranslation.serverList };
        const keyName = Object.keys(state.networkTranslation.serverList)[this.state.selectedValue];
        delete newServerList[keyName];
        const newNetworkTranslation = { ...state.networkTranslation};
        newNetworkTranslation.serverList = newServerList;
        dispatch({networkTranslation: newNetworkTranslation});
    }

    handleAddServerSubmit = () => {
        const [state, dispatch ] = this.context;
        let result = Validator.isValidIPv4String(this.state.newServerIP);
        if (result[0]) {
            AppNotification.show({icon: 'tick-circle', message: "IPv4/subnet is correct", intent: Intent.SUCCESS})
            let newServerList: any = {...state.networkTranslation.serverList}; 
            newServerList[this.state.newServerIP] =  this.state.newServerMac;
            const newNetworkTranslation = { ...state.networkTranslation};
            newNetworkTranslation.serverList = newServerList;
            dispatch({networkTranslation: newNetworkTranslation});
            this.setState({isAddingServer: false, newServerIP: "", newServerMac: ""});
        } else {
            AppNotification.show({icon: 'error', message: result[1][0], intent: Intent.WARNING})
        }
    }

    handleOutPortSelectChange = (index: number) =>{
        this.setState({selectedValue: index});
    }

    handleAddNewInPortChange = (newInPort: any) => {
        this.setState({newInPort: newInPort})
    }

    handleAddNewOutPortChange = (newOutPort: any) => {
        this.setState({newOutPort: newOutPort})
    }

    handleAddPortMap = () => {
        this.setState({isAddingPortMap: !this.state.isAddingPortMap});
    }

    handleAddPortMapSubmit = () => {
        const [state, dispatch ] = this.context;
        if (this.state.newInPort < 0 || this.state.newOutPort < 0 || 
            this.state.newInPort === "" || this.state.newOutPort === "" || 
            (this.state.newInPort === this.state.newOutPort)
            ) {
            AppNotification.show({icon: 'error', message: "Ports numbber can not be empty, or equals", intent: Intent.WARNING})
        } else {
            AppNotification.show({icon: 'tick-circle', message: "Added Port Map", intent: Intent.SUCCESS})
            let newPortMap: any = {...state.networkTranslation.outPortMap}; 
            newPortMap[this.state.newInPort] =  this.state.newOutPort;
            const newNetworkTranslation = { ...state.networkTranslation};
            newNetworkTranslation.outPortMap= newPortMap;
            dispatch({networkTranslation: newNetworkTranslation});
            this.setState({isAddingPortMap: false, newInPort: "", newOutPort: ""});
        }
    }

    handleDeletePortMap = () => {

    }

    render() {
        const [state, dispatch] = this.context;
        return (
            <>
                <Row>
                    <Col xs="3">
                        Translations
                    </Col>
                    <Col>
                        <SelectContainer className="bp3-select bp3-small"
                        >
                            <select
                                name="serverItemSelect"
                                value={this.state.selectedValue}
                                onChange={(event: any) => this.handleServerSelectChange(event.target.value)}
                            >
                                {Object.keys(state.networkTranslation.serverList).length > 0 &&
                                    // this.setState({selectedValue: 0}) ||
                                    Object.keys(state.networkTranslation.serverList).map((server: string, index: number) => {
                                        // console.log(server + ":" + state.networkTranslation.serverList[server]);
                                        return (
                                            <option key={index} value={index}>
                                                {server + "-" + state.networkTranslation.serverList[server]}
                                            </option>
                                        );
                                    })}
                            </select>
                        </SelectContainer>
                    </Col>
                    <Col xs="2">
                        <Button small onClick={this.handleDeleteServer}>Delete</Button>
                    </Col>
                    <Col xs="1">
                        <Button small onClick={this.handleAddServer}> {this.state.isAddingServer ? "-" : "+"}</Button>
                    </Col>
                </Row>
                { this.state.isAddingServer &&
                <Row>
                    <Col xs="3">
                        New ...
                    </Col>
                    <Col xs="3">
                        <div className="bp3-input-group bp3-small">
                            <input
                                className="bp3-input"
                                type="input"
                                value={this.state.newServerIP}
                                onChange={(event: any) => this.handleAddNewIPChange(event.target.value)}
                                placeholder="IP ..."
                            />
                        </div>
                    </Col>
                    <Col xs="4">
                        <div className="bp3-input-group bp3-small">
                            <input
                                className="bp3-input"
                                type="input"
                                value={this.state.newServerMac}
                                onChange={(event: any) => this.handleAddNewMACChange(event.target.value)}
                                placeholder="MAC ..."
                            />
                        </div>
                    </Col>
                    <Col xs="1">
                        <Button small onClick={this.handleAddServerSubmit}>Add</Button>
                    </Col>
                </Row>
                }
                <VerticalSpacer/>
                <Row>
                    <Col xs="3">
                        PortMap
                    </Col>
                    <Col>
                        <SelectContainer className="bp3-select bp3-small"
                        >
                            <select
                                name="serverItemSelect"
                                value={this.state.selectedOutPortValue}
                                onChange={(event: any) => this.handleOutPortSelectChange(event.target.value)}
                            >
                                {Object.keys(state.networkTranslation.outPortMap).length > 0 &&
                                    // this.setState({selectedValue: 0}) ||
                                    Object.keys(state.networkTranslation.outPortMap).map((in_port: string, index: number) => {
                                        // console.log(server + ":" + state.networkTranslation.serverList[server]);
                                        return (
                                            <option key={"outport"+index} value={index}>
                                                {"in " + in_port + " -> " + "out "+ state.networkTranslation.outPortMap[in_port]}
                                            </option>
                                        );
                                    })}
                            </select>
                        </SelectContainer>
                    </Col>
                    <Col xs="2">
                        <Button small onClick={this.handleDeletePortMap}>Delete</Button>
                    </Col>
                    <Col xs="1">
                        <Button small onClick={this.handleAddPortMap}> {this.state.isAddingPortMap ? "-" : "+"}</Button>
                    </Col>

                </Row>
                { this.state.isAddingPortMap &&
                <Row>
                    <Col xs="3">
                        New ...
                    </Col>
                    <Col xs="3">
                        <div className="bp3-input-group bp3-small">
                            <input
                                className="bp3-input"
                                type="input"
                                value={this.state.newInPort}
                                onChange={(event: any) => this.handleAddNewInPortChange(event.target.value)}
                                placeholder="In port ..."
                            />
                        </div>
                    </Col>
                    <Col xs="3">
                        <div className="bp3-input-group bp3-small">
                            <input
                                className="bp3-input"
                                type="input"
                                value={this.state.newOutPort}
                                onChange={(event: any) => this.handleAddNewOutPortChange(event.target.value)}
                                placeholder="Out port ..."
                            />
                        </div>
                    </Col>
                    <Col xs="1">
                        <Button small onClick={this.handleAddPortMapSubmit}>Map 1-to-1</Button>
                    </Col>
                </Row>
                }
            </>
        );
    }
}