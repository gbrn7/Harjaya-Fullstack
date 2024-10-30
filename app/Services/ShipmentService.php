<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\ShipmentRepositoryInterface;
use App\Support\Interfaces\Services\ShipmentServiceInterface as ServicesShipmentServiceInterface;

class ShipmentService extends BaseCrudService implements ServicesShipmentServiceInterface
{

  /**
   * Specify Repository class name
   *
   * @return string
   */
  protected function getRepositoryClass(): string
  {
    return ShipmentRepositoryInterface::class;
  }
}
