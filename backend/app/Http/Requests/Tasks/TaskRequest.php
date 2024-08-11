<?php

namespace App\Http\Requests\Tasks;

use App\Enums\{TaskDifficulty, TaskStatus, TaskType};
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TaskRequest extends FormRequest {
  public function rules(): array {
    return [
      'title' => 'required|string',
      'type' => ['nullable', Rule::in(TaskType::cases())],
      'description' => 'nullable|string',
      'status' => ['required', Rule::in(TaskStatus::cases())],
      'difficulty' => ['required', Rule::in(TaskDifficulty::cases())],
      'due_date' => 'nullable|date|after:today',
    ];
  }
}
