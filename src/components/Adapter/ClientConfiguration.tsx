import React from 'react';
import { StateContext } from '../StateProvider/StateProvider';
import { H4, Switch, Intent } from '@blueprintjs/core';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { Validator } from 'ip-num';
import { AppNotification } from '../Notifications/Notifications';

const VerticalSpacer = styled.div`
    padding: 3px;
`

const SelectContainer = styled.div`
    display: block !important;
`

export class ClientConfiguration extends React.Component<any,any> {
    static contextType = StateContext;

    // constructor(props: any) {
    //     super(props);
    //     this.state = {
    //         clientPortProps: s
    //     }
    // }

    handleEditingClientPortOnState = () => {
        const [state, dispatch] = this.context;
        const newClientState = {...state.clientPortProps};
        newClientState.onState = !state.clientPortProps.onState;
        dispatch({clientPortProps: newClientState});
    }

    handleEditingClientPortName = (name: string) => {
        const [state, dispatch] = this.context;
        const newClientState = {...state.clientPortProps};
        newClientState.name = name;
        dispatch({clientPortProps: newClientState});
    }

    handleEditingClientPortIp = (ip: string) => {
        const [state, dispatch] = this.context;
        const newClientState = {...state.clientPortProps};
        let result = Validator.isValidIPv4CidrNotation(ip + "/" +newClientState.subnet);
        if (!result[0]) {
            AppNotification.show({icon: 'lightbulb', message: result[1][0], intent: Intent.DANGER})
        } else {
            AppNotification.show({icon: 'lightbulb', message: "IPv4/subnet is correct", intent: Intent.SUCCESS})
        }
        newClientState.ip = ip;
        dispatch({clientPortProps: newClientState});
    }

    handleEditingClientPortSubnet = (subnet: string) => {
        const [state, dispatch] = this.context;
        const newClientState = {...state.clientPortProps};
        let result = Validator.isValidIPv4CidrNotation(newClientState.ip + "/" + subnet);
        if (!result[0]) {
            AppNotification.show({icon: 'lightbulb', message: result[1][0], intent: Intent.DANGER})
        } else {
            AppNotification.show({icon: 'lightbulb', message: "IPv4/subnet is correct", intent: Intent.SUCCESS})
        }
        newClientState.subnet = subnet;
        dispatch({clientPortProps: newClientState});
    }

    handleEditingClientPortMac = (mac: string) => {
        const [state, dispatch] = this.context;
        const newClientState = {...state.clientPortProps};
        newClientState.mac = mac;
        dispatch({clientPortProps: newClientState});
    }
    
    handleEditingClientPortDeviceType = (type: string) => {
        const [state, dispatch] = this.context;
        const newClientState = {...state.clientPortProps};
        newClientState.type = type;
        dispatch({clientPortProps: newClientState});
    }

    render() {
        const [state, dispatch] = this.context;
        console.log(state.clientPortProps);
        return (
            <>
                <H4>Client Options</H4>
                <Row>
                    <Col xs="4">
                        On/Off
                    </Col>
                    <Col>
                        <Switch
                            checked={state.clientPortProps.onState}
                            innerLabelChecked="On"
                            innerLabel="Off"
                            onChange={this.handleEditingClientPortOnState}
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
                                value={state.clientPortProps.name}
                                onChange={(event: any) => this.handleEditingClientPortName(event.target.value)}
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
                                        value={state.clientPortProps.ip}
                                        onChange={(event: any) => this.handleEditingClientPortIp(event.target.value)}
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
                                        value={state.clientPortProps.subnet}
                                        onChange={(event: any) => this.handleEditingClientPortSubnet(event.target.value)}
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
                                value={state.clientPortProps.mac}
                                onChange={(event: any) => this.handleEditingClientPortMac(event.target.value)}
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
                                value={state.clientPortProps.type}
                                onChange={(event: any) => this.handleEditingClientPortDeviceType(event.target.value)}
                            >
                                <option value="0">Veth</option>
                                <option value="1">Tap</option>
                            </select>
                        </SelectContainer>
                    </Col>
                </Row>
            </>
        );
    }
}