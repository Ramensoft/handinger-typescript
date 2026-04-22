// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Manage future and recurring worker tasks.
 */
export class Schedules extends APIResource {
  /**
   * Schedule a worker instruction for a future or recurring run.
   */
  create(workerID: string, body: ScheduleCreateParams, options?: RequestOptions): APIPromise<WorkerSchedule> {
    return this._client.post(path`/api/workers/${workerID}/schedules`, { body, ...options });
  }

  /**
   * List scheduled tasks for a worker.
   */
  list(workerID: string, options?: RequestOptions): APIPromise<ScheduleListResponse> {
    return this._client.get(path`/api/workers/${workerID}/schedules`, options);
  }

  /**
   * Cancel a scheduled task for a worker.
   */
  cancel(
    scheduleID: string,
    params: ScheduleCancelParams,
    options?: RequestOptions,
  ): APIPromise<ScheduleCancelResponse> {
    const { workerId } = params;
    return this._client.delete(path`/api/workers/${workerId}/schedules/${scheduleID}`, options);
  }
}

export type WorkerSchedule =
  | WorkerSchedule.UnionMember0
  | WorkerSchedule.UnionMember1
  | WorkerSchedule.UnionMember2
  | WorkerSchedule.UnionMember3;

export namespace WorkerSchedule {
  export interface UnionMember0 {
    id: string;

    budget: 'low' | 'standard' | 'high' | 'unlimited';

    input: string;

    nextRunAt: string;

    type: 'scheduled';
  }

  export interface UnionMember1 {
    id: string;

    budget: 'low' | 'standard' | 'high' | 'unlimited';

    delayInSeconds: number;

    input: string;

    nextRunAt: string;

    type: 'delayed';
  }

  export interface UnionMember2 {
    id: string;

    budget: 'low' | 'standard' | 'high' | 'unlimited';

    cron: string;

    input: string;

    nextRunAt: string;

    type: 'cron';
  }

  export interface UnionMember3 {
    id: string;

    budget: 'low' | 'standard' | 'high' | 'unlimited';

    input: string;

    intervalSeconds: number;

    nextRunAt: string;

    type: 'interval';
  }
}

export interface ScheduleListResponse {
  schedules: Array<WorkerSchedule>;

  workerId: string;
}

export interface ScheduleCancelResponse {
  cancelled: boolean;
}

export interface ScheduleCreateParams {
  input: string;

  when:
    | ScheduleCreateParams.UnionMember0
    | ScheduleCreateParams.UnionMember1
    | ScheduleCreateParams.UnionMember2
    | ScheduleCreateParams.UnionMember3;

  budget?: 'low' | 'standard' | 'high' | 'unlimited';
}

export namespace ScheduleCreateParams {
  export interface UnionMember0 {
    date: string;

    type: 'scheduled';
  }

  export interface UnionMember1 {
    delayInSeconds: number;

    type: 'delayed';
  }

  export interface UnionMember2 {
    cron: string;

    type: 'cron';
  }

  export interface UnionMember3 {
    intervalSeconds: number;

    type: 'interval';
  }
}

export interface ScheduleCancelParams {
  /**
   * Worker id returned by the create worker endpoint.
   */
  workerId: string;
}

export declare namespace Schedules {
  export {
    type WorkerSchedule as WorkerSchedule,
    type ScheduleListResponse as ScheduleListResponse,
    type ScheduleCancelResponse as ScheduleCancelResponse,
    type ScheduleCreateParams as ScheduleCreateParams,
    type ScheduleCancelParams as ScheduleCancelParams,
  };
}
