<?php

namespace App\Providers;

use App\Repositories\shipmentRepository;
use App\Services\ShipmentService as ServicesShipmentService;
use App\Support\Interfaces\Repositories\ShipmentRepositoryInterface;
use App\Support\Interfaces\Services\ShipmentServiceInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(ShipmentRepositoryInterface::class, shipmentRepository::class);
        $this->app->singleton(ShipmentServiceInterface::class, ServicesShipmentService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
