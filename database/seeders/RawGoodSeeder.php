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
                "weight" => 55,
                "price" => 40000,
            ],
            [
                "shipment_id" => 1,
                "raw_goods_type_id" => 1,
                "weight" => 56,
                "price" => 40000,
            ],
            [
                "shipment_id" => 1,
                "raw_goods_type_id" => 1,
                "weight" => 57,
                "price" => 40000,
            ],
            [
                "shipment_id" => 1,
                "raw_goods_type_id" => 1,
                "weight" => 58,
                "price" => 40000,
            ],
            [
                "shipment_id" => 1,
                "raw_goods_type_id" => 1,
                "weight" => 59,
                "price" => 40000,
            ],
        ]);
    }
}
