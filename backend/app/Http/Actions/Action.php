<?php

namespace App\Http\Actions;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller;

class Action extends Controller {
  use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
}
