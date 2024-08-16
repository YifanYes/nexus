<?php

namespace App\Http\Actions\Users;

use App\Http\Actions\Action;
use App\Http\Requests\Users\UserRequest;
use App\Http\Resources\{UserResource};

class UpdateUser extends Action {
  public function __invoke(UserRequest $request) {
    $data = $request->validated();
    $user = auth()->user();

    $user->update([
      'class' => $data['class'],
    ]);

    return new UserResource($user);
  }
}
