<?php

use App\Enums\TaskStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void {
    Schema::create('tasks', function (Blueprint $table) {
      $table->id();
      $table->uuid('uuid')->index();
      $table->string('title');
      $table->string('type')->nullable();
      $table->longText('description')->nullable();
      $table->string('status')->default(TaskStatus::TODO->value);
      $table->string('difficulty');
      $table->datetime('due_date')->nullable();
      $table->foreignId('user_id')->index()->constrained()->nullOnDelete();
      $table->timestamps();
      $table->softDeletes();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void {
    Schema::dropIfExists('tasks');
  }
};
