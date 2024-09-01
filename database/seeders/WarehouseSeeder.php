<?php

namespace Database\Seeders;

use App\Models\Warehouse;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WarehouseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Warehouse::insert(
            [
                [
                    "name" => "Gudang Gedang Gajih",
                    "address" => "Jl. Gedang Gajih",
                    "warehouse_count" => 7,
                ],
                [
                    "name" => "Gudang Daplang",
                    "address" => "Jl. Raya CurungRejo",
                    "warehouse_count" => 8,
                ],
            ]
        );
    }
}
