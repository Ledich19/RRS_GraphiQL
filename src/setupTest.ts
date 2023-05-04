/* eslint-disable import/no-extraneous-dependencies */
import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
// import { server } from './src/mocks/server';
// beforeAll(() =>
//   server.listen({
//     onUnhandledRequest: 'error',
//   })
// );
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());
expect.extend(matchers);
