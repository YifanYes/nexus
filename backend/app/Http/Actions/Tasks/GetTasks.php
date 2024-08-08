<?php

namespace App\Http\Actions\Tasks;

use App\Http\Actions\Action;
use App\Http\Resources\TaskResource;
use Illuminate\Http\Request;

class GetTasks extends Action {
  public function __invoke(Request $request) {
    $user = auth()->user();
    return TaskResource::collection($user->tasks);
  }
}
