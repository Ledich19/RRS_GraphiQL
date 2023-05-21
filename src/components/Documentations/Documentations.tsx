import React, { useState } from 'react';
import { GraphQLFieldMap } from 'graphql';
import style from './Documentations.module.scss';

interface IProps {
  fields: GraphQLFieldMap<never, never> | undefined;
}

const Documentations: React.FC<IProps> = ({ fields }) => {
  let keys: string[] = [];
  if (fields) keys = Object.keys(fields);
  console.log(fields);
  function handleFields(key: string) {
    console.log(fields[key].type.getFields());
  }
  return (
    <div className={style.wrapper}>
      <h3 className={style.title}>Documentations</h3>
      <div className={style.out}>
        {keys.length &&
          fields &&
          keys.map((el: string, idx: number) => {
            // eslint-disable-next-line react/no-array-index-key
            return (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                onClick={() => handleFields(fields[el].name)}
              >{`${el}: ${fields[el].type.name}`}</div>
            );
          })}
      </div>
    </div>
  );
};

export default Documentations;
