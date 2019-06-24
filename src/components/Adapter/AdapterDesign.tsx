import React from 'react';
import {Row, Col} from 'reactstrap';
import { ClientConfiguration } from './ClientConfiguration';
import { ServerConfiguration } from './ServerConfiguration';
import { StateContext } from '../StateProvider/StateProvider';
import { Card, H4 } from '@blueprintjs/core';
import { NetworkComponent } from './NetworkComponent';
import LineTo from 'react-lineto';
import { ServerTranslation } from './ServerTranslation';


export default class AdapterDesign extends React.Component<any,any> {
    static contextType = StateContext;


    render() {
        const [state, dispatch] = this.context;
        const clientImage = "/images/ethernet-" + ["off", "on"][state.clientPortProps.onState ? 1 : 0]  + "-64.png";
        const serverImage = "/images/ethernet-" + ["off", "on"][state.serverPortProps.onState ? 1 : 0]  + "-64.png";

        return (
            <Card className={state.theme}>
                <Row>
                   <Col>
                        <ClientConfiguration/>
                   </Col>
                   <Col>
                        {state.clientPortProps.type == 1 && 
                            <Row>
                                <Col>
                                    <NetworkComponent name={state.clientPortProps.name} img={clientImage} width={64} height={64}/>
                                </Col>
                                <Col>
                                    <NetworkComponent name={state.clientPortProps.peerName} img={clientImage} width={64} height={64}/>
                                </Col>
                            </Row>
                        }
                        {state.clientPortProps.type == 0 &&
                            <NetworkComponent name={state.clientPortProps.name} img={clientImage} width={64} height={64}/>
                        }
                   </Col>
                   <Col>
                        <Row>
                            <Col>
                                <NetworkComponent name={<H4>SDN Adapter</H4>} img={"images/router.svg"} width={128} height={100}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ServerTranslation/>
                            </Col>
                        </Row>
                   </Col>
                   <Col>
                        {state.serverPortProps.type == 1 &&
                            <Row>
                                <Col>
                                    <NetworkComponent name={state.serverPortProps.peerName} img={serverImage} width={64} height={64}/>
                                </Col>
                                <Col>
                                    <NetworkComponent name={state.serverPortProps.name} img={serverImage} width={64} height={64}/>
                                </Col>
                            </Row>
                        }
                        {state.serverPortProps.type == 0 &&
                            <NetworkComponent name={state.serverPortProps.name} img={serverImage} width={64} height={64}/>
                        }
                   </Col>
                   <Col>
                        <ServerConfiguration/>
                   </Col>
                </Row> 
                <LineTo from="A" to="B"/>
            </Card>
        );
    }
}
