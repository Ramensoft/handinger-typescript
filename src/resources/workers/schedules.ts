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
  | WorkerSchedule.ScheduledWorkerSchedule
  | WorkerSchedule.DelayedWorkerSchedule
  | WorkerSchedule.CronWorkerSchedule
  | WorkerSchedule.IntervalWorkerSchedule;

export namespace WorkerSchedule {
  export interface ScheduledWorkerSchedule {
    id: string;

    budget: 'low' | 'standard' | 'high' | 'unlimited';

    input: string;

    nextRunAt: string;

    type: 'scheduled';
  }

  export interface DelayedWorkerSchedule {
    id: string;

    budget: 'low' | 'standard' | 'high' | 'unlimited';

    delayInSeconds: number;

    input: string;

    nextRunAt: string;

    type: 'delayed';
  }

  export interface CronWorkerSchedule {
    id: string;

    budget: 'low' | 'standard' | 'high' | 'unlimited';

    cron: string;

    input: string;

    nextRunAt: string;

    type: 'cron';
  }

  export interface IntervalWorkerSchedule {
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
    | ScheduleCreateParams.ScheduledWhen
    | ScheduleCreateParams.DelayedWhen
    | ScheduleCreateParams.CronWhen
    | ScheduleCreateParams.IntervalWhen;

  budget?: 'low' | 'standard' | 'high' | 'unlimited';
}

export namespace ScheduleCreateParams {
  export interface ScheduledWhen {
    date: string;

    type: 'scheduled';
  }

  export interface DelayedWhen {
    delayInSeconds: number;

    type: 'delayed';
  }

  export interface CronWhen {
    cron: string;

    type: 'cron';
  }

  export interface IntervalWhen {
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
