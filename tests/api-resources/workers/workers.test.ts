// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Handinger from '@ramensoft/handinger';

const client = new Handinger({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource workers', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.workers.create({ title: 'Brand voice analyzer' });
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
    const response = await client.workers.create({
      title: 'Brand voice analyzer',
      instructions: 'instructions',
      prompt: 'prompt',
      visibility: 'public',
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.workers.retrieve('t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.workers.retrieve(
        't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM',
        { stream: 'true' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Handinger.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('retrieveEmail', async () => {
    const responsePromise = client.workers.retrieveEmail('t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
