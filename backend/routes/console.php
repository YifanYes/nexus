<?php

use Illuminate\Support\Facades\Schedule;

Schedule::command('app:damage-users')->daily();
