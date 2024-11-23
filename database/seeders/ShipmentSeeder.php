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
        for ($i = 0; $i < 100; $i++) {
            Shipment::create(
                [
                    "supplier_id" => 1,
                    "plat_number" => fake()->buildingNumber(),
                    "driver_name" => fake()->name(),
                    "warehouse_id" => 1,
                    "warehouse_num" => fake()->numberBetween(1, 12),
                    "shipment_date" => now(),
                ],
            );
        }
    }
}
