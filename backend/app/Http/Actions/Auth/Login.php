<?php

namespace App\Http\Actions\Auth;

use App\Http\Actions\Action;
use App\Http\Requests\Auth\{LoginRequest};
use App\Models\User;
use Illuminate\Support\Facades\{Hash};

class Login extends Action {
  public function __invoke(LoginRequest $request) {
    $data = $request->validated();

    $user = User::firstWhere('email', $data['email']);

    if(!$user || !Hash::check($data['password'], $user->password)) {
      return response()->json([
        'message' => 'Invalid credentials'
      ], 401);
    }

    $token = $user->createToken($user->name . '-AuthToken')->plainTextToken;
    return response()->json([
      'data' => [
        'access_token' => $token,
      ]
    ]);
  }
}
