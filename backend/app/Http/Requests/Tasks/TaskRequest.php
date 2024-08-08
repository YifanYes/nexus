<?php

namespace App\Http\Requests\Tasks;

use App\Enums\TaskStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TaskRequest extends FormRequest {
  public function rules(): array {
    return [
      'title' => 'required|string',
      'description' => 'nullable|string',
      'status' => ['required', Rule::in(TaskStatus::cases())],
      'due_date' => 'nullable|date|after:today',
    ];
  }
}
