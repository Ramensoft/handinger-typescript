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
import * as WebhooksAPI from './webhooks';
import {
  UpdateWebhook,
  Webhook,
  WebhookExecution,
  WebhookExecutionList,
  WebhookListExecutionsParams,
  WebhookUpdateParams,
  Webhooks,
} from './webhooks';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Create, retrieve, and manage agent worker templates.
 */
export class Workers extends APIResource {
  schedules: SchedulesAPI.Schedules = new SchedulesAPI.Schedules(this._client);
  webhooks: WebhooksAPI.Webhooks = new WebhooksAPI.Webhooks(this._client);

  /**
   * Create a new worker. The worker is a reusable agent template; tasks are runs
   * against this template. Use `POST /tasks` to actually run the agent.
   *
   * @example
   * ```ts
   * const workerTemplate = await client.workers.create();
   * ```
   */
  create(body: WorkerCreateParams, options?: RequestOptions): APIPromise<WorkerTemplate> {
    return this._client.post('/api/workers', { body, ...options });
  }

  /**
   * Retrieve the current worker state and messages from its most recent task.
   * Returns a JSON worker object by default, or a server-sent event stream when
   * `stream=true`.
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
   * Update a worker's instructions, title, summary, visibility, or output schema.
   * Only the fields you send are changed; omitted fields keep their current values.
   * Only the worker creator can update a worker.
   *
   * @example
   * ```ts
   * const workerTemplate = await client.workers.update(
   *   't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM',
   * );
   * ```
   */
  update(workerID: string, body: WorkerUpdateParams, options?: RequestOptions): APIPromise<WorkerTemplate> {
    return this._client.patch(path`/api/workers/${workerID}`, { body, ...options });
  }

  /**
   * Soft-delete a worker template so it no longer appears in list or retrieve
   * endpoints. Tasks, turns, files, schedules, and integrations remain in the
   * database for analytics. Only the worker creator can delete a worker.
   *
   * @example
   * ```ts
   * const deleteWorkerResponse = await client.workers.delete(
   *   't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM',
   * );
   * ```
   */
  delete(workerID: string, options?: RequestOptions): APIPromise<DeleteWorkerResponse> {
    return this._client.delete(path`/api/workers/${workerID}`, options);
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
  retrieveEmail(workerID: string, options?: RequestOptions): APIPromise<WorkerRetrieveEmailResponse> {
    return this._client.get(path`/api/workers/${workerID}/email`, options);
  }
}

export interface CreateWorker {
  /**
   * Persistent system prompt the worker uses for every task it runs.
   */
  instructions?: string;

  /**
   * Optional JSON Schema (Draft-07) describing the structured object the worker must
   * produce. When set, every task response is validated against the schema and
   * exposed as `structuredOutput`.
   */
  outputSchema?: { [key: string]: unknown };

  /**
   * Natural-language description of the worker to use for AI-generated instructions
   * when `instructions` is omitted.
   */
  prompt?: string;

  /**
   * Short one-line description of the worker's purpose. Auto-generated when omitted
   * and a `prompt` is provided.
   */
  summary?: string;

  /**
   * Optional display name. When omitted, Handinger assigns a random dog-themed name.
   */
  title?: string;

  /**
   * `public` (default) is visible to all org members. `private` is only visible to
   * invited members.
   */
  visibility?: 'public' | 'private';
}

export interface DeleteWorkerResponse {
  deleted: boolean;
}

export interface UpdateWorker {
  /**
   * Replaces the persistent system prompt. Subsequent tasks pick up the new
   * instructions immediately; in-flight tasks keep using the previous version.
   */
  instructions?: string;

  /**
   * Replace the worker's structured output schema. Pass `null` to clear it and
   * return to free-form text responses.
   */
  outputSchema?: { [key: string]: unknown } | null;

  /**
   * Replaces the worker's short one-line summary.
   */
  summary?: string;

  /**
   * New display name for the worker.
   */
  title?: string;

  /**
   * Change visibility between `public` (any org member can run tasks) and `private`
   * (only invited members).
   */
  visibility?: 'public' | 'private';
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

  structured_output: { [key: string]: unknown } | null;

  /**
   * Web URL of the worker in the Handinger dashboard.
   */
  url: string;

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

export interface WorkerTemplate {
  id: string;

  createdAt: string | null;

  instructions: string;

  organizationId: string;

  outputSchema: { [key: string]: unknown } | null;

  summary: string;

  title: string;

  updatedAt: string | null;

  /**
   * Web URL of the worker in the Handinger dashboard.
   */
  url: string;

  userId: string;

  visibility: 'public' | 'private';
}

export interface WorkerRetrieveEmailResponse {
  email: string;
}

export interface WorkerCreateParams {
  /**
   * Persistent system prompt the worker uses for every task it runs.
   */
  instructions?: string;

  /**
   * Optional JSON Schema (Draft-07) describing the structured object the worker must
   * produce. When set, every task response is validated against the schema and
   * exposed as `structuredOutput`.
   */
  outputSchema?: { [key: string]: unknown };

  /**
   * Natural-language description of the worker to use for AI-generated instructions
   * when `instructions` is omitted.
   */
  prompt?: string;

  /**
   * Short one-line description of the worker's purpose. Auto-generated when omitted
   * and a `prompt` is provided.
   */
  summary?: string;

  /**
   * Optional display name. When omitted, Handinger assigns a random dog-themed name.
   */
  title?: string;

  /**
   * `public` (default) is visible to all org members. `private` is only visible to
   * invited members.
   */
  visibility?: 'public' | 'private';
}

export interface WorkerRetrieveParams {
  /**
   * Set to "true" to receive a server-sent event stream that replays all stored
   * messages and then continues with live chunks from the active task (if any)
   * before closing.
   */
  stream?: 'true' | 'false';
}

export interface WorkerUpdateParams {
  /**
   * Replaces the persistent system prompt. Subsequent tasks pick up the new
   * instructions immediately; in-flight tasks keep using the previous version.
   */
  instructions?: string;

  /**
   * Replace the worker's structured output schema. Pass `null` to clear it and
   * return to free-form text responses.
   */
  outputSchema?: { [key: string]: unknown } | null;

  /**
   * Replaces the worker's short one-line summary.
   */
  summary?: string;

  /**
   * New display name for the worker.
   */
  title?: string;

  /**
   * Change visibility between `public` (any org member can run tasks) and `private`
   * (only invited members).
   */
  visibility?: 'public' | 'private';
}

Workers.Schedules = Schedules;
Workers.Webhooks = Webhooks;

export declare namespace Workers {
  export {
    type CreateWorker as CreateWorker,
    type DeleteWorkerResponse as DeleteWorkerResponse,
    type UpdateWorker as UpdateWorker,
    type Worker as Worker,
    type WorkerTemplate as WorkerTemplate,
    type WorkerRetrieveEmailResponse as WorkerRetrieveEmailResponse,
    type WorkerCreateParams as WorkerCreateParams,
    type WorkerRetrieveParams as WorkerRetrieveParams,
    type WorkerUpdateParams as WorkerUpdateParams,
  };

  export {
    Schedules as Schedules,
    type WorkerSchedule as WorkerSchedule,
    type ScheduleListResponse as ScheduleListResponse,
    type ScheduleCancelResponse as ScheduleCancelResponse,
    type ScheduleCreateParams as ScheduleCreateParams,
    type ScheduleCancelParams as ScheduleCancelParams,
  };

  export {
    Webhooks as Webhooks,
    type UpdateWebhook as UpdateWebhook,
    type Webhook as Webhook,
    type WebhookExecution as WebhookExecution,
    type WebhookExecutionList as WebhookExecutionList,
    type WebhookUpdateParams as WebhookUpdateParams,
    type WebhookListExecutionsParams as WebhookListExecutionsParams,
  };
}
