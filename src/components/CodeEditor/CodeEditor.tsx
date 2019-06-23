import React from 'react';
import MonacoEditor from 'react-monaco-editor';




export class CodeEditor extends React.Component<any,any> {
    constructor(props: any) {
    super(props);
    this.state = {
      code: ['function x() {',
			'\tconsole.log("Hello world!");',
			'}'].join('\n'),
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
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true,
    };
    return (
      <MonacoEditor
        width="100%"
        height="400"
        language="javascript"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />
    );
  }
}

