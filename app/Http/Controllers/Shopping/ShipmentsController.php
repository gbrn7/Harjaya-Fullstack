<?php

namespace App\Http\Controllers\Shopping;

use App\Http\Controllers\Controller;
use App\Models\Shipment;
use Inertia\Inertia;

class ShipmentsController extends Controller
{
    public function index()
    {
        if (!request()->inertia() && request()->expectsJson()) {
            $shipments = Shipment::with("supplier")->paginate(10);

            return response()->json($shipments);
        }
        return Inertia::render('Shopping/Shipments/Index');
    }
}
