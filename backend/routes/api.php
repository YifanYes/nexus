<?php

use App\Http\Actions\Auth\{Login, Logout, Register};
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
  return new UserResource($request->user());
})->middleware('auth:sanctum');

Route::post('/register', Register::class);
Route::post('/login', Login::class);

Route::post('/logout', Logout::class)->middleware('auth:sanctum');
