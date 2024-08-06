<?php

namespace App\Http\Actions\Auth;

use App\Http\Actions\Action;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\{Hash};

class Register extends Action {
  public function __invoke(RegisterRequest $request) {
    $data = $request->validated();

    $user = User::firstWhere('email', $data['email']);
    if ($user) {
      return response()->json([
        'message' => 'User already exists',
      ], 400);
    }

    $user = User::create([
      'name' => $data['name'],
      'email' => $data['email'],
      'password' => Hash::make($data['password']),
    ]);

    $user->refresh();
    $token = $user->createToken($user->name . '-AuthToken')->plainTextToken;

    return response()->json([
      'user' => new UserResource($user),
      'access_token' => $token,
    ]);
  }
}
