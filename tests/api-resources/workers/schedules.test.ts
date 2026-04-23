// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Handinger from '@ramensoft/handinger';

const client = new Handinger({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource schedules', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.workers.schedules.create('t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM', {
      input: 'x',
      when: { date: '2019-12-27T18:11:19.117Z', type: 'scheduled' },
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
    const response = await client.workers.schedules.create('t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM', {
      input: 'x',
      when: { date: '2019-12-27T18:11:19.117Z', type: 'scheduled' },
      budget: 'low',
    });
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.workers.schedules.list('t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('cancel: only required params', async () => {
    const responsePromise = client.workers.schedules.cancel('sch_01HZY31W2SZJ8MJ2FQTR3M1K9D', {
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
  test.skip('cancel: required and optional params', async () => {
    const response = await client.workers.schedules.cancel('sch_01HZY31W2SZJ8MJ2FQTR3M1K9D', {
      workerId: 't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM',
    });
  });
});
