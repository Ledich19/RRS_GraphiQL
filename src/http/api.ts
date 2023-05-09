const $host: string = import.meta.env.VITE_API_URL;

async function getData(query: string, variables = '', headers?: string) {
  const response = await fetch($host, {
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
