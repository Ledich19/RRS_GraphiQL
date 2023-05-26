import React, { useState, useEffect } from 'react';
import { EditorView } from 'codemirror';
import { GraphQLSchema, GraphQLFieldMap } from 'graphql';
import { useTranslation } from 'react-i18next';
import style from './Editor.module.scss';
import EditorInput from '../../components/EditorInput/EditorInput';
import EditorOutput from '../../components/EditorOutput/EditorOutput';
import Documentations from '../../components/Documentations/Documentations';
import { getData, getSchema } from '../../http/api';
import { IField, IDocumentation } from '../../interfaces';

const Editor: React.FC = () => {
  const [mainEditorState, setMainEditorState] = useState<EditorView | null>(null);
  const [variablesEditorState, setVariablesEditorState] = useState<EditorView | null>(null);
  const [headersEditorState, setHeadersEditorState] = useState<EditorView | null>(null);
  const [result, setResult] = useState<string>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [documentation, setDocumentation] = useState<
    GraphQLFieldMap<IField, IDocumentation> | undefined
  >();
  const [newSchema, setNewSchema] = useState<GraphQLSchema>();
  const [docsIsOpen, setDocsIsOpen] = useState(false);
  const [variablesSection, setVariablesSection] = useState(true);
  const [openAdditionalBox, setOpenAdditionalBox] = useState(false);
  const [maxWidth, setMaxWidth] = useState(window.innerWidth < 850 ? window.innerWidth - 20 : 593);
  const { t } = useTranslation();

  window.addEventListener('resize', () => {
    if (window.innerWidth < 850) {
      setMaxWidth(window.innerWidth - 20);
    } else setMaxWidth(593);
  });
  useEffect(() => {
    async function setSchema() {
      const mySchema = await getSchema();
      if (mySchema) {
        setDocumentation(mySchema.getQueryType()?.getFields());
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
        setResult(JSON.stringify(response, null, '\t'));
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
    setResult('');
  }
  return (
    <div className={style.editor}>
      <div className={style.buttons}>
        <div className={style.editorNavigation}>
          <button type="button" className={style.button} onClick={handleReset}>
            {t('reset')}
          </button>
          <button type="button" className={style.button} onClick={handleSubmit}>
            {t('submit')}
          </button>
        </div>
        <button
          type="button"
          className={style.button}
          onClick={handleDocs}
          disabled={!documentation}
        >
          {!docsIsOpen ? t('showdocs') : t('hidedocs')}
        </button>
      </div>
      <div className={style.body}>
        <div className={style.row} style={{ maxWidth }}>
          <EditorInput
            setView={setMainEditorState}
            initialCode={mainEditorState?.state.doc.toString() || ''}
            schema={newSchema}
            title={t('codeeditor')}
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
                {t('variables')}
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
                {t('headers')}
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
              style={{ display: openAdditionalBox ? 'block' : 'none' }}
            >
              <div className={variablesSection ? style.input : style.input_disabled}>
                <EditorInput
                  setView={setVariablesEditorState}
                  initialCode={variablesEditorState?.state.doc.toString() || ''}
                  title={t('variables')}
                />
              </div>
              <div className={variablesSection ? style.input_disabled : style.input}>
                <EditorInput
                  setView={setHeadersEditorState}
                  initialCode={headersEditorState?.state.doc.toString() || ''}
                  title={t('headers')}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={style.row} style={{ maxWidth }}>
          <EditorOutput initialCode={result || ''} />
        </div>
        <div className={docsIsOpen ? style.row : `${style.row} ${style.docs}`} style={{ maxWidth }}>
          <Documentations fields={documentation} />
        </div>
      </div>
    </div>
  );
};

export default Editor;
