<?php

namespace App\Console\Commands;

use App\Enums\TaskStatus;
use App\Models\User;
use Illuminate\Console\Command;

class DamageUsers extends Command {
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'app:damage-users';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Damage users based on pending expired tasks';

  /**
   * Execute the console command.
   */
  public function handle() {
    $users = User::whereHas('tasks', function ($q) {
      $q->where('status', TaskStatus::TODO->value)
        ->where('due_date', '<', now());
    })->withCount([
      'tasks as expired_tasks_count' => function ($q) {
        $q->where('status', 'TO DO')
          ->where('due_date', '<', now());
      }
    ])->get();

    $users->each(function ($user) {
      $user->update([
        'health' => $user->health - ($user->expired_tasks_count * 5)
      ]);
    });
  }
}
