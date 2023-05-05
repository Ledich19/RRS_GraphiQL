import React, { useEffect, useRef } from 'react';
import { basicSetup } from 'codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { indentWithTab } from '@codemirror/commands';
import style from './CodeMirror.module.scss';

interface CodeMirrorProps {
  setView: (view: EditorView | null) => void;
  initialCode: string;
  areaHeight: string;
}

const CodeMirror: React.FC<CodeMirrorProps> = ({ setView, initialCode: doc, areaHeight }) => {
  const editorRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (editorRef.current === null) return;
    const state = EditorState.create({
      doc,
      extensions: [
        basicSetup,
        javascript(),
        keymap.of([indentWithTab]),
        EditorView.theme(
          {
            '&': {
              color: 'white',
              backgroundColor: '#034',
              height: areaHeight,
            },
            '.cm-content': {
              caretColor: '#0e9',
            },
            '&.cm-focused .cm-cursor': {
              borderLeftColor: '#0e9',
            },
            '&.cm-focused .cm-selectionBackground, ::selection': {
              backgroundColor: '#074',
            },
            '.cm-gutters': {
              backgroundColor: '#045',
              color: '#ddd',
              border: 'none',
            },
            '.cm-scroller': {
              overflow: 'auto',
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
  }, [editorRef.current, doc]);
  return <section ref={editorRef} className={style.codemirror} />;
};

export default CodeMirror;
