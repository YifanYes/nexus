<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource {
  public function toArray(Request $request): array {
    return [
      'id' => $this->uuid,
      'title' => $this->title,
      'description' => $this->description,
      'status' => $this->status,
      'due_date' => $this->due_date,
      'created_at' => $this->created_at,
    ];
  }
}
