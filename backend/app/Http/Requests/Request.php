<?php

namespace App\Http\Requests;

use Illuminate\Http\Request as LaravelRequest;

class Request extends LaravelRequest {
  /**
   * Get pagination for current request.
   * By default, it will return 10 items per page.
   */
  public function getPagination(): object {
    $perPage = $this->getQueryParams()->per_page ?? 10;
    $perPage = $perPage < 0 ? 10 : ($perPage > 50 ? 50 : $perPage);
    return (object) [
      'per_page' => $perPage
    ];
  }

  /**
   * Get request query params.
   */
  public function getQueryParams(): ?object {
    $query = $this->query();
    if (!isset($query) || empty($query)) {
      return null;
    }

    return (object) $query;
  }
}
