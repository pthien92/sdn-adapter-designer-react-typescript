import React from 'react';
import {SteppedLineTo} from 'react-lineto';


export class DrawLine extends React.Component<any,any> {
    static getDerivedStateFromProps (nextProps: any, prevState: any) {
        if (nextProps.clientPortType !== prevState.clientPortType) {
            return {
                clientPortType: nextProps.clientPortType
            }
        } else 
        if (nextProps.serverPortType !== prevState.serverPortType) {
            return {
                serverPortType: nextProps.serverPortType
            }
        }
        return null;
    }
    constructor(props: any) {
        super(props);
        this.state = {
            clientPortType: props.clientPortType,
            serverPortType: props.serverPortType,
        }
    }

    render() {
        return (
        <>
            {this.state.clientPortType === 1 && 
                <span>
                    <SteppedLineTo delay={50} zIndex={98} from="clientTap1" to="clientTap2" orientation="h" borderWidth={3} borderColor={"green"}/>
                    <SteppedLineTo delay={50} zIndex={98} from="clientTap2" to="switch" orientation="h" borderWidth={3} borderColor={"green"}/>
                </span>
            }
            {this.state.clientPortType === 0 && 
                <span>
                    <SteppedLineTo delay={50} zIndex={98} from="clientTap2" to="switch" orientation="h" borderWidth={3} borderColor={"green"}/>
                </span>
            }
            {this.state.serverPortType === 1 &&
                <span>
                    <SteppedLineTo delay={50} zIndex={98} from="switch" to="serverTap2" orientation="h" borderWidth={3} borderColor={"green"}/>
                    <SteppedLineTo delay={50} zIndex={98} from="serverTap2" to="serverTap1" orientation="h" borderWidth={3} borderColor={"green"}/>
                </span>
            }
            {this.state.serverPortType === 0 &&
                <span>
                    <SteppedLineTo delay={50} zIndex={98} from="serverTap2" to="switch" orientation="h" borderWidth={3} borderColor={"green"}/>
                </span>
            }
        </>
    );
    }
}