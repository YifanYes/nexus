<?php

use App\Http\Actions\Auth\{Login, Logout, Register};
use App\Http\Actions\Tasks\{CreateTask, DeleteTask, GetTasks, UpdateTask};
use App\Http\Actions\Users\UpdateUser;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
  return new UserResource($request->user());
})->middleware('auth:sanctum');

// Auth
Route::post('/register', Register::class);
Route::post('/login', Login::class);
Route::post('/logout', Logout::class)->middleware('auth:sanctum');

// Tasks
Route::prefix('tasks')->middleware('auth:sanctum')->group(function () {
  Route::get('/', GetTasks::class);
  Route::post('/', CreateTask::class);
  Route::put('/{task_id}', UpdateTask::class);
  Route::delete('/{task_id}', DeleteTask::class);
});

Route::prefix('/user')->middleware('auth:sanctum')->group(function () {
  Route::put('/', UpdateUser::class);
});
