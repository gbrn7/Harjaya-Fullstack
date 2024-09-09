<?php

namespace App\Http\Controllers\Shopping;

use App\Http\Controllers\Controller;
use App\Models\Raw_Goods_Type;
use App\Models\Shipment;
use App\Models\Supplier;
use Inertia\Inertia;

class ShipmentsController extends Controller
{
    public function index()
    {
        if (!request()->inertia() && request()->expectsJson()) {
            $shipments = Shipment::with("supplier")->paginate(10);

            return response()->json($shipments);
        }

        $suppliers = Supplier::latest()->get();
        $rawGoodTypes = Raw_Goods_Type::latest()->get();

        return Inertia::render('Shopping/Shipments/Index', [
            "suppliers" => $suppliers,
            "rawGoodTypes" => $rawGoodTypes
        ]);
    }
}
