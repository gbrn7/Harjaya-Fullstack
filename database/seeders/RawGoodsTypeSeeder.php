<?php

namespace Database\Seeders;

use App\Models\Raw_Goods_Type;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RawGoodsTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Raw_Goods_Type::insert([
            [
                "name" => "Hang Madura"
            ],
            [
                "name" => "Paiton"
            ],
        ]);
    }
}
