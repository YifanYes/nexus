<?php

namespace App\Models;

use App\DTO\TaskRewardDTO;
use App\Enums\TaskDifficulty;
use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\{Model, SoftDeletes};

class Task extends Model {
  use HasFactory, HasUuid, SoftDeletes;

  protected $fillable = [
    'title',
    'type',
    'description',
    'status',
    'difficulty',
    'due_date',
    'user_id'
  ];

  protected function casts(): array {
    return [
      'due_date' => 'datetime',
    ];
  }

  public function user(): BelongsTo {
    return $this->belongsTo(User::class);
  }

  public function getTaskRewards(): TaskRewardDTO {
    return match($this->difficulty) {
      TaskDifficulty::CASUAL->value => new TaskRewardDTO(25, 10),
      TaskDifficulty::HEROIC->value => new TaskRewardDTO(50, 20),
      TaskDifficulty::LEGENDARY->value => new TaskRewardDTO(75, 30),
    };
  }
}
