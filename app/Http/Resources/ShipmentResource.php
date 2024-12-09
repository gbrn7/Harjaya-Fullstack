<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShipmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);

        return [
            "id" => $this->id,
            "supplier" => SupplierResource::make($this->supplier),
            "warehouse_num" => $this->warehouse_num,
            "plat_number" => $this->plat_number,
            "driver_name" => $this->driver_name,
            "shipment_date" => $this->shipment_date->format("d/m/Y"),
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }
}
