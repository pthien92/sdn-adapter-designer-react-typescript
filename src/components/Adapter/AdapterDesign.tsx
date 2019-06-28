import React from 'react';
import {Row, Col} from 'reactstrap';
import { ClientConfiguration } from './ClientConfiguration';
import { ServerConfiguration } from './ServerConfiguration';
import { StateContext } from '../StateProvider/StateProvider';
import { Card, H4 } from '@blueprintjs/core';
import { NetworkComponent } from './NetworkComponent';
import { ServerTranslation } from './ServerTranslation';
import { DrawLine } from './DrawLine';


export default class AdapterDesign extends React.Component<any,any> {
    static contextType = StateContext;
    constructor(props: any) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({loading: false})
        }, 2000);
    }
    
    render() {
        const [state, dispatch] = this.context;
        const clientImage = "/images/ethernet-" + ["off", "on"][state.clientPortProps.onState ? 1 : 0]  + "-64.png";
        const serverImage = "/images/ethernet-" + ["off", "on"][state.serverPortProps.onState ? 1 : 0]  + "-64.png";
        const {loading } = this.state;
        return (
            <Card className={state.theme}>
                <Row>
                   <Col>
                        <ClientConfiguration/>
                   </Col>
                   <Col xs="2">
                        {state.clientPortProps.type === 1 && 
                            <Row>
                                <Col>
                                    <NetworkComponent loading={loading} networkItem={"clientTap1"} name={state.clientPortProps.name} img={clientImage} width={64} height={64}/>
                                </Col>
                                <Col>
                                    <NetworkComponent loading={loading} networkItem={"clientTap2"} name={state.clientPortProps.peerName} img={clientImage} width={64} height={64}/>
                                </Col>
                            </Row>
                        }
                        {state.clientPortProps.type === 0 &&
                            <NetworkComponent loading={loading} networkItem={"clientTap2"} name={state.clientPortProps.name} img={clientImage} width={64} height={64}/>
                        }
                   </Col>
                   <Col xs="4">
                        <Row>
                            <Col>
                                <NetworkComponent loading={loading} networkItem={"switch"} name={<H4>SDN Adapter</H4>} img={"images/router.svg"} width={128} height={128}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ServerTranslation/>
                            </Col>
                        </Row>
                   </Col>
                   <Col xs="2">
                        {state.serverPortProps.type === 1 &&
                            <Row>
                                <Col>
                                    <NetworkComponent loading={loading} networkItem={"serverTap2"} name={state.serverPortProps.peerName} img={serverImage} width={64} height={64}/>
                                </Col>
                                <Col>
                                    <NetworkComponent loading={loading} networkItem={"serverTap1"} name={state.serverPortProps.name} img={serverImage} width={64} height={64}/>
                                </Col>
                            </Row>
                        }
                        {state.serverPortProps.type === 0 &&
                            <NetworkComponent loading={loading} networkItem={"serverTap2"} name={state.serverPortProps.name} img={serverImage} width={64} height={64}/>
                        }
                   </Col>
                   <Col>
                        <ServerConfiguration/>
                   </Col>
                </Row> 
                <DrawLine clientPortType={state.clientPortProps.type} serverPortType={state.serverPortProps.type}/>
            </Card>
        );
    }
}
