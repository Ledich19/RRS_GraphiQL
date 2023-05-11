import { buildClientSchema, getIntrospectionQuery, printSchema } from 'graphql';

const $host: string = import.meta.env.VITE_API_URL;

async function getData(query: string, variables = '', headersInput?: string) {
  let headers = { 'Content-Type': 'application/json' };
  if (headersInput) {
    try {
      headers = { ...headers, ...JSON.parse(headersInput) };
    } catch (e) {
      throw new Error('Wrong headers syntax');
    }
  }
  const response = await fetch($host, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  return response.json();
}

async function getSchema() {
  const response = await fetch($host, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  });
  const graphqlSchemaObj = buildClientSchema((await response.json()).data);
  console.log(graphqlSchemaObj);
  const sdlString = printSchema(graphqlSchemaObj);
  console.log(sdlString);
}

// eslint-disable-next-line import/prefer-default-export
export { getData, getSchema };
