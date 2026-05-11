// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Configure outbound webhooks delivered when a worker's tasks complete.
 */
export class Webhooks extends APIResource {
  /**
   * Retrieve the webhook URL and shared token configured for a worker. Both fields
   * are `null` when no webhook is configured. Only the worker creator can read the
   * webhook configuration.
   *
   * @example
   * ```ts
   * const webhook = await client.workers.webhooks.retrieve(
   *   't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM',
   * );
   * ```
   */
  retrieve(workerID: string, options?: RequestOptions): APIPromise<Webhook> {
    return this._client.get(path`/api/workers/${workerID}/webhook`, options);
  }

  /**
   * Set or replace the webhook URL for a worker. A fresh token is generated the
   * first time a URL is set; subsequent updates keep the existing token. Pass
   * `url: null` to clear the webhook (use the dedicated DELETE for the same effect).
   * Only the worker creator can update the webhook.
   *
   * @example
   * ```ts
   * const webhook = await client.workers.webhooks.update(
   *   't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM',
   *   { url: 'https://example.com/handinger-webhook' },
   * );
   * ```
   */
  update(workerID: string, body: WebhookUpdateParams, options?: RequestOptions): APIPromise<Webhook> {
    return this._client.put(path`/api/workers/${workerID}/webhook`, { body, ...options });
  }

  /**
   * Remove the webhook from a worker. Both `url` and `token` are cleared and no
   * further deliveries are attempted. Only the worker creator can delete the
   * webhook.
   *
   * @example
   * ```ts
   * const webhook = await client.workers.webhooks.delete(
   *   't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM',
   * );
   * ```
   */
  delete(workerID: string, options?: RequestOptions): APIPromise<Webhook> {
    return this._client.delete(path`/api/workers/${workerID}/webhook`, options);
  }

  /**
   * List recent webhook delivery attempts for a worker, newest first, paginated 50
   * per page. Only the worker creator can read execution history.
   *
   * @example
   * ```ts
   * const webhookExecutionList =
   *   await client.workers.webhooks.listExecutions(
   *     't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM',
   *   );
   * ```
   */
  listExecutions(
    workerID: string,
    query: WebhookListExecutionsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebhookExecutionList> {
    return this._client.get(path`/api/workers/${workerID}/webhook/executions`, { query, ...options });
  }

  /**
   * Issue a new shared token for the webhook, invalidating the previous one. The
   * webhook URL is preserved. Only the worker creator can regenerate the token.
   *
   * @example
   * ```ts
   * const webhook =
   *   await client.workers.webhooks.regenerateToken(
   *     't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM',
   *   );
   * ```
   */
  regenerateToken(workerID: string, options?: RequestOptions): APIPromise<Webhook> {
    return this._client.post(path`/api/workers/${workerID}/webhook/regenerate-token`, options);
  }
}

export interface UpdateWebhook {
  /**
   * HTTPS endpoint Handinger should POST to when a task finishes. Pass `null` to
   * remove the webhook and clear its token.
   */
  url: string | null;
}

export interface Webhook {
  /**
   * Shared secret sent in the `X-Handinger-Token` header on each delivery. `null`
   * when no webhook is configured.
   */
  token: string | null;

  /**
   * HTTPS endpoint that receives webhook deliveries when a task completes. `null`
   * when no webhook is configured.
   */
  url: string | null;
}

export interface WebhookExecution {
  id: string;

  createdAt: string;

  /**
   * Wall-clock time spent on the delivery attempt.
   */
  durationMs: number;

  /**
   * Failure reason when `requestStatus` is `error`.
   */
  errorMessage: string | null;

  /**
   * `success` when the endpoint returned a 2xx response, `error` otherwise.
   */
  requestStatus: 'success' | 'error';

  /**
   * HTTP status returned by the endpoint, when reachable.
   */
  responseStatus: number | null;

  /**
   * Task that triggered the delivery, when available.
   */
  taskId: string | null;

  /**
   * Title of the originating task, when available.
   */
  taskTitle: string | null;

  /**
   * Endpoint Handinger attempted to deliver to.
   */
  url: string;

  workerId: string;
}

export interface WebhookExecutionList {
  logs: Array<WebhookExecution>;

  /**
   * Current page number.
   */
  page: number;

  /**
   * Total number of pages available.
   */
  pageCount: number;

  /**
   * Total number of executions recorded.
   */
  totalCount: number;
}

export interface WebhookUpdateParams {
  /**
   * HTTPS endpoint Handinger should POST to when a task finishes. Pass `null` to
   * remove the webhook and clear its token.
   */
  url: string | null;
}

export interface WebhookListExecutionsParams {
  /**
   * Page number (1-indexed). Defaults to 1.
   */
  page?: number;
}

export declare namespace Webhooks {
  export {
    type UpdateWebhook as UpdateWebhook,
    type Webhook as Webhook,
    type WebhookExecution as WebhookExecution,
    type WebhookExecutionList as WebhookExecutionList,
    type WebhookUpdateParams as WebhookUpdateParams,
    type WebhookListExecutionsParams as WebhookListExecutionsParams,
  };
}
