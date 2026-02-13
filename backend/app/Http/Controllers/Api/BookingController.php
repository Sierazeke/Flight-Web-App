<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Flight;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * POST /api/bookings
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'flight_id' => 'required|exists:flights,id',
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'number_of_passengers' => 'required|integer|min:1'
        ]);

        $flight = Flight::find($validated['flight_id']);

        $booking = Booking::create([
            'flight_id' => $flight->id,
            'customer_name' => $validated['customer_name'],
            'customer_email' => $validated['customer_email'],
            'number_of_passengers' => $validated['number_of_passengers'],
            'status' => 'confirmed',
        ]);

        return response()->json([
            'message' => 'Booking created successfully',
            'booking' => $booking
        ], 201);
    }

    /**
     * GET /api/bookings/{id}
     */
    public function show($id)
    {
        $booking = Booking::with('flight.airline')->find($id);

        if (!$booking) {
            return response()->json([
                'message' => 'Booking not found'
            ], 404);
        }

        return response()->json([
            'id' => $booking->id,
            'status' => $booking->status,
            'customer_name' => $booking->customer_name,
            'customer_email' => $booking->customer_email,
            'number_of_passengers' => $booking->number_of_passengers,
            'flight' => [
                'id' => $booking->flight->id,
                'from' => $booking->flight->from_city,
                'to' => $booking->flight->to_city,
                'departure' => $booking->flight->departure_time,
                'arrival' => $booking->flight->arrival_time,
                'price' => $booking->flight->price,
                'airline' => $booking->flight->airline->name,
            ]
        ]);
    }

    /**
     * PATCH /api/bookings/{id}/cancel
     */
    public function cancel($id)
    {
        $booking = Booking::find($id);

        if (!$booking) {
            return response()->json([
                'message' => 'Booking not found'
            ], 404);
        }

        if ($booking->status === 'cancelled') {
            return response()->json([
                'message' => 'Booking already cancelled'
            ], 400);
        }

        $booking->update([
            'status' => 'cancelled'
        ]);

        return response()->json([
            'message' => 'Booking cancelled successfully',
            'booking' => $booking
        ]);
    }
}