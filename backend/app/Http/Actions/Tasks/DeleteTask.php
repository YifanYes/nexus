<?php

namespace App\Http\Actions\Tasks;

use App\Http\Actions\Action;
use App\Models\Task;
use Illuminate\Http\Request;

class DeleteTask extends Action {
  public function __invoke(Request $request) {
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

    $task->delete();

    return response()->json(['data' => null], 200);
  }
}
