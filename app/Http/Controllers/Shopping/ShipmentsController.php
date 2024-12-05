<?php

namespace App\Http\Controllers\Shopping;

use App\Http\Controllers\Controller;
use App\Http\Requests\Requests\Shipment\ShipmentRequest;
use App\Http\Resources\ShipmentResource;
use App\Models\Raw_Goods_Type;
use App\Models\Shipment;
use App\Models\Supplier;
use App\Support\Interfaces\Services\ShipmentServiceInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShipmentsController extends Controller
{
    protected ShipmentServiceInterface $service;

    public function __construct(ShipmentServiceInterface $service)
    {
        $this->service = $service;
    }
    public function index(ShipmentRequest $request)
    {
        if (!request()->inertia() && request()->expectsJson()) {
            if ($request->has(['type', 'query'])) {
                $request->merge([$request->get("type") => $request->get("query")]);
                $request->replace($request->except(['type', 'query']));
            }


            return ShipmentResource::collection($this->service->getAllPaginated($request->query(), $request->limit ? $request->limit : 10));
        }

        $suppliers = Supplier::latest()->get();
        $rawGoodTypes = Raw_Goods_Type::latest()->get();

        return Inertia::render('Shopping/Shipments/Index', [
            "suppliers" => $suppliers,
            "rawGoodTypes" => $rawGoodTypes
        ]);
    }
}
