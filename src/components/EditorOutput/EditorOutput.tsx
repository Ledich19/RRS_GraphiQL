import React, { useEffect, useRef } from 'react';
import { basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from '@codemirror/view';
import style from './EditorOutput.module.scss';
import { theme } from './EditorOutputTheme';

interface EditorOutputProps {
  initialCode: string;
}

const EditorOutput: React.FC<EditorOutputProps> = ({ initialCode: doc }) => {
  const editorRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (editorRef.current === null) return undefined;
    const view = new EditorView({
      doc,
      extensions: [basicSetup, javascript(), EditorView.theme(theme, { dark: true })],
      parent: editorRef.current,
    });
    return () => {
      view.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorRef.current, doc]);
  return <section ref={editorRef} className={style.codemirror} />;
};

export default EditorOutput;
