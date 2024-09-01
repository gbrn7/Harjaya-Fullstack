<?php

namespace Database\Seeders;

use App\Models\RawGood;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RawGoodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RawGood::insert([
            [
                "shipment_id" => 1,
                "raw_goods_type_id" => 1,
                "gross" => 55,
                "tare" => 2,
                "is_return" => false,
                "grade" => "A",
                "price" => 40000,
            ],
            [
                "shipment_id" => 1,
                "raw_goods_type_id" => 1,
                "gross" => 56,
                "tare" => 2,
                "is_return" => false,
                "grade" => "A",
                "price" => 40000,
            ],
            [
                "shipment_id" => 1,
                "raw_goods_type_id" => 1,
                "gross" => 57,
                "tare" => 2,
                "is_return" => false,
                "grade" => "A",
                "price" => 40000,
            ],
            [
                "shipment_id" => 1,
                "raw_goods_type_id" => 1,
                "gross" => 58,
                "tare" => 2,
                "is_return" => false,
                "grade" => "A",
                "price" => 40000,
            ],
            [
                "shipment_id" => 1,
                "raw_goods_type_id" => 1,
                "gross" => 59,
                "tare" => 2,
                "is_return" => false,
                "grade" => "A",
                "price" => 40000,
            ],
        ]);
    }
}
