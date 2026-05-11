// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.workers.create',
    fullyQualifiedName: 'workers.create',
    httpMethod: 'post',
    httpPath: '/api/workers',
  },
  {
    clientCallName: 'client.workers.retrieve',
    fullyQualifiedName: 'workers.retrieve',
    httpMethod: 'get',
    httpPath: '/api/workers/{workerId}',
  },
  {
    clientCallName: 'client.workers.update',
    fullyQualifiedName: 'workers.update',
    httpMethod: 'patch',
    httpPath: '/api/workers/{workerId}',
  },
  {
    clientCallName: 'client.workers.delete',
    fullyQualifiedName: 'workers.delete',
    httpMethod: 'delete',
    httpPath: '/api/workers/{workerId}',
  },
  {
    clientCallName: 'client.workers.retrieveEmail',
    fullyQualifiedName: 'workers.retrieveEmail',
    httpMethod: 'get',
    httpPath: '/api/workers/{workerId}/email',
  },
  {
    clientCallName: 'client.workers.schedules.create',
    fullyQualifiedName: 'workers.schedules.create',
    httpMethod: 'post',
    httpPath: '/api/workers/{workerId}/schedules',
  },
  {
    clientCallName: 'client.workers.schedules.list',
    fullyQualifiedName: 'workers.schedules.list',
    httpMethod: 'get',
    httpPath: '/api/workers/{workerId}/schedules',
  },
  {
    clientCallName: 'client.workers.schedules.cancel',
    fullyQualifiedName: 'workers.schedules.cancel',
    httpMethod: 'delete',
    httpPath: '/api/workers/{workerId}/schedules/{scheduleId}',
  },
  {
    clientCallName: 'client.workers.webhooks.retrieve',
    fullyQualifiedName: 'workers.webhooks.retrieve',
    httpMethod: 'get',
    httpPath: '/api/workers/{workerId}/webhook',
  },
  {
    clientCallName: 'client.workers.webhooks.update',
    fullyQualifiedName: 'workers.webhooks.update',
    httpMethod: 'put',
    httpPath: '/api/workers/{workerId}/webhook',
  },
  {
    clientCallName: 'client.workers.webhooks.delete',
    fullyQualifiedName: 'workers.webhooks.delete',
    httpMethod: 'delete',
    httpPath: '/api/workers/{workerId}/webhook',
  },
  {
    clientCallName: 'client.workers.webhooks.listExecutions',
    fullyQualifiedName: 'workers.webhooks.listExecutions',
    httpMethod: 'get',
    httpPath: '/api/workers/{workerId}/webhook/executions',
  },
  {
    clientCallName: 'client.workers.webhooks.regenerateToken',
    fullyQualifiedName: 'workers.webhooks.regenerateToken',
    httpMethod: 'post',
    httpPath: '/api/workers/{workerId}/webhook/regenerate-token',
  },
  {
    clientCallName: 'client.tasks.create',
    fullyQualifiedName: 'tasks.create',
    httpMethod: 'post',
    httpPath: '/api/tasks',
  },
  {
    clientCallName: 'client.tasks.retrieve',
    fullyQualifiedName: 'tasks.retrieve',
    httpMethod: 'get',
    httpPath: '/api/tasks/{taskId}',
  },
  {
    clientCallName: 'client.tasks.delete',
    fullyQualifiedName: 'tasks.delete',
    httpMethod: 'delete',
    httpPath: '/api/tasks/{taskId}',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
