declare module 'react-lineto' {
    import * as React from 'react';
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

    interface ReactSteppedLineToProps {
        borderColor?: string
        borderStyle?: string
        borderWidth?: number
        className?: string
        delay?: number 
        orientation?: "h" | "v"
        fromAnchor?: string
        from: string
        toAnchor?: string
        to: string
        within?: string
        zIndex?: number
    }

    class LineTo extends React.Component<ReactLineToProps> { }
    class SteppedLineTo extends React.Component<ReactSteppedLineToProps> { }
}

