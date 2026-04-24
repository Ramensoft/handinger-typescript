// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Handinger from '@ramensoft/handinger';

const client = new Handinger({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource workers', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.workers.create({ input: "What's the weather today in Barcelona?" });
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
      input: "What's the weather today in Barcelona?",
      budget: 'low',
      stream: true,
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
  test.skip('continue: only required params', async () => {
    const responsePromise = client.workers.continue('t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM', {
      input: "What's the weather today in Barcelona?",
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
  test.skip('continue: required and optional params', async () => {
    const response = await client.workers.continue('t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM', {
      input: "What's the weather today in Barcelona?",
      budget: 'low',
      stream: true,
    });
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

  // Mock server tests are disabled
  test.skip('retrieveFile: required and optional params', async () => {
    const response = await client.workers.retrieveFile('scratchpad/plan.md', {
      workerId: 't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM',
    });
  });
});
