import React from 'react';
import styled from 'styled-components';
import { StateContext } from '../../components/StateProvider/StateProvider';
import { Configuration } from '../../pages/Configuration/Configuration';
import { AppNavbar } from '../../components/Navbar/Navbar';




const ViewContainer = styled.div`
    padding-top: 50px;
`


export class Admin extends React.Component<any,any> {
    static contextType = StateContext;
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div id="Admin">
                <AppNavbar {...this.props}/>
                {this.props.history.location.pathname === '/configuration' &&
                <ViewContainer>
                    <Configuration></Configuration>
                </ViewContainer>
            }

            </div>
        );
    }
}