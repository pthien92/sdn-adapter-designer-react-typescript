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
        return (
            <Card className={state.theme}>
                <Row>
                   <Col>
                        <ClientConfiguration/>
                   </Col>
                   <Col>
                        <NetworkComponent name={"clientPort"} img={"/images/ethernet-on-64.png"} width={64} height={64}/>
                   </Col>
                   <Col>
                        <NetworkComponent name={"Switch"} img={"images/router.svg"} width={128} height={100}/>
                   </Col>
                   <Col>
                        <NetworkComponent name={"serverPort"} img={"/images/ethernet-off-64.png"} width={64} height={64}/>
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
