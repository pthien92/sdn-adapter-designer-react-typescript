import React from 'react';
import { Row, Col } from 'reactstrap';
import { StateContext } from '../StateProvider/StateProvider';




export class ServerTranslation extends React.Component<any,any> {
    static contextType = StateContext;

    render() {
        const [state, dispatch] = this.context;
        return (
            <>
                Translation
                <Row>
                    <Col>
                        Server
                    </Col>
                    <Col>
                        <div className="bp3-input-group bp3-small">
                            <input
                                className="bp3-input"
                                type="input"
                                value={""}
                                onChange={(event: any) => {}}
                            />
                        </div>
                    </Col>
                </Row>
            </>
        );
    }
}