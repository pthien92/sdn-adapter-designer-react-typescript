import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import { StateContext } from '../StateProvider/StateProvider';
import { Card } from '@blueprintjs/core';




export class CodeEditor extends React.Component<any, any> {
    static contextType = StateContext;
    constructor(props: any) {
        super(props);
        this.state = {
            code: this.props.code || ['function x() {',
                '\tconsole.log("Hello world!");',
                '}'].join('\n'),
            language: this.props.language || 'javascript'
        }
    }
    editorDidMount(editor: any, monaco: any) {
        console.log('editorDidMount', editor);
        editor.focus();
    }
    onChange(newValue: any, e: any) {
        console.log('onChange', newValue, e);
    }
    render() {
        const [state, dispatch] = this.context;
        const code = this.state.code;
        const options = {
            selectOnLineNumbers: true,
        };
        return (
            <Card className={state.theme} style={{padding: "10px"}}>
                <MonacoEditor
                    width="100%"
                    height="600"
                    language={this.state.language}
                    theme={state.theme === "bp3-dark" ? "vs-dark" : "vs-light"}
                    value={code}
                    options={options}
                    onChange={this.onChange}
                    editorDidMount={this.editorDidMount}
                />
            </Card>
        );
    }
}

