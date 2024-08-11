<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void {
    Schema::create('users', function (Blueprint $table) {
      $table->id();
      $table->uuid('uuid')->index();
      $table->string('name');
      $table->string('email')->unique()->index();
      $table->timestamp('email_verified_at')->nullable();
      $table->string('password');
      $table->string('class')->nullable();
      $table->string('title')->nullable();
      $table->unsignedInteger('health')->default(100);
      $table->unsignedInteger('mana')->default(25);
      $table->unsignedInteger('exp')->default(0);
      $table->unsignedInteger('level')->default(1);
      $table->unsignedInteger('gold')->default(0);
      $table->unsignedInteger('strength')->default(25);
      $table->unsignedInteger('defense')->default(25);
      $table->unsignedInteger('intelligence')->default(25);
      $table->unsignedInteger('charisma')->default(25);
      $table->unsignedInteger('critical_rate')->default(0);
      $table->rememberToken();
      $table->timestamps();
      $table->softDeletes();
    });

    Schema::create('password_reset_tokens', function (Blueprint $table) {
      $table->string('email')->primary();
      $table->string('token');
      $table->timestamp('created_at')->nullable();
    });

    Schema::create('sessions', function (Blueprint $table) {
      $table->string('id')->primary();
      $table->foreignId('user_id')->nullable()->index();
      $table->string('ip_address', 45)->nullable();
      $table->text('user_agent')->nullable();
      $table->longText('payload');
      $table->integer('last_activity')->index();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void {
    Schema::dropIfExists('users');
    Schema::dropIfExists('password_reset_tokens');
    Schema::dropIfExists('sessions');
  }
};
