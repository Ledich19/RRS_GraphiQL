import React, { useState, useEffect } from 'react';
import { EditorView } from 'codemirror';
import { printSchema, GraphQLSchema } from 'graphql';
import style from './Editor.module.scss';
import EditorInput from '../../components/EditorInput/EditorInput';
import EditorOutput from '../../components/EditorOutput/EditorOutput';
import { getData, getSchema } from '../../http/api';

const Editor: React.FC = () => {
  const [mainEditorState, setMainEditorState] = useState<EditorView | null>(null);
  const [variablesEditorState, setVariablesEditorState] = useState<EditorView | null>(null);
  const [headersEditorState, setHeadersEditorState] = useState<EditorView | null>(null);
  const [result, setResult] = useState({});
  const [documentation, setDocumentation] = useState({});
  const [newSchema, setNewSchema] = useState<GraphQLSchema>();
  const [docsIsOpen, setDocsIsOpen] = useState(false);
  const [variablesSection, setVariablesSection] = useState(true);
  const [openAdditionalBox, setOpenAdditionalBox] = useState(false);

  useEffect(() => {
    async function setSchema() {
      const mySchema = await getSchema();
      if (mySchema) {
        setDocumentation(printSchema(mySchema));
        setNewSchema(mySchema);
      }
    }
    setSchema();
  }, []);
  function handleDocs() {
    setDocsIsOpen(!docsIsOpen);
  }
  function handleVariablesSection() {
    setVariablesSection(true);
  }
  function handleHeaderSection() {
    setVariablesSection(false);
  }
  function handleAdditionalBox() {
    if (openAdditionalBox) setOpenAdditionalBox(false);
    else setOpenAdditionalBox(true);
  }
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
          <div className={style.input_main}>
            <EditorInput
              setView={setMainEditorState}
              initialCode={mainEditorState?.state.doc.toString() || ''}
              schema={newSchema}
              title="Code editor"
              active
            />
          </div>
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
              <button
                type="button"
                className={style.additional__showBtn}
                onClick={handleAdditionalBox}
              >
                <span className={`${style.span} ${style.span_first}`} />
                <span
                  className={`${style.span} ${style.span_second}`}
                  style={{ transform: openAdditionalBox ? 'rotate(0deg)' : 'rotate(90deg)' }}
                />
              </button>
            </div>
            <div
              className={style.additional__codemirrors}
              style={{ maxHeight: openAdditionalBox ? '200px' : '0px' }}
            >
              <div className={variablesSection ? style.input : style.input_disabled}>
                <EditorInput
                  setView={setVariablesEditorState}
                  initialCode={variablesEditorState?.state.doc.toString() || ''}
                  title="Variables"
                />
              </div>
              <div className={variablesSection ? style.input_disabled : style.input}>
                <EditorInput
                  setView={setHeadersEditorState}
                  initialCode={headersEditorState?.state.doc.toString() || ''}
                  title="Header"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={style.row}>
          <h3 className={style.title}>Response</h3>
          <EditorOutput initialCode={result ? JSON.stringify(result, null, '\t') : ''} />
        </div>
        <div className={docsIsOpen ? style.row : `${style.row} ${style.docs}`}>
          <h3 className={style.title}>
            {/* <EditorOutput initialCode={documentation.toString()} /> */}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Editor;
