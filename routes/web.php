<?php

use App\Http\Controllers\Shopping\ShipmentsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::redirect('/shopping', '/shopping/shipments')->name('shopping');

    Route::prefix('shopping')->name('shopping.')->group(function () {
        Route::get('/shipments', [ShipmentsController::class, 'index'])->name('shipments.index');
        Route::get('/goods', [ShipmentsController::class, 'index'])->name('goods.index');
        Route::get('/good-types', [ShipmentsController::class, 'index'])->name('goods-types.index');
        Route::get('/suppliers', [ShipmentsController::class, 'index'])->name('suppliers.index');
    });
});

require __DIR__ . '/auth.php';
