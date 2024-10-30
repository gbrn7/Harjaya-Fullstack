<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\Shipment;
use App\Support\Interfaces\Repositories\ShipmentRepositoryInterface;

class shipmentRepository extends BaseRepository implements ShipmentRepositoryInterface
{
  /**
   * Specify Model class name
   *
   * @return string
   */
  protected function getModelClass(): string
  {
    return Shipment::class;
  }
}
