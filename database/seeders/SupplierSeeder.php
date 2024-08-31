<?php

namespace Database\Seeders;

use App\Models\Supplier;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SupplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Supplier::create([
            "name" => "eko",
            "company" => "CV Berkah Jaya",
            "address" => "Paiton",
            "phone_num" => "111111",
        ]);
    }
}
