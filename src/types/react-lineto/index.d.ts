declare module 'react-lineto' {
    import React from 'react';
    interface ReactLineToProps {
        borderColor?: string
        borderStyle?: string
        borderWidth?: number
        className?: string
        delay?: number 
        fromAnchor?: string
        from: string
        toAnchor?: string
        to: string
        zIndex?: number
    }

    export default class LineTo extends React.Component<ReactLineToProps> { }
}

