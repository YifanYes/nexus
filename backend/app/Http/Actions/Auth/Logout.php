<?php

namespace App\Http\Actions\Auth;

use App\Http\Actions\Action;
use App\Http\Requests\Request;

class Logout extends Action {
  public function __invoke(Request $request) {
    auth()->user()->tokens()->delete();

    return response()->json([
      'message' => 'Logged out successfully'
    ]);
  }
}
