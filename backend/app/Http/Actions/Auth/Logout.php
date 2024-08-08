<?php

namespace App\Http\Actions\Auth;

use App\Http\Actions\Action;
use Illuminate\Http\Request;

class Logout extends Action {
  public function __invoke(Request $request) {
    auth()->user()->tokens()->delete();

    return response()->json(['data' => null], 200);
  }
}
