import React, { useEffect, useRef } from 'react';
import { basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from '@codemirror/view';
import { useTranslation } from 'react-i18next';
import { EditorState } from '@codemirror/state';
import style from './EditorOutput.module.scss';
import theme from './EditorOutputTheme';

interface EditorOutputProps {
  initialCode: string;
}

const EditorOutput: React.FC<EditorOutputProps> = ({ initialCode: doc }) => {
  const editorRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (editorRef.current === null) return undefined;
    const view = new EditorView({
      doc,
      extensions: [
        basicSetup,
        javascript(),
        EditorState.readOnly.of(true),
        EditorView.theme(theme, { dark: true }),
      ],
      parent: editorRef.current,
    });
    return () => {
      view.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorRef.current, doc]);
  const { t } = useTranslation();
  return (
    <section ref={editorRef} className={style.codemirror}>
      <h3 className={style.title}>{t('response')}</h3>
    </section>
  );
};

export default EditorOutput;
