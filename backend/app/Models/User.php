<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

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
}
