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
import { RequestOptions } from '../../internal/request-options';
import { maybeMultipartFormRequestOptions } from '../../internal/uploads';
import { path } from '../../internal/utils/path';

/**
 * Create, retrieve, and continue agent workers.
 */
export class Workers extends APIResource {
  schedules: SchedulesAPI.Schedules = new SchedulesAPI.Schedules(this._client);

  /**
   * Create a new agent worker and start it with the supplied instruction. Send
   * `multipart/form-data` to attach files alongside the instruction; the bytes are
   * bootstrapped into the worker's workspace before the first turn.
   *
   * @example
   * ```ts
   * const worker = await client.workers.create({
   *   input: "What's the weather today in Barcelona?",
   * });
   * ```
   */
  create(body: WorkerCreateParams, options?: RequestOptions): APIPromise<Worker> {
    return this._client.post(
      '/api/workers',
      maybeMultipartFormRequestOptions({ body, ...options }, this._client),
    );
  }

  /**
   * Retrieve the current worker state and messages. Returns a JSON worker object by
   * default, or a server-sent event stream when `stream=true`.
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
   * Send another instruction to an existing worker. Send `multipart/form-data` to
   * attach additional files; the bytes are bootstrapped into the worker's workspace
   * before the next turn.
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
    return this._client.post(
      path`/api/workers/${workerID}`,
      maybeMultipartFormRequestOptions({ body, ...options }, this._client),
    );
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

  export interface Usage {
    credits?: number;

    durationMs?: number;
  }
}

export type WorkerRetrieveEmailResponse = string;

export interface WorkerCreateParams {
  input: string;

  budget?: 'low' | 'standard' | 'high' | 'unlimited';

  stream?: boolean;
}

export interface WorkerRetrieveParams {
  /**
   * Set to "true" to receive a server-sent event stream that replays all stored
   * messages and then continues with live chunks from the active turn (if any)
   * before closing.
   */
  stream?: 'true' | 'false';
}

export interface WorkerContinueParams {
  input: string;

  budget?: 'low' | 'standard' | 'high' | 'unlimited';

  stream?: boolean;
}

Workers.Schedules = Schedules;

export declare namespace Workers {
  export {
    type CreateWorker as CreateWorker,
    type Worker as Worker,
    type WorkerRetrieveEmailResponse as WorkerRetrieveEmailResponse,
    type WorkerCreateParams as WorkerCreateParams,
    type WorkerRetrieveParams as WorkerRetrieveParams,
    type WorkerContinueParams as WorkerContinueParams,
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
