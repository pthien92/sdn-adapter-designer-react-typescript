import React from 'react';
import {Responsive, WidthProvider, Layout } from 'react-grid-layout';
import AdapterDesign from '../../components/Adapter/AdapterDesign';
import { CodeEditor } from '../../components/CodeEditor/CodeEditor';
import { controller_code } from './ryu';
import { script_code } from './setup';
import { StateContext } from '../../components/StateProvider/StateProvider';

const ResponsiveReactLayout = WidthProvider(Responsive);

export class Configuration extends React.Component<any,any> {
    static contextType = StateContext;
    static defaultProps = {
        className: "layout",
        rowHeight: 20,
        onLayoutChange: function() {},
        cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
        initialLayout: {
            lg: [
                {i: 'adapter-panel', x: 0, y:0, w: 12, h: 4},
                {i: 'script-code-panel', x: 0, y:5, w: 6, h: 11},
                {i: 'controller-code-panel', x: 5, y:5, w: 6, h: 11},
            ],
        },
    }

    constructor(props: any) {
        super(props);
        this.state = { 
            currentBreakpoint: 'lg'
        }
    }

    generateLayout = () => {
        return {
            lg: [
                {i: 'adapter-panel', x: 0, y: 0, w: 12, h: 8.5},
                {i: 'script-code-panel', x: 0, y: 10, w: 6, h: 10},
                {i: 'controller-code-panel', x: 7, y: 10, w: 6, h: 10},
            ],
            md: [
                {i: 'adapter-panel', x: 0, y:0, w: 12, h: 14},
                {i: 'script-code-panel', x: 0, y:14, w: 5, h: 7},
                {i: 'controller-code-panel', x: 5, y:14, w: 5, h: 7},
            ],
            sm: [
                {i: 'adapter-panel', x: 0, y:0, w: 12, h: 14},
                {i: 'script-code-panel', x: 0, y:14, w: 6, h: 7},
                {i: 'controller-code-panel', x: 7, y:14, w: 6, h: 7},
            ]
        }
    }

    handleBreakpointChange = (newBreakpoint: string) => {
        this.setState({currentBreakpoint: newBreakpoint});
    }

    render() {
        const [state, dispatch] = this.context;
        return (
            <>
                <ResponsiveReactLayout
                    {...this.props}
                    layouts={this.generateLayout()}
                    rowHeight={30}
                    width={1200}
                    isResizable={false}
                    isDraggable={false}
                    onLayoutChange={(currentLayout: Layout[], allLayouts: any) => console.log(currentLayout)}
                    draggableCancel="input,textarea,button"
                    onBreakpointChange={(newBreakpoint: string, newCols: number) => this.handleBreakpointChange(newBreakpoint)}
                    breakpoints={{lg: 1200, md: 1050, sm: 768, xs: 480, xxs: 0}}
                >
                    <div key="adapter-panel" >
                        <AdapterDesign breakpoint={this.state.currentBreakpoint}/>
                    </div>
                    <div key="script-code-panel" >
                        <CodeEditor name="bash_code" code={script_code} language="shell"
                            editorId={1}
                            clientPort={state.clientPortProps}
                            serverPort={state.serverPortProps}
                            networkTranslation={state.networkTranslation}
                            editorWidth={this.state.currentBreakpoint === 'lg' ? "100%" : "200%"}
                        />
                    </div>
                    <div key="controller-code-panel" >
                        <CodeEditor name="controller_code" code={controller_code} language="python"
                            editorId={2}
                            clientPort={state.clientPortProps}
                            serverPort={state.serverPortProps}
                            networkTranslation={state.networkTranslation}
                        />
                    </div>
                </ResponsiveReactLayout>
            </>
        );
    }
}