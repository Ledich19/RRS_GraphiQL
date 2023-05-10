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

// eslint-disable-next-line import/prefer-default-export
export { getData };
