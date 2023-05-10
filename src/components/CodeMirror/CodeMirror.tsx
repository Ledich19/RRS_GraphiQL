/* eslint-disable react/require-default-props */
import React, { useEffect, useRef } from 'react';
import { basicSetup } from 'codemirror';
import { graphql } from 'cm6-graphql';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { indentWithTab } from '@codemirror/commands';
import style from './CodeMirror.module.scss';
import { Schema } from './graphQLShema';

interface CodeMirrorProps {
  setView: (view: EditorView | null) => void;
  initialCode: string;
  areaHeight: string;
  main: boolean;
  title?: string;
  active?: boolean;
}

const CodeMirror: React.FC<CodeMirrorProps> = ({
  setView,
  initialCode: doc,
  areaHeight,
  main,
  title,
  active,
}) => {
  const editorRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (editorRef.current === null) return undefined;
    const state = EditorState.create({
      doc,
      extensions: [
        basicSetup,
        main ? graphql(Schema) : javascript(),
        keymap.of([indentWithTab]),
        EditorView.theme(
          {
            '&': {
              color: 'white',
              background: 'grey', // цвет фона редактора
              height: areaHeight,
            },
            '.cm-gutters': {
              backgroundColor: 'dark-grey', // цвет столба с нумерацией строк
              color: '#ddd',
              border: 'none',
            },
            '.cm-scroller': {
              overflow: 'auto',
            },
            '.ͼb': {
              color: 'yellow',
              fontWeight: '700',
            },
            '.ͼc': {
              color: 'blue',
              fontWeight: '700',
            },
            '.cm-line': {
              color: '#0f0',
            },
            '.cm-lintRange-error': {
              color: 'red',
            },
          },
          { dark: true }
        ),
        EditorView.lineWrapping,
      ],
    });
    const view = new EditorView({
      state,
      parent: editorRef.current,
    });
    setView(view);
    return () => {
      view.destroy();
      setView(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorRef.current, doc, areaHeight]);
  return (
    <section
      ref={editorRef}
      className={style.codemirror}
      style={{ display: active ? 'block' : 'none' }}
    >
      <h3 className={style.title}>{title}</h3>
    </section>
  );
};

export default CodeMirror;
