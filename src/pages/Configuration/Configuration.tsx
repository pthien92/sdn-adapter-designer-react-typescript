import React from 'react';
import {Responsive, WidthProvider, Layout } from 'react-grid-layout';
import AdapterDesign from '../../components/Adapter/AdapterDesign';
import { CodeEditor } from '../../components/CodeEditor/CodeEditor';

const ResponsiveReactLayout = WidthProvider(Responsive);


export class Configuration extends React.Component<any,any> {

    static defaultProps = {
        className: "layout",
        rowHeight: 20,
        onLayoutChange: function() {},
        cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
        initialLayout: {
            lg: [
                {i: 'adapter-panel', x: 0, y:0, w: 12, h: 4},
                {i: 'script-code-panel', x: 0, y:5, w: 6, h: 4},
                {i: 'controller-code-panel', x: 5, y:5, w: 6, h: 4},
            ],
        }
    }

    generateLayout = () => {
        return {
            lg: [
                {i: 'adapter-panel', x: 0, y:0, w: 12, h: 6},
                {i: 'script-code-panel', x: 0, y:6, w: 6, h: 11},
                {i: 'controller-code-panel', x: 6, y:6, w: 6, h: 11},
            ],
            md: [
                {i: 'adapter-panel', x: 0, y:0, w: 12, h: 4},
                {i: 'script-code-panel', x: 0, y:0, w: 12, h: 12},
                {i: 'controller-code-panel', x: 0, y:0, w: 12, h: 12},
            ],
            sm: [
                {i: 'adapter-panel', x: 0, y:0, w: 12, h: 4},
                {i: 'script-code-panel', x: 0, y:0, w: 12, h: 4},
                {i: 'controller-code-panel', x: 0, y:0, w: 12, h: 4},
            ]
        }
    }

    render() {
        return (
            <>
                <ResponsiveReactLayout
                    {...this.props}
                    layouts={this.generateLayout()}
                    rowHeight={30}
                    width={1200}
                    isResizable={false}
                    isDraggable={true}
                    onLayoutChange={(currentLayout: Layout[], allLayouts: any) => console.log(currentLayout)}
                    draggableCancel="input,textarea"

                >
                    <div key="adapter-panel" >
                        <AdapterDesign/>
                    </div>
                    <div key="script-code-panel" >
                        <CodeEditor></CodeEditor>
                    </div>
                    <div key="controller-code-panel" >
                        <CodeEditor></CodeEditor>
                    </div>
                </ResponsiveReactLayout>
            </>
        );
    }
}