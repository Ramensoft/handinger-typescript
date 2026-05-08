// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as WorkersAPI from './workers/workers';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { maybeMultipartFormRequestOptions } from '../internal/uploads';
import { path } from '../internal/utils/path';

/**
 * Run and inspect tasks against a worker.
 */
export class Tasks extends APIResource {
  /**
   * Run a new task against an existing worker. Send `multipart/form-data` to attach
   * files; the bytes are bootstrapped into the worker's workspace before the task
   * starts.
   *
   * @example
   * ```ts
   * const worker = await client.tasks.create({
   *   workerId: 't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM',
   * });
   * ```
   */
  create(body: TaskCreateParams, options?: RequestOptions): APIPromise<WorkersAPI.Worker> {
    return this._client.post(
      '/api/tasks',
      maybeMultipartFormRequestOptions({ body, ...options }, this._client),
    );
  }

  /**
   * Retrieve a single task and its individual turns.
   *
   * @example
   * ```ts
   * const taskWithTurns = await client.tasks.retrieve(
   *   'tsk_01HZY31W2SZJ8MJ2FQTR3M1K9D',
   * );
   * ```
   */
  retrieve(taskID: string, options?: RequestOptions): APIPromise<TaskWithTurns> {
    return this._client.get(path`/api/tasks/${taskID}`, options);
  }
}

export interface CreateTask extends WorkersAPI.CreateWorker {
  /**
   * Worker id the task belongs to.
   */
  workerId: string;
}

export interface Task {
  id: string;

  completedAt: string | null;

  createdAt: string;

  createdByUserId: string | null;

  organizationId: string;

  status: 'pending' | 'running' | 'completed' | 'error' | 'aborted';

  title: string;

  totals: Task.Totals;

  triggeredBy: 'api' | 'email' | 'schedule' | 'ui';

  workerId: string;
}

export namespace Task {
  export interface Totals {
    credits: number;

    durationMs: number;

    turnCount: number;
  }
}

export interface TaskWithTurns {
  task: Task;

  turns: Array<TaskWithTurns.Turn>;
}

export namespace TaskWithTurns {
  export interface Turn {
    id: string;

    completedAt: string | null;

    credits: number;

    durationMs: number;

    input: string;

    inputTokens: number;

    outputText: string;

    outputTokens: number;

    role: string;

    seq: number;

    startedAt: string;

    status: string;

    structuredOutput: { [key: string]: unknown } | null;

    taskId: string;
  }
}

export interface TaskCreateParams {
  /**
   * Worker id the task belongs to.
   */
  workerId: string;

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
   * Optional display name. When omitted, Handinger assigns a random dog-themed name.
   */
  title?: string;

  /**
   * `public` (default) is visible to all org members. `private` is only visible to
   * invited members.
   */
  visibility?: 'public' | 'private';
}

export declare namespace Tasks {
  export {
    type CreateTask as CreateTask,
    type Task as Task,
    type TaskWithTurns as TaskWithTurns,
    type TaskCreateParams as TaskCreateParams,
  };
}
