import React, { useEffect, useRef } from 'react';
import { basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from '@codemirror/view';
import style from './CodeMirrorOutput.module.scss';

interface CodeMirrorOutputProps {
  initialCode: string;
}

const CodeMirrorOutput: React.FC<CodeMirrorOutputProps> = ({ initialCode: doc }) => {
  const editorRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (editorRef.current === null) return undefined;
    const view = new EditorView({
      doc,
      extensions: [
        basicSetup,
        javascript(),
        EditorView.theme(
          {
            '&': {
              color: 'white',
              background: 'grey', // цвет фона редактора,
              height: '100%',
              width: '100%',
            },
            '.cm-gutters': {
              backgroundColor: 'dark-grey', // цвет столба с нумерацией строк
              color: '#ddd',
              border: 'none',
            },
            '.cm-scroller': {
              maxWidth: '100%',
              overflow: 'none',
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
      ],
      parent: editorRef.current,
    });
    return () => {
      view.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorRef.current, doc]);
  return <section ref={editorRef} className={style.codemirror} />;
};

export default CodeMirrorOutput;
