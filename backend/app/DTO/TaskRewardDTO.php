<?php

namespace App\DTO;

readonly class TaskRewardDTO {
  public function __construct(
    public readonly int $exp,
    public readonly int $gold,
  ) {
  }
}
