// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Handinger from '@ramensoft/handinger';

const client = new Handinger({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tasks', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.tasks.create({ workerId: 'wrk_vk81XUHKHG-qr4' });
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
      workerId: 'wrk_vk81XUHKHG-qr4',
      instructions: 'instructions',
      outputSchema: { foo: 'bar' },
      prompt: 'prompt',
      summary: 'summary',
      taskId: 'tsk_2Z-YWz3hFq6VlW',
      title: 'Brand voice analyzer',
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
