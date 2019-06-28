import React from 'react';



export const LoadingNetworkComponent: React.FC<any> = (props) => {
    return(
        <div className="sk-folding-cube" style={{width: props.width, height: props.height}}>
            <div className="sk-cube1 sk-cube"></div>
            <div className="sk-cube2 sk-cube"></div>
            <div className="sk-cube4 sk-cube"></div>
            <div className="sk-cube3 sk-cube"></div>
        </div>     
    );
}