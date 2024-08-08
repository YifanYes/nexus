<?php

namespace App\Enums;

enum TaskStatus: string {
  case TODO = 'TO DO';
  case DOING = 'DOING';
  case DONE = 'DONE';
}
