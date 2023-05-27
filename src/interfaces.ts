import { GraphQLArgument, GraphQLOutputType } from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

type NewGraphQLOutputType = GraphQLOutputType & {
  description?: Maybe<string>;
  getFields?: () => IField | undefined;
  name?: string;
};

export interface IField {
  readonly [key: string]: IDocumentation;
}

export interface IDocumentation {
  name: string;
  readonly args: readonly GraphQLArgument[];
  description: Maybe<string>;
  type?: {
    description?: Maybe<string>;
    getFields?: () => IField | undefined;
    name?: string;
    ofType?: NewGraphQLOutputType;
  };
}

export interface IHistory {
  name: string;
  type: string;
  args: readonly GraphQLArgument[];
  fields: IField | undefined;
}
