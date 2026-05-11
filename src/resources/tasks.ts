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
   * Run a new task against an existing worker. Send a `taskId` of a prior task to
   * add a follow-up turn instead of starting a fresh task. Send
   * `multipart/form-data` to attach files; the bytes are bootstrapped into the
   * worker's workspace before the task starts.
   *
   * @example
   * ```ts
   * const worker = await client.tasks.create({
   *   input: "What's the weather today in Barcelona?",
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

  /**
   * Archive a task so it stops appearing in `GET /tasks` results. Turns and files
   * are retained for audit purposes. Only the worker creator can archive a task.
   *
   * @example
   * ```ts
   * const deleteTaskResponse = await client.tasks.delete(
   *   'tsk_01HZY31W2SZJ8MJ2FQTR3M1K9D',
   * );
   * ```
   */
  delete(taskID: string, options?: RequestOptions): APIPromise<DeleteTaskResponse> {
    return this._client.delete(path`/api/tasks/${taskID}`, options);
  }
}

export interface CreateTask {
  input: string;

  budget?: 'low' | 'standard' | 'high' | 'unlimited';

  stream?: boolean;

  /**
   * Optional client-provided task id. Reuse this id to add turns to an existing
   * task.
   */
  taskId?: string;

  /**
   * Worker id the task belongs to. If omitted, a new worker is created on-the-fly
   * using the input as instructions.
   */
  workerId?: string;
}

export interface DeleteTaskResponse {
  archived: boolean;
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

  /**
   * Web URL of the task in the Handinger dashboard.
   */
  url: string;

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
  input: string;

  budget?: 'low' | 'standard' | 'high' | 'unlimited';

  stream?: boolean;

  /**
   * Optional client-provided task id. Reuse this id to add turns to an existing
   * task.
   */
  taskId?: string;

  /**
   * Worker id the task belongs to. If omitted, a new worker is created on-the-fly
   * using the input as instructions.
   */
  workerId?: string;
}

export declare namespace Tasks {
  export {
    type CreateTask as CreateTask,
    type DeleteTaskResponse as DeleteTaskResponse,
    type Task as Task,
    type TaskWithTurns as TaskWithTurns,
    type TaskCreateParams as TaskCreateParams,
  };
}
