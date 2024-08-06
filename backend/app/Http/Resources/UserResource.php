<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource {
  public function toArray(Request $request): array {
    return [
      'id' => $this->uuid,
      'name' => $this->name,
      'email' => $this->email,
      'class' => $this->class,
      'title' => $this->title,
      'health' => $this->health,
      'mana' => $this->mana,
      'exp' => $this->exp,
      'level' => $this->level,
      'strength' => $this->strength,
      'defense' => $this->defense,
      'intelligence' => $this->intelligence,
      'charisma' => $this->charisma,
      'critical_rate' => $this->critical_rate,
      'created_at' => $this->created_at,
    ];
  }
}
