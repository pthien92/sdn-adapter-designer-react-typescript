import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import { StateContext } from '../StateProvider/StateProvider';
import { Card, Button, H4 } from '@blueprintjs/core';
import { IRange } from 'monaco-editor';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';

const VerticalSpacer = styled.div`
    padding: 5px;
`

const isDifferentPortProps = (left: any, right: any) => {
    let allKeys = Object.keys(left);
    for (var i = 0; i < allKeys.length; i++) {
        if (left[allKeys[i]] !== right[allKeys[i]]) {
            return true;
        }
    }
    return false;
}



export class CodeEditor extends React.Component<any, any> {

    static contextType = StateContext;
    
    static editor1: MonacoEditor; // place holder for bash code editor
    static editor2: MonacoEditor; // place holder for ryu code editor

    static processSetupCode(code: any, props: any) {

        const replacingValues = [
            props.clientPort.name,                         // 0 - client Port Name
            props.clientPort.peerName,                     // 1 - client Port peer Name
            props.serverPort.name,                         // 2 - server Port Name
            props.serverPort.peerName,                     // 3 - server Port peer Name
            props.clientPort.ip,                           // 4 - client Port IP
            props.clientPort.subnet,                       // 5 - client Port subnet
            props.clientPort.mac,                          // 6 - client Port mac address
            props.networkTranslation.adapterName,          // 7 - adapter name
            props.networkTranslation.adapterDpid,            // 8 - adapter datapath id
            props.networkTranslation.adapterControllerPort,  // 9 - adapter controller tcp listen port
            props.serverPort.ip,                             // 10 - server Port IP
            props.serverPort.subnet,                         // 11 - server Port Subnet
            props.clientPort.onState ? "up": "down",         // 12 - client Port on/off
            props.serverPort.onState ? "up": "down",         // 13 - client Port on/off
        ];
        const newCode = code.replace(/\{\d+\}/g, (substr: any) => {
            const i = parseInt(substr.replace(/\{|\}/g, ""), 10);
            const replacingValue = replacingValues[i];
            if (replacingValue) {
                return replacingValue;
            } 
            return substr;
        })
        return newCode;
    }

    static processControllerCode(code: any, props: any) {
        // build map
        let serverList: string = "";
        Object.keys(props.networkTranslation.serverList).map((item: string, index: number) => {
            serverList = serverList + "\'" + item + "\':\'" + props.networkTranslation.serverList[item] + "\',\n"
            serverList = serverList + "\t\t\t\t\t\t";
        });

        let vethIps: string = "";
        if (props.clientPort.ip !== "0.0.0.0") {
            vethIps = "\'" + props.clientPort.ip + "\':\'" + props.clientPort.mac + "\',\n\t\t\t\t\t\t";
        }

        if (props.serverPort.ip !== "0.0.0.0") {
            vethIps = "\'" + props.serverPort.ip + "\':\'" + props.serverPort.mac + "\',\n\t\t\t\t\t\t";
        }

        let outPortMap: string = "";
        Object.keys(props.networkTranslation.outPortMap).map((item: string, index: number) => {
            outPortMap = outPortMap + "\'" + item + "\':\'" + props.networkTranslation.outPortMap[item] + "\',\n"
            outPortMap = outPortMap + "\t\t\t\t\t\t";
        });

        const replacingValues = [
            serverList,
            vethIps,
            outPortMap
        ]
        const newCode = code.replace(/\{\d+\}/g, (substr: any) => {
            const i = parseInt(substr.replace(/\{|\}/g, ""), 10);
            const replacingValue = replacingValues[i];
            if (replacingValue) {
                return replacingValue;
            } 
            return substr;
        })
        return newCode;
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        let newCode: any;
        if (nextProps.name === 'bash_code') {
            newCode = CodeEditor.processSetupCode (nextProps.code, nextProps);
        } else 
        if (nextProps.name === 'controller_code') {
            newCode = CodeEditor.processControllerCode(nextProps.code, nextProps);
        }
        if (isDifferentPortProps(nextProps.clientPort, prevState.clientPort)) {
            return {clientPort: nextProps.clientPort, newCode: newCode, code: newCode}
        } else 
        if (isDifferentPortProps(nextProps.serverPort, prevState.serverPort)) {
            return {serverPort: nextProps.serverPort, newCode: newCode, code: newCode}
        } else
        if (isDifferentPortProps(nextProps.networkTranslation, prevState.networkTranslation)) {
            return {networkTranslation: nextProps.networkTranslation, newCode: newCode, code: newCode}
        } else
        if (newCode !== prevState.newCode) {
            return {newCode: newCode, code: newCode}
        }
        return null;
    }


    constructor(props: any) {
        super(props);
        this.state = {
            editorId: props.editorId,
            newCode: ['function x() {',
                '\tconsole.log("Hello world!");',
                '}'].join('\n'),
            code: ['function x() {',
                '\tconsole.log("Hello world!");',
                '}'].join('\n'),
            language: props.language || 'javascript',
            name: props.name,
            clientPort: props.clientPort,
            serverPort: props.serverPort,
            networkTranslation: props.networkTranslation,
        }
    }


    componentDidUpdate () {
        this.commentLines(this.getEditor(), this.linesToBeCommented());
    }


    getEditor() {
        if (this.state.name === "bash_code") {
            return CodeEditor.editor1;
        } else {
            return CodeEditor.editor2;
        }
    }

    linesToBeCommented () {
        let lines: number[] = [];
        if (this.state.name === "bash_code") {
            if (this.state.clientPort.type === 0) { // Tap
                lines.push(7, 18, 25);
            } else {
                lines.push(3, 17);
            } 
            if (this.state.serverPort.type === 0) { // Tap
                lines.push(8, 20, 29);
            } else {
                lines.push(4, 19);
            }
        }
        return lines;
    }

    commentLines (editor: any, lines: any) {
        editor.setPosition({lineNumber: 0, column: 0})
        editor.setValue(this.state.code);
        lines.map( (value: number, index: number) => {
            const range: IRange = {startLineNumber: value, startColumn: 1, endLineNumber: value, endColumn: 1};
            const id = { major: 1, minor: 1};
            const text = "# ";
            const op = {identifier: id, range: range, text: text, forceMoveMarkers: true};
            editor.executeEdits("", [op]);
            
        })
    }

    editorDidMount(editor: any, lines: any, instanceNumber: number) {
        console.log('editorDidMount', editor);
        if (instanceNumber === 1) {
            CodeEditor.editor1 = editor;
        } else {
            CodeEditor.editor2 = editor;
        }
        this.commentLines(this.getEditor(), lines);
    }

    onChange = (newValue: any, e: any) => {
        console.log('onChange', newValue, e);
    }

    copyToClipboard = () => {
        const editor:any = this.getEditor();
        editor.executeCommand('copy');
    }

    render() {
        const [state, dispatch] = this.context;
        const options = {
            selectOnLineNumbers: true,
            minimap: {
                enabled: false
            }
        };
        const lines = this.linesToBeCommented();
        const instanceNumber = this.state.name === "bash_code" ? 1 : 2;
        return (
            <Card className={state.theme} style={{padding: "10px"}}>
                <Row>
                    <Col>
                        {instanceNumber === 1 && <H4>Setup code - AUTOGENERATED</H4>}
                        {instanceNumber === 2 && <H4>Ryu code - AUTOGENERATED</H4>}
                    </Col>
                </Row>
                <VerticalSpacer/>
                <MonacoEditor
                    ref="monaco"
                    width="100%"
                    height="600"
                    language={this.state.language}
                    theme={state.theme === "bp3-dark" ? "vs-dark" : "vs-light"}
                    value={this.state.newCode}
                    options={options}
                    onChange={this.onChange}
                    editorDidMount={(editor: any, monaco: any) => this.editorDidMount (editor, lines, instanceNumber)}
                />
            </Card>
        );
    }
}

