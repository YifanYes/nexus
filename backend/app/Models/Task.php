<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\{Model, SoftDeletes};

class Task extends Model {
  use HasFactory, HasUuid, SoftDeletes;

  protected $fillable = [
    'title',
    'description',
    'status',
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
}
