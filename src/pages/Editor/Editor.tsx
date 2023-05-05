import React, { useState } from 'react';
import { EditorView } from 'codemirror';
import style from './Editor.module.scss';
import CodeMirror from '../../components/CodeMirror/CodeMirror';

const Editor: React.FC = () => {
  const [mainEditorState, setMainEditorState] = useState<EditorView | null>(null);
  const [variablesEditorState, setVariablesEditorState] = useState<EditorView | null>(null);
  const [headersEditorState, setHeadersEditorState] = useState<EditorView | null>(null);

  function handleSubmit() {
    console.log(mainEditorState?.state.doc);
    console.log(variablesEditorState?.state.doc);
    console.log(headersEditorState?.state.doc);
  }

  function handleReset() {
    const mainTransaction = mainEditorState?.state.update({
      changes: { from: 0, to: mainEditorState.state.doc.toString().length, insert: '' },
    });
    const variablesTransaction = variablesEditorState?.state.update({
      changes: { from: 0, to: variablesEditorState.state.doc.toString().length, insert: '' },
    });
    const hedersTransaction = headersEditorState?.state.update({
      changes: { from: 0, to: headersEditorState.state.doc.toString().length, insert: '' },
    });
    if (mainTransaction) mainEditorState?.dispatch(mainTransaction);
    if (variablesTransaction) variablesEditorState?.dispatch(variablesTransaction);
    if (hedersTransaction) headersEditorState?.dispatch(hedersTransaction);
  }

  return (
    <div className={style.editor}>
      <div className={style.row}>
        <div>
          <button type="button" className={style.button} onClick={handleReset}>
            Reset
          </button>
          <button type="button" className={style.button} onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <h3 className={style.title}>Code editor</h3>
        <CodeMirror
          setView={setMainEditorState}
          initialCode={mainEditorState?.state.doc.toString() || ''}
          areaHeight="400px"
        />
        <h3 className={style.title}>Variables</h3>
        <CodeMirror
          setView={setVariablesEditorState}
          initialCode={variablesEditorState?.state.doc.toString() || ''}
          areaHeight="100px"
        />
        <h3 className={style.title}>Headers</h3>
        <CodeMirror
          setView={setHeadersEditorState}
          initialCode={headersEditorState?.state.doc.toString() || ''}
          areaHeight="100px"
        />
      </div>
      <div className={style.row}>Here will be response result component</div>
      <div className={style.row}>Here will be documentation component</div>
    </div>
  );
};

export default Editor;
