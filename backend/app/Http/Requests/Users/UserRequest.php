<?php

namespace App\Http\Requests\Users;

use App\Enums\{UserClass};
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest {
  public function rules(): array {
    return [
      'class' => ['required', Rule::in(UserClass::cases())],
    ];
  }
}
