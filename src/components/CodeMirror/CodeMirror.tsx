import React, { useEffect, useRef } from 'react';
import { basicSetup } from 'codemirror';
import { graphql } from 'cm6-graphql';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { indentWithTab } from '@codemirror/commands';
import style from './CodeMirror.module.scss';
import { Schema } from './graphQLShema';

interface CodeMirrorProps {
  setView: (view: EditorView | null) => void;
  initialCode: string;
  areaHeight: string;
}

const CodeMirror: React.FC<CodeMirrorProps> = ({ setView, initialCode: doc, areaHeight }) => {
  const editorRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (editorRef.current === null) return undefined;
    const state = EditorState.create({
      doc,
      extensions: [
        basicSetup,
        graphql(Schema),
        keymap.of([indentWithTab]),
        EditorView.theme(
          {
            '&': {
              color: 'white',
              background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, #034 50%)', // цвет фона редактора
              height: areaHeight,
            },
            '.cm-gutters': {
              backgroundColor: '#045', // цвет столба с нумерацией строк
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
  return <section ref={editorRef} className={style.codemirror} />;
};

export default CodeMirror;
