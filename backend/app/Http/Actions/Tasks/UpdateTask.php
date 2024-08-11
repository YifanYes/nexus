<?php

namespace App\Http\Actions\Tasks;

use App\Enums\TaskStatus;
use App\Http\Actions\Action;
use App\Http\Requests\Tasks\TaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;

class UpdateTask extends Action {
  public function __invoke(TaskRequest $request) {
    $data = $request->validated();
    $user = auth()->user();

    $task = Task::firstWhere([
      'uuid' => $request->task_id,
      'user_id' => $user->id
    ]);

    if(!$task) {
      return response()->json([
        'data' => [
          'message' => 'Task not found'
        ]
      ], 404);
    }

    $task->update([
      'title' => $data['title'],
      'type' => $data['type'] ?? null,
      'description' => $data['description'] ?? null,
      'status' => $data['status'],
      'difficulty' => $data['difficulty'],
      'due_date' => $data['due_date'] ?? null,
    ]);

    if ($task->status === TaskStatus::DONE->value) {
      $user->earnTaskRewards($task);
    }

    return new TaskResource($task);
  }
}
