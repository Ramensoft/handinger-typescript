# Workers

Types:

- <code><a href="./src/resources/workers/workers.ts">CreateWorker</a></code>
- <code><a href="./src/resources/workers/workers.ts">DeleteWorkerResponse</a></code>
- <code><a href="./src/resources/workers/workers.ts">UpdateWorker</a></code>
- <code><a href="./src/resources/workers/workers.ts">Worker</a></code>
- <code><a href="./src/resources/workers/workers.ts">WorkerTemplate</a></code>
- <code><a href="./src/resources/workers/workers.ts">WorkerRetrieveEmailResponse</a></code>

Methods:

- <code title="post /api/workers">client.workers.<a href="./src/resources/workers/workers.ts">create</a>({ ...params }) -> WorkerTemplate</code>
- <code title="get /api/workers/{workerId}">client.workers.<a href="./src/resources/workers/workers.ts">retrieve</a>(workerID, { ...params }) -> Worker</code>
- <code title="patch /api/workers/{workerId}">client.workers.<a href="./src/resources/workers/workers.ts">update</a>(workerID, { ...params }) -> WorkerTemplate</code>
- <code title="delete /api/workers/{workerId}">client.workers.<a href="./src/resources/workers/workers.ts">delete</a>(workerID) -> DeleteWorkerResponse</code>
- <code title="get /api/workers/{workerId}/email">client.workers.<a href="./src/resources/workers/workers.ts">retrieveEmail</a>(workerID) -> WorkerRetrieveEmailResponse</code>

## Schedules

Types:

- <code><a href="./src/resources/workers/schedules.ts">WorkerSchedule</a></code>
- <code><a href="./src/resources/workers/schedules.ts">ScheduleListResponse</a></code>
- <code><a href="./src/resources/workers/schedules.ts">ScheduleCancelResponse</a></code>

Methods:

- <code title="post /api/workers/{workerId}/schedules">client.workers.schedules.<a href="./src/resources/workers/schedules.ts">create</a>(workerID, { ...params }) -> WorkerSchedule</code>
- <code title="get /api/workers/{workerId}/schedules">client.workers.schedules.<a href="./src/resources/workers/schedules.ts">list</a>(workerID) -> ScheduleListResponse</code>
- <code title="delete /api/workers/{workerId}/schedules/{scheduleId}">client.workers.schedules.<a href="./src/resources/workers/schedules.ts">cancel</a>(scheduleID, { ...params }) -> ScheduleCancelResponse</code>

# Tasks

Types:

- <code><a href="./src/resources/tasks.ts">CreateTask</a></code>
- <code><a href="./src/resources/tasks.ts">DeleteTaskResponse</a></code>
- <code><a href="./src/resources/tasks.ts">Task</a></code>
- <code><a href="./src/resources/tasks.ts">TaskWithTurns</a></code>

Methods:

- <code title="post /api/tasks">client.tasks.<a href="./src/resources/tasks.ts">create</a>({ ...params }) -> Worker</code>
- <code title="get /api/tasks/{taskId}">client.tasks.<a href="./src/resources/tasks.ts">retrieve</a>(taskID) -> TaskWithTurns</code>
- <code title="delete /api/tasks/{taskId}">client.tasks.<a href="./src/resources/tasks.ts">delete</a>(taskID) -> DeleteTaskResponse</code>
