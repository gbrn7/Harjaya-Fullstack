<?php

namespace Database\Seeders;

use App\Models\Shipment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ShipmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Shipment::create(
            [
                "supplier_id" => 1,
                "plat_number" => "N 122 N",
                "driver_name" => "tono",
                "warehouse_id" => 1,
                "warehouse_num" => 1,
                "shipment_date" => now(),
            ]
        );
    }
}
