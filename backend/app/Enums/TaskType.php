<?php

namespace App\Enums;

enum TaskType: string {
  case WORKOUT = 'WORKOUT';
  case STUDY = 'STUDY';
  case SOCIAL = 'SOCIAL';
  case HEALTH = 'HEALTH';
}
