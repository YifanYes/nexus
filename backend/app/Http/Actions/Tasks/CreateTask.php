<?php

namespace App\Http\Actions\Tasks;

use App\Http\Actions\Action;
use App\Http\Requests\Tasks\TaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;

class CreateTask extends Action {
  public function __invoke(TaskRequest $request) {
    $data = $request->validated();
    $user = auth()->user();

    $task = Task::create([
      'title' => $data['title'],
      'description' => $data['description'] ?? null,
      'due_date' => $data['due_date'] ?? null,
      'user_id' => $user->id,
    ]);

    return new TaskResource($task);
  }
}
