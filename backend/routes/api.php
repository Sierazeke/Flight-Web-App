<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\FlightController;
use App\Http\Controllers\Api\BookingController;

/*
|--------------------------------------------------------------------------
| Flight Routes
|--------------------------------------------------------------------------
*/

Route::prefix('flights')->group(function () {

    // GET /api/flights
    Route::get('/', [FlightController::class, 'index']);

    // GET /api/flights/search?from=New York&to=London
    Route::get('/search', [FlightController::class, 'search']);

    // GET /api/flights/{id}
    Route::get('/{id}', [FlightController::class, 'show']);

    Route::post('/', [FlightController::class, 'store']);

});


/*
|--------------------------------------------------------------------------
| Booking Routes
|--------------------------------------------------------------------------
*/

Route::prefix('bookings')->group(function () {

    // POST /api/bookings
    Route::post('/', [BookingController::class, 'store']);

    // GET /api/bookings/{id}
    Route::get('/{id}', [BookingController::class, 'show']);

    // PATCH /api/bookings/{id}/cancel
    Route::patch('/{id}/cancel', [BookingController::class, 'cancel']);
});
