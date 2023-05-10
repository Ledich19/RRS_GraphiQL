import {
  DirectiveLocation,
  GraphQLBoolean,
  GraphQLDeprecatedDirective,
  GraphQLDirective,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLID,
  GraphQLIncludeDirective,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLSkipDirective,
  GraphQLString,
  GraphQLUnionType,
} from 'graphql';

export const Film: GraphQLObjectType = new GraphQLObjectType({
  name: 'Film',
  fields: () => ({
    /*     characterConnection(
      after: string,
      before: string,
      first: number,
      last: number
    ): FilmCharactersConnection; */
    created: {
      type: GraphQLString,
    },
    director: {
      type: GraphQLString,
    },
    edited: {
      type: GraphQLString,
    },
    episodeID: {
      type: GraphQLID,
    },
    id: {
      type: GraphQLID,
    },
    openingCrawl: {
      type: GraphQLString,
    },
    /*     planetConnection(
      after: string,
      before: string,
      first: number,
      last: number
    ): FilmPlanetsConnection; */
    producers: {
      type: new GraphQLList(GraphQLString),
    },
    releaseDate: {
      type: GraphQLString,
    },
    /*     speciesConnection(
      after: string,
      before: string,
      first: number,
      last: number
    ): FilmSpeciesConnection; */
    /*     starshipConnection(
      after: string,
      before: string,
      first: number,
      last: number
    ): FilmStarshipsConnection; */
    title: {
      type: GraphQLString,
    },
    /*     vehicleConnection(
      after: string,
      before: string,
      first: number,
      last: number
    ): FilmVehiclesConnection; */
  }),
});

export const Query: GraphQLObjectType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    film: {
      type: Film,
    },
  }),
});

export const Schema = new GraphQLSchema({
  query: Query,
});
