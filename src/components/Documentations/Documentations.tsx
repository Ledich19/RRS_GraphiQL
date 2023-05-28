/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { GraphQLArgument } from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import style from './Documentations.module.scss';
import { IField, IDocumentation, IHistory } from '../../interfaces';

interface IProps {
  fields: IField | undefined;
}

const Documentations: React.FC<IProps> = ({ fields }) => {
  const [currentFields, setCurrentFields] = useState<IField>();
  const [keys, setKeys] = useState<string[]>([]);
  const [name, setName] = useState('Root');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [args, setArgs] = useState<readonly GraphQLArgument[]>([]);
  const [history, setHistory] = useState<IHistory[]>([]);

  useEffect(() => {
    setCurrentFields(fields);
    if (currentFields) setKeys(Object.keys(currentFields));
    setHistory([{ name: 'Root', args: [], type: '', fields }]);
  }, [fields]);

  function handleFields(key: string, fieldType: string) {
    setName(key);
    setType(fieldType);
    if (currentFields && currentFields[key]) {
      const newList = currentFields[key];
      if (newList) setArgs(newList.args);
      let newFields: IField | undefined;
      let newDescription: Maybe<string> = '';
      if (newList.type?.ofType?.getFields) {
        newFields = newList.type.ofType.getFields();
        newDescription = newList.type.ofType.description;
      } else if (newList.type?.getFields) {
        newFields = newList.type.getFields();
        newDescription = newList.type.description;
      }
      if (newFields && newDescription) {
        setCurrentFields(newFields);
        setKeys(Object.keys(newFields));
        setDescription(newDescription);
        setHistory([
          ...history,
          { name: key, type: fieldType, args: newList.args, fields: newFields },
        ]);
      } else {
        setCurrentFields(undefined);
        setKeys([]);
        if (newList.description) setDescription(newList.description);
        setHistory([
          ...history,
          { name: key, type: fieldType, args: newList.args, fields: undefined },
        ]);
      }
    }
  }

  function handleHistory(key: number) {
    const newFields = history[key].fields;
    if (newFields) {
      setCurrentFields(newFields);
      setKeys(Object.keys(newFields));
    }
    setName(history[key].name);
    setType(history[key].type);
    setArgs(history[key].args);
    setHistory(history.filter((_el, idx) => idx <= key));
  }
  return (
    <div className={style.wrapper}>
      <h3 className={style.title}>Docs</h3>
      <div className={style.out}>
        <div className={style.history}>
          {history.length > 0 &&
            history.map((el, idx) => {
              return (
                <span key={idx} onClick={() => handleHistory(idx)}>
                  {` ${el.name} `}&rArr;
                </span>
              );
            })}
        </div>
        <h3 className={style.name}>
          {history.length > 1 && (
            <span className={style.name_pointer} onClick={() => handleHistory(history.length - 2)}>
              &lArr;
            </span>
          )}
          {` ${name}: ${type}`}
        </h3>
        <div className={style.description}>{description}</div>
        {args.length > 0 && (
          <div className={style.args}>
            <h4>Arguments:</h4>
            {args.map((el, idx) => {
              return (
                <div key={idx}>
                  <span className={style.argName}>{`${el.name}: `}</span>
                  <span className={style.argType}>{el?.type.toString()}</span>
                </div>
              );
            })}
          </div>
        )}
        {keys && currentFields && (
          <div className={style.fields}>
            <h4>Fields:</h4>
            {keys.map((el, idx) => {
              let fieldType = '';
              let field: IDocumentation | undefined;
              if (currentFields[el]) field = currentFields[el];
              if (field?.type?.ofType?.name) fieldType = field.type.ofType.name;
              if (field?.type?.name) fieldType = field.type.name;
              return (
                <div
                  className={style.field}
                  key={idx}
                  onClick={() => handleFields(currentFields[el].name, fieldType)}
                >
                  <span className={style.fieldName}>{`${el}: `}</span>
                  <span className={style.fieldType}>{fieldType}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Documentations;
