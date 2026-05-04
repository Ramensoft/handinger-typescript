// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Handinger from '@ramensoft/handinger';

const client = new Handinger({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tasks', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.tasks.create({
      title: 'Brand voice analyzer',
      workerId: 't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.tasks.create({
      title: 'Brand voice analyzer',
      workerId: 't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM',
      instructions: 'instructions',
      visibility: 'public',
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.tasks.retrieve('tsk_01HZY31W2SZJ8MJ2FQTR3M1K9D');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
