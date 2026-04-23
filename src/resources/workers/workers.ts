// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SchedulesAPI from './schedules';
import {
  ScheduleCancelParams,
  ScheduleCancelResponse,
  ScheduleCreateParams,
  ScheduleListResponse,
  Schedules,
  WorkerSchedule,
} from './schedules';
import { APIPromise } from '../../core/api-promise';
import { Stream } from '../../core/streaming';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Workers extends APIResource {
  schedules: SchedulesAPI.Schedules = new SchedulesAPI.Schedules(this._client);

  /**
   * Create a new agent worker and start it with the supplied instruction.
   *
   * @example
   * ```ts
   * const worker = await client.workers.create({
   *   input: "What's the weather today in Barcelona?",
   * });
   * ```
   */
  create(body: WorkerCreateParams, options?: RequestOptions): APIPromise<Worker> {
    return this._client.post('/api/workers', { body, ...options });
  }

  /**
   * Retrieve the current worker state. Pass stream=true or request text/event-stream
   * to subscribe to updates.
   *
   * @example
   * ```ts
   * const worker = await client.workers.retrieve(
   *   't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM',
   * );
   * ```
   */
  retrieve(
    workerID: string,
    query: WorkerRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Worker> {
    return this._client.get(path`/api/workers/${workerID}`, { query, ...options });
  }

  /**
   * Send another instruction to an existing worker.
   *
   * @example
   * ```ts
   * const worker = await client.workers.continue(
   *   't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM',
   *   { input: "What's the weather today in Barcelona?" },
   * );
   * ```
   */
  continue(workerID: string, body: WorkerContinueParams, options?: RequestOptions): APIPromise<Worker> {
    return this._client.post(path`/api/workers/${workerID}`, { body, ...options });
  }

  /**
   * Retrieve the inbound email address for a worker.
   *
   * @example
   * ```ts
   * const response = await client.workers.retrieveEmail(
   *   't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM',
   * );
   * ```
   */
  retrieveEmail(workerID: string, options?: RequestOptions): APIPromise<string> {
    return this._client.get(path`/api/workers/${workerID}/email`, options);
  }

  /**
   * Retrieve a file published from a worker workspace. The runtime route accepts
   * nested paths after /files/.
   *
   * @example
   * ```ts
   * const response = await client.workers.retrieveFile(
   *   'scratchpad/plan.md',
   *   { workerId: 't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM' },
   * );
   *
   * const content = await response.blob();
   * console.log(content);
   * ```
   */
  retrieveFile(
    filePath: string,
    params: WorkerRetrieveFileParams,
    options?: RequestOptions,
  ): APIPromise<Response> {
    const { workerId } = params;
    return this._client.get(path`/api/workers/${workerId}/files/${filePath}`, {
      ...options,
      headers: buildHeaders([{ Accept: 'application/octet-stream' }, options?.headers]),
      __binaryResponse: true,
    });
  }

  /**
   * Subscribe to a worker using server-sent events.
   *
   * @example
   * ```ts
   * const response = await client.workers.streamUpdates(
   *   't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM',
   * );
   * ```
   */
  streamUpdates(workerID: string, options?: RequestOptions): APIPromise<Stream<WorkerStreamUpdatesResponse>> {
    return this._client.get(path`/api/workers/${workerID}/stream`, {
      ...options,
      headers: buildHeaders([{ Accept: 'text/event-stream' }, options?.headers]),
      stream: true,
    }) as APIPromise<Stream<WorkerStreamUpdatesResponse>>;
  }
}

export interface CreateWorker {
  input: string;

  budget?: 'low' | 'standard' | 'high' | 'unlimited';

  stream?: boolean;
}

export interface Worker {
  id: string;

  created_at: number | null;

  error: null;

  files: Array<Worker.File>;

  incomplete_details: null;

  messages: Array<unknown>;

  metadata: { [key: string]: unknown };

  object: 'worker';

  output: Array<Worker.Output>;

  output_text: string;

  running: boolean;

  sources: Array<Worker.Source>;

  status: 'running' | 'completed' | 'pending';

  costs?: Worker.Costs | null;

  usage?: Worker.Usage;
}

export namespace Worker {
  export interface File {
    filename: string | null;

    mediaType: string;

    url: string;
  }

  export interface Output {
    id: string;

    content: Array<Output.Content>;

    role: 'assistant';

    status: 'completed';

    type: 'message';
  }

  export namespace Output {
    export interface Content {
      text: string;

      type: 'output_text';
    }
  }

  export interface Source {
    id: string;

    title: string | null;

    type: 'url';

    url: string;
  }

  export interface Costs {
    internalCostUsd: number;

    modelCostUsd: number;

    sandboxCostUsd: number;

    toolCostUsd: number;
  }

  export interface Usage {
    cacheReadTokens: number;

    cacheWriteTokens: number;

    costUsd: number;

    inputTokens: number;

    outputTokens: number;

    reasoningTokens: number;

    steps: number;

    totalTokens: number;

    credits?: number;
  }
}

export type WorkerRetrieveEmailResponse = string;

export type WorkerStreamUpdatesResponse = string;

export interface WorkerCreateParams {
  input: string;

  budget?: 'low' | 'standard' | 'high' | 'unlimited';

  stream?: boolean;
}

export interface WorkerRetrieveParams {
  /**
   * Return a server-sent event stream instead of JSON.
   */
  stream?: boolean;
}

export interface WorkerContinueParams {
  input: string;

  budget?: 'low' | 'standard' | 'high' | 'unlimited';

  stream?: boolean;
}

export interface WorkerRetrieveFileParams {
  /**
   * Worker id returned by the create worker endpoint.
   */
  workerId: string;
}

Workers.Schedules = Schedules;

export declare namespace Workers {
  export {
    type CreateWorker as CreateWorker,
    type Worker as Worker,
    type WorkerRetrieveEmailResponse as WorkerRetrieveEmailResponse,
    type WorkerStreamUpdatesResponse as WorkerStreamUpdatesResponse,
    type WorkerCreateParams as WorkerCreateParams,
    type WorkerRetrieveParams as WorkerRetrieveParams,
    type WorkerContinueParams as WorkerContinueParams,
    type WorkerRetrieveFileParams as WorkerRetrieveFileParams,
  };

  export {
    Schedules as Schedules,
    type WorkerSchedule as WorkerSchedule,
    type ScheduleListResponse as ScheduleListResponse,
    type ScheduleCancelResponse as ScheduleCancelResponse,
    type ScheduleCreateParams as ScheduleCreateParams,
    type ScheduleCancelParams as ScheduleCancelParams,
  };
}
