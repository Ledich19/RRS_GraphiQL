/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { GraphQLFieldMap } from 'graphql';
import style from './Documentations.module.scss';

interface IProps {
  fields: GraphQLFieldMap<never, never> | undefined;
}

const Documentations: React.FC<IProps> = ({ fields }) => {
  const [currentFields, setCurrentFields] = useState();
  const [keys, setKeys] = useState<string[]>();
  const [name, setName] = useState('Root');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [args, setArgs] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setCurrentFields(fields);
    if (currentFields) setKeys(Object.keys(currentFields));
    setHistory([{ name: 'Root', args: [], type: '', fields }]);
  }, [fields]);
  function handleFields(key: string, type: string) {
    setName(key);
    setType(type);
    setArgs(currentFields[key]?.args);
    if (currentFields) {
      if (currentFields[key]?.type?.ofType?.getFields) {
        const newFields = currentFields[key].type.ofType.getFields();
        setCurrentFields(newFields);
        setKeys(Object.keys(currentFields[key].type.ofType.getFields()));
        setDescription(currentFields[key]?.type?.ofType?.description);
        setHistory([
          ...history,
          { name: key, type, args: currentFields[key]?.args, fields: newFields },
        ]);
      } else if (currentFields[key]?.type?.getFields) {
        const newFields = currentFields[key].type.getFields();
        setCurrentFields(newFields);
        setKeys(Object.keys(currentFields[key].type.getFields()));
        setDescription(currentFields[key]?.type?.description);
        setHistory([
          ...history,
          { name: key, type, args: currentFields[key]?.args, fields: newFields },
        ]);
      } else {
        setCurrentFields(undefined);
        setKeys([]);
        setDescription(currentFields[key].description);
        setHistory([
          ...history,
          { name: key, type, args: currentFields[key]?.args, fields: undefined },
        ]);
      }
    }
  }

  function handleHistory(key: number) {
    setCurrentFields(history[key].fields);
    setKeys(Object.keys(history[key].fields));
    setName(history[key].name);
    setType(history[key].type);
    setArgs(history[key].args);
    setHistory(history.filter((el, idx) => idx <= key));
  }
  return (
    <div className={style.wrapper}>
      <h3 className={style.title}>Documentations</h3>
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
            <span className={style.name_pointer} onClick={() => handleHistory(history.length - 2)}>&lArr;</span>
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
                  <span className={style.argType}>{el.type.name}</span>
                </div>
              );
            })}
          </div>
        )}
        {keys && currentFields && (
          <div className={style.fields}>
            <h4>Fields:</h4>
            {keys.map((el: string, idx: number) => {
              const fieldType = currentFields[el].type?.name
                ? currentFields[el].type.name
                : currentFields[el].type.ofType.name;
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
