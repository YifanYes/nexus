<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\TaskType;
use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable {
  use HasFactory, HasUuid, Notifiable, SoftDeletes, HasApiTokens;

  protected $fillable = [
    'name',
    'email',
    'password',
    'class',
    'title',
    'health',
    'mana',
    'exp',
    'level',
    'gold',
    'strength',
    'defense',
    'intelligence',
    'charisma',
    'critical_rate',
  ];

  protected $hidden = [
    'password',
    'remember_token',
  ];

  protected function casts(): array {
    return [
      'email_verified_at' => 'datetime',
      'password' => 'hashed',
    ];
  }

  public function tasks(): HasMany {
    return $this->hasMany(Task::class);
  }

  public function earnTaskRewards(Task $task) {
    $rewards = $task->getTaskRewards();
    $this->fill(['gold' => $this->gold + $rewards->gold]);
    $this->earnExperience($rewards->exp);
    $this->improveAttributes($task->type);
    $this->save();
  }

  public function improveAttributes(string $type): void {
    $attributeMap = [
      TaskType::WORKOUT->value => 'strength',
      TaskType::STUDY->value => 'intelligence',
      TaskType::SOCIAL->value => 'charisma',
      TaskType::HEALTH->value => 'health',
    ];

    $attribute = $attributeMap[$type] ?? null;

    if (isset($attribute)) {
      $newValue = min($this->$attribute + 5, 100);
      $this->fill([$attribute => $newValue]);
    }
  }

  public function earnExperience(int $exp): void {
    $nextLevelRequiredExp = $this->calculateLevelRequirements($this->level + 1);
    $currentExp = $this->exp + $exp;

    if ($currentExp >= $nextLevelRequiredExp) {
      $this->fill(['exp' => $currentExp - $nextLevelRequiredExp, 'level' => $this->level + 1]);
    }

    $this->fill(['exp' => $currentExp]);
  }

  public function calculateLevelRequirements(int $level): int {
    return 250 * ($level * $level) - 250 * $level;
  }
}
