async function getData(query: string, variables = '', headers?: string) {
  const response = await fetch('https://swapi-graphql.netlify.app/.netlify/functions/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: variables ? JSON.parse(variables) : {},
    }),
  });
  return response.json();
}

// eslint-disable-next-line import/prefer-default-export
export { getData };
