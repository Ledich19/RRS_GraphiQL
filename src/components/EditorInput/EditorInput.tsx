import React, { useEffect, useRef } from 'react';
import { basicSetup } from 'codemirror';
import { graphql } from 'cm6-graphql';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { indentWithTab } from '@codemirror/commands';
import { GraphQLSchema } from 'graphql';
import style from './EditorInput.module.scss';
import theme from './EditorInputTheme';

interface EditorInputProps {
  setView: (view: EditorView | null) => void;
  initialCode: string;
  title: string;
  schema?: GraphQLSchema;
}

const EditorInput: React.FC<EditorInputProps> = ({ setView, initialCode: doc, title, schema }) => {
  const editorRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (editorRef.current === null) return undefined;
    const state = EditorState.create({
      doc,
      extensions: [
        basicSetup,
        schema ? graphql(schema) : javascript(),
        keymap.of([indentWithTab]),
        EditorView.theme(theme, { dark: true }),
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
  }, [editorRef.current, doc, schema]);
  return (
    <section ref={editorRef} className={style.codemirror}>
      <h3 className={style.title}>{title}</h3>
    </section>
  );
};

EditorInput.defaultProps = {
  schema: undefined,
};

export default EditorInput;
