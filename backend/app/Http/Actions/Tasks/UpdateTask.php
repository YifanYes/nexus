<?php

namespace App\Http\Actions\Tasks;

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
      'description' => $data['description'] ?? null,
      'status' => $data['status'],
      'due_date' => $data['due_date'] ?? null,
    ]);

    return new TaskResource($task);
  }
}
