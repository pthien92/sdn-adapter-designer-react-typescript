import React from 'react';
import { H4, Switch, Intent } from '@blueprintjs/core';
import { Row, Col } from 'reactstrap';
import { AppNotification } from '../Notifications/Notifications';
import styled from 'styled-components';
import { Validator } from 'ip-num';
import { StateContext } from '../StateProvider/StateProvider';

const VerticalSpacer = styled.div`
    padding: 3px;
`

const SelectContainer = styled.div`
    display: block !important;
`

export class ServerConfiguration extends React.Component<any,any> {
    static contextType = StateContext;

    handleEditingServerPortOnState = () => {
        const [state, dispatch] = this.context;
        const newServerState = {...state.serverPortProps};
        newServerState.onState = !state.serverPortProps.onState;
        dispatch({serverPortProps: newServerState});
    }

    handleEditingServerPortName = (name: string) => {
        const [state, dispatch] = this.context;
        if (name === "") {
            AppNotification.show({icon: 'error', message: "Port name can not be empty", intent: Intent.DANGER})
        }
        name = name.replace(/ /g, "");
        const newServerState = {...state.serverPortProps};
        newServerState.name = name;
        newServerState.peerName = name + "gen";
        dispatch({serverPortProps: newServerState});
    }

    handleEditingServerPortIp = (ip: string) => {
        const [state, dispatch] = this.context;
        const newServerState = {...state.serverPortProps};
        let result = Validator.isValidIPv4CidrNotation(ip + "/" +newServerState.subnet);
        if (!result[0]) {
            AppNotification.show({icon: 'warning-sign', message: result[1][0], intent: Intent.DANGER})
        } else {
            AppNotification.show({icon: 'tick-circle', message: "IPv4/subnet is correct", intent: Intent.SUCCESS})
        }
        newServerState.ip = ip;
        dispatch({serverPortProps: newServerState});
    }

    handleEditingServerPortSubnet = (subnet: string) => {
        const [state, dispatch] = this.context;
        const newServerState = {...state.serverPortProps};
        let result = Validator.isValidIPv4CidrNotation(newServerState.ip + "/" + subnet);
        if (!result[0]) {
            AppNotification.show({icon: 'warning-sign', message: result[1][0], intent: Intent.DANGER})
        } else {
            AppNotification.show({icon: 'tick-circle', message: "IPv4/subnet is correct", intent: Intent.SUCCESS})
        }
        newServerState.subnet = subnet;
        dispatch({serverPortProps: newServerState});
    }

    handleEditingServerPortMac = (mac: string) => {
        const [state, dispatch] = this.context;
        const newServerState = {...state.serverPortProps};
        newServerState.mac = mac;
        dispatch({serverPortProps: newServerState});
    }
    
    handleEditingServerPortDeviceType = (type: string) => {
        const [state, dispatch] = this.context;
        const newServerState = {...state.serverPortProps};
        newServerState.type = type;
        dispatch({serverPortProps: newServerState});
    }

    render() {
        const [state, dispatch] = this.context;
        console.log(state.serverPortProps);
        return (
            <>
                <H4>Server Options</H4>
                <Row>
                    <Col xs="4">
                        On/Off
                    </Col>
                    <Col>
                        <Switch
                            checked={state.serverPortProps.onState}
                            innerLabelChecked="On"
                            innerLabel="Off"
                            onChange={this.handleEditingServerPortOnState}
                        >

                        </Switch>
                    </Col>
                </Row>
                <VerticalSpacer/>
                <Row>
                    <Col xs="4">
                        Name
                    </Col>
                    <Col xs="6">
                        <div className="bp3-input-group bp3-small">
                            <input
                                className="bp3-input"
                                type="input"
                                value={state.serverPortProps.name}
                                onChange={(event: any) => this.handleEditingServerPortName(event.target.value)}
                            />
                        </div>
                    </Col>
                </Row>
                <VerticalSpacer/>
                <Row>
                    <Col xs="4">
                        IPv4/SUBNET
                    </Col>
                    <Col xs="8">
                        <Row>
                            <Col xs="6">
                                <div className="bp3-input-group bp3-small">
                                    <input
                                        className="bp3-input"
                                        type="input"
                                        value={state.serverPortProps.ip}
                                        onChange={(event: any) => this.handleEditingServerPortIp(event.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col xs="2">
                                /
                            </Col>
                            <Col xs="4">
                                <div className="bp3-input-group bp3-small">
                                    <input
                                        className="bp3-input"
                                        type="input"
                                        value={state.serverPortProps.subnet}
                                        onChange={(event: any) => this.handleEditingServerPortSubnet(event.target.value)}
                                    />
                                </div>
                            </Col>
                        </Row>
    
                    </Col>
                </Row>
                <VerticalSpacer/>
                <Row>
                    <Col xs="4">
                        MAC
                    </Col>
                    <Col xs="6">
                        <div className="bp3-input-group bp3-small">
                            <input
                                className="bp3-input"
                                type="input"
                                value={state.serverPortProps.mac}
                                onChange={(event: any) => this.handleEditingServerPortMac(event.target.value)}
                            />
                        </div>
                    </Col>
                </Row>
                <VerticalSpacer/>
                <Row>
                    <Col xs="4">
                        Type
                    </Col>
                    <Col xs="6">
                        <SelectContainer className="bp3-select bp3-small">
                            <select
                                name="deviceTypeSelect"
                                value={state.serverPortProps.type}
                                onChange={(event: any) => this.handleEditingServerPortDeviceType(event.target.value)}
                            >
                                <option value="0">Tap</option>
                                <option value="1">Veth</option>
                            </select>
                        </SelectContainer>
                    </Col>
                </Row>
            </>
        );
    }
}