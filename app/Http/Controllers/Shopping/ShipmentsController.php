<?php

namespace App\Http\Controllers\Shopping;

use App\Http\Controllers\Controller;
use App\Models\Shipment;
use Inertia\Inertia;
use Inertia\Response;

class ShipmentsController extends Controller
{
    public function index(): Response
    {
        $shipments = Shipment::with('supplier')->latest()->get();


        return Inertia::render('Shopping/Shipments/index', [
            'shipments' => $shipments
        ]);
    }
}
