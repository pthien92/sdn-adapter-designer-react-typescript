import React from 'react';
import {Row, Col} from 'reactstrap';
import { ClientConfiguration } from './ClientConfiguration';
import { ServerConfiguration } from './ServerConfiguration';
import { StateContext } from '../StateProvider/StateProvider';
import { Card } from '@blueprintjs/core';
import { NetworkComponent } from './NetworkComponent';
import LineTo from 'react-lineto';


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
                        <NetworkComponent name={state.clientPortProps.name} img={clientImage} width={64} height={64}/>
                   </Col>
                   <Col>
                        <NetworkComponent name={"SDN Adapter Switch"} img={"images/router.svg"} width={128} height={100}/>
                   </Col>
                   <Col>
                        <NetworkComponent name={state.serverPortProps.name} img={serverImage} width={64} height={64}/>
                   </Col>
                   <Col>
                        <ServerConfiguration/>
                   </Col>
                </Row> 
                {() => <LineTo from="clientPort" to="Switch" />}
            </Card>
        );
    }
}
