import React, { useState } from 'react';
import { EditorView } from 'codemirror';
import style from './Editor.module.scss';
import CodeMirror from '../../components/CodeMirror/CodeMirror';
import CodeMirrorOutput from '../../components/CodeMirrorOutput/CodeMirrorOutput';
import { getData } from '../../http/api';

const Editor: React.FC = () => {
  const [mainEditorState, setMainEditorState] = useState<EditorView | null>(null);
  const [variablesEditorState, setVariablesEditorState] = useState<EditorView | null>(null);
  const [headersEditorState, setHeadersEditorState] = useState<EditorView | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState({});
  const [docsIsOpen, setDocsIsOpen] = useState(false);
  const [variablesSection, setVariablesSection] = useState(true);

  function handleDocs() {
    if (docsIsOpen) setDocsIsOpen(false);
    else setDocsIsOpen(true);
  }

  function handleVariablesSection() {
    setVariablesSection(true);
  }
  function handleHeaderSection() {
    setVariablesSection(false);
  }
  async function handleSubmit() {
    if (mainEditorState?.state.doc.toString()) {
      const query = mainEditorState.state.doc.toString();
      const variables = variablesEditorState?.state.doc.toString();
      console.log(query);
      try {
        setIsLoading(true);
        const response = await getData(query, variables);
        setResult(response);
        console.log(response);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
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
      <div className={style.buttons}>
        <div className={style.editorNavigation}>
          <button type="button" className={style.button} onClick={handleReset}>
            Reset
          </button>
          <button type="button" className={style.button} onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <button type="button" className={style.button} onClick={handleDocs}>
          {docsIsOpen ? 'Hide docs' : 'Show docs'}
        </button>
      </div>
      <div className={style.body}>
        <div className={style.row}>
          <CodeMirror
            setView={setMainEditorState}
            initialCode={mainEditorState?.state.doc.toString() || ''}
            areaHeight="400px"
            main
            title="Code editor"
            active
          />
          <div className={style.additional}>
            <div className={style.additional__buttons}>
              <button
                type="button"
                className={
                  !variablesSection
                    ? style.nonActiveButton
                    : `${style.nonActiveButton} ${style.activeButton}`
                }
                onClick={handleVariablesSection}
              >
                Variables
              </button>
              <button
                type="button"
                className={
                  variablesSection
                    ? style.nonActiveButton
                    : `${style.nonActiveButton} ${style.activeButton}`
                }
                onClick={handleHeaderSection}
              >
                Headers
              </button>
            </div>
            <CodeMirror
              setView={setVariablesEditorState}
              initialCode={variablesEditorState?.state.doc.toString() || ''}
              areaHeight="200px"
              main={false}
              active={variablesSection}
              // title="Variables"
            />
            <CodeMirror
              setView={setHeadersEditorState}
              initialCode={headersEditorState?.state.doc.toString() || ''}
              areaHeight="200px"
              main={false}
              active={!variablesSection}
              // title="Header"
            />
          </div>
        </div>
        <div className={style.row}>
          <h3 className={style.title}>Response</h3>
          <CodeMirrorOutput initialCode={result ? JSON.stringify(result, null, '\t') : ''} />
        </div>
        <div className={docsIsOpen ? style.row : `${style.row} ${style.docs}`}>
          <h3 className={style.title}>Here will be documentation component</h3>
        </div>
      </div>
    </div>
  );
};

export default Editor;
