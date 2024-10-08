<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest {
  public function rules(): array {
    return [
      'name' => 'required|string',
      'email' => 'required|email',
      'password' => 'required|string|min:8',
    ];
  }
}
