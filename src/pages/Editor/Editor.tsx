import React, { useState } from 'react';
import { EditorView } from 'codemirror';
import style from './Editor.module.scss';
import EditorInput from '../../components/EditorInput/EditorInput';
import EditorOutput from '../../components/EditorOutput/EditorOutput';
import { getData } from '../../http/api';

const Editor: React.FC = () => {
  const [mainEditorState, setMainEditorState] = useState<EditorView | null>(null);
  const [variablesEditorState, setVariablesEditorState] = useState<EditorView | null>(null);
  const [headersEditorState, setHeadersEditorState] = useState<EditorView | null>(null);
  const [result, setResult] = useState({});

  async function handleSubmit() {
    if (mainEditorState?.state.doc.toString()) {
      const query = mainEditorState.state.doc.toString();
      const variables = variablesEditorState?.state.doc.toString();
      const headers = headersEditorState?.state.doc.toString();
      try {
        setResult('Loading..');
        const response = await getData(query, variables, headers);
        setResult(response);
      } catch (e) {
        if (e instanceof Error) setResult(e.message);
      }
    }
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
        <div className={style.input_main}>
          <h3 className={style.title}>Code editor</h3>
          <EditorInput
            setView={setMainEditorState}
            initialCode={mainEditorState?.state.doc.toString() || ''}
            main
          />
        </div>
        <div className={style.input}>
          <h3 className={style.title}>Variables</h3>
          <EditorInput
            setView={setVariablesEditorState}
            initialCode={variablesEditorState?.state.doc.toString() || ''}
            main={false}
          />
        </div>
        <div className={style.input}>
          <h3 className={style.title}>Headers</h3>
          <EditorInput
            setView={setHeadersEditorState}
            initialCode={headersEditorState?.state.doc.toString() || ''}
            main={false}
          />
        </div>
      </div>
      <div className={style.row}>
        <EditorOutput initialCode={result ? JSON.stringify(result, null, '\t') : ''} />
      </div>
      <div className={style.row}>Here will be documentation component</div>
    </div>
  );
};

export default Editor;
