import React from 'react';
import styled from 'styled-components';
import { LoadingNetworkComponent } from './LoadingNetworkComponent';



const NetworkComponentContainer = styled.div`
    text-align: center;
`

interface NetworkViewComponentProps {
    img: string
    width?: string
    height?: string
}


const NetworkViewContainer = styled.div<NetworkViewComponentProps>`
    display: block;
    background-size: ${props => props.width ? props.width: 50}px ${props => props.height ? props.height: 50}px
    background: url(${props => props.img}) no-repeat top left;
    width: ${props => props.width ? props.width : 50}px;
    height: ${props => props.height ? props.height : 50}px;
    margin-left: auto;
    margin-right: auto;
    z-index: 110;
    position: relative;

` as React.FunctionComponent<NetworkViewComponentProps>


export class NetworkComponent extends React.Component<any,any> {
    render() {
        return (
            <NetworkComponentContainer className={this.props.networkItem}>
                {this.props.name || "unknown"}
                {!this.props.loading && <NetworkViewContainer img={this.props.img} width={this.props.width} height={this.props.height}/>}
                {this.props.loading &&
                   <LoadingNetworkComponent width={this.props.width} height={this.props.height} />  
                }
            </NetworkComponentContainer>
        );
    }
}