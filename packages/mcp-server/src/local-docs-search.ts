// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'create',
    endpoint: '/api/workers',
    httpMethod: 'post',
    summary: 'Create a worker template',
    description:
      'Create a new worker. The worker is a reusable agent template; tasks are runs against this template. Use `POST /tasks` to actually run the agent.',
    stainlessPath: '(resource) workers > (method) create',
    qualified: 'client.workers.create',
    params: [
      'instructions?: string;',
      'outputSchema?: object;',
      'prompt?: string;',
      'summary?: string;',
      'title?: string;',
      "visibility?: 'public' | 'private';",
    ],
    response:
      "{ id: string; createdAt: string; instructions: string; organizationId: string; outputSchema: object; summary: string; title: string; updatedAt: string; url: string; userId: string; visibility: 'public' | 'private'; }",
    markdown:
      "## create\n\n`client.workers.create(instructions?: string, outputSchema?: object, prompt?: string, summary?: string, title?: string, visibility?: 'public' | 'private'): { id: string; createdAt: string; instructions: string; organizationId: string; outputSchema: object; summary: string; title: string; updatedAt: string; url: string; userId: string; visibility: 'public' | 'private'; }`\n\n**post** `/api/workers`\n\nCreate a new worker. The worker is a reusable agent template; tasks are runs against this template. Use `POST /tasks` to actually run the agent.\n\n### Parameters\n\n- `instructions?: string`\n  Persistent system prompt the worker uses for every task it runs.\n\n- `outputSchema?: object`\n  Optional JSON Schema (Draft-07) describing the structured object the worker must produce. When set, every task response is validated against the schema and exposed as `structuredOutput`.\n\n- `prompt?: string`\n  Natural-language description of the worker to use for AI-generated instructions when `instructions` is omitted.\n\n- `summary?: string`\n  Short one-line description of the worker's purpose. Auto-generated when omitted and a `prompt` is provided.\n\n- `title?: string`\n  Optional display name. When omitted, Handinger assigns a random dog-themed name.\n\n- `visibility?: 'public' | 'private'`\n  `public` (default) is visible to all org members. `private` is only visible to invited members.\n\n### Returns\n\n- `{ id: string; createdAt: string; instructions: string; organizationId: string; outputSchema: object; summary: string; title: string; updatedAt: string; url: string; userId: string; visibility: 'public' | 'private'; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `instructions: string`\n  - `organizationId: string`\n  - `outputSchema: object`\n  - `summary: string`\n  - `title: string`\n  - `updatedAt: string`\n  - `url: string`\n  - `userId: string`\n  - `visibility: 'public' | 'private'`\n\n### Example\n\n```typescript\nimport Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger();\n\nconst workerTemplate = await client.workers.create();\n\nconsole.log(workerTemplate);\n```",
    perLanguage: {
      typescript: {
        method: 'client.workers.create',
        example:
          "import Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger({\n  apiKey: process.env['HANDINGER_API_KEY'], // This is the default and can be omitted\n});\n\nconst workerTemplate = await client.workers.create();\n\nconsole.log(workerTemplate.id);",
      },
      python: {
        method: 'workers.create',
        example:
          'import os\nfrom handinger import Handinger\n\nclient = Handinger(\n    api_key=os.environ.get("HANDINGER_API_KEY"),  # This is the default and can be omitted\n)\nworker_template = client.workers.create()\nprint(worker_template.id)',
      },
      java: {
        method: 'workers().create',
        example:
          'package com.handinger.api.example;\n\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\nimport com.handinger.api.models.workers.CreateWorker;\nimport com.handinger.api.models.workers.WorkerTemplate;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        HandingerClient client = HandingerOkHttpClient.fromEnv();\n\n        CreateWorker params = CreateWorker.builder().build();\n        WorkerTemplate workerTemplate = client.workers().create(params);\n    }\n}',
      },
      kotlin: {
        method: 'workers().create',
        example:
          'package com.handinger.api.example\n\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\nimport com.handinger.api.models.workers.CreateWorker\nimport com.handinger.api.models.workers.WorkerTemplate\n\nfun main() {\n    val client: HandingerClient = HandingerOkHttpClient.fromEnv()\n\n    val params: CreateWorker = CreateWorker.builder().build()\n    val workerTemplate: WorkerTemplate = client.workers().create(params)\n}',
      },
      go: {
        method: 'client.Workers.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ramensoft/handinger-go"\n\t"github.com/ramensoft/handinger-go/option"\n)\n\nfunc main() {\n\tclient := handinger.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tworkerTemplate, err := client.Workers.New(context.TODO(), handinger.WorkerNewParams{\n\t\tCreateWorker: handinger.CreateWorkerParam{},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", workerTemplate.ID)\n}\n',
      },
      ruby: {
        method: 'workers.create',
        example:
          'require "handinger"\n\nhandinger = Handinger::Client.new(api_key: "My API Key")\n\nworker_template = handinger.workers.create\n\nputs(worker_template)',
      },
      cli: {
        method: 'workers create',
        example: "handinger workers create \\\n  --api-key 'My API Key'",
      },
      php: {
        method: 'workers->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$workerTemplate = $client->workers->create(\n  instructions: 'instructions',\n  outputSchema: ['foo' => 'bar'],\n  prompt: 'prompt',\n  summary: 'summary',\n  title: 'Brand voice analyzer',\n  visibility: 'public',\n);\n\nvar_dump($workerTemplate);",
      },
      csharp: {
        method: 'Workers.Create',
        example:
          'WorkerCreateParams parameters = new();\n\nvar workerTemplate = await client.Workers.Create(parameters);\n\nConsole.WriteLine(workerTemplate);',
      },
      http: {
        example:
          'curl https://handinger.com/api/workers \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $HANDINGER_API_KEY" \\\n    -d \'{\n          "title": "Brand voice analyzer"\n        }\'',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/api/workers/{workerId}',
    httpMethod: 'get',
    summary: 'Retrieve a worker',
    description:
      'Retrieve the current worker state and messages from its most recent task. Returns a JSON worker object by default, or a server-sent event stream when `stream=true`.',
    stainlessPath: '(resource) workers > (method) retrieve',
    qualified: 'client.workers.retrieve',
    params: ['workerId: string;', "stream?: 'true' | 'false';"],
    response:
      "{ id: string; created_at: number; error: null; files: { filename: string; mediaType: string; url: string; }[]; incomplete_details: null; messages: object[]; metadata: object; object: 'worker'; output: { id: string; content: { text: string; type: 'output_text'; }[]; role: 'assistant'; status: 'completed'; type: 'message'; }[]; output_text: string; running: boolean; sources: { id: string; title: string; type: 'url'; url: string; }[]; status: 'running' | 'completed' | 'pending'; structured_output: object; url: string; usage?: { credits?: number; durationMs?: number; }; }",
    markdown:
      "## retrieve\n\n`client.workers.retrieve(workerId: string, stream?: 'true' | 'false'): { id: string; created_at: number; error: null; files: object[]; incomplete_details: null; messages: object[]; metadata: object; object: 'worker'; output: object[]; output_text: string; running: boolean; sources: object[]; status: 'running' | 'completed' | 'pending'; structured_output: object; url: string; usage?: object; }`\n\n**get** `/api/workers/{workerId}`\n\nRetrieve the current worker state and messages from its most recent task. Returns a JSON worker object by default, or a server-sent event stream when `stream=true`.\n\n### Parameters\n\n- `workerId: string`\n\n- `stream?: 'true' | 'false'`\n  Set to \"true\" to receive a server-sent event stream that replays all stored messages and then continues with live chunks from the active task (if any) before closing.\n\n### Returns\n\n- `{ id: string; created_at: number; error: null; files: { filename: string; mediaType: string; url: string; }[]; incomplete_details: null; messages: object[]; metadata: object; object: 'worker'; output: { id: string; content: { text: string; type: 'output_text'; }[]; role: 'assistant'; status: 'completed'; type: 'message'; }[]; output_text: string; running: boolean; sources: { id: string; title: string; type: 'url'; url: string; }[]; status: 'running' | 'completed' | 'pending'; structured_output: object; url: string; usage?: { credits?: number; durationMs?: number; }; }`\n\n  - `id: string`\n  - `created_at: number`\n  - `error: null`\n  - `files: { filename: string; mediaType: string; url: string; }[]`\n  - `incomplete_details: null`\n  - `messages: object[]`\n  - `metadata: object`\n  - `object: 'worker'`\n  - `output: { id: string; content: { text: string; type: 'output_text'; }[]; role: 'assistant'; status: 'completed'; type: 'message'; }[]`\n  - `output_text: string`\n  - `running: boolean`\n  - `sources: { id: string; title: string; type: 'url'; url: string; }[]`\n  - `status: 'running' | 'completed' | 'pending'`\n  - `structured_output: object`\n  - `url: string`\n  - `usage?: { credits?: number; durationMs?: number; }`\n\n### Example\n\n```typescript\nimport Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger();\n\nconst worker = await client.workers.retrieve('t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM');\n\nconsole.log(worker);\n```",
    perLanguage: {
      typescript: {
        method: 'client.workers.retrieve',
        example:
          "import Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger({\n  apiKey: process.env['HANDINGER_API_KEY'], // This is the default and can be omitted\n});\n\nconst worker = await client.workers.retrieve('t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM');\n\nconsole.log(worker.id);",
      },
      python: {
        method: 'workers.retrieve',
        example:
          'import os\nfrom handinger import Handinger\n\nclient = Handinger(\n    api_key=os.environ.get("HANDINGER_API_KEY"),  # This is the default and can be omitted\n)\nworker = client.workers.retrieve(\n    worker_id="t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",\n)\nprint(worker.id)',
      },
      java: {
        method: 'workers().retrieve',
        example:
          'package com.handinger.api.example;\n\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\nimport com.handinger.api.models.workers.Worker;\nimport com.handinger.api.models.workers.WorkerRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        HandingerClient client = HandingerOkHttpClient.fromEnv();\n\n        Worker worker = client.workers().retrieve("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM");\n    }\n}',
      },
      kotlin: {
        method: 'workers().retrieve',
        example:
          'package com.handinger.api.example\n\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\nimport com.handinger.api.models.workers.Worker\nimport com.handinger.api.models.workers.WorkerRetrieveParams\n\nfun main() {\n    val client: HandingerClient = HandingerOkHttpClient.fromEnv()\n\n    val worker: Worker = client.workers().retrieve("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n}',
      },
      go: {
        method: 'client.Workers.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ramensoft/handinger-go"\n\t"github.com/ramensoft/handinger-go/option"\n)\n\nfunc main() {\n\tclient := handinger.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tworker, err := client.Workers.Get(\n\t\tcontext.TODO(),\n\t\t"t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",\n\t\thandinger.WorkerGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", worker.ID)\n}\n',
      },
      ruby: {
        method: 'workers.retrieve',
        example:
          'require "handinger"\n\nhandinger = Handinger::Client.new(api_key: "My API Key")\n\nworker = handinger.workers.retrieve("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n\nputs(worker)',
      },
      cli: {
        method: 'workers retrieve',
        example:
          "handinger workers retrieve \\\n  --api-key 'My API Key' \\\n  --worker-id t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",
      },
      php: {
        method: 'workers->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$worker = $client->workers->retrieve(\n  't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM', stream: 'true'\n);\n\nvar_dump($worker);",
      },
      csharp: {
        method: 'Workers.Retrieve',
        example:
          'WorkerRetrieveParams parameters = new()\n{\n    WorkerID = "t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM"\n};\n\nvar worker = await client.Workers.Retrieve(parameters);\n\nConsole.WriteLine(worker);',
      },
      http: {
        example:
          'curl https://handinger.com/api/workers/$WORKER_ID \\\n    -H "Authorization: Bearer $HANDINGER_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/api/workers/{workerId}',
    httpMethod: 'patch',
    summary: 'Update a worker template',
    description:
      "Update a worker's instructions, title, summary, visibility, or output schema. Only the fields you send are changed; omitted fields keep their current values. Only the worker creator can update a worker.",
    stainlessPath: '(resource) workers > (method) update',
    qualified: 'client.workers.update',
    params: [
      'workerId: string;',
      'instructions?: string;',
      'outputSchema?: object;',
      'summary?: string;',
      'title?: string;',
      "visibility?: 'public' | 'private';",
    ],
    response:
      "{ id: string; createdAt: string; instructions: string; organizationId: string; outputSchema: object; summary: string; title: string; updatedAt: string; url: string; userId: string; visibility: 'public' | 'private'; }",
    markdown:
      "## update\n\n`client.workers.update(workerId: string, instructions?: string, outputSchema?: object, summary?: string, title?: string, visibility?: 'public' | 'private'): { id: string; createdAt: string; instructions: string; organizationId: string; outputSchema: object; summary: string; title: string; updatedAt: string; url: string; userId: string; visibility: 'public' | 'private'; }`\n\n**patch** `/api/workers/{workerId}`\n\nUpdate a worker's instructions, title, summary, visibility, or output schema. Only the fields you send are changed; omitted fields keep their current values. Only the worker creator can update a worker.\n\n### Parameters\n\n- `workerId: string`\n\n- `instructions?: string`\n  Replaces the persistent system prompt. Subsequent tasks pick up the new instructions immediately; in-flight tasks keep using the previous version.\n\n- `outputSchema?: object`\n  Replace the worker's structured output schema. Pass `null` to clear it and return to free-form text responses.\n\n- `summary?: string`\n  Replaces the worker's short one-line summary.\n\n- `title?: string`\n  New display name for the worker.\n\n- `visibility?: 'public' | 'private'`\n  Change visibility between `public` (any org member can run tasks) and `private` (only invited members).\n\n### Returns\n\n- `{ id: string; createdAt: string; instructions: string; organizationId: string; outputSchema: object; summary: string; title: string; updatedAt: string; url: string; userId: string; visibility: 'public' | 'private'; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `instructions: string`\n  - `organizationId: string`\n  - `outputSchema: object`\n  - `summary: string`\n  - `title: string`\n  - `updatedAt: string`\n  - `url: string`\n  - `userId: string`\n  - `visibility: 'public' | 'private'`\n\n### Example\n\n```typescript\nimport Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger();\n\nconst workerTemplate = await client.workers.update('t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM');\n\nconsole.log(workerTemplate);\n```",
    perLanguage: {
      typescript: {
        method: 'client.workers.update',
        example:
          "import Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger({\n  apiKey: process.env['HANDINGER_API_KEY'], // This is the default and can be omitted\n});\n\nconst workerTemplate = await client.workers.update('t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM');\n\nconsole.log(workerTemplate.id);",
      },
      python: {
        method: 'workers.update',
        example:
          'import os\nfrom handinger import Handinger\n\nclient = Handinger(\n    api_key=os.environ.get("HANDINGER_API_KEY"),  # This is the default and can be omitted\n)\nworker_template = client.workers.update(\n    worker_id="t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",\n)\nprint(worker_template.id)',
      },
      java: {
        method: 'workers().update',
        example:
          'package com.handinger.api.example;\n\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\nimport com.handinger.api.models.workers.UpdateWorker;\nimport com.handinger.api.models.workers.WorkerTemplate;\nimport com.handinger.api.models.workers.WorkerUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        HandingerClient client = HandingerOkHttpClient.fromEnv();\n\n        WorkerUpdateParams params = WorkerUpdateParams.builder()\n            .workerId("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n            .updateWorker(UpdateWorker.builder().build())\n            .build();\n        WorkerTemplate workerTemplate = client.workers().update(params);\n    }\n}',
      },
      kotlin: {
        method: 'workers().update',
        example:
          'package com.handinger.api.example\n\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\nimport com.handinger.api.models.workers.UpdateWorker\nimport com.handinger.api.models.workers.WorkerTemplate\nimport com.handinger.api.models.workers.WorkerUpdateParams\n\nfun main() {\n    val client: HandingerClient = HandingerOkHttpClient.fromEnv()\n\n    val params: WorkerUpdateParams = WorkerUpdateParams.builder()\n        .workerId("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n        .updateWorker(UpdateWorker.builder().build())\n        .build()\n    val workerTemplate: WorkerTemplate = client.workers().update(params)\n}',
      },
      go: {
        method: 'client.Workers.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ramensoft/handinger-go"\n\t"github.com/ramensoft/handinger-go/option"\n)\n\nfunc main() {\n\tclient := handinger.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tworkerTemplate, err := client.Workers.Update(\n\t\tcontext.TODO(),\n\t\t"t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",\n\t\thandinger.WorkerUpdateParams{\n\t\t\tUpdateWorker: handinger.UpdateWorkerParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", workerTemplate.ID)\n}\n',
      },
      ruby: {
        method: 'workers.update',
        example:
          'require "handinger"\n\nhandinger = Handinger::Client.new(api_key: "My API Key")\n\nworker_template = handinger.workers.update("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n\nputs(worker_template)',
      },
      cli: {
        method: 'workers update',
        example:
          "handinger workers update \\\n  --api-key 'My API Key' \\\n  --worker-id t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",
      },
      php: {
        method: 'workers->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$workerTemplate = $client->workers->update(\n  't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM',\n  instructions: 'instructions',\n  outputSchema: ['foo' => 'bar'],\n  summary: 'summary',\n  title: 'Brand voice analyzer',\n  visibility: 'public',\n);\n\nvar_dump($workerTemplate);",
      },
      csharp: {
        method: 'Workers.Update',
        example:
          'WorkerUpdateParams parameters = new()\n{\n    WorkerID = "t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM"\n};\n\nvar workerTemplate = await client.Workers.Update(parameters);\n\nConsole.WriteLine(workerTemplate);',
      },
      http: {
        example:
          'curl https://handinger.com/api/workers/$WORKER_ID \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $HANDINGER_API_KEY" \\\n    -d \'{\n          "title": "Brand voice analyzer"\n        }\'',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/api/workers/{workerId}',
    httpMethod: 'delete',
    summary: 'Delete a worker template',
    description:
      'Soft-delete a worker template so it no longer appears in list or retrieve endpoints. Tasks, turns, files, schedules, and integrations remain in the database for analytics. Only the worker creator can delete a worker.',
    stainlessPath: '(resource) workers > (method) delete',
    qualified: 'client.workers.delete',
    params: ['workerId: string;'],
    response: '{ deleted: boolean; }',
    markdown:
      "## delete\n\n`client.workers.delete(workerId: string): { deleted: boolean; }`\n\n**delete** `/api/workers/{workerId}`\n\nSoft-delete a worker template so it no longer appears in list or retrieve endpoints. Tasks, turns, files, schedules, and integrations remain in the database for analytics. Only the worker creator can delete a worker.\n\n### Parameters\n\n- `workerId: string`\n\n### Returns\n\n- `{ deleted: boolean; }`\n\n  - `deleted: boolean`\n\n### Example\n\n```typescript\nimport Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger();\n\nconst deleteWorkerResponse = await client.workers.delete('t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM');\n\nconsole.log(deleteWorkerResponse);\n```",
    perLanguage: {
      typescript: {
        method: 'client.workers.delete',
        example:
          "import Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger({\n  apiKey: process.env['HANDINGER_API_KEY'], // This is the default and can be omitted\n});\n\nconst deleteWorkerResponse = await client.workers.delete('t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM');\n\nconsole.log(deleteWorkerResponse.deleted);",
      },
      python: {
        method: 'workers.delete',
        example:
          'import os\nfrom handinger import Handinger\n\nclient = Handinger(\n    api_key=os.environ.get("HANDINGER_API_KEY"),  # This is the default and can be omitted\n)\ndelete_worker_response = client.workers.delete(\n    "t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",\n)\nprint(delete_worker_response.deleted)',
      },
      java: {
        method: 'workers().delete',
        example:
          'package com.handinger.api.example;\n\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\nimport com.handinger.api.models.workers.DeleteWorkerResponse;\nimport com.handinger.api.models.workers.WorkerDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        HandingerClient client = HandingerOkHttpClient.fromEnv();\n\n        DeleteWorkerResponse deleteWorkerResponse = client.workers().delete("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM");\n    }\n}',
      },
      kotlin: {
        method: 'workers().delete',
        example:
          'package com.handinger.api.example\n\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\nimport com.handinger.api.models.workers.DeleteWorkerResponse\nimport com.handinger.api.models.workers.WorkerDeleteParams\n\nfun main() {\n    val client: HandingerClient = HandingerOkHttpClient.fromEnv()\n\n    val deleteWorkerResponse: DeleteWorkerResponse = client.workers().delete("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n}',
      },
      go: {
        method: 'client.Workers.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ramensoft/handinger-go"\n\t"github.com/ramensoft/handinger-go/option"\n)\n\nfunc main() {\n\tclient := handinger.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tdeleteWorkerResponse, err := client.Workers.Delete(context.TODO(), "t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", deleteWorkerResponse.Deleted)\n}\n',
      },
      ruby: {
        method: 'workers.delete',
        example:
          'require "handinger"\n\nhandinger = Handinger::Client.new(api_key: "My API Key")\n\ndelete_worker_response = handinger.workers.delete("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n\nputs(delete_worker_response)',
      },
      cli: {
        method: 'workers delete',
        example:
          "handinger workers delete \\\n  --api-key 'My API Key' \\\n  --worker-id t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",
      },
      php: {
        method: 'workers->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$deleteWorkerResponse = $client->workers->delete(\n  't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM'\n);\n\nvar_dump($deleteWorkerResponse);",
      },
      csharp: {
        method: 'Workers.Delete',
        example:
          'WorkerDeleteParams parameters = new()\n{\n    WorkerID = "t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM"\n};\n\nvar deleteWorkerResponse = await client.Workers.Delete(parameters);\n\nConsole.WriteLine(deleteWorkerResponse);',
      },
      http: {
        example:
          'curl https://handinger.com/api/workers/$WORKER_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $HANDINGER_API_KEY"',
      },
    },
  },
  {
    name: 'retrieve_email',
    endpoint: '/api/workers/{workerId}/email',
    httpMethod: 'get',
    summary: 'Retrieve a worker email address',
    description: 'Retrieve the inbound email address for a worker.',
    stainlessPath: '(resource) workers > (method) retrieve_email',
    qualified: 'client.workers.retrieveEmail',
    params: ['workerId: string;'],
    response: '{ email: string; }',
    markdown:
      "## retrieve_email\n\n`client.workers.retrieveEmail(workerId: string): { email: string; }`\n\n**get** `/api/workers/{workerId}/email`\n\nRetrieve the inbound email address for a worker.\n\n### Parameters\n\n- `workerId: string`\n\n### Returns\n\n- `{ email: string; }`\n\n  - `email: string`\n\n### Example\n\n```typescript\nimport Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger();\n\nconst response = await client.workers.retrieveEmail('t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.workers.retrieveEmail',
        example:
          "import Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger({\n  apiKey: process.env['HANDINGER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.workers.retrieveEmail('t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM');\n\nconsole.log(response.email);",
      },
      python: {
        method: 'workers.retrieve_email',
        example:
          'import os\nfrom handinger import Handinger\n\nclient = Handinger(\n    api_key=os.environ.get("HANDINGER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.workers.retrieve_email(\n    "t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",\n)\nprint(response.email)',
      },
      java: {
        method: 'workers().retrieveEmail',
        example:
          'package com.handinger.api.example;\n\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\nimport com.handinger.api.models.workers.WorkerRetrieveEmailParams;\nimport com.handinger.api.models.workers.WorkerRetrieveEmailResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        HandingerClient client = HandingerOkHttpClient.fromEnv();\n\n        WorkerRetrieveEmailResponse response = client.workers().retrieveEmail("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM");\n    }\n}',
      },
      kotlin: {
        method: 'workers().retrieveEmail',
        example:
          'package com.handinger.api.example\n\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\nimport com.handinger.api.models.workers.WorkerRetrieveEmailParams\nimport com.handinger.api.models.workers.WorkerRetrieveEmailResponse\n\nfun main() {\n    val client: HandingerClient = HandingerOkHttpClient.fromEnv()\n\n    val response: WorkerRetrieveEmailResponse = client.workers().retrieveEmail("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n}',
      },
      go: {
        method: 'client.Workers.GetEmail',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ramensoft/handinger-go"\n\t"github.com/ramensoft/handinger-go/option"\n)\n\nfunc main() {\n\tclient := handinger.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Workers.GetEmail(context.TODO(), "t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Email)\n}\n',
      },
      ruby: {
        method: 'workers.retrieve_email',
        example:
          'require "handinger"\n\nhandinger = Handinger::Client.new(api_key: "My API Key")\n\nresponse = handinger.workers.retrieve_email("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n\nputs(response)',
      },
      cli: {
        method: 'workers retrieve_email',
        example:
          "handinger workers retrieve-email \\\n  --api-key 'My API Key' \\\n  --worker-id t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",
      },
      php: {
        method: 'workers->retrieveEmail',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->workers->retrieveEmail(\n  't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM'\n);\n\nvar_dump($response);",
      },
      csharp: {
        method: 'Workers.RetrieveEmail',
        example:
          'WorkerRetrieveEmailParams parameters = new()\n{\n    WorkerID = "t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM"\n};\n\nvar response = await client.Workers.RetrieveEmail(parameters);\n\nConsole.WriteLine(response);',
      },
      http: {
        example:
          'curl https://handinger.com/api/workers/$WORKER_ID/email \\\n    -H "Authorization: Bearer $HANDINGER_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/api/workers/{workerId}/schedules',
    httpMethod: 'get',
    summary: 'List worker schedules',
    description: 'List scheduled tasks for a worker.',
    stainlessPath: '(resource) workers.schedules > (method) list',
    qualified: 'client.workers.schedules.list',
    params: ['workerId: string;'],
    response:
      "{ schedules: { id: string; budget: 'low' | 'standard' | 'high' | 'unlimited'; input: string; nextRunAt: string; type: 'scheduled'; } | { id: string; budget: 'low' | 'standard' | 'high' | 'unlimited'; delayInSeconds: number; input: string; nextRunAt: string; type: 'delayed'; } | { id: string; budget: 'low' | 'standard' | 'high' | 'unlimited'; cron: string; input: string; nextRunAt: string; type: 'cron'; } | { id: string; budget: 'low' | 'standard' | 'high' | 'unlimited'; input: string; intervalSeconds: number; nextRunAt: string; type: 'interval'; }[]; workerId: string; }",
    markdown:
      "## list\n\n`client.workers.schedules.list(workerId: string): { schedules: worker_schedule[]; workerId: string; }`\n\n**get** `/api/workers/{workerId}/schedules`\n\nList scheduled tasks for a worker.\n\n### Parameters\n\n- `workerId: string`\n\n### Returns\n\n- `{ schedules: { id: string; budget: 'low' | 'standard' | 'high' | 'unlimited'; input: string; nextRunAt: string; type: 'scheduled'; } | { id: string; budget: 'low' | 'standard' | 'high' | 'unlimited'; delayInSeconds: number; input: string; nextRunAt: string; type: 'delayed'; } | { id: string; budget: 'low' | 'standard' | 'high' | 'unlimited'; cron: string; input: string; nextRunAt: string; type: 'cron'; } | { id: string; budget: 'low' | 'standard' | 'high' | 'unlimited'; input: string; intervalSeconds: number; nextRunAt: string; type: 'interval'; }[]; workerId: string; }`\n\n  - `schedules: { id: string; budget: 'low' | 'standard' | 'high' | 'unlimited'; input: string; nextRunAt: string; type: 'scheduled'; } | { id: string; budget: 'low' | 'standard' | 'high' | 'unlimited'; delayInSeconds: number; input: string; nextRunAt: string; type: 'delayed'; } | { id: string; budget: 'low' | 'standard' | 'high' | 'unlimited'; cron: string; input: string; nextRunAt: string; type: 'cron'; } | { id: string; budget: 'low' | 'standard' | 'high' | 'unlimited'; input: string; intervalSeconds: number; nextRunAt: string; type: 'interval'; }[]`\n  - `workerId: string`\n\n### Example\n\n```typescript\nimport Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger();\n\nconst schedules = await client.workers.schedules.list('t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM');\n\nconsole.log(schedules);\n```",
    perLanguage: {
      typescript: {
        method: 'client.workers.schedules.list',
        example:
          "import Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger({\n  apiKey: process.env['HANDINGER_API_KEY'], // This is the default and can be omitted\n});\n\nconst schedules = await client.workers.schedules.list('t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM');\n\nconsole.log(schedules.schedules);",
      },
      python: {
        method: 'workers.schedules.list',
        example:
          'import os\nfrom handinger import Handinger\n\nclient = Handinger(\n    api_key=os.environ.get("HANDINGER_API_KEY"),  # This is the default and can be omitted\n)\nschedules = client.workers.schedules.list(\n    "t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",\n)\nprint(schedules.schedules)',
      },
      java: {
        method: 'workers().schedules().list',
        example:
          'package com.handinger.api.example;\n\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\nimport com.handinger.api.models.workers.schedules.ScheduleListParams;\nimport com.handinger.api.models.workers.schedules.ScheduleListResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        HandingerClient client = HandingerOkHttpClient.fromEnv();\n\n        ScheduleListResponse schedules = client.workers().schedules().list("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM");\n    }\n}',
      },
      kotlin: {
        method: 'workers().schedules().list',
        example:
          'package com.handinger.api.example\n\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\nimport com.handinger.api.models.workers.schedules.ScheduleListParams\nimport com.handinger.api.models.workers.schedules.ScheduleListResponse\n\nfun main() {\n    val client: HandingerClient = HandingerOkHttpClient.fromEnv()\n\n    val schedules: ScheduleListResponse = client.workers().schedules().list("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n}',
      },
      go: {
        method: 'client.Workers.Schedules.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ramensoft/handinger-go"\n\t"github.com/ramensoft/handinger-go/option"\n)\n\nfunc main() {\n\tclient := handinger.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tschedules, err := client.Workers.Schedules.List(context.TODO(), "t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", schedules.Schedules)\n}\n',
      },
      ruby: {
        method: 'workers.schedules.list',
        example:
          'require "handinger"\n\nhandinger = Handinger::Client.new(api_key: "My API Key")\n\nschedules = handinger.workers.schedules.list("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n\nputs(schedules)',
      },
      cli: {
        method: 'schedules list',
        example:
          "handinger workers:schedules list \\\n  --api-key 'My API Key' \\\n  --worker-id t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",
      },
      php: {
        method: 'workers->schedules->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$schedules = $client->workers->schedules->list(\n  't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM'\n);\n\nvar_dump($schedules);",
      },
      csharp: {
        method: 'Workers.Schedules.List',
        example:
          'ScheduleListParams parameters = new()\n{\n    WorkerID = "t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM"\n};\n\nvar schedules = await client.Workers.Schedules.List(parameters);\n\nConsole.WriteLine(schedules);',
      },
      http: {
        example:
          'curl https://handinger.com/api/workers/$WORKER_ID/schedules \\\n    -H "Authorization: Bearer $HANDINGER_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/api/workers/{workerId}/schedules',
    httpMethod: 'post',
    summary: 'Create a worker schedule',
    description: 'Schedule a worker instruction for a future or recurring run.',
    stainlessPath: '(resource) workers.schedules > (method) create',
    qualified: 'client.workers.schedules.create',
    params: [
      'workerId: string;',
      'input: string;',
      "when: { date: string; type: 'scheduled'; } | { delayInSeconds: number; type: 'delayed'; } | { cron: string; type: 'cron'; } | { intervalSeconds: number; type: 'interval'; };",
      "budget?: 'low' | 'standard' | 'high' | 'unlimited';",
    ],
    response:
      "{ id: string; budget: 'low' | 'standard' | 'high' | 'unlimited'; input: string; nextRunAt: string; type: 'scheduled'; } | { id: string; budget: 'low' | 'standard' | 'high' | 'unlimited'; delayInSeconds: number; input: string; nextRunAt: string; type: 'delayed'; } | { id: string; budget: 'low' | 'standard' | 'high' | 'unlimited'; cron: string; input: string; nextRunAt: string; type: 'cron'; } | { id: string; budget: 'low' | 'standard' | 'high' | 'unlimited'; input: string; intervalSeconds: number; nextRunAt: string; type: 'interval'; }",
    markdown:
      "## create\n\n`client.workers.schedules.create(workerId: string, input: string, when: { date: string; type: 'scheduled'; } | { delayInSeconds: number; type: 'delayed'; } | { cron: string; type: 'cron'; } | { intervalSeconds: number; type: 'interval'; }, budget?: 'low' | 'standard' | 'high' | 'unlimited'): { id: string; budget: 'low' | 'standard' | 'high' | 'unlimited'; input: string; nextRunAt: string; type: 'scheduled'; } | { id: string; budget: 'low' | 'standard' | 'high' | 'unlimited'; delayInSeconds: number; input: string; nextRunAt: string; type: 'delayed'; } | { id: string; budget: 'low' | 'standard' | 'high' | 'unlimited'; cron: string; input: string; nextRunAt: string; type: 'cron'; } | { id: string; budget: 'low' | 'standard' | 'high' | 'unlimited'; input: string; intervalSeconds: number; nextRunAt: string; type: 'interval'; }`\n\n**post** `/api/workers/{workerId}/schedules`\n\nSchedule a worker instruction for a future or recurring run.\n\n### Parameters\n\n- `workerId: string`\n\n- `input: string`\n\n- `when: { date: string; type: 'scheduled'; } | { delayInSeconds: number; type: 'delayed'; } | { cron: string; type: 'cron'; } | { intervalSeconds: number; type: 'interval'; }`\n\n- `budget?: 'low' | 'standard' | 'high' | 'unlimited'`\n\n### Returns\n\n- `{ id: string; budget: 'low' | 'standard' | 'high' | 'unlimited'; input: string; nextRunAt: string; type: 'scheduled'; } | { id: string; budget: 'low' | 'standard' | 'high' | 'unlimited'; delayInSeconds: number; input: string; nextRunAt: string; type: 'delayed'; } | { id: string; budget: 'low' | 'standard' | 'high' | 'unlimited'; cron: string; input: string; nextRunAt: string; type: 'cron'; } | { id: string; budget: 'low' | 'standard' | 'high' | 'unlimited'; input: string; intervalSeconds: number; nextRunAt: string; type: 'interval'; }`\n\n### Example\n\n```typescript\nimport Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger();\n\nconst workerSchedule = await client.workers.schedules.create('t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM', {\n  input: 'x',\n  when: { date: '2019-12-27T18:11:19.117Z', type: 'scheduled' },\n});\n\nconsole.log(workerSchedule);\n```",
    perLanguage: {
      typescript: {
        method: 'client.workers.schedules.create',
        example:
          "import Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger({\n  apiKey: process.env['HANDINGER_API_KEY'], // This is the default and can be omitted\n});\n\nconst workerSchedule = await client.workers.schedules.create(\n  't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM',\n  {\n    input: 'x',\n    when: { date: '2019-12-27T18:11:19.117Z', type: 'scheduled' },\n  },\n);\n\nconsole.log(workerSchedule);",
      },
      python: {
        method: 'workers.schedules.create',
        example:
          'import os\nfrom datetime import datetime\nfrom handinger import Handinger\n\nclient = Handinger(\n    api_key=os.environ.get("HANDINGER_API_KEY"),  # This is the default and can be omitted\n)\nworker_schedule = client.workers.schedules.create(\n    worker_id="t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",\n    input="x",\n    when={\n        "date": datetime.fromisoformat("2019-12-27T18:11:19.117"),\n        "type": "scheduled",\n    },\n)\nprint(worker_schedule)',
      },
      java: {
        method: 'workers().schedules().create',
        example:
          'package com.handinger.api.example;\n\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\nimport com.handinger.api.models.workers.schedules.ScheduleCreateParams;\nimport com.handinger.api.models.workers.schedules.WorkerSchedule;\nimport java.time.OffsetDateTime;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        HandingerClient client = HandingerOkHttpClient.fromEnv();\n\n        ScheduleCreateParams params = ScheduleCreateParams.builder()\n            .workerId("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n            .input("x")\n            .scheduledWhen(OffsetDateTime.parse("2019-12-27T18:11:19.117Z"))\n            .build();\n        WorkerSchedule workerSchedule = client.workers().schedules().create(params);\n    }\n}',
      },
      kotlin: {
        method: 'workers().schedules().create',
        example:
          'package com.handinger.api.example\n\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\nimport com.handinger.api.models.workers.schedules.ScheduleCreateParams\nimport com.handinger.api.models.workers.schedules.WorkerSchedule\nimport java.time.OffsetDateTime\n\nfun main() {\n    val client: HandingerClient = HandingerOkHttpClient.fromEnv()\n\n    val params: ScheduleCreateParams = ScheduleCreateParams.builder()\n        .workerId("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n        .input("x")\n        .scheduledWhen(OffsetDateTime.parse("2019-12-27T18:11:19.117Z"))\n        .build()\n    val workerSchedule: WorkerSchedule = client.workers().schedules().create(params)\n}',
      },
      go: {
        method: 'client.Workers.Schedules.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\t"time"\n\n\t"github.com/ramensoft/handinger-go"\n\t"github.com/ramensoft/handinger-go/option"\n)\n\nfunc main() {\n\tclient := handinger.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tworkerSchedule, err := client.Workers.Schedules.New(\n\t\tcontext.TODO(),\n\t\t"t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",\n\t\thandinger.WorkerScheduleNewParams{\n\t\t\tInput: "x",\n\t\t\tWhen: handinger.WorkerScheduleNewParamsWhenUnion{\n\t\t\t\tOfScheduled: &handinger.WorkerScheduleNewParamsWhenScheduled{\n\t\t\t\t\tDate: time.Now(),\n\t\t\t\t},\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", workerSchedule)\n}\n',
      },
      ruby: {
        method: 'workers.schedules.create',
        example:
          'require "handinger"\n\nhandinger = Handinger::Client.new(api_key: "My API Key")\n\nworker_schedule = handinger.workers.schedules.create(\n  "t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",\n  input: "x",\n  when_: {date: "2019-12-27T18:11:19.117Z", type: :scheduled}\n)\n\nputs(worker_schedule)',
      },
      cli: {
        method: 'schedules create',
        example:
          "handinger workers:schedules create \\\n  --api-key 'My API Key' \\\n  --worker-id t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM \\\n  --input x \\\n  --when \"{date: '2019-12-27T18:11:19.117Z', type: scheduled}\"",
      },
      php: {
        method: 'workers->schedules->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$workerSchedule = $client->workers->schedules->create(\n  't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM',\n  input: 'x',\n  when: [\n    'date' => new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n    'type' => 'scheduled',\n  ],\n  budget: 'low',\n);\n\nvar_dump($workerSchedule);",
      },
      csharp: {
        method: 'Workers.Schedules.Create',
        example:
          'ScheduleCreateParams parameters = new()\n{\n    WorkerID = "t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",\n    Input = "x",\n    When = new Scheduled(DateTimeOffset.Parse("2019-12-27T18:11:19.117Z")),\n};\n\nvar workerSchedule = await client.Workers.Schedules.Create(parameters);\n\nConsole.WriteLine(workerSchedule);',
      },
      http: {
        example:
          'curl https://handinger.com/api/workers/$WORKER_ID/schedules \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $HANDINGER_API_KEY" \\\n    -d \'{\n          "input": "x",\n          "when": {\n            "date": "2019-12-27T18:11:19.117Z",\n            "type": "scheduled"\n          }\n        }\'',
      },
    },
  },
  {
    name: 'cancel',
    endpoint: '/api/workers/{workerId}/schedules/{scheduleId}',
    httpMethod: 'delete',
    summary: 'Cancel a worker schedule',
    description: 'Cancel a scheduled task for a worker.',
    stainlessPath: '(resource) workers.schedules > (method) cancel',
    qualified: 'client.workers.schedules.cancel',
    params: ['workerId: string;', 'scheduleId: string;'],
    response: '{ cancelled: boolean; }',
    markdown:
      "## cancel\n\n`client.workers.schedules.cancel(workerId: string, scheduleId: string): { cancelled: boolean; }`\n\n**delete** `/api/workers/{workerId}/schedules/{scheduleId}`\n\nCancel a scheduled task for a worker.\n\n### Parameters\n\n- `workerId: string`\n\n- `scheduleId: string`\n\n### Returns\n\n- `{ cancelled: boolean; }`\n\n  - `cancelled: boolean`\n\n### Example\n\n```typescript\nimport Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger();\n\nconst response = await client.workers.schedules.cancel('sch_01HZY31W2SZJ8MJ2FQTR3M1K9D', { workerId: 't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.workers.schedules.cancel',
        example:
          "import Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger({\n  apiKey: process.env['HANDINGER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.workers.schedules.cancel('sch_01HZY31W2SZJ8MJ2FQTR3M1K9D', {\n  workerId: 't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM',\n});\n\nconsole.log(response.cancelled);",
      },
      python: {
        method: 'workers.schedules.cancel',
        example:
          'import os\nfrom handinger import Handinger\n\nclient = Handinger(\n    api_key=os.environ.get("HANDINGER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.workers.schedules.cancel(\n    schedule_id="sch_01HZY31W2SZJ8MJ2FQTR3M1K9D",\n    worker_id="t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",\n)\nprint(response.cancelled)',
      },
      java: {
        method: 'workers().schedules().cancel',
        example:
          'package com.handinger.api.example;\n\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\nimport com.handinger.api.models.workers.schedules.ScheduleCancelParams;\nimport com.handinger.api.models.workers.schedules.ScheduleCancelResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        HandingerClient client = HandingerOkHttpClient.fromEnv();\n\n        ScheduleCancelParams params = ScheduleCancelParams.builder()\n            .workerId("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n            .scheduleId("sch_01HZY31W2SZJ8MJ2FQTR3M1K9D")\n            .build();\n        ScheduleCancelResponse response = client.workers().schedules().cancel(params);\n    }\n}',
      },
      kotlin: {
        method: 'workers().schedules().cancel',
        example:
          'package com.handinger.api.example\n\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\nimport com.handinger.api.models.workers.schedules.ScheduleCancelParams\nimport com.handinger.api.models.workers.schedules.ScheduleCancelResponse\n\nfun main() {\n    val client: HandingerClient = HandingerOkHttpClient.fromEnv()\n\n    val params: ScheduleCancelParams = ScheduleCancelParams.builder()\n        .workerId("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n        .scheduleId("sch_01HZY31W2SZJ8MJ2FQTR3M1K9D")\n        .build()\n    val response: ScheduleCancelResponse = client.workers().schedules().cancel(params)\n}',
      },
      go: {
        method: 'client.Workers.Schedules.Cancel',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ramensoft/handinger-go"\n\t"github.com/ramensoft/handinger-go/option"\n)\n\nfunc main() {\n\tclient := handinger.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Workers.Schedules.Cancel(\n\t\tcontext.TODO(),\n\t\t"sch_01HZY31W2SZJ8MJ2FQTR3M1K9D",\n\t\thandinger.WorkerScheduleCancelParams{\n\t\t\tWorkerID: "t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Cancelled)\n}\n',
      },
      ruby: {
        method: 'workers.schedules.cancel',
        example:
          'require "handinger"\n\nhandinger = Handinger::Client.new(api_key: "My API Key")\n\nresponse = handinger.workers.schedules.cancel(\n  "sch_01HZY31W2SZJ8MJ2FQTR3M1K9D",\n  worker_id: "t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM"\n)\n\nputs(response)',
      },
      cli: {
        method: 'schedules cancel',
        example:
          "handinger workers:schedules cancel \\\n  --api-key 'My API Key' \\\n  --worker-id t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM \\\n  --schedule-id sch_01HZY31W2SZJ8MJ2FQTR3M1K9D",
      },
      php: {
        method: 'workers->schedules->cancel',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->workers->schedules->cancel(\n  'sch_01HZY31W2SZJ8MJ2FQTR3M1K9D',\n  workerID: 't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM',\n);\n\nvar_dump($response);",
      },
      csharp: {
        method: 'Workers.Schedules.Cancel',
        example:
          'ScheduleCancelParams parameters = new()\n{\n    WorkerID = "t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",\n    ScheduleID = "sch_01HZY31W2SZJ8MJ2FQTR3M1K9D",\n};\n\nvar response = await client.Workers.Schedules.Cancel(parameters);\n\nConsole.WriteLine(response);',
      },
      http: {
        example:
          'curl https://handinger.com/api/workers/$WORKER_ID/schedules/$SCHEDULE_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $HANDINGER_API_KEY"',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/api/workers/{workerId}/webhook',
    httpMethod: 'get',
    summary: 'Retrieve a worker webhook',
    description:
      'Retrieve the webhook URL and shared token configured for a worker. Both fields are `null` when no webhook is configured. Only the worker creator can read the webhook configuration.',
    stainlessPath: '(resource) workers.webhooks > (method) retrieve',
    qualified: 'client.workers.webhooks.retrieve',
    params: ['workerId: string;'],
    response: '{ token: string; url: string; }',
    markdown:
      "## retrieve\n\n`client.workers.webhooks.retrieve(workerId: string): { token: string; url: string; }`\n\n**get** `/api/workers/{workerId}/webhook`\n\nRetrieve the webhook URL and shared token configured for a worker. Both fields are `null` when no webhook is configured. Only the worker creator can read the webhook configuration.\n\n### Parameters\n\n- `workerId: string`\n\n### Returns\n\n- `{ token: string; url: string; }`\n\n  - `token: string`\n  - `url: string`\n\n### Example\n\n```typescript\nimport Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger();\n\nconst webhook = await client.workers.webhooks.retrieve('t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM');\n\nconsole.log(webhook);\n```",
    perLanguage: {
      typescript: {
        method: 'client.workers.webhooks.retrieve',
        example:
          "import Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger({\n  apiKey: process.env['HANDINGER_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhook = await client.workers.webhooks.retrieve('t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM');\n\nconsole.log(webhook.token);",
      },
      python: {
        method: 'workers.webhooks.retrieve',
        example:
          'import os\nfrom handinger import Handinger\n\nclient = Handinger(\n    api_key=os.environ.get("HANDINGER_API_KEY"),  # This is the default and can be omitted\n)\nwebhook = client.workers.webhooks.retrieve(\n    "t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",\n)\nprint(webhook.token)',
      },
      java: {
        method: 'workers().webhooks().retrieve',
        example:
          'package com.handinger.api.example;\n\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\nimport com.handinger.api.models.workers.webhooks.Webhook;\nimport com.handinger.api.models.workers.webhooks.WebhookRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        HandingerClient client = HandingerOkHttpClient.fromEnv();\n\n        Webhook webhook = client.workers().webhooks().retrieve("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM");\n    }\n}',
      },
      kotlin: {
        method: 'workers().webhooks().retrieve',
        example:
          'package com.handinger.api.example\n\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\nimport com.handinger.api.models.workers.webhooks.Webhook\nimport com.handinger.api.models.workers.webhooks.WebhookRetrieveParams\n\nfun main() {\n    val client: HandingerClient = HandingerOkHttpClient.fromEnv()\n\n    val webhook: Webhook = client.workers().webhooks().retrieve("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n}',
      },
      go: {
        method: 'client.Workers.Webhooks.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ramensoft/handinger-go"\n\t"github.com/ramensoft/handinger-go/option"\n)\n\nfunc main() {\n\tclient := handinger.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\twebhook, err := client.Workers.Webhooks.Get(context.TODO(), "t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", webhook.Token)\n}\n',
      },
      ruby: {
        method: 'workers.webhooks.retrieve',
        example:
          'require "handinger"\n\nhandinger = Handinger::Client.new(api_key: "My API Key")\n\nwebhook = handinger.workers.webhooks.retrieve("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n\nputs(webhook)',
      },
      cli: {
        method: 'webhooks retrieve',
        example:
          "handinger workers:webhooks retrieve \\\n  --api-key 'My API Key' \\\n  --worker-id t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",
      },
      php: {
        method: 'workers->webhooks->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$webhook = $client->workers->webhooks->retrieve(\n  't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM'\n);\n\nvar_dump($webhook);",
      },
      csharp: {
        method: 'Workers.Webhooks.Retrieve',
        example:
          'WebhookRetrieveParams parameters = new()\n{\n    WorkerID = "t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM"\n};\n\nvar webhook = await client.Workers.Webhooks.Retrieve(parameters);\n\nConsole.WriteLine(webhook);',
      },
      http: {
        example:
          'curl https://handinger.com/api/workers/$WORKER_ID/webhook \\\n    -H "Authorization: Bearer $HANDINGER_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/api/workers/{workerId}/webhook',
    httpMethod: 'put',
    summary: 'Update a worker webhook',
    description:
      'Set or replace the webhook URL for a worker. A fresh token is generated the first time a URL is set; subsequent updates keep the existing token. Pass `url: null` to clear the webhook (use the dedicated DELETE for the same effect). Only the worker creator can update the webhook.',
    stainlessPath: '(resource) workers.webhooks > (method) update',
    qualified: 'client.workers.webhooks.update',
    params: ['workerId: string;', 'url: string;'],
    response: '{ token: string; url: string; }',
    markdown:
      "## update\n\n`client.workers.webhooks.update(workerId: string, url: string): { token: string; url: string; }`\n\n**put** `/api/workers/{workerId}/webhook`\n\nSet or replace the webhook URL for a worker. A fresh token is generated the first time a URL is set; subsequent updates keep the existing token. Pass `url: null` to clear the webhook (use the dedicated DELETE for the same effect). Only the worker creator can update the webhook.\n\n### Parameters\n\n- `workerId: string`\n\n- `url: string`\n  HTTPS endpoint Handinger should POST to when a task finishes. Pass `null` to remove the webhook and clear its token.\n\n### Returns\n\n- `{ token: string; url: string; }`\n\n  - `token: string`\n  - `url: string`\n\n### Example\n\n```typescript\nimport Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger();\n\nconst webhook = await client.workers.webhooks.update('t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM', { url: 'https://example.com/handinger-webhook' });\n\nconsole.log(webhook);\n```",
    perLanguage: {
      typescript: {
        method: 'client.workers.webhooks.update',
        example:
          "import Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger({\n  apiKey: process.env['HANDINGER_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhook = await client.workers.webhooks.update('t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM', {\n  url: 'https://example.com/handinger-webhook',\n});\n\nconsole.log(webhook.token);",
      },
      python: {
        method: 'workers.webhooks.update',
        example:
          'import os\nfrom handinger import Handinger\n\nclient = Handinger(\n    api_key=os.environ.get("HANDINGER_API_KEY"),  # This is the default and can be omitted\n)\nwebhook = client.workers.webhooks.update(\n    worker_id="t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",\n    url="https://example.com/handinger-webhook",\n)\nprint(webhook.token)',
      },
      java: {
        method: 'workers().webhooks().update',
        example:
          'package com.handinger.api.example;\n\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\nimport com.handinger.api.models.workers.webhooks.UpdateWebhook;\nimport com.handinger.api.models.workers.webhooks.Webhook;\nimport com.handinger.api.models.workers.webhooks.WebhookUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        HandingerClient client = HandingerOkHttpClient.fromEnv();\n\n        WebhookUpdateParams params = WebhookUpdateParams.builder()\n            .workerId("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n            .updateWebhook(UpdateWebhook.builder()\n                .url("https://example.com/handinger-webhook")\n                .build())\n            .build();\n        Webhook webhook = client.workers().webhooks().update(params);\n    }\n}',
      },
      kotlin: {
        method: 'workers().webhooks().update',
        example:
          'package com.handinger.api.example\n\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\nimport com.handinger.api.models.workers.webhooks.UpdateWebhook\nimport com.handinger.api.models.workers.webhooks.Webhook\nimport com.handinger.api.models.workers.webhooks.WebhookUpdateParams\n\nfun main() {\n    val client: HandingerClient = HandingerOkHttpClient.fromEnv()\n\n    val params: WebhookUpdateParams = WebhookUpdateParams.builder()\n        .workerId("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n        .updateWebhook(UpdateWebhook.builder()\n            .url("https://example.com/handinger-webhook")\n            .build())\n        .build()\n    val webhook: Webhook = client.workers().webhooks().update(params)\n}',
      },
      go: {
        method: 'client.Workers.Webhooks.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ramensoft/handinger-go"\n\t"github.com/ramensoft/handinger-go/option"\n)\n\nfunc main() {\n\tclient := handinger.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\twebhook, err := client.Workers.Webhooks.Update(\n\t\tcontext.TODO(),\n\t\t"t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",\n\t\thandinger.WorkerWebhookUpdateParams{\n\t\t\tUpdateWebhook: handinger.UpdateWebhookParam{\n\t\t\t\tURL: handinger.String("https://example.com/handinger-webhook"),\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", webhook.Token)\n}\n',
      },
      ruby: {
        method: 'workers.webhooks.update',
        example:
          'require "handinger"\n\nhandinger = Handinger::Client.new(api_key: "My API Key")\n\nwebhook = handinger.workers.webhooks.update(\n  "t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",\n  url: "https://example.com/handinger-webhook"\n)\n\nputs(webhook)',
      },
      cli: {
        method: 'webhooks update',
        example:
          "handinger workers:webhooks update \\\n  --api-key 'My API Key' \\\n  --worker-id t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM \\\n  --url https://example.com/handinger-webhook",
      },
      php: {
        method: 'workers->webhooks->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$webhook = $client->workers->webhooks->update(\n  't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM',\n  url: 'https://example.com/handinger-webhook',\n);\n\nvar_dump($webhook);",
      },
      csharp: {
        method: 'Workers.Webhooks.Update',
        example:
          'WebhookUpdateParams parameters = new()\n{\n    WorkerID = "t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",\n    Url = "https://example.com/handinger-webhook",\n};\n\nvar webhook = await client.Workers.Webhooks.Update(parameters);\n\nConsole.WriteLine(webhook);',
      },
      http: {
        example:
          'curl https://handinger.com/api/workers/$WORKER_ID/webhook \\\n    -X PUT \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $HANDINGER_API_KEY" \\\n    -d \'{\n          "url": "https://example.com/handinger-webhook"\n        }\'',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/api/workers/{workerId}/webhook',
    httpMethod: 'delete',
    summary: 'Delete a worker webhook',
    description:
      'Remove the webhook from a worker. Both `url` and `token` are cleared and no further deliveries are attempted. Only the worker creator can delete the webhook.',
    stainlessPath: '(resource) workers.webhooks > (method) delete',
    qualified: 'client.workers.webhooks.delete',
    params: ['workerId: string;'],
    response: '{ token: string; url: string; }',
    markdown:
      "## delete\n\n`client.workers.webhooks.delete(workerId: string): { token: string; url: string; }`\n\n**delete** `/api/workers/{workerId}/webhook`\n\nRemove the webhook from a worker. Both `url` and `token` are cleared and no further deliveries are attempted. Only the worker creator can delete the webhook.\n\n### Parameters\n\n- `workerId: string`\n\n### Returns\n\n- `{ token: string; url: string; }`\n\n  - `token: string`\n  - `url: string`\n\n### Example\n\n```typescript\nimport Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger();\n\nconst webhook = await client.workers.webhooks.delete('t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM');\n\nconsole.log(webhook);\n```",
    perLanguage: {
      typescript: {
        method: 'client.workers.webhooks.delete',
        example:
          "import Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger({\n  apiKey: process.env['HANDINGER_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhook = await client.workers.webhooks.delete('t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM');\n\nconsole.log(webhook.token);",
      },
      python: {
        method: 'workers.webhooks.delete',
        example:
          'import os\nfrom handinger import Handinger\n\nclient = Handinger(\n    api_key=os.environ.get("HANDINGER_API_KEY"),  # This is the default and can be omitted\n)\nwebhook = client.workers.webhooks.delete(\n    "t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",\n)\nprint(webhook.token)',
      },
      java: {
        method: 'workers().webhooks().delete',
        example:
          'package com.handinger.api.example;\n\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\nimport com.handinger.api.models.workers.webhooks.Webhook;\nimport com.handinger.api.models.workers.webhooks.WebhookDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        HandingerClient client = HandingerOkHttpClient.fromEnv();\n\n        Webhook webhook = client.workers().webhooks().delete("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM");\n    }\n}',
      },
      kotlin: {
        method: 'workers().webhooks().delete',
        example:
          'package com.handinger.api.example\n\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\nimport com.handinger.api.models.workers.webhooks.Webhook\nimport com.handinger.api.models.workers.webhooks.WebhookDeleteParams\n\nfun main() {\n    val client: HandingerClient = HandingerOkHttpClient.fromEnv()\n\n    val webhook: Webhook = client.workers().webhooks().delete("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n}',
      },
      go: {
        method: 'client.Workers.Webhooks.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ramensoft/handinger-go"\n\t"github.com/ramensoft/handinger-go/option"\n)\n\nfunc main() {\n\tclient := handinger.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\twebhook, err := client.Workers.Webhooks.Delete(context.TODO(), "t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", webhook.Token)\n}\n',
      },
      ruby: {
        method: 'workers.webhooks.delete',
        example:
          'require "handinger"\n\nhandinger = Handinger::Client.new(api_key: "My API Key")\n\nwebhook = handinger.workers.webhooks.delete("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n\nputs(webhook)',
      },
      cli: {
        method: 'webhooks delete',
        example:
          "handinger workers:webhooks delete \\\n  --api-key 'My API Key' \\\n  --worker-id t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",
      },
      php: {
        method: 'workers->webhooks->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$webhook = $client->workers->webhooks->delete(\n  't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM'\n);\n\nvar_dump($webhook);",
      },
      csharp: {
        method: 'Workers.Webhooks.Delete',
        example:
          'WebhookDeleteParams parameters = new()\n{\n    WorkerID = "t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM"\n};\n\nvar webhook = await client.Workers.Webhooks.Delete(parameters);\n\nConsole.WriteLine(webhook);',
      },
      http: {
        example:
          'curl https://handinger.com/api/workers/$WORKER_ID/webhook \\\n    -X DELETE \\\n    -H "Authorization: Bearer $HANDINGER_API_KEY"',
      },
    },
  },
  {
    name: 'regenerate_token',
    endpoint: '/api/workers/{workerId}/webhook/regenerate-token',
    httpMethod: 'post',
    summary: 'Regenerate a worker webhook token',
    description:
      'Issue a new shared token for the webhook, invalidating the previous one. The webhook URL is preserved. Only the worker creator can regenerate the token.',
    stainlessPath: '(resource) workers.webhooks > (method) regenerate_token',
    qualified: 'client.workers.webhooks.regenerateToken',
    params: ['workerId: string;'],
    response: '{ token: string; url: string; }',
    markdown:
      "## regenerate_token\n\n`client.workers.webhooks.regenerateToken(workerId: string): { token: string; url: string; }`\n\n**post** `/api/workers/{workerId}/webhook/regenerate-token`\n\nIssue a new shared token for the webhook, invalidating the previous one. The webhook URL is preserved. Only the worker creator can regenerate the token.\n\n### Parameters\n\n- `workerId: string`\n\n### Returns\n\n- `{ token: string; url: string; }`\n\n  - `token: string`\n  - `url: string`\n\n### Example\n\n```typescript\nimport Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger();\n\nconst webhook = await client.workers.webhooks.regenerateToken('t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM');\n\nconsole.log(webhook);\n```",
    perLanguage: {
      typescript: {
        method: 'client.workers.webhooks.regenerateToken',
        example:
          "import Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger({\n  apiKey: process.env['HANDINGER_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhook = await client.workers.webhooks.regenerateToken(\n  't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM',\n);\n\nconsole.log(webhook.token);",
      },
      python: {
        method: 'workers.webhooks.regenerate_token',
        example:
          'import os\nfrom handinger import Handinger\n\nclient = Handinger(\n    api_key=os.environ.get("HANDINGER_API_KEY"),  # This is the default and can be omitted\n)\nwebhook = client.workers.webhooks.regenerate_token(\n    "t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",\n)\nprint(webhook.token)',
      },
      java: {
        method: 'workers().webhooks().regenerateToken',
        example:
          'package com.handinger.api.example;\n\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\nimport com.handinger.api.models.workers.webhooks.Webhook;\nimport com.handinger.api.models.workers.webhooks.WebhookRegenerateTokenParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        HandingerClient client = HandingerOkHttpClient.fromEnv();\n\n        Webhook webhook = client.workers().webhooks().regenerateToken("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM");\n    }\n}',
      },
      kotlin: {
        method: 'workers().webhooks().regenerateToken',
        example:
          'package com.handinger.api.example\n\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\nimport com.handinger.api.models.workers.webhooks.Webhook\nimport com.handinger.api.models.workers.webhooks.WebhookRegenerateTokenParams\n\nfun main() {\n    val client: HandingerClient = HandingerOkHttpClient.fromEnv()\n\n    val webhook: Webhook = client.workers().webhooks().regenerateToken("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n}',
      },
      go: {
        method: 'client.Workers.Webhooks.RegenerateToken',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ramensoft/handinger-go"\n\t"github.com/ramensoft/handinger-go/option"\n)\n\nfunc main() {\n\tclient := handinger.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\twebhook, err := client.Workers.Webhooks.RegenerateToken(context.TODO(), "t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", webhook.Token)\n}\n',
      },
      ruby: {
        method: 'workers.webhooks.regenerate_token',
        example:
          'require "handinger"\n\nhandinger = Handinger::Client.new(api_key: "My API Key")\n\nwebhook = handinger.workers.webhooks.regenerate_token("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n\nputs(webhook)',
      },
      cli: {
        method: 'webhooks regenerate_token',
        example:
          "handinger workers:webhooks regenerate-token \\\n  --api-key 'My API Key' \\\n  --worker-id t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",
      },
      php: {
        method: 'workers->webhooks->regenerateToken',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$webhook = $client->workers->webhooks->regenerateToken(\n  't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM'\n);\n\nvar_dump($webhook);",
      },
      csharp: {
        method: 'Workers.Webhooks.RegenerateToken',
        example:
          'WebhookRegenerateTokenParams parameters = new()\n{\n    WorkerID = "t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM"\n};\n\nvar webhook = await client.Workers.Webhooks.RegenerateToken(parameters);\n\nConsole.WriteLine(webhook);',
      },
      http: {
        example:
          'curl https://handinger.com/api/workers/$WORKER_ID/webhook/regenerate-token \\\n    -X POST \\\n    -H "Authorization: Bearer $HANDINGER_API_KEY"',
      },
    },
  },
  {
    name: 'list_executions',
    endpoint: '/api/workers/{workerId}/webhook/executions',
    httpMethod: 'get',
    summary: 'List worker webhook executions',
    description:
      'List recent webhook delivery attempts for a worker, newest first, paginated 50 per page. Only the worker creator can read execution history.',
    stainlessPath: '(resource) workers.webhooks > (method) list_executions',
    qualified: 'client.workers.webhooks.listExecutions',
    params: ['workerId: string;', 'page?: number;'],
    response:
      "{ logs: { id: string; createdAt: string; durationMs: number; errorMessage: string; requestStatus: 'success' | 'error'; responseStatus: number; taskId: string; taskTitle: string; url: string; workerId: string; }[]; page: number; pageCount: number; totalCount: number; }",
    markdown:
      "## list_executions\n\n`client.workers.webhooks.listExecutions(workerId: string, page?: number): { logs: webhook_execution[]; page: number; pageCount: number; totalCount: number; }`\n\n**get** `/api/workers/{workerId}/webhook/executions`\n\nList recent webhook delivery attempts for a worker, newest first, paginated 50 per page. Only the worker creator can read execution history.\n\n### Parameters\n\n- `workerId: string`\n\n- `page?: number`\n  Page number (1-indexed). Defaults to 1.\n\n### Returns\n\n- `{ logs: { id: string; createdAt: string; durationMs: number; errorMessage: string; requestStatus: 'success' | 'error'; responseStatus: number; taskId: string; taskTitle: string; url: string; workerId: string; }[]; page: number; pageCount: number; totalCount: number; }`\n\n  - `logs: { id: string; createdAt: string; durationMs: number; errorMessage: string; requestStatus: 'success' | 'error'; responseStatus: number; taskId: string; taskTitle: string; url: string; workerId: string; }[]`\n  - `page: number`\n  - `pageCount: number`\n  - `totalCount: number`\n\n### Example\n\n```typescript\nimport Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger();\n\nconst webhookExecutionList = await client.workers.webhooks.listExecutions('t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM');\n\nconsole.log(webhookExecutionList);\n```",
    perLanguage: {
      typescript: {
        method: 'client.workers.webhooks.listExecutions',
        example:
          "import Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger({\n  apiKey: process.env['HANDINGER_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhookExecutionList = await client.workers.webhooks.listExecutions(\n  't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM',\n);\n\nconsole.log(webhookExecutionList.logs);",
      },
      python: {
        method: 'workers.webhooks.list_executions',
        example:
          'import os\nfrom handinger import Handinger\n\nclient = Handinger(\n    api_key=os.environ.get("HANDINGER_API_KEY"),  # This is the default and can be omitted\n)\nwebhook_execution_list = client.workers.webhooks.list_executions(\n    worker_id="t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",\n)\nprint(webhook_execution_list.logs)',
      },
      java: {
        method: 'workers().webhooks().listExecutions',
        example:
          'package com.handinger.api.example;\n\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\nimport com.handinger.api.models.workers.webhooks.WebhookExecutionList;\nimport com.handinger.api.models.workers.webhooks.WebhookListExecutionsParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        HandingerClient client = HandingerOkHttpClient.fromEnv();\n\n        WebhookExecutionList webhookExecutionList = client.workers().webhooks().listExecutions("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM");\n    }\n}',
      },
      kotlin: {
        method: 'workers().webhooks().listExecutions',
        example:
          'package com.handinger.api.example\n\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\nimport com.handinger.api.models.workers.webhooks.WebhookExecutionList\nimport com.handinger.api.models.workers.webhooks.WebhookListExecutionsParams\n\nfun main() {\n    val client: HandingerClient = HandingerOkHttpClient.fromEnv()\n\n    val webhookExecutionList: WebhookExecutionList = client.workers().webhooks().listExecutions("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n}',
      },
      go: {
        method: 'client.Workers.Webhooks.ListExecutions',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ramensoft/handinger-go"\n\t"github.com/ramensoft/handinger-go/option"\n)\n\nfunc main() {\n\tclient := handinger.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\twebhookExecutionList, err := client.Workers.Webhooks.ListExecutions(\n\t\tcontext.TODO(),\n\t\t"t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",\n\t\thandinger.WorkerWebhookListExecutionsParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", webhookExecutionList.Logs)\n}\n',
      },
      ruby: {
        method: 'workers.webhooks.list_executions',
        example:
          'require "handinger"\n\nhandinger = Handinger::Client.new(api_key: "My API Key")\n\nwebhook_execution_list = handinger.workers.webhooks.list_executions("t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM")\n\nputs(webhook_execution_list)',
      },
      cli: {
        method: 'webhooks list_executions',
        example:
          "handinger workers:webhooks list-executions \\\n  --api-key 'My API Key' \\\n  --worker-id t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM",
      },
      php: {
        method: 'workers->webhooks->listExecutions',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$webhookExecutionList = $client->workers->webhooks->listExecutions(\n  't_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM', page: 1\n);\n\nvar_dump($webhookExecutionList);",
      },
      csharp: {
        method: 'Workers.Webhooks.ListExecutions',
        example:
          'WebhookListExecutionsParams parameters = new()\n{\n    WorkerID = "t_org_123_w_01HZY2ZJQ8G7K42W2D7WF6V4GM"\n};\n\nvar webhookExecutionList = await client.Workers.Webhooks.ListExecutions(parameters);\n\nConsole.WriteLine(webhookExecutionList);',
      },
      http: {
        example:
          'curl https://handinger.com/api/workers/$WORKER_ID/webhook/executions \\\n    -H "Authorization: Bearer $HANDINGER_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/api/tasks',
    httpMethod: 'post',
    summary: 'Create a task',
    description:
      "Run a new task against an existing worker. Send a `taskId` of a prior task to add a follow-up turn instead of starting a fresh task. Send `multipart/form-data` to attach files; the bytes are bootstrapped into the worker's workspace before the task starts.",
    stainlessPath: '(resource) tasks > (method) create',
    qualified: 'client.tasks.create',
    params: [
      'input: string;',
      "budget?: 'low' | 'standard' | 'high' | 'unlimited';",
      'stream?: boolean;',
      'taskId?: string;',
      'workerId?: string;',
    ],
    response:
      "{ id: string; created_at: number; error: null; files: { filename: string; mediaType: string; url: string; }[]; incomplete_details: null; messages: object[]; metadata: object; object: 'worker'; output: { id: string; content: { text: string; type: 'output_text'; }[]; role: 'assistant'; status: 'completed'; type: 'message'; }[]; output_text: string; running: boolean; sources: { id: string; title: string; type: 'url'; url: string; }[]; status: 'running' | 'completed' | 'pending'; structured_output: object; url: string; usage?: { credits?: number; durationMs?: number; }; }",
    markdown:
      "## create\n\n`client.tasks.create(input: string, budget?: 'low' | 'standard' | 'high' | 'unlimited', stream?: boolean, taskId?: string, workerId?: string): { id: string; created_at: number; error: null; files: object[]; incomplete_details: null; messages: object[]; metadata: object; object: 'worker'; output: object[]; output_text: string; running: boolean; sources: object[]; status: 'running' | 'completed' | 'pending'; structured_output: object; url: string; usage?: object; }`\n\n**post** `/api/tasks`\n\nRun a new task against an existing worker. Send a `taskId` of a prior task to add a follow-up turn instead of starting a fresh task. Send `multipart/form-data` to attach files; the bytes are bootstrapped into the worker's workspace before the task starts.\n\n### Parameters\n\n- `input: string`\n\n- `budget?: 'low' | 'standard' | 'high' | 'unlimited'`\n  Compute budget the worker is allowed to spend on the task. Defaults to `standard`.\n\n- `stream?: boolean`\n  Stream the response as server-sent events instead of waiting for the final payload.\n\n- `taskId?: string`\n  Optional client-provided task id. Reuse this id to add turns to an existing task.\n\n- `workerId?: string`\n  Worker id the task belongs to. If omitted, a new worker is created on-the-fly using the input as instructions.\n\n### Returns\n\n- `{ id: string; created_at: number; error: null; files: { filename: string; mediaType: string; url: string; }[]; incomplete_details: null; messages: object[]; metadata: object; object: 'worker'; output: { id: string; content: { text: string; type: 'output_text'; }[]; role: 'assistant'; status: 'completed'; type: 'message'; }[]; output_text: string; running: boolean; sources: { id: string; title: string; type: 'url'; url: string; }[]; status: 'running' | 'completed' | 'pending'; structured_output: object; url: string; usage?: { credits?: number; durationMs?: number; }; }`\n\n  - `id: string`\n  - `created_at: number`\n  - `error: null`\n  - `files: { filename: string; mediaType: string; url: string; }[]`\n  - `incomplete_details: null`\n  - `messages: object[]`\n  - `metadata: object`\n  - `object: 'worker'`\n  - `output: { id: string; content: { text: string; type: 'output_text'; }[]; role: 'assistant'; status: 'completed'; type: 'message'; }[]`\n  - `output_text: string`\n  - `running: boolean`\n  - `sources: { id: string; title: string; type: 'url'; url: string; }[]`\n  - `status: 'running' | 'completed' | 'pending'`\n  - `structured_output: object`\n  - `url: string`\n  - `usage?: { credits?: number; durationMs?: number; }`\n\n### Example\n\n```typescript\nimport Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger();\n\nconst worker = await client.tasks.create({ input: 'What\\'s the weather today in Barcelona?' });\n\nconsole.log(worker);\n```",
    perLanguage: {
      typescript: {
        method: 'client.tasks.create',
        example:
          "import Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger({\n  apiKey: process.env['HANDINGER_API_KEY'], // This is the default and can be omitted\n});\n\nconst worker = await client.tasks.create({ input: \"What's the weather today in Barcelona?\" });\n\nconsole.log(worker.id);",
      },
      python: {
        method: 'tasks.create',
        example:
          'import os\nfrom handinger import Handinger\n\nclient = Handinger(\n    api_key=os.environ.get("HANDINGER_API_KEY"),  # This is the default and can be omitted\n)\nworker = client.tasks.create(\n    input="What\'s the weather today in Barcelona?",\n)\nprint(worker.id)',
      },
      java: {
        method: 'tasks().create',
        example:
          'package com.handinger.api.example;\n\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\nimport com.handinger.api.models.tasks.CreateTask;\nimport com.handinger.api.models.workers.Worker;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        HandingerClient client = HandingerOkHttpClient.fromEnv();\n\n        CreateTask params = CreateTask.builder()\n            .input("What\'s the weather today in Barcelona?")\n            .build();\n        Worker worker = client.tasks().create(params);\n    }\n}',
      },
      kotlin: {
        method: 'tasks().create',
        example:
          'package com.handinger.api.example\n\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\nimport com.handinger.api.models.tasks.CreateTask\nimport com.handinger.api.models.workers.Worker\n\nfun main() {\n    val client: HandingerClient = HandingerOkHttpClient.fromEnv()\n\n    val params: CreateTask = CreateTask.builder()\n        .input("What\'s the weather today in Barcelona?")\n        .build()\n    val worker: Worker = client.tasks().create(params)\n}',
      },
      go: {
        method: 'client.Tasks.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ramensoft/handinger-go"\n\t"github.com/ramensoft/handinger-go/option"\n)\n\nfunc main() {\n\tclient := handinger.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tworker, err := client.Tasks.New(context.TODO(), handinger.TaskNewParams{\n\t\tCreateTask: handinger.CreateTaskParam{\n\t\t\tInput: "What\'s the weather today in Barcelona?",\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", worker.ID)\n}\n',
      },
      ruby: {
        method: 'tasks.create',
        example:
          'require "handinger"\n\nhandinger = Handinger::Client.new(api_key: "My API Key")\n\nworker = handinger.tasks.create(input: "What\'s the weather today in Barcelona?")\n\nputs(worker)',
      },
      cli: {
        method: 'tasks create',
        example:
          "handinger tasks create \\\n  --api-key 'My API Key' \\\n  --input \"What's the weather today in Barcelona?\"",
      },
      php: {
        method: 'tasks->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$worker = $client->tasks->create(\n  input: 'What\\'s the weather today in Barcelona?',\n  budget: 'standard',\n  stream: false,\n  taskID: 'tsk_2Z-YWz3hFq6VlW',\n  workerID: 'wrk_vk81XUHKHG-qr4',\n);\n\nvar_dump($worker);",
      },
      csharp: {
        method: 'Tasks.Create',
        example:
          'TaskCreateParams parameters = new()\n{\n    Input = "What\'s the weather today in Barcelona?"\n};\n\nvar worker = await client.Tasks.Create(parameters);\n\nConsole.WriteLine(worker);',
      },
      http: {
        example:
          'curl https://handinger.com/api/tasks \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $HANDINGER_API_KEY" \\\n    -d "{\n          \\"input\\": \\"What\'s the weather today in Barcelona?\\",\n          \\"budget\\": \\"standard\\",\n          \\"stream\\": false,\n          \\"taskId\\": \\"tsk_2Z-YWz3hFq6VlW\\",\n          \\"workerId\\": \\"wrk_vk81XUHKHG-qr4\\"\n        }"',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/api/tasks/{taskId}',
    httpMethod: 'get',
    summary: 'Retrieve a task with its turns',
    description: 'Retrieve a single task and its individual turns.',
    stainlessPath: '(resource) tasks > (method) retrieve',
    qualified: 'client.tasks.retrieve',
    params: ['taskId: string;'],
    response:
      "{ task: { id: string; completedAt: string; createdAt: string; createdByUserId: string; organizationId: string; status: 'pending' | 'running' | 'completed' | 'error' | 'aborted'; title: string; totals: object; triggeredBy: 'api' | 'email' | 'schedule' | 'ui'; url: string; workerId: string; }; turns: { id: string; completedAt: string; credits: number; durationMs: number; input: string; inputTokens: number; outputText: string; outputTokens: number; role: string; seq: number; startedAt: string; status: string; structuredOutput: object; taskId: string; }[]; }",
    markdown:
      "## retrieve\n\n`client.tasks.retrieve(taskId: string): { task: task; turns: object[]; }`\n\n**get** `/api/tasks/{taskId}`\n\nRetrieve a single task and its individual turns.\n\n### Parameters\n\n- `taskId: string`\n\n### Returns\n\n- `{ task: { id: string; completedAt: string; createdAt: string; createdByUserId: string; organizationId: string; status: 'pending' | 'running' | 'completed' | 'error' | 'aborted'; title: string; totals: object; triggeredBy: 'api' | 'email' | 'schedule' | 'ui'; url: string; workerId: string; }; turns: { id: string; completedAt: string; credits: number; durationMs: number; input: string; inputTokens: number; outputText: string; outputTokens: number; role: string; seq: number; startedAt: string; status: string; structuredOutput: object; taskId: string; }[]; }`\n\n  - `task: { id: string; completedAt: string; createdAt: string; createdByUserId: string; organizationId: string; status: 'pending' | 'running' | 'completed' | 'error' | 'aborted'; title: string; totals: { credits: number; durationMs: number; turnCount: number; }; triggeredBy: 'api' | 'email' | 'schedule' | 'ui'; url: string; workerId: string; }`\n  - `turns: { id: string; completedAt: string; credits: number; durationMs: number; input: string; inputTokens: number; outputText: string; outputTokens: number; role: string; seq: number; startedAt: string; status: string; structuredOutput: object; taskId: string; }[]`\n\n### Example\n\n```typescript\nimport Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger();\n\nconst taskWithTurns = await client.tasks.retrieve('tsk_01HZY31W2SZJ8MJ2FQTR3M1K9D');\n\nconsole.log(taskWithTurns);\n```",
    perLanguage: {
      typescript: {
        method: 'client.tasks.retrieve',
        example:
          "import Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger({\n  apiKey: process.env['HANDINGER_API_KEY'], // This is the default and can be omitted\n});\n\nconst taskWithTurns = await client.tasks.retrieve('tsk_01HZY31W2SZJ8MJ2FQTR3M1K9D');\n\nconsole.log(taskWithTurns.task);",
      },
      python: {
        method: 'tasks.retrieve',
        example:
          'import os\nfrom handinger import Handinger\n\nclient = Handinger(\n    api_key=os.environ.get("HANDINGER_API_KEY"),  # This is the default and can be omitted\n)\ntask_with_turns = client.tasks.retrieve(\n    "tsk_01HZY31W2SZJ8MJ2FQTR3M1K9D",\n)\nprint(task_with_turns.task)',
      },
      java: {
        method: 'tasks().retrieve',
        example:
          'package com.handinger.api.example;\n\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\nimport com.handinger.api.models.tasks.TaskRetrieveParams;\nimport com.handinger.api.models.tasks.TaskWithTurns;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        HandingerClient client = HandingerOkHttpClient.fromEnv();\n\n        TaskWithTurns taskWithTurns = client.tasks().retrieve("tsk_01HZY31W2SZJ8MJ2FQTR3M1K9D");\n    }\n}',
      },
      kotlin: {
        method: 'tasks().retrieve',
        example:
          'package com.handinger.api.example\n\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\nimport com.handinger.api.models.tasks.TaskRetrieveParams\nimport com.handinger.api.models.tasks.TaskWithTurns\n\nfun main() {\n    val client: HandingerClient = HandingerOkHttpClient.fromEnv()\n\n    val taskWithTurns: TaskWithTurns = client.tasks().retrieve("tsk_01HZY31W2SZJ8MJ2FQTR3M1K9D")\n}',
      },
      go: {
        method: 'client.Tasks.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ramensoft/handinger-go"\n\t"github.com/ramensoft/handinger-go/option"\n)\n\nfunc main() {\n\tclient := handinger.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttaskWithTurns, err := client.Tasks.Get(context.TODO(), "tsk_01HZY31W2SZJ8MJ2FQTR3M1K9D")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", taskWithTurns.Task)\n}\n',
      },
      ruby: {
        method: 'tasks.retrieve',
        example:
          'require "handinger"\n\nhandinger = Handinger::Client.new(api_key: "My API Key")\n\ntask_with_turns = handinger.tasks.retrieve("tsk_01HZY31W2SZJ8MJ2FQTR3M1K9D")\n\nputs(task_with_turns)',
      },
      cli: {
        method: 'tasks retrieve',
        example:
          "handinger tasks retrieve \\\n  --api-key 'My API Key' \\\n  --task-id tsk_01HZY31W2SZJ8MJ2FQTR3M1K9D",
      },
      php: {
        method: 'tasks->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$taskWithTurns = $client->tasks->retrieve('tsk_01HZY31W2SZJ8MJ2FQTR3M1K9D');\n\nvar_dump($taskWithTurns);",
      },
      csharp: {
        method: 'Tasks.Retrieve',
        example:
          'TaskRetrieveParams parameters = new()\n{\n    TaskID = "tsk_01HZY31W2SZJ8MJ2FQTR3M1K9D"\n};\n\nvar taskWithTurns = await client.Tasks.Retrieve(parameters);\n\nConsole.WriteLine(taskWithTurns);',
      },
      http: {
        example:
          'curl https://handinger.com/api/tasks/$TASK_ID \\\n    -H "Authorization: Bearer $HANDINGER_API_KEY"',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/api/tasks/{taskId}',
    httpMethod: 'delete',
    summary: 'Archive a task',
    description:
      'Archive a task so it stops appearing in `GET /tasks` results. Turns and files are retained for audit purposes. Only the worker creator can archive a task.',
    stainlessPath: '(resource) tasks > (method) delete',
    qualified: 'client.tasks.delete',
    params: ['taskId: string;'],
    response: '{ archived: boolean; }',
    markdown:
      "## delete\n\n`client.tasks.delete(taskId: string): { archived: boolean; }`\n\n**delete** `/api/tasks/{taskId}`\n\nArchive a task so it stops appearing in `GET /tasks` results. Turns and files are retained for audit purposes. Only the worker creator can archive a task.\n\n### Parameters\n\n- `taskId: string`\n\n### Returns\n\n- `{ archived: boolean; }`\n\n  - `archived: boolean`\n\n### Example\n\n```typescript\nimport Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger();\n\nconst deleteTaskResponse = await client.tasks.delete('tsk_01HZY31W2SZJ8MJ2FQTR3M1K9D');\n\nconsole.log(deleteTaskResponse);\n```",
    perLanguage: {
      typescript: {
        method: 'client.tasks.delete',
        example:
          "import Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger({\n  apiKey: process.env['HANDINGER_API_KEY'], // This is the default and can be omitted\n});\n\nconst deleteTaskResponse = await client.tasks.delete('tsk_01HZY31W2SZJ8MJ2FQTR3M1K9D');\n\nconsole.log(deleteTaskResponse.archived);",
      },
      python: {
        method: 'tasks.delete',
        example:
          'import os\nfrom handinger import Handinger\n\nclient = Handinger(\n    api_key=os.environ.get("HANDINGER_API_KEY"),  # This is the default and can be omitted\n)\ndelete_task_response = client.tasks.delete(\n    "tsk_01HZY31W2SZJ8MJ2FQTR3M1K9D",\n)\nprint(delete_task_response.archived)',
      },
      java: {
        method: 'tasks().delete',
        example:
          'package com.handinger.api.example;\n\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\nimport com.handinger.api.models.tasks.DeleteTaskResponse;\nimport com.handinger.api.models.tasks.TaskDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        HandingerClient client = HandingerOkHttpClient.fromEnv();\n\n        DeleteTaskResponse deleteTaskResponse = client.tasks().delete("tsk_01HZY31W2SZJ8MJ2FQTR3M1K9D");\n    }\n}',
      },
      kotlin: {
        method: 'tasks().delete',
        example:
          'package com.handinger.api.example\n\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\nimport com.handinger.api.models.tasks.DeleteTaskResponse\nimport com.handinger.api.models.tasks.TaskDeleteParams\n\nfun main() {\n    val client: HandingerClient = HandingerOkHttpClient.fromEnv()\n\n    val deleteTaskResponse: DeleteTaskResponse = client.tasks().delete("tsk_01HZY31W2SZJ8MJ2FQTR3M1K9D")\n}',
      },
      go: {
        method: 'client.Tasks.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ramensoft/handinger-go"\n\t"github.com/ramensoft/handinger-go/option"\n)\n\nfunc main() {\n\tclient := handinger.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tdeleteTaskResponse, err := client.Tasks.Delete(context.TODO(), "tsk_01HZY31W2SZJ8MJ2FQTR3M1K9D")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", deleteTaskResponse.Archived)\n}\n',
      },
      ruby: {
        method: 'tasks.delete',
        example:
          'require "handinger"\n\nhandinger = Handinger::Client.new(api_key: "My API Key")\n\ndelete_task_response = handinger.tasks.delete("tsk_01HZY31W2SZJ8MJ2FQTR3M1K9D")\n\nputs(delete_task_response)',
      },
      cli: {
        method: 'tasks delete',
        example:
          "handinger tasks delete \\\n  --api-key 'My API Key' \\\n  --task-id tsk_01HZY31W2SZJ8MJ2FQTR3M1K9D",
      },
      php: {
        method: 'tasks->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$deleteTaskResponse = $client->tasks->delete('tsk_01HZY31W2SZJ8MJ2FQTR3M1K9D');\n\nvar_dump($deleteTaskResponse);",
      },
      csharp: {
        method: 'Tasks.Delete',
        example:
          'TaskDeleteParams parameters = new()\n{\n    TaskID = "tsk_01HZY31W2SZJ8MJ2FQTR3M1K9D"\n};\n\nvar deleteTaskResponse = await client.Tasks.Delete(parameters);\n\nConsole.WriteLine(deleteTaskResponse);',
      },
      http: {
        example:
          'curl https://handinger.com/api/tasks/$TASK_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $HANDINGER_API_KEY"',
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'cli',
    content:
      "# Handinger CLI\n\nThe official CLI for the [Handinger REST API](https://docs.handinger.com).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n<!-- x-release-please-start-version -->\n\n## Installation\n\n### Installing with Homebrew\n\n~~~sh\nbrew install ramensoft/tools/handinger\n~~~\n\n### Installing with Go\n\nTo test or install the CLI locally, you need [Go](https://go.dev/doc/install) version 1.22 or later installed.\n\n~~~sh\ngo install 'github.com/ramensoft/handinger-cli/cmd/handinger@latest'\n~~~\n\nOnce you have run `go install`, the binary is placed in your Go bin directory:\n\n- **Default location**: `$HOME/go/bin` (or `$GOPATH/bin` if GOPATH is set)\n- **Check your path**: Run `go env GOPATH` to see the base directory\n\nIf commands aren't found after installation, add the Go bin directory to your PATH:\n\n~~~sh\n# Add to your shell profile (.zshrc, .bashrc, etc.)\nexport PATH=\"$PATH:$(go env GOPATH)/bin\"\n~~~\n\n<!-- x-release-please-end -->\n\n### Running Locally\n\nAfter cloning the git repository for this project, you can use the\n`scripts/run` script to run the tool locally:\n\n~~~sh\n./scripts/run args...\n~~~\n\n## Usage\n\nThe CLI follows a resource-based command structure:\n\n~~~sh\nhandinger [resource] <command> [flags...]\n~~~\n\n~~~sh\nhandinger tasks create \\\n  --api-key 'My API Key' \\\n  --input \"What's the weather today in Barcelona?\" \\\n  --worker-id wrk_vk81XUHKHG-qr4\n~~~\n\nFor details about specific commands, use the `--help` flag.\n\n### Environment variables\n\n| Environment variable | Required |\n| -------------------- | -------- |\n| `HANDINGER_API_KEY`  | yes      |\n\n### Global flags\n\n- `--api-key` (can also be set with `HANDINGER_API_KEY` env var)\n- `--help` - Show command line usage\n- `--debug` - Enable debug logging (includes HTTP request/response details)\n- `--version`, `-v` - Show the CLI version\n- `--base-url` - Use a custom API backend URL\n- `--format` - Change the output format (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--format-error` - Change the output format for errors (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--transform` - Transform the data output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n- `--transform-error` - Transform the error output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n\n### Passing files as arguments\n\nTo pass files to your API, you can use the `@myfile.ext` syntax:\n\n~~~bash\nhandinger <command> --arg @abe.jpg\n~~~\n\nFiles can also be passed inside JSON or YAML blobs:\n\n~~~bash\nhandinger <command> --arg '{image: \"@abe.jpg\"}'\n# Equivalent:\nhandinger <command> <<YAML\narg:\n  image: \"@abe.jpg\"\nYAML\n~~~\n\nIf you need to pass a string literal that begins with an `@` sign, you can\nescape the `@` sign to avoid accidentally passing a file.\n\n~~~bash\nhandinger <command> --username '\\@abe'\n~~~\n\n#### Explicit encoding\n\nFor JSON endpoints, the CLI tool does filetype sniffing to determine whether the\nfile contents should be sent as a string literal (for plain text files) or as a\nbase64-encoded string literal (for binary files). If you need to explicitly send\nthe file as either plain text or base64-encoded data, you can use\n`@file://myfile.txt` (for string encoding) or `@data://myfile.dat` (for\nbase64-encoding). Note that absolute paths will begin with `@file://` or\n`@data://`, followed by a third `/` (for example, `@file:///tmp/file.txt`).\n\n~~~bash\nhandinger <command> --arg @data://file.txt\n~~~\n\n## Linking different Go SDK versions\n\nYou can link the CLI against a different version of the Handinger Go SDK\nfor development purposes using the `./scripts/link` script.\n\nTo link to a specific version from a repository (version can be a branch,\ngit tag, or commit hash):\n\n~~~bash\n./scripts/link github.com/org/repo@version\n~~~\n\nTo link to a local copy of the SDK:\n\n~~~bash\n./scripts/link ../path/to/handinger-go\n~~~\n\nIf you run the link script without any arguments, it will default to `../handinger-go`.\n",
  },
  {
    language: 'csharp',
    content:
      '# Handinger C# API Library\n\nThe Handinger C# SDK provides convenient access to the [Handinger REST API](https://docs.handinger.com) from applications written in   C#.\n\n## Installation\n\n```bash\ngit clone git@github.com:stainless-sdks/handinger-csharp.git\ndotnet add reference handinger-csharp/src/Handinger\n```\n\n## Requirements\n\nThis library requires .NET Standard 2.0 or later.\n\n## Usage\n\nSee the [`examples`](examples) directory for complete and runnable examples.\n\n```csharp\nHandingerClient client = new();\n\nTaskCreateParams parameters = new()\n{\n    Input = "What\'s the weather today in Barcelona?",\n    WorkerID = "wrk_vk81XUHKHG-qr4",\n};\n\nvar worker = await client.Tasks.Create(parameters);\n\nConsole.WriteLine(worker);\n```',
  },
  {
    language: 'go',
    content:
      '# Handinger Go API Library\n\n<a href="https://pkg.go.dev/github.com/ramensoft/handinger-go"><img src="https://pkg.go.dev/badge/github.com/ramensoft/handinger-go.svg" alt="Go Reference"></a>\n\nThe Handinger Go library provides convenient access to the [Handinger REST API](https://docs.handinger.com)\nfrom applications written in Go.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Handinger MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40ramensoft%2Fhandinger-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkByYW1lbnNvZnQvaGFuZGluZ2VyLW1jcCJdLCJlbnYiOnsiSEFORElOR0VSX0FQSV9LRVkiOiJNeSBBUEkgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40ramensoft%2Fhandinger-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40ramensoft%2Fhandinger-mcp%22%5D%2C%22env%22%3A%7B%22HANDINGER_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n```go\nimport (\n\t"github.com/ramensoft/handinger-go" // imported as SDK_PackageName\n)\n```\n\n<!-- x-release-please-end -->\n\nOr to pin the version:\n\n<!-- x-release-please-start-version -->\n\n```sh\ngo get -u \'github.com/ramensoft/handinger-go@v0.0.1\'\n```\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ramensoft/handinger-go"\n\t"github.com/ramensoft/handinger-go/option"\n)\n\nfunc main() {\n\tclient := handinger.NewClient(\n\t\toption.WithAPIKey("My API Key"), // defaults to os.LookupEnv("HANDINGER_API_KEY")\n\t)\n\tworker, err := client.Tasks.New(context.TODO(), handinger.TaskNewParams{\n\t\tCreateTask: handinger.CreateTaskParam{\n\t\t\tInput: "What\'s the weather today in Barcelona?",\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", worker.ID)\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.Tasks.New(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/ramensoft/handinger-go/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\n_, err := client.Tasks.New(context.TODO(), handinger.TaskNewParams{\n\tCreateTask: handinger.CreateTaskParam{\n\t\tInput: "What\'s the weather today in Barcelona?",\n\t},\n})\nif err != nil {\n\tvar apierr *handinger.Error\n\tif errors.As(err, &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t}\n\tpanic(err.Error()) // GET "/api/tasks": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.Tasks.New(\n\tctx,\n\thandinger.TaskNewParams{\n\t\tCreateTask: handinger.CreateTaskParam{\n\t\t\tInput: "What\'s the weather today in Barcelona?",\n\t\t},\n\t},\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := handinger.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.Tasks.New(\n\tcontext.TODO(),\n\thandinger.TaskNewParams{\n\t\tCreateTask: handinger.CreateTaskParam{\n\t\t\tInput: "What\'s the weather today in Barcelona?",\n\t\t},\n\t},\n\toption.WithMaxRetries(5),\n)\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\nworker, err := client.Tasks.New(\n\tcontext.TODO(),\n\thandinger.TaskNewParams{\n\t\tCreateTask: handinger.CreateTaskParam{\n\t\t\tInput: "What\'s the weather today in Barcelona?",\n\t\t},\n\t},\n\toption.WithResponseInto(&response),\n)\nif err != nil {\n\t// handle error\n}\nfmt.Printf("%+v\\n", worker)\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/ramensoft/handinger-go/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'java',
    content:
      '# Handinger Java API Library\n\n\n[![Maven Central](https://img.shields.io/maven-central/v/com.handinger.api/handinger-java)](https://central.sonatype.com/artifact/com.handinger.api/handinger-java/0.0.1)\n[![javadoc](https://javadoc.io/badge2/com.handinger.api/handinger-java/0.0.1/javadoc.svg)](https://javadoc.io/doc/com.handinger.api/handinger-java/0.0.1)\n\n\nThe Handinger Java SDK provides convenient access to the [Handinger REST API](https://docs.handinger.com)   from applications written in Java.\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Handinger MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40ramensoft%2Fhandinger-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkByYW1lbnNvZnQvaGFuZGluZ2VyLW1jcCJdLCJlbnYiOnsiSEFORElOR0VSX0FQSV9LRVkiOiJNeSBBUEkgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40ramensoft%2Fhandinger-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40ramensoft%2Fhandinger-mcp%22%5D%2C%22env%22%3A%7B%22HANDINGER_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\nThe REST API documentation can be found on [docs.handinger.com](https://docs.handinger.com). Javadocs are available on [javadoc.io](https://javadoc.io/doc/com.handinger.api/handinger-java/0.0.1).\n\n## Installation\n\n### Gradle\n\n~~~kotlin\nimplementation("com.handinger.api:handinger-java:0.0.1")\n~~~\n\n### Maven\n\n~~~xml\n<dependency>\n  <groupId>com.handinger.api</groupId>\n  <artifactId>handinger-java</artifactId>\n  <version>0.0.1</version>\n</dependency>\n~~~\n\n## Requirements\n\nThis library requires Java 8 or later.\n\n## Usage\n\n```java\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\nimport com.handinger.api.models.tasks.CreateTask;\nimport com.handinger.api.models.workers.Worker;\n\n// Configures using the `handinger.apiKey` and `handinger.baseUrl` system properties\n// Or configures using the `HANDINGER_API_KEY` and `HANDINGER_BASE_URL` environment variables\nHandingerClient client = HandingerOkHttpClient.fromEnv();\n\nCreateTask params = CreateTask.builder()\n    .input("What\'s the weather today in Barcelona?")\n    .build();\nWorker worker = client.tasks().create(params);\n```\n\n## Client configuration\n\nConfigure the client using system properties or environment variables:\n\n```java\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\n\n// Configures using the `handinger.apiKey` and `handinger.baseUrl` system properties\n// Or configures using the `HANDINGER_API_KEY` and `HANDINGER_BASE_URL` environment variables\nHandingerClient client = HandingerOkHttpClient.fromEnv();\n```\n\nOr manually:\n\n```java\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\n\nHandingerClient client = HandingerOkHttpClient.builder()\n    .apiKey("My API Key")\n    .build();\n```\n\nOr using a combination of the two approaches:\n\n```java\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\n\nHandingerClient client = HandingerOkHttpClient.builder()\n    // Configures using the `handinger.apiKey` and `handinger.baseUrl` system properties\n    // Or configures using the `HANDINGER_API_KEY` and `HANDINGER_BASE_URL` environment variables\n    .fromEnv()\n    .apiKey("My API Key")\n    .build();\n```\n\nSee this table for the available options:\n\n| Setter    | System property     | Environment variable | Required | Default value             |\n| --------- | ------------------- | -------------------- | -------- | ------------------------- |\n| `apiKey`  | `handinger.apiKey`  | `HANDINGER_API_KEY`  | true     | -                         |\n| `baseUrl` | `handinger.baseUrl` | `HANDINGER_BASE_URL` | true     | `"https://handinger.com"` |\n\nSystem properties take precedence over environment variables.\n\n> [!TIP]\n> Don\'t create more than one client in the same application. Each client has a connection pool and\n> thread pools, which are more efficient to share between requests.\n\n### Modifying configuration\n\nTo temporarily use a modified client configuration, while reusing the same connection and thread       pools, call `withOptions()` on any client or service:\n\n```java\nimport com.handinger.api.client.HandingerClient;\n\nHandingerClient clientWithOptions = client.withOptions(optionsBuilder -> {\n    optionsBuilder.baseUrl("https://example.com");\n    optionsBuilder.maxRetries(42);\n});\n```\n\nThe `withOptions()` method does not affect the original client or service.\n\n## Requests and responses\n\nTo send a request to the Handinger API, build an instance of some `Params` class and pass it to the     corresponding client method. When the response is received, it will be deserialized into an instance of     a Java class.\n\nFor example, `client.tasks().create(...)` should be called with an instance of `TaskCreateParams`, and it     will return an instance of `Worker`.\n\n## Immutability\n\nEach class in the SDK has an associated   [builder](https://blogs.oracle.com/javamagazine/post/exploring-joshua-blochs-builder-design-pattern-in-java)   or factory method for constructing it.\n\nEach class is [immutable](https://docs.oracle.com/javase/tutorial/essential/concurrency/immutable.html)   once constructed. If the class has an associated builder, then it has a `toBuilder()` method, which can   be used to convert it back to a builder for making a modified copy.\n\nBecause each class is immutable, builder modification will _never_ affect already built class instances.\n\n## Asynchronous execution\n\nThe default client is synchronous. To switch to asynchronous execution, call the `async()` method:\n\n```java\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\nimport com.handinger.api.models.tasks.CreateTask;\nimport com.handinger.api.models.workers.Worker;\nimport java.util.concurrent.CompletableFuture;\n\n// Configures using the `handinger.apiKey` and `handinger.baseUrl` system properties\n// Or configures using the `HANDINGER_API_KEY` and `HANDINGER_BASE_URL` environment variables\nHandingerClient client = HandingerOkHttpClient.fromEnv();\n\nCreateTask params = CreateTask.builder()\n    .input("What\'s the weather today in Barcelona?")\n    .build();\nCompletableFuture<Worker> worker = client.async().tasks().create(params);\n```\n\nOr create an asynchronous client from the beginning:\n\n```java\nimport com.handinger.api.client.HandingerClientAsync;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClientAsync;\nimport com.handinger.api.models.tasks.CreateTask;\nimport com.handinger.api.models.workers.Worker;\nimport java.util.concurrent.CompletableFuture;\n\n// Configures using the `handinger.apiKey` and `handinger.baseUrl` system properties\n// Or configures using the `HANDINGER_API_KEY` and `HANDINGER_BASE_URL` environment variables\nHandingerClientAsync client = HandingerOkHttpClientAsync.fromEnv();\n\nCreateTask params = CreateTask.builder()\n    .input("What\'s the weather today in Barcelona?")\n    .build();\nCompletableFuture<Worker> worker = client.tasks().create(params);\n```\n\nThe asynchronous client supports the same options as the synchronous one, except most methods return `CompletableFuture`s.\n\n\n\n\n\n\n\n## Raw responses\n\nThe SDK defines methods that deserialize responses into instances of Java classes.       However, these methods don\'t provide access to the response headers, status code, or the raw response       body.\n\nTo access this data, prefix any HTTP method call on a client or service with `withRawResponse()`:\n\n```java\nimport com.handinger.api.core.http.Headers;\nimport com.handinger.api.core.http.HttpResponseFor;\nimport com.handinger.api.models.tasks.CreateTask;\nimport com.handinger.api.models.workers.Worker;\n\nCreateTask params = CreateTask.builder()\n    .input("What\'s the weather today in Barcelona?")\n    .build();\nHttpResponseFor<Worker> worker = client.tasks().withRawResponse().create(params);\n\nint statusCode = worker.statusCode();\nHeaders headers = worker.headers();\n```\n\nYou can still deserialize the response into an instance of a Java class if needed:\n\n```java\nimport com.handinger.api.models.workers.Worker;\n\nWorker parsedWorker = worker.parse();\n```\n\n## Error handling\n\nThe SDK throws custom unchecked exception types:\n\n- [`HandingerServiceException`](handinger-java-core/src/main/kotlin/com/handinger/api/errors/HandingerServiceException.kt): Base class for HTTP errors. See this table for which exception       subclass is thrown for each HTTP status code:\n\n  | Status | Exception                                          |\n  | ------ | -------------------------------------------------- |\n  | 400    | [`BadRequestException`](handinger-java-core/src/main/kotlin/com/handinger/api/errors/BadRequestException.kt)           |\n  | 401    | [`UnauthorizedException`](handinger-java-core/src/main/kotlin/com/handinger/api/errors/UnauthorizedException.kt)         |\n  | 403    | [`PermissionDeniedException`](handinger-java-core/src/main/kotlin/com/handinger/api/errors/PermissionDeniedException.kt)     |\n  | 404    | [`NotFoundException`](handinger-java-core/src/main/kotlin/com/handinger/api/errors/NotFoundException.kt)             |\n  | 422    | [`UnprocessableEntityException`](handinger-java-core/src/main/kotlin/com/handinger/api/errors/UnprocessableEntityException.kt)  |\n  | 429    | [`RateLimitException`](handinger-java-core/src/main/kotlin/com/handinger/api/errors/RateLimitException.kt)            |\n  | 5xx    | [`InternalServerException`](handinger-java-core/src/main/kotlin/com/handinger/api/errors/InternalServerException.kt)       |\n  | others | [`UnexpectedStatusCodeException`](handinger-java-core/src/main/kotlin/com/handinger/api/errors/UnexpectedStatusCodeException.kt) |\n\n- [`HandingerIoException`](handinger-java-core/src/main/kotlin/com/handinger/api/errors/HandingerIoException.kt): I/O networking errors.\n\n- [`HandingerRetryableException`](handinger-java-core/src/main/kotlin/com/handinger/api/errors/HandingerRetryableException.kt): Generic error indicating a failure that could be retried by the client.\n\n- [`HandingerInvalidDataException`](handinger-java-core/src/main/kotlin/com/handinger/api/errors/HandingerInvalidDataException.kt): Failure to interpret successfully parsed data. For example,       when accessing a property that\'s supposed to be required, but the API unexpectedly omitted it from the       response.\n\n- [`HandingerException`](handinger-java-core/src/main/kotlin/com/handinger/api/errors/HandingerException.kt): Base class for all exceptions. Most errors will result in one of the       previously mentioned ones, but completely generic errors may be thrown using the base class.\n\n\n\n## Logging\n\nEnable logging by setting the `HANDINGER_LOG` environment variable to   `info`:\n\n```sh\nexport HANDINGER_LOG=info\n```\n\nOr to `debug` for more verbose logging:\n\n```sh\nexport HANDINGER_LOG=debug\n```\n\nOr configure the client manually using the `logLevel` method:\n\n```java\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\nimport com.handinger.api.core.LogLevel;\n\nHandingerClient client = HandingerOkHttpClient.builder()\n    .fromEnv()\n    .logLevel(LogLevel.INFO)\n    .build();\n```\n\n## ProGuard and R8\n\nAlthough the SDK uses reflection, it is still usable with     [ProGuard](https://github.com/Guardsquare/proguard) and     [R8](https://developer.android.com/topic/performance/app-optimization/enable-app-optimization) because     `handinger-java-core` is published with a     [configuration file](handinger-java-core/src/main/resources/META-INF/proguard/handinger-java-core.pro) containing     [keep rules](https://www.guardsquare.com/manual/configuration/usage).\n\nProGuard and R8 should automatically detect and use the published rules, but you can also manually copy     the keep rules if necessary.\n\n\n\n\n\n## Jackson\n\nThe SDK depends on [Jackson](https://github.com/FasterXML/jackson) for JSON     serialization/deserialization. It is compatible with version 2.13.4 or higher,     but depends on version 2.18.2 by default.\n\nThe SDK throws an exception if it detects an incompatible Jackson version at runtime (e.g. if the     default version was overridden in your Maven or Gradle config).\n\nIf the SDK threw an exception, but you\'re _certain_ the version is compatible, then disable the version     check using the `checkJacksonVersionCompatibility` on [`HandingerOkHttpClient`](handinger-java-client-okhttp/src/main/kotlin/com/handinger/api/client/okhttp/HandingerOkHttpClient.kt) or     [`HandingerOkHttpClientAsync`](handinger-java-client-okhttp/src/main/kotlin/com/handinger/api/client/okhttp/HandingerOkHttpClientAsync.kt).\n\n> [!CAUTION]\n> We make no guarantee that the SDK works correctly when the Jackson version check is disabled.\n\nAlso note that there are bugs in older Jackson versions that can affect the SDK. We don\'t work around all     Jackson bugs ([example](https://github.com/FasterXML/jackson-databind/issues/3240)) and expect users to     upgrade Jackson for those instead.\n\n## Network options\n\n### Retries\n\nThe SDK automatically retries 2 times by default, with a short exponential backoff between requests.\n\nOnly the following error types are retried:\n- Connection errors (for example, due to a network connectivity problem)\n- 408 Request Timeout\n- 409 Conflict\n- 429 Rate Limit\n- 5xx Internal\n\nThe API may also explicitly instruct the SDK to retry or not retry a request.\n\nTo set a custom number of retries, configure the client using the `maxRetries` method:\n\n```java\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\n\nHandingerClient client = HandingerOkHttpClient.builder()\n    .fromEnv()\n    .maxRetries(4)\n    .build();\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default.\n\nTo set a custom timeout, configure the method call using the `timeout` method:\n\n```java\nimport com.handinger.api.models.workers.Worker;\n\nWorker worker = client.tasks().create(\n  params, RequestOptions.builder().timeout(Duration.ofSeconds(30)).build()\n);\n```\n\nOr configure the default for all method calls at the client level:\n\n```java\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\nimport java.time.Duration;\n\nHandingerClient client = HandingerOkHttpClient.builder()\n    .fromEnv()\n    .timeout(Duration.ofSeconds(30))\n    .build();\n```\n\n### Proxies\n\nTo route requests through a proxy, configure the client using the `proxy` method:\n\n```java\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\nimport java.net.InetSocketAddress;\nimport java.net.Proxy;\n\nHandingerClient client = HandingerOkHttpClient.builder()\n    .fromEnv()\n    .proxy(new Proxy(\n      Proxy.Type.HTTP, new InetSocketAddress(\n        "https://example.com", 8080\n      )\n    ))\n    .build();\n```\n\nIf the proxy responds with `407 Proxy Authentication Required`, supply credentials by also   configuring `proxyAuthenticator`:\n\n```java\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\nimport com.handinger.api.core.http.ProxyAuthenticator;\n\nHandingerClient client = HandingerOkHttpClient.builder()\n    .fromEnv()\n    .proxy(...)\n    // Or a custom implementation of `ProxyAuthenticator`.\n    .proxyAuthenticator(ProxyAuthenticator.basic("username", "password"))\n    .build();\n```\n\n### Connection pooling\n\nTo customize the underlying OkHttp connection pool, configure the client using the   `maxIdleConnections` and `keepAliveDuration` methods:\n\n```java\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\nimport java.time.Duration;\n\nHandingerClient client = HandingerOkHttpClient.builder()\n    .fromEnv()\n    // If `maxIdleConnections` is set, then `keepAliveDuration` must be set, and vice versa.\n    .maxIdleConnections(10)\n    .keepAliveDuration(Duration.ofMinutes(2))\n    .build();\n```\n\nIf both options are unset, OkHttp\'s default connection pool settings are used.\n\n### HTTPS\n\n> [!NOTE]\n> Most applications should not call these methods, and instead use the system defaults. The defaults include\n> special optimizations that can be lost if the implementations are modified.\n\nTo configure how HTTPS connections are secured, configure the client using the `sslSocketFactory`,   `trustManager`, and `hostnameVerifier` methods:\n\n```java\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\n\nHandingerClient client = HandingerOkHttpClient.builder()\n    .fromEnv()\n    // If `sslSocketFactory` is set, then `trustManager` must be set, and vice versa.\n    .sslSocketFactory(yourSSLSocketFactory)\n    .trustManager(yourTrustManager)\n    .hostnameVerifier(yourHostnameVerifier)\n    .build();\n```\n\n\n\n### Custom HTTP client\n\nThe SDK consists of three artifacts:\n- `handinger-java-core`\n  - Contains core SDK logic\n  - Does not depend on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`HandingerClient`](handinger-java-core/src/main/kotlin/com/handinger/api/client/HandingerClient.kt), [`HandingerClientAsync`](handinger-java-core/src/main/kotlin/com/handinger/api/client/HandingerClientAsync.kt),             [`HandingerClientImpl`](handinger-java-core/src/main/kotlin/com/handinger/api/client/HandingerClientImpl.kt), and [`HandingerClientAsyncImpl`](handinger-java-core/src/main/kotlin/com/handinger/api/client/HandingerClientAsyncImpl.kt), all of which can             work with any HTTP client\n- `handinger-java-client-okhttp`\n  - Depends on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`HandingerOkHttpClient`](handinger-java-client-okhttp/src/main/kotlin/com/handinger/api/client/okhttp/HandingerOkHttpClient.kt) and [`HandingerOkHttpClientAsync`](handinger-java-client-okhttp/src/main/kotlin/com/handinger/api/client/okhttp/HandingerOkHttpClientAsync.kt), which             provide a way to construct [`HandingerClientImpl`](handinger-java-core/src/main/kotlin/com/handinger/api/client/HandingerClientImpl.kt) and             [`HandingerClientAsyncImpl`](handinger-java-core/src/main/kotlin/com/handinger/api/client/HandingerClientAsyncImpl.kt), respectively, using OkHttp\n- `handinger-java`\n  - Depends on and exposes the APIs of both `handinger-java-core` and `handinger-java-client-okhttp`\n  - Does not have its own logic\n\nThis structure allows replacing the SDK\'s default HTTP client without pulling in unnecessary dependencies.\n\n#### Customized [`OkHttpClient`](https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html)\n\n> [!TIP]\n> Try the available [network options](#network-options) before replacing the default client.\n\nTo use a customized `OkHttpClient`:\n\n1. Replace your [`handinger-java` dependency](#installation) with `handinger-java-core`\n2. Copy `handinger-java-client-okhttp`\'s [`OkHttpClient`](handinger-java-client-okhttp/src/main/kotlin/com/handinger/api/client/okhttp/OkHttpClient.kt) class into your code and        customize it\n3. Construct [`HandingerClientImpl`](handinger-java-core/src/main/kotlin/com/handinger/api/client/HandingerClientImpl.kt) or [`HandingerClientAsyncImpl`](handinger-java-core/src/main/kotlin/com/handinger/api/client/HandingerClientAsyncImpl.kt), similarly to        [`HandingerOkHttpClient`](handinger-java-client-okhttp/src/main/kotlin/com/handinger/api/client/okhttp/HandingerOkHttpClient.kt) or [`HandingerOkHttpClientAsync`](handinger-java-client-okhttp/src/main/kotlin/com/handinger/api/client/okhttp/HandingerOkHttpClientAsync.kt), using your        customized client\n\n### Completely custom HTTP client\n\nTo use a completely custom HTTP client:\n\n1. Replace your [`handinger-java` dependency](#installation) with `handinger-java-core`\n2. Write a class that implements the [`HttpClient`](handinger-java-core/src/main/kotlin/com/handinger/api/core/http/HttpClient.kt) interface\n3. Construct [`HandingerClientImpl`](handinger-java-core/src/main/kotlin/com/handinger/api/client/HandingerClientImpl.kt) or [`HandingerClientAsyncImpl`](handinger-java-core/src/main/kotlin/com/handinger/api/client/HandingerClientAsyncImpl.kt), similarly to        [`HandingerOkHttpClient`](handinger-java-client-okhttp/src/main/kotlin/com/handinger/api/client/okhttp/HandingerOkHttpClient.kt) or [`HandingerOkHttpClientAsync`](handinger-java-client-okhttp/src/main/kotlin/com/handinger/api/client/okhttp/HandingerOkHttpClientAsync.kt), using your new        client class\n\n## Undocumented API functionality\n\nThe SDK is typed for convenient usage of the documented API. However, it also supports working with undocumented or not yet supported parts of the API.\n\n### Parameters\n\nTo set undocumented parameters, call the `putAdditionalHeader`, `putAdditionalQueryParam`, or       `putAdditionalBodyProperty` methods on any `Params` class:\n\n```java\nimport com.handinger.api.core.JsonValue;\nimport com.handinger.api.models.tasks.TaskCreateParams;\n\nTaskCreateParams params = TaskCreateParams.builder()\n    .putAdditionalHeader("Secret-Header", "42")\n    .putAdditionalQueryParam("secret_query_param", "42")\n    .putAdditionalBodyProperty("secretProperty", JsonValue.from("42"))\n    .build();\n```\n\nThese can be accessed on the built object later using the `_additionalHeaders()`,       `_additionalQueryParams()`, and `_additionalBodyProperties()` methods.\n\nTo set a documented parameter or property to an undocumented or not yet supported _value_, pass a       [`JsonValue`](handinger-java-core/src/main/kotlin/com/handinger/api/core/Values.kt) object to its setter:\n\n```java\nimport com.handinger.api.models.tasks.CreateTask;\nimport com.handinger.api.models.tasks.TaskCreateParams;\n\nTaskCreateParams params = TaskCreateParams.builder()\n    .createTask(CreateTask.builder()\n        .input("What\'s the weather today in Barcelona?")\n        .build())\n    .build();\n```\n\nThe most straightforward way to create a [`JsonValue`](handinger-java-core/src/main/kotlin/com/handinger/api/core/Values.kt) is using its       `from(...)` method:\n\n```java\nimport com.handinger.api.core.JsonValue;\nimport java.util.List;\nimport java.util.Map;\n\n// Create primitive JSON values\nJsonValue nullValue = JsonValue.from(null);\nJsonValue booleanValue = JsonValue.from(true);\nJsonValue numberValue = JsonValue.from(42);\nJsonValue stringValue = JsonValue.from("Hello World!");\n\n// Create a JSON array value equivalent to `["Hello", "World"]`\nJsonValue arrayValue = JsonValue.from(List.of(\n  "Hello", "World"\n));\n\n// Create a JSON object value equivalent to `{ "a": 1, "b": 2 }`\nJsonValue objectValue = JsonValue.from(Map.of(\n  "a", 1,\n  "b", 2\n));\n\n// Create an arbitrarily nested JSON equivalent to:\n// {\n//   "a": [1, 2],\n//   "b": [3, 4]\n// }\nJsonValue complexValue = JsonValue.from(Map.of(\n  "a", List.of(\n    1, 2\n  ),\n  "b", List.of(\n    3, 4\n  )\n));\n```\n\nNormally a `Builder` class\'s `build` method will throw         [`IllegalStateException`](https://docs.oracle.com/javase/8/docs/api/java/lang/IllegalStateException.html)         if any required parameter or property is unset.\n\nTo forcibly omit a required parameter or property, pass [`JsonMissing`](handinger-java-core/src/main/kotlin/com/handinger/api/core/Values.kt):\n\n```java\nimport com.handinger.api.core.JsonMissing;\nimport com.handinger.api.models.tasks.CreateTask;\nimport com.handinger.api.models.tasks.TaskCreateParams;\n\nTaskCreateParams params = TaskCreateParams.builder()\n    .createTask(CreateTask.builder()\n        .input("What\'s the weather today in Barcelona?")\n        .build())\n    .input(JsonMissing.of())\n    .build();\n```\n\n### Response properties\n\nTo access undocumented response properties, call the `_additionalProperties()` method:\n\n```java\nimport com.handinger.api.core.JsonValue;\nimport java.util.Map;\n\nMap<String, JsonValue> additionalProperties = client.tasks().create(params)._additionalProperties();\nJsonValue secretPropertyValue = additionalProperties.get("secretProperty");\n\nString result = secretPropertyValue.accept(new JsonValue.Visitor<>() {\n    @Override\n    public String visitNull() {\n        return "It\'s null!";\n    }\n\n    @Override\n    public String visitBoolean(boolean value) {\n        return "It\'s a boolean!";\n    }\n\n    @Override\n    public String visitNumber(Number value) {\n        return "It\'s a number!";\n    }\n\n    // Other methods include `visitMissing`, `visitString`, `visitArray`, and `visitObject`\n    // The default implementation of each unimplemented method delegates to `visitDefault`, which throws by default, but can also be overridden\n});\n```\n\nTo access a property\'s raw JSON value, which may be undocumented, call its `_` prefixed method:\n\n```java\nimport com.handinger.api.core.JsonField;\nimport java.util.Optional;\n\nJsonField<Object> field = client.tasks().create(params)._field();\n\nif (field.isMissing()) {\n  // The property is absent from the JSON response\n} else if (field.isNull()) {\n  // The property was set to literal null\n} else {\n  // Check if value was provided as a string\n  // Other methods include `asNumber()`, `asBoolean()`, etc.\n  Optional<String> jsonString = field.asString();\n\n  // Try to deserialize into a custom type\n  MyClass myObject = field.asUnknown().orElseThrow().convert(MyClass.class);\n}\n```\n\n### Response validation\n\nIn rare cases, the API may return a response that doesn\'t match the expected type. For example, the SDK     may expect a property to contain a `String`, but the API could return something else.\n\nBy default, the SDK will not throw an exception in this case. It will throw     [`HandingerInvalidDataException`](handinger-java-core/src/main/kotlin/com/handinger/api/errors/HandingerInvalidDataException.kt) only if you directly access the property.\n\nValidating the response is _not_ forwards compatible with new types from the API for existing fields.\n\nIf you would still prefer to check that the response is completely well-typed upfront, then either call     `validate()`:\n\n```java\nimport com.handinger.api.models.workers.Worker;\n\nWorker worker = client.tasks().create(params).validate();\n```\n\nOr configure the method call to validate the response using the `responseValidation` method:\n\n```java\nimport com.handinger.api.models.workers.Worker;\n\nWorker worker = client.tasks().create(\n  params, RequestOptions.builder().responseValidation(true).build()\n);\n```\n\nOr configure the default for all method calls at the client level:\n\n```java\nimport com.handinger.api.client.HandingerClient;\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient;\n\nHandingerClient client = HandingerOkHttpClient.builder()\n    .fromEnv()\n    .responseValidation(true)\n    .build();\n```\n\n## FAQ\n\n### Why don\'t you use plain `enum` classes?\n\nJava `enum` classes are not trivially   [forwards compatible](https://www.stainless.com/blog/making-java-enums-forwards-compatible). Using them in   the SDK could cause runtime exceptions if the API is updated to respond with a new enum value.\n\n### Why do you represent fields using `JsonField<T>` instead of just plain `T`?\n\nUsing `JsonField<T>` enables a few features:\n\n- Allowing usage of [undocumented API functionality](#undocumented-api-functionality)\n- Lazily [validating the API response against the expected shape](#response-validation)\n- Representing absent vs explicitly null values\n\n### Why don\'t you use [`data` classes](https://kotlinlang.org/docs/data-classes.html)?\n\nIt is not [backwards compatible to add new fields to a data class](https://kotlinlang.org/docs/api-guidelines-backward-compatibility.html#avoid-using-data-classes-in-your-api)   and we don\'t want to introduce a breaking change every time we add a field to a class.\n\n### Why don\'t you use checked exceptions?\n\nChecked exceptions are widely considered a mistake in the Java programming language. In fact, they were   omitted from Kotlin for this reason.\n\nChecked exceptions:\n\n- Are verbose to handle\n- Encourage error handling at the wrong level of abstraction, where nothing can be done about the error\n- Are tedious to propagate due to the [function coloring problem](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function)\n- Don\'t play well with lambdas (also due to the function coloring problem)\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/stainless-sdks/handinger-java/issues) with questions, bugs, or suggestions.\n',
  },
  {
    language: 'kotlin',
    content:
      '# Handinger Kotlin API Library\n\n\n[![Maven Central](https://img.shields.io/maven-central/v/com.handinger.api/handinger-kotlin)](https://central.sonatype.com/artifact/com.handinger.api/handinger-kotlin/0.0.1)\n[![javadoc](https://javadoc.io/badge2/com.handinger.api/handinger-kotlin/0.0.1/javadoc.svg)](https://javadoc.io/doc/com.handinger.api/handinger-kotlin/0.0.1)\n\n\nThe Handinger Kotlin SDK provides convenient access to the [Handinger REST API](https://docs.handinger.com)   from applications written in Kotlin.\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Handinger MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40ramensoft%2Fhandinger-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkByYW1lbnNvZnQvaGFuZGluZ2VyLW1jcCJdLCJlbnYiOnsiSEFORElOR0VSX0FQSV9LRVkiOiJNeSBBUEkgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40ramensoft%2Fhandinger-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40ramensoft%2Fhandinger-mcp%22%5D%2C%22env%22%3A%7B%22HANDINGER_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\nThe REST API documentation can be found on [docs.handinger.com](https://docs.handinger.com). KDocs are available on [javadoc.io](https://javadoc.io/doc/com.handinger.api/handinger-kotlin/0.0.1).\n\n## Installation\n\n### Gradle\n\n~~~kotlin\nimplementation("com.handinger.api:handinger-kotlin:0.0.1")\n~~~\n\n### Maven\n\n~~~xml\n<dependency>\n  <groupId>com.handinger.api</groupId>\n  <artifactId>handinger-kotlin</artifactId>\n  <version>0.0.1</version>\n</dependency>\n~~~\n\n## Requirements\n\nThis library requires Java 8 or later.\n\n## Usage\n\n```kotlin\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\nimport com.handinger.api.models.tasks.CreateTask\nimport com.handinger.api.models.workers.Worker\n\n// Configures using the `handinger.apiKey` and `handinger.baseUrl` system properties\n// Or configures using the `HANDINGER_API_KEY` and `HANDINGER_BASE_URL` environment variables\nval client: HandingerClient = HandingerOkHttpClient.fromEnv()\n\nval params: CreateTask = CreateTask.builder()\n    .input("What\'s the weather today in Barcelona?")\n    .build()\nval worker: Worker = client.tasks().create(params)\n```\n\n## Client configuration\n\nConfigure the client using system properties or environment variables:\n\n```kotlin\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\n\n// Configures using the `handinger.apiKey` and `handinger.baseUrl` system properties\n// Or configures using the `HANDINGER_API_KEY` and `HANDINGER_BASE_URL` environment variables\nval client: HandingerClient = HandingerOkHttpClient.fromEnv()\n```\n\nOr manually:\n\n```kotlin\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\n\nval client: HandingerClient = HandingerOkHttpClient.builder()\n    .apiKey("My API Key")\n    .build()\n```\n\nOr using a combination of the two approaches:\n\n```kotlin\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\n\nval client: HandingerClient = HandingerOkHttpClient.builder()\n    // Configures using the `handinger.apiKey` and `handinger.baseUrl` system properties\n    // Or configures using the `HANDINGER_API_KEY` and `HANDINGER_BASE_URL` environment variables\n    .fromEnv()\n    .apiKey("My API Key")\n    .build()\n```\n\nSee this table for the available options:\n\n| Setter    | System property     | Environment variable | Required | Default value             |\n| --------- | ------------------- | -------------------- | -------- | ------------------------- |\n| `apiKey`  | `handinger.apiKey`  | `HANDINGER_API_KEY`  | true     | -                         |\n| `baseUrl` | `handinger.baseUrl` | `HANDINGER_BASE_URL` | true     | `"https://handinger.com"` |\n\nSystem properties take precedence over environment variables.\n\n> [!TIP]\n> Don\'t create more than one client in the same application. Each client has a connection pool and\n> thread pools, which are more efficient to share between requests.\n\n### Modifying configuration\n\nTo temporarily use a modified client configuration, while reusing the same connection and thread       pools, call `withOptions()` on any client or service:\n\n```kotlin\nimport com.handinger.api.client.HandingerClient\n\nval clientWithOptions: HandingerClient = client.withOptions {\n    it.baseUrl("https://example.com")\n    it.maxRetries(42)\n}\n```\n\nThe `withOptions()` method does not affect the original client or service.\n\n## Requests and responses\n\nTo send a request to the Handinger API, build an instance of some `Params` class and pass it to the     corresponding client method. When the response is received, it will be deserialized into an instance of     a Kotlin class.\n\nFor example, `client.tasks().create(...)` should be called with an instance of `TaskCreateParams`, and it     will return an instance of `Worker`.\n\n## Immutability\n\nEach class in the SDK has an associated   [builder](https://blogs.oracle.com/javamagazine/post/exploring-joshua-blochs-builder-design-pattern-in-java)   or factory method for constructing it.\n\nEach class is [immutable](https://docs.oracle.com/javase/tutorial/essential/concurrency/immutable.html)   once constructed. If the class has an associated builder, then it has a `toBuilder()` method, which can   be used to convert it back to a builder for making a modified copy.\n\nBecause each class is immutable, builder modification will _never_ affect already built class instances.\n\n## Asynchronous execution\n\nThe default client is synchronous. To switch to asynchronous execution, call the `async()` method:\n\n```kotlin\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\nimport com.handinger.api.models.tasks.CreateTask\nimport com.handinger.api.models.workers.Worker\n\n// Configures using the `handinger.apiKey` and `handinger.baseUrl` system properties\n// Or configures using the `HANDINGER_API_KEY` and `HANDINGER_BASE_URL` environment variables\nval client: HandingerClient = HandingerOkHttpClient.fromEnv()\n\nval params: CreateTask = CreateTask.builder()\n    .input("What\'s the weather today in Barcelona?")\n    .build()\nval worker: Worker = client.async().tasks().create(params)\n```\n\nOr create an asynchronous client from the beginning:\n\n```kotlin\nimport com.handinger.api.client.HandingerClientAsync\nimport com.handinger.api.client.okhttp.HandingerOkHttpClientAsync\nimport com.handinger.api.models.tasks.CreateTask\nimport com.handinger.api.models.workers.Worker\n\n// Configures using the `handinger.apiKey` and `handinger.baseUrl` system properties\n// Or configures using the `HANDINGER_API_KEY` and `HANDINGER_BASE_URL` environment variables\nval client: HandingerClientAsync = HandingerOkHttpClientAsync.fromEnv()\n\nval params: CreateTask = CreateTask.builder()\n    .input("What\'s the weather today in Barcelona?")\n    .build()\nval worker: Worker = client.tasks().create(params)\n```\n\nThe asynchronous client supports the same options as the synchronous one, except most methods are [suspending](https://kotlinlang.org/docs/coroutines-guide.html).\n\n\n\n\n\n\n\n## Raw responses\n\nThe SDK defines methods that deserialize responses into instances of Kotlin classes.       However, these methods don\'t provide access to the response headers, status code, or the raw response       body.\n\nTo access this data, prefix any HTTP method call on a client or service with `withRawResponse()`:\n\n```kotlin\nimport com.handinger.api.core.http.Headers\nimport com.handinger.api.core.http.HttpResponseFor\nimport com.handinger.api.models.tasks.CreateTask\nimport com.handinger.api.models.workers.Worker\n\nval params: CreateTask = CreateTask.builder()\n    .input("What\'s the weather today in Barcelona?")\n    .build()\nval worker: HttpResponseFor<Worker> = client.tasks().withRawResponse().create(params)\n\nval statusCode: Int = worker.statusCode()\nval headers: Headers = worker.headers()\n```\n\nYou can still deserialize the response into an instance of a Kotlin class if needed:\n\n```kotlin\nimport com.handinger.api.models.workers.Worker\n\nval parsedWorker: Worker = worker.parse()\n```\n\n## Error handling\n\nThe SDK throws custom unchecked exception types:\n\n- [`HandingerServiceException`](handinger-kotlin-core/src/main/kotlin/com/handinger/api/errors/HandingerServiceException.kt): Base class for HTTP errors. See this table for which exception       subclass is thrown for each HTTP status code:\n\n  | Status | Exception                                          |\n  | ------ | -------------------------------------------------- |\n  | 400    | [`BadRequestException`](handinger-kotlin-core/src/main/kotlin/com/handinger/api/errors/BadRequestException.kt)           |\n  | 401    | [`UnauthorizedException`](handinger-kotlin-core/src/main/kotlin/com/handinger/api/errors/UnauthorizedException.kt)         |\n  | 403    | [`PermissionDeniedException`](handinger-kotlin-core/src/main/kotlin/com/handinger/api/errors/PermissionDeniedException.kt)     |\n  | 404    | [`NotFoundException`](handinger-kotlin-core/src/main/kotlin/com/handinger/api/errors/NotFoundException.kt)             |\n  | 422    | [`UnprocessableEntityException`](handinger-kotlin-core/src/main/kotlin/com/handinger/api/errors/UnprocessableEntityException.kt)  |\n  | 429    | [`RateLimitException`](handinger-kotlin-core/src/main/kotlin/com/handinger/api/errors/RateLimitException.kt)            |\n  | 5xx    | [`InternalServerException`](handinger-kotlin-core/src/main/kotlin/com/handinger/api/errors/InternalServerException.kt)       |\n  | others | [`UnexpectedStatusCodeException`](handinger-kotlin-core/src/main/kotlin/com/handinger/api/errors/UnexpectedStatusCodeException.kt) |\n\n- [`HandingerIoException`](handinger-kotlin-core/src/main/kotlin/com/handinger/api/errors/HandingerIoException.kt): I/O networking errors.\n\n- [`HandingerRetryableException`](handinger-kotlin-core/src/main/kotlin/com/handinger/api/errors/HandingerRetryableException.kt): Generic error indicating a failure that could be retried by the client.\n\n- [`HandingerInvalidDataException`](handinger-kotlin-core/src/main/kotlin/com/handinger/api/errors/HandingerInvalidDataException.kt): Failure to interpret successfully parsed data. For example,       when accessing a property that\'s supposed to be required, but the API unexpectedly omitted it from the       response.\n\n- [`HandingerException`](handinger-kotlin-core/src/main/kotlin/com/handinger/api/errors/HandingerException.kt): Base class for all exceptions. Most errors will result in one of the       previously mentioned ones, but completely generic errors may be thrown using the base class.\n\n\n\n## Logging\n\nEnable logging by setting the `HANDINGER_LOG` environment variable to   `info`:\n\n```sh\nexport HANDINGER_LOG=info\n```\n\nOr to `debug` for more verbose logging:\n\n```sh\nexport HANDINGER_LOG=debug\n```\n\nOr configure the client manually using the `logLevel` method:\n\n```kotlin\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\nimport com.handinger.api.core.LogLevel\n\nval client: HandingerClient = HandingerOkHttpClient.builder()\n    .fromEnv()\n    .logLevel(LogLevel.INFO)\n    .build()\n```\n\n## ProGuard and R8\n\nAlthough the SDK uses reflection, it is still usable with     [ProGuard](https://github.com/Guardsquare/proguard) and     [R8](https://developer.android.com/topic/performance/app-optimization/enable-app-optimization) because     `handinger-kotlin-core` is published with a     [configuration file](handinger-kotlin-core/src/main/resources/META-INF/proguard/handinger-kotlin-core.pro) containing     [keep rules](https://www.guardsquare.com/manual/configuration/usage).\n\nProGuard and R8 should automatically detect and use the published rules, but you can also manually copy     the keep rules if necessary.\n\n\n\n\n\n## Jackson\n\nThe SDK depends on [Jackson](https://github.com/FasterXML/jackson) for JSON     serialization/deserialization. It is compatible with version 2.13.4 or higher,     but depends on version 2.18.2 by default.\n\nThe SDK throws an exception if it detects an incompatible Jackson version at runtime (e.g. if the     default version was overridden in your Maven or Gradle config).\n\nIf the SDK threw an exception, but you\'re _certain_ the version is compatible, then disable the version     check using the `checkJacksonVersionCompatibility` on [`HandingerOkHttpClient`](handinger-kotlin-client-okhttp/src/main/kotlin/com/handinger/api/client/okhttp/HandingerOkHttpClient.kt) or     [`HandingerOkHttpClientAsync`](handinger-kotlin-client-okhttp/src/main/kotlin/com/handinger/api/client/okhttp/HandingerOkHttpClientAsync.kt).\n\n> [!CAUTION]\n> We make no guarantee that the SDK works correctly when the Jackson version check is disabled.\n\nAlso note that there are bugs in older Jackson versions that can affect the SDK. We don\'t work around all     Jackson bugs ([example](https://github.com/FasterXML/jackson-databind/issues/3240)) and expect users to     upgrade Jackson for those instead.\n\n## Network options\n\n### Retries\n\nThe SDK automatically retries 2 times by default, with a short exponential backoff between requests.\n\nOnly the following error types are retried:\n- Connection errors (for example, due to a network connectivity problem)\n- 408 Request Timeout\n- 409 Conflict\n- 429 Rate Limit\n- 5xx Internal\n\nThe API may also explicitly instruct the SDK to retry or not retry a request.\n\nTo set a custom number of retries, configure the client using the `maxRetries` method:\n\n```kotlin\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\n\nval client: HandingerClient = HandingerOkHttpClient.builder()\n    .fromEnv()\n    .maxRetries(4)\n    .build()\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default.\n\nTo set a custom timeout, configure the method call using the `timeout` method:\n\n```kotlin\nimport com.handinger.api.models.workers.Worker\n\nval worker: Worker = client.tasks().create(\n  params, RequestOptions.builder().timeout(Duration.ofSeconds(30)).build()\n)\n```\n\nOr configure the default for all method calls at the client level:\n\n```kotlin\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\nimport java.time.Duration\n\nval client: HandingerClient = HandingerOkHttpClient.builder()\n    .fromEnv()\n    .timeout(Duration.ofSeconds(30))\n    .build()\n```\n\n### Proxies\n\nTo route requests through a proxy, configure the client using the `proxy` method:\n\n```kotlin\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\nimport java.net.InetSocketAddress\nimport java.net.Proxy\n\nval client: HandingerClient = HandingerOkHttpClient.builder()\n    .fromEnv()\n    .proxy(Proxy(\n      Proxy.Type.HTTP, InetSocketAddress(\n        "https://example.com", 8080\n      )\n    ))\n    .build()\n```\n\nIf the proxy responds with `407 Proxy Authentication Required`, supply credentials by also   configuring `proxyAuthenticator`:\n\n```kotlin\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\nimport com.handinger.api.core.http.ProxyAuthenticator\n\nval client: HandingerClient = HandingerOkHttpClient.builder()\n    .fromEnv()\n    .proxy(...)\n    // Or a custom implementation of `ProxyAuthenticator`.\n    .proxyAuthenticator(ProxyAuthenticator.basic("username", "password"))\n    .build()\n```\n\n### Connection pooling\n\nTo customize the underlying OkHttp connection pool, configure the client using the   `maxIdleConnections` and `keepAliveDuration` methods:\n\n```kotlin\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\nimport java.time.Duration\n\nval client: HandingerClient = HandingerOkHttpClient.builder()\n    .fromEnv()\n    // If `maxIdleConnections` is set, then `keepAliveDuration` must be set, and vice versa.\n    .maxIdleConnections(10)\n    .keepAliveDuration(Duration.ofMinutes(2))\n    .build()\n```\n\nIf both options are unset, OkHttp\'s default connection pool settings are used.\n\n### HTTPS\n\n> [!NOTE]\n> Most applications should not call these methods, and instead use the system defaults. The defaults include\n> special optimizations that can be lost if the implementations are modified.\n\nTo configure how HTTPS connections are secured, configure the client using the `sslSocketFactory`,   `trustManager`, and `hostnameVerifier` methods:\n\n```kotlin\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\n\nval client: HandingerClient = HandingerOkHttpClient.builder()\n    .fromEnv()\n    // If `sslSocketFactory` is set, then `trustManager` must be set, and vice versa.\n    .sslSocketFactory(yourSSLSocketFactory)\n    .trustManager(yourTrustManager)\n    .hostnameVerifier(yourHostnameVerifier)\n    .build()\n```\n\n\n\n### Custom HTTP client\n\nThe SDK consists of three artifacts:\n- `handinger-kotlin-core`\n  - Contains core SDK logic\n  - Does not depend on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`HandingerClient`](handinger-kotlin-core/src/main/kotlin/com/handinger/api/client/HandingerClient.kt), [`HandingerClientAsync`](handinger-kotlin-core/src/main/kotlin/com/handinger/api/client/HandingerClientAsync.kt),             [`HandingerClientImpl`](handinger-kotlin-core/src/main/kotlin/com/handinger/api/client/HandingerClientImpl.kt), and [`HandingerClientAsyncImpl`](handinger-kotlin-core/src/main/kotlin/com/handinger/api/client/HandingerClientAsyncImpl.kt), all of which can             work with any HTTP client\n- `handinger-kotlin-client-okhttp`\n  - Depends on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`HandingerOkHttpClient`](handinger-kotlin-client-okhttp/src/main/kotlin/com/handinger/api/client/okhttp/HandingerOkHttpClient.kt) and [`HandingerOkHttpClientAsync`](handinger-kotlin-client-okhttp/src/main/kotlin/com/handinger/api/client/okhttp/HandingerOkHttpClientAsync.kt), which             provide a way to construct [`HandingerClientImpl`](handinger-kotlin-core/src/main/kotlin/com/handinger/api/client/HandingerClientImpl.kt) and             [`HandingerClientAsyncImpl`](handinger-kotlin-core/src/main/kotlin/com/handinger/api/client/HandingerClientAsyncImpl.kt), respectively, using OkHttp\n- `handinger-kotlin`\n  - Depends on and exposes the APIs of both `handinger-kotlin-core` and `handinger-kotlin-client-okhttp`\n  - Does not have its own logic\n\nThis structure allows replacing the SDK\'s default HTTP client without pulling in unnecessary dependencies.\n\n#### Customized [`OkHttpClient`](https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html)\n\n> [!TIP]\n> Try the available [network options](#network-options) before replacing the default client.\n\nTo use a customized `OkHttpClient`:\n\n1. Replace your [`handinger-kotlin` dependency](#installation) with `handinger-kotlin-core`\n2. Copy `handinger-kotlin-client-okhttp`\'s [`OkHttpClient`](handinger-kotlin-client-okhttp/src/main/kotlin/com/handinger/api/client/okhttp/OkHttpClient.kt) class into your code and        customize it\n3. Construct [`HandingerClientImpl`](handinger-kotlin-core/src/main/kotlin/com/handinger/api/client/HandingerClientImpl.kt) or [`HandingerClientAsyncImpl`](handinger-kotlin-core/src/main/kotlin/com/handinger/api/client/HandingerClientAsyncImpl.kt), similarly to        [`HandingerOkHttpClient`](handinger-kotlin-client-okhttp/src/main/kotlin/com/handinger/api/client/okhttp/HandingerOkHttpClient.kt) or [`HandingerOkHttpClientAsync`](handinger-kotlin-client-okhttp/src/main/kotlin/com/handinger/api/client/okhttp/HandingerOkHttpClientAsync.kt), using your        customized client\n\n### Completely custom HTTP client\n\nTo use a completely custom HTTP client:\n\n1. Replace your [`handinger-kotlin` dependency](#installation) with `handinger-kotlin-core`\n2. Write a class that implements the [`HttpClient`](handinger-kotlin-core/src/main/kotlin/com/handinger/api/core/http/HttpClient.kt) interface\n3. Construct [`HandingerClientImpl`](handinger-kotlin-core/src/main/kotlin/com/handinger/api/client/HandingerClientImpl.kt) or [`HandingerClientAsyncImpl`](handinger-kotlin-core/src/main/kotlin/com/handinger/api/client/HandingerClientAsyncImpl.kt), similarly to        [`HandingerOkHttpClient`](handinger-kotlin-client-okhttp/src/main/kotlin/com/handinger/api/client/okhttp/HandingerOkHttpClient.kt) or [`HandingerOkHttpClientAsync`](handinger-kotlin-client-okhttp/src/main/kotlin/com/handinger/api/client/okhttp/HandingerOkHttpClientAsync.kt), using your new        client class\n\n## Undocumented API functionality\n\nThe SDK is typed for convenient usage of the documented API. However, it also supports working with undocumented or not yet supported parts of the API.\n\n### Parameters\n\nTo set undocumented parameters, call the `putAdditionalHeader`, `putAdditionalQueryParam`, or       `putAdditionalBodyProperty` methods on any `Params` class:\n\n```kotlin\nimport com.handinger.api.core.JsonValue\nimport com.handinger.api.models.tasks.TaskCreateParams\n\nval params: TaskCreateParams = TaskCreateParams.builder()\n    .putAdditionalHeader("Secret-Header", "42")\n    .putAdditionalQueryParam("secret_query_param", "42")\n    .putAdditionalBodyProperty("secretProperty", JsonValue.from("42"))\n    .build()\n```\n\nThese can be accessed on the built object later using the `_additionalHeaders()`,       `_additionalQueryParams()`, and `_additionalBodyProperties()` methods.\n\nTo set a documented parameter or property to an undocumented or not yet supported _value_, pass a       [`JsonValue`](handinger-kotlin-core/src/main/kotlin/com/handinger/api/core/Values.kt) object to its setter:\n\n```kotlin\nimport com.handinger.api.models.tasks.CreateTask\nimport com.handinger.api.models.tasks.TaskCreateParams\n\nval params: TaskCreateParams = TaskCreateParams.builder()\n    .createTask(CreateTask.builder()\n        .input("What\'s the weather today in Barcelona?")\n        .build())\n    .build()\n```\n\nThe most straightforward way to create a [`JsonValue`](handinger-kotlin-core/src/main/kotlin/com/handinger/api/core/Values.kt) is using its       `from(...)` method:\n\n```kotlin\nimport com.handinger.api.core.JsonValue\n\n// Create primitive JSON values\nval nullValue: JsonValue = JsonValue.from(null)\nval booleanValue: JsonValue = JsonValue.from(true)\nval numberValue: JsonValue = JsonValue.from(42)\nval stringValue: JsonValue = JsonValue.from("Hello World!")\n\n// Create a JSON array value equivalent to `["Hello", "World"]`\nval arrayValue: JsonValue = JsonValue.from(listOf(\n  "Hello", "World"\n))\n\n// Create a JSON object value equivalent to `{ "a": 1, "b": 2 }`\nval objectValue: JsonValue = JsonValue.from(mapOf(\n  "a" to 1, "b" to 2\n))\n\n// Create an arbitrarily nested JSON equivalent to:\n// {\n//   "a": [1, 2],\n//   "b": [3, 4]\n// }\nval complexValue: JsonValue = JsonValue.from(mapOf(\n  "a" to listOf(\n    1, 2\n  ), "b" to listOf(\n    3, 4\n  )\n))\n```\n\nNormally a `Builder` class\'s `build` method will throw         [`IllegalStateException`](https://docs.oracle.com/javase/8/docs/api/java/lang/IllegalStateException.html)         if any required parameter or property is unset.\n\nTo forcibly omit a required parameter or property, pass [`JsonMissing`](handinger-kotlin-core/src/main/kotlin/com/handinger/api/core/Values.kt):\n\n```kotlin\nimport com.handinger.api.core.JsonMissing\nimport com.handinger.api.models.tasks.CreateTask\nimport com.handinger.api.models.tasks.TaskCreateParams\n\nval params: TaskCreateParams = TaskCreateParams.builder()\n    .createTask(CreateTask.builder()\n        .input("What\'s the weather today in Barcelona?")\n        .build())\n    .input(JsonMissing.of())\n    .build()\n```\n\n### Response properties\n\nTo access undocumented response properties, call the `_additionalProperties()` method:\n\n```kotlin\nimport com.handinger.api.core.JsonBoolean\nimport com.handinger.api.core.JsonNull\nimport com.handinger.api.core.JsonNumber\nimport com.handinger.api.core.JsonValue\n\nval additionalProperties: Map<String, JsonValue> = client.tasks().create(params)._additionalProperties()\nval secretPropertyValue: JsonValue = additionalProperties.get("secretProperty")\n\nval result = when (secretPropertyValue) {\n    is JsonNull -> "It\'s null!"\n    is JsonBoolean -> "It\'s a boolean!"\n    is JsonNumber -> "It\'s a number!"\n    // Other types include `JsonMissing`, `JsonString`, `JsonArray`, and `JsonObject`\n    else -> "It\'s something else!"\n}\n```\n\nTo access a property\'s raw JSON value, which may be undocumented, call its `_` prefixed method:\n\n```kotlin\nimport com.handinger.api.core.JsonField\n\nval field: JsonField<Any> = client.tasks().create(params)._field()\n\nif (field.isMissing()) {\n  // The property is absent from the JSON response\n} else if (field.isNull()) {\n  // The property was set to literal null\n} else {\n  // Check if value was provided as a string\n  // Other methods include `asNumber()`, `asBoolean()`, etc.\n  val jsonString: String? = field.asString();\n\n  // Try to deserialize into a custom type\n  val myObject: MyClass = field.asUnknown()!!.convert(MyClass::class.java)\n}\n```\n\n### Response validation\n\nIn rare cases, the API may return a response that doesn\'t match the expected type. For example, the SDK     may expect a property to contain a `String`, but the API could return something else.\n\nBy default, the SDK will not throw an exception in this case. It will throw     [`HandingerInvalidDataException`](handinger-kotlin-core/src/main/kotlin/com/handinger/api/errors/HandingerInvalidDataException.kt) only if you directly access the property.\n\nValidating the response is _not_ forwards compatible with new types from the API for existing fields.\n\nIf you would still prefer to check that the response is completely well-typed upfront, then either call     `validate()`:\n\n```kotlin\nimport com.handinger.api.models.workers.Worker\n\nval worker: Worker = client.tasks().create(params).validate()\n```\n\nOr configure the method call to validate the response using the `responseValidation` method:\n\n```kotlin\nimport com.handinger.api.models.workers.Worker\n\nval worker: Worker = client.tasks().create(\n  params, RequestOptions.builder().responseValidation(true).build()\n)\n```\n\nOr configure the default for all method calls at the client level:\n\n```kotlin\nimport com.handinger.api.client.HandingerClient\nimport com.handinger.api.client.okhttp.HandingerOkHttpClient\n\nval client: HandingerClient = HandingerOkHttpClient.builder()\n    .fromEnv()\n    .responseValidation(true)\n    .build()\n```\n\n## FAQ\n\n### Why don\'t you use plain `enum` classes?\n\nKotlin `enum` classes are not trivially   [forwards compatible](https://www.stainless.com/blog/making-java-enums-forwards-compatible). Using them in   the SDK could cause runtime exceptions if the API is updated to respond with a new enum value.\n\n### Why do you represent fields using `JsonField<T>` instead of just plain `T`?\n\nUsing `JsonField<T>` enables a few features:\n\n- Allowing usage of [undocumented API functionality](#undocumented-api-functionality)\n- Lazily [validating the API response against the expected shape](#response-validation)\n- Representing absent vs explicitly null values\n\n### Why don\'t you use [`data` classes](https://kotlinlang.org/docs/data-classes.html)?\n\nIt is not [backwards compatible to add new fields to a data class](https://kotlinlang.org/docs/api-guidelines-backward-compatibility.html#avoid-using-data-classes-in-your-api)   and we don\'t want to introduce a breaking change every time we add a field to a class.\n\n### Why don\'t you use checked exceptions?\n\nChecked exceptions are widely considered a mistake in the Java programming language. In fact, they were   omitted from Kotlin for this reason.\n\nChecked exceptions:\n\n- Are verbose to handle\n- Encourage error handling at the wrong level of abstraction, where nothing can be done about the error\n- Are tedious to propagate due to the [function coloring problem](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function)\n- Don\'t play well with lambdas (also due to the function coloring problem)\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/stainless-sdks/handinger-kotlin/issues) with questions, bugs, or suggestions.\n',
  },
  {
    language: 'php',
    content:
      '# Handinger PHP API Library\n\nThe Handinger PHP library provides convenient access to the Handinger REST API from any PHP 8.1.0+ application.\n\n## Installation\n\nTo use this package, install via Composer by adding the following to your application\'s `composer.json`:\n\n```json\n{\n  "repositories": [\n    {\n      "type": "vcs",\n      "url": "git@github.com:stainless-sdks/handinger-php.git"\n    }\n  ],\n  "require": {\n    "org-placeholder/handinger": "dev-main"\n  }\n}\n```\n\n## Usage\n\n```php\n<?php\n\n$client = new Client(apiKey: getenv(\'HANDINGER_API_KEY\') ?: \'My API Key\');\n\n$worker = $client->tasks->create(\n  input: \'What\\\'s the weather today in Barcelona?\',\n  workerID: \'wrk_vk81XUHKHG-qr4\',\n);\n\nvar_dump($worker->id);\n```',
  },
  {
    language: 'python',
    content:
      '# Handinger Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/handinger.svg?label=pypi%20(stable))](https://pypi.org/project/handinger/)\n\nThe Handinger Python library provides convenient access to the Handinger REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Handinger MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40ramensoft%2Fhandinger-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkByYW1lbnNvZnQvaGFuZGluZ2VyLW1jcCJdLCJlbnYiOnsiSEFORElOR0VSX0FQSV9LRVkiOiJNeSBBUEkgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40ramensoft%2Fhandinger-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40ramensoft%2Fhandinger-mcp%22%5D%2C%22env%22%3A%7B%22HANDINGER_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nThe REST API documentation can be found on [docs.handinger.com](https://docs.handinger.com). The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install handinger\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom handinger import Handinger\n\nclient = Handinger(\n    api_key=os.environ.get("HANDINGER_API_KEY"),  # This is the default and can be omitted\n)\n\nworker = client.tasks.create(\n    input="What\'s the weather today in Barcelona?",\n    worker_id="wrk_vk81XUHKHG-qr4",\n)\nprint(worker.id)\n```\n\nWhile you can provide an `api_key` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `HANDINGER_API_KEY="My API Key"` to your `.env` file\nso that your API Key is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncHandinger` instead of `Handinger` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom handinger import AsyncHandinger\n\nclient = AsyncHandinger(\n    api_key=os.environ.get("HANDINGER_API_KEY"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  worker = await client.tasks.create(\n      input="What\'s the weather today in Barcelona?",\n      worker_id="wrk_vk81XUHKHG-qr4",\n  )\n  print(worker.id)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install handinger[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom handinger import DefaultAioHttpClient\nfrom handinger import AsyncHandinger\n\nasync def main() -> None:\n  async with AsyncHandinger(\n    api_key=os.environ.get("HANDINGER_API_KEY"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    worker = await client.tasks.create(\n        input="What\'s the weather today in Barcelona?",\n        worker_id="wrk_vk81XUHKHG-qr4",\n    )\n    print(worker.id)\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `handinger.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `handinger.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `handinger.APIError`.\n\n```python\nimport handinger\nfrom handinger import Handinger\n\nclient = Handinger()\n\ntry:\n    client.tasks.create(\n        input="What\'s the weather today in Barcelona?",\n        worker_id="wrk_vk81XUHKHG-qr4",\n    )\nexcept handinger.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept handinger.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept handinger.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom handinger import Handinger\n\n# Configure the default for all requests:\nclient = Handinger(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).tasks.create(\n    input="What\'s the weather today in Barcelona?",\n    worker_id="wrk_vk81XUHKHG-qr4",\n)\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom handinger import Handinger\n\n# Configure the default for all requests:\nclient = Handinger(\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = Handinger(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).tasks.create(\n    input="What\'s the weather today in Barcelona?",\n    worker_id="wrk_vk81XUHKHG-qr4",\n)\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `HANDINGER_LOG` to `info`.\n\n```shell\n$ export HANDINGER_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom handinger import Handinger\n\nclient = Handinger()\nresponse = client.tasks.with_raw_response.create(\n    input="What\'s the weather today in Barcelona?",\n    worker_id="wrk_vk81XUHKHG-qr4",\n)\nprint(response.headers.get(\'X-My-Header\'))\n\ntask = response.parse()  # get the object that `tasks.create()` would have returned\nprint(task.id)\n```\n\nThese methods return an [`APIResponse`](https://github.com/ramensoft/handinger-python/tree/main/src/handinger/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/ramensoft/handinger-python/tree/main/src/handinger/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.tasks.with_streaming_response.create(\n    input="What\'s the weather today in Barcelona?",\n    worker_id="wrk_vk81XUHKHG-qr4",\n) as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom handinger import Handinger, DefaultHttpxClient\n\nclient = Handinger(\n    # Or use the `HANDINGER_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom handinger import Handinger\n\nwith Handinger() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/ramensoft/handinger-python/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport handinger\nprint(handinger.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'ruby',
    content:
      '# Handinger Ruby API library\n\nThe Handinger Ruby library provides convenient access to the Handinger REST API from any Ruby 3.2.0+ application. It ships with comprehensive types & docstrings in Yard, RBS, and RBI – [see below](https://github.com/ramensoft/handinger-ruby#Sorbet) for usage with Sorbet. The standard library\'s `net/http` is used as the HTTP transport, with connection pooling via the `connection_pool` gem.\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Handinger MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40ramensoft%2Fhandinger-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkByYW1lbnNvZnQvaGFuZGluZ2VyLW1jcCJdLCJlbnYiOnsiSEFORElOR0VSX0FQSV9LRVkiOiJNeSBBUEkgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40ramensoft%2Fhandinger-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40ramensoft%2Fhandinger-mcp%22%5D%2C%22env%22%3A%7B%22HANDINGER_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nDocumentation for releases of this gem can be found [on RubyDoc](https://gemdocs.org/gems/handinger).\n\nThe REST API documentation can be found on [docs.handinger.com](https://docs.handinger.com).\n\n## Installation\n\nTo use this gem, install via Bundler by adding the following to your application\'s `Gemfile`:\n\n<!-- x-release-please-start-version -->\n\n```ruby\ngem "handinger", "~> 0.0.1"\n```\n\n<!-- x-release-please-end -->\n\n## Usage\n\n```ruby\nrequire "bundler/setup"\nrequire "handinger"\n\nhandinger = Handinger::Client.new(\n  api_key: ENV["HANDINGER_API_KEY"] # This is the default and can be omitted\n)\n\nworker = handinger.tasks.create(input: "What\'s the weather today in Barcelona?", worker_id: "wrk_vk81XUHKHG-qr4")\n\nputs(worker.id)\n```\n\n\n\n\n\n\n\n### Handling errors\n\nWhen the library is unable to connect to the API, or if the API returns a non-success status code (i.e., 4xx or 5xx response), a subclass of `Handinger::Errors::APIError` will be thrown:\n\n```ruby\nbegin\n  task = handinger.tasks.create(input: "What\'s the weather today in Barcelona?", worker_id: "wrk_vk81XUHKHG-qr4")\nrescue Handinger::Errors::APIConnectionError => e\n  puts("The server could not be reached")\n  puts(e.cause)  # an underlying Exception, likely raised within `net/http`\nrescue Handinger::Errors::RateLimitError => e\n  puts("A 429 status code was received; we should back off a bit.")\nrescue Handinger::Errors::APIStatusError => e\n  puts("Another non-200-range status code was received")\n  puts(e.status)\nend\n```\n\nError codes are as follows:\n\n| Cause            | Error Type                 |\n| ---------------- | -------------------------- |\n| HTTP 400         | `BadRequestError`          |\n| HTTP 401         | `AuthenticationError`      |\n| HTTP 403         | `PermissionDeniedError`    |\n| HTTP 404         | `NotFoundError`            |\n| HTTP 409         | `ConflictError`            |\n| HTTP 422         | `UnprocessableEntityError` |\n| HTTP 429         | `RateLimitError`           |\n| HTTP >= 500      | `InternalServerError`      |\n| Other HTTP error | `APIStatusError`           |\n| Timeout          | `APITimeoutError`          |\n| Network error    | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\n\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict, 429 Rate Limit, >=500 Internal errors, and timeouts will all be retried by default.\n\nYou can use the `max_retries` option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\nhandinger = Handinger::Client.new(\n  max_retries: 0 # default is 2\n)\n\n# Or, configure per-request:\nhandinger.tasks.create(\n  input: "What\'s the weather today in Barcelona?",\n  worker_id: "wrk_vk81XUHKHG-qr4",\n  request_options: {max_retries: 5}\n)\n```\n\n### Timeouts\n\nBy default, requests will time out after 60 seconds. You can use the timeout option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\nhandinger = Handinger::Client.new(\n  timeout: nil # default is 60\n)\n\n# Or, configure per-request:\nhandinger.tasks.create(\n  input: "What\'s the weather today in Barcelona?",\n  worker_id: "wrk_vk81XUHKHG-qr4",\n  request_options: {timeout: 5}\n)\n```\n\nOn timeout, `Handinger::Errors::APITimeoutError` is raised.\n\nNote that requests that time out are retried by default.\n\n## Advanced concepts\n\n### BaseModel\n\nAll parameter and response objects inherit from `Handinger::Internal::Type::BaseModel`, which provides several conveniences, including:\n\n1. All fields, including unknown ones, are accessible with `obj[:prop]` syntax, and can be destructured with `obj => {prop: prop}` or pattern-matching syntax.\n\n2. Structural equivalence for equality; if two API calls return the same values, comparing the responses with == will return true.\n\n3. Both instances and the classes themselves can be pretty-printed.\n\n4. Helpers such as `#to_h`, `#deep_to_h`, `#to_json`, and `#to_yaml`.\n\n### Making custom or undocumented requests\n\n#### Undocumented properties\n\nYou can send undocumented parameters to any endpoint, and read undocumented response properties, like so:\n\nNote: the `extra_` parameters of the same name overrides the documented parameters.\n\n```ruby\nworker =\n  handinger.tasks.create(\n    input: "What\'s the weather today in Barcelona?",\n    worker_id: "wrk_vk81XUHKHG-qr4",\n    request_options: {\n      extra_query: {my_query_parameter: value},\n      extra_body: {my_body_parameter: value},\n      extra_headers: {"my-header": value}\n    }\n  )\n\nputs(worker[:my_undocumented_property])\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` under the `request_options:` parameter when making a request, as seen in the examples above.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints while retaining the benefit of auth, retries, and so on, you can make requests using `client.request`, like so:\n\n```ruby\nresponse = client.request(\n  method: :post,\n  path: \'/undocumented/endpoint\',\n  query: {"dog": "woof"},\n  headers: {"useful-header": "interesting-value"},\n  body: {"hello": "world"}\n)\n```\n\n### Concurrency & connection pooling\n\nThe `Handinger::Client` instances are threadsafe, but are only are fork-safe when there are no in-flight HTTP requests.\n\nEach instance of `Handinger::Client` has its own HTTP connection pool with a default size of 99. As such, we recommend instantiating the client once per application in most settings.\n\nWhen all available connections from the pool are checked out, requests wait for a new connection to become available, with queue time counting towards the request timeout.\n\nUnless otherwise specified, other classes in the SDK do not have locks protecting their underlying data structure.\n\n## Sorbet\n\nThis library provides comprehensive [RBI](https://sorbet.org/docs/rbi) definitions, and has no dependency on sorbet-runtime.\n\nYou can provide typesafe request parameters like so:\n\n```ruby\nhandinger.tasks.create(input: "What\'s the weather today in Barcelona?", worker_id: "wrk_vk81XUHKHG-qr4")\n```\n\nOr, equivalently:\n\n```ruby\n# Hashes work, but are not typesafe:\nhandinger.tasks.create(input: "What\'s the weather today in Barcelona?", worker_id: "wrk_vk81XUHKHG-qr4")\n\n# You can also splat a full Params class:\nparams = Handinger::TaskCreateParams.new(\n  input: "What\'s the weather today in Barcelona?",\n  worker_id: "wrk_vk81XUHKHG-qr4"\n)\nhandinger.tasks.create(**params)\n```\n\n### Enums\n\nSince this library does not depend on `sorbet-runtime`, it cannot provide [`T::Enum`](https://sorbet.org/docs/tenum) instances. Instead, we provide "tagged symbols" instead, which is always a primitive at runtime:\n\n```ruby\n# :public\nputs(Handinger::CreateWorker::Visibility::PUBLIC)\n\n# Revealed type: `T.all(Handinger::CreateWorker::Visibility, Symbol)`\nT.reveal_type(Handinger::CreateWorker::Visibility::PUBLIC)\n```\n\nEnum parameters have a "relaxed" type, so you can either pass in enum constants or their literal value:\n\n```ruby\n# Using the enum constants preserves the tagged type information:\nhandinger.workers.create(\n  visibility: Handinger::CreateWorker::Visibility::PUBLIC,\n  # …\n)\n\n# Literal values are also permissible:\nhandinger.workers.create(\n  visibility: :public,\n  # …\n)\n```\n\n## Versioning\n\nThis package follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions. As the library is in initial development and has a major version of `0`, APIs may change at any time.\n\nThis package considers improvements to the (non-runtime) `*.rbi` and `*.rbs` type definitions to be non-breaking changes.\n\n## Requirements\n\nRuby 3.2.0 or higher.\n\n## Contributing\n\nSee [the contributing documentation](https://github.com/ramensoft/handinger-ruby/tree/main/CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Handinger TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/@ramensoft/handinger.svg?label=npm%20(stable))](https://npmjs.org/package/@ramensoft/handinger) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@ramensoft/handinger)\n\nThis library provides convenient access to the Handinger REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [docs.handinger.com](https://docs.handinger.com). The full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Handinger MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40ramensoft%2Fhandinger-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkByYW1lbnNvZnQvaGFuZGluZ2VyLW1jcCJdLCJlbnYiOnsiSEFORElOR0VSX0FQSV9LRVkiOiJNeSBBUEkgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40ramensoft%2Fhandinger-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40ramensoft%2Fhandinger-mcp%22%5D%2C%22env%22%3A%7B%22HANDINGER_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install @ramensoft/handinger\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger({\n  apiKey: process.env['HANDINGER_API_KEY'], // This is the default and can be omitted\n});\n\nconst worker = await client.tasks.create({\n  input: \"What's the weather today in Barcelona?\",\n  workerId: 'wrk_vk81XUHKHG-qr4',\n});\n\nconsole.log(worker.id);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger({\n  apiKey: process.env['HANDINGER_API_KEY'], // This is the default and can be omitted\n});\n\nconst params: Handinger.TaskCreateParams = {\n  input: \"What's the weather today in Barcelona?\",\n  workerId: 'wrk_vk81XUHKHG-qr4',\n};\nconst worker: Handinger.Worker = await client.tasks.create(params);\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst worker = await client.tasks\n  .create({ input: \"What's the weather today in Barcelona?\", workerId: 'wrk_vk81XUHKHG-qr4' })\n  .catch(async (err) => {\n    if (err instanceof Handinger.APIError) {\n      console.log(err.status); // 400\n      console.log(err.name); // BadRequestError\n      console.log(err.headers); // {server: 'nginx', ...}\n    } else {\n      throw err;\n    }\n  });\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new Handinger({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.tasks.create({ input: 'What\\'s the weather today in Barcelona?', workerId: 'wrk_vk81XUHKHG-qr4' }, {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new Handinger({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.tasks.create({ input: 'What\\'s the weather today in Barcelona?', workerId: 'wrk_vk81XUHKHG-qr4' }, {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new Handinger();\n\nconst response = await client.tasks\n  .create({ input: \"What's the weather today in Barcelona?\", workerId: 'wrk_vk81XUHKHG-qr4' })\n  .asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: worker, response: raw } = await client.tasks\n  .create({ input: \"What's the weather today in Barcelona?\", workerId: 'wrk_vk81XUHKHG-qr4' })\n  .withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(worker.id);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `HANDINGER_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport Handinger from '@ramensoft/handinger';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new Handinger({\n  logger: logger.child({ name: 'Handinger' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.tasks.create({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport Handinger from '@ramensoft/handinger';\nimport fetch from 'my-fetch';\n\nconst client = new Handinger({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport Handinger from '@ramensoft/handinger';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new Handinger({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport Handinger from '@ramensoft/handinger';\n\nconst client = new Handinger({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport Handinger from 'npm:@ramensoft/handinger';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new Handinger({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/ramensoft/handinger-typescript/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
