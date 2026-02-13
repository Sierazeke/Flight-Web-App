<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Flight;
use Illuminate\Http\Request;

class FlightController extends Controller
{
    /**
     * GET /api/flights
     * Return all flights
     */
    public function index()
    {
        $flights = Flight::with('airline')->get();

        return response()->json($flights->map(function ($flight) {
            return $this->formatFlight($flight);
        }));
    }

    /**
     * GET /api/flights/search?from=X&to=Y
     */
    public function search(Request $request)
    {
        $query = Flight::with('airline');

        if ($request->filled('from')) {
            $query->where('from_city', 'like', '%' . $request->from . '%');
        }

        if ($request->filled('to')) {
            $query->where('to_city', 'like', '%' . $request->to . '%');
        }

        $flights = $query->get();

        return response()->json($flights->map(function ($flight) {
            return $this->formatFlight($flight);
        }));
    }

    /**
     * GET /api/flights/{id}
     */
    public function show($id)
    {
        $flight = Flight::with('airline')->find($id);

        if (!$flight) {
            return response()->json([
                'message' => 'Flight not found'
            ], 404);
        }

        return response()->json($this->formatFlight($flight));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'from' => 'required|string',
            'to' => 'required|string',
            'departure' => 'required|date',
            'arrival' => 'required|date',
            'price' => 'required|numeric',
            'airline' => 'required|string'
        ]);

        // Create or find airline
        $airline = \App\Models\Airline::firstOrCreate([
            'name' => $validated['airline']
        ]);

        $flight = \App\Models\Flight::create([
            'airline_id' => $airline->id,
            'from_city' => $validated['from'],
            'to_city' => $validated['to'],
            'departure_time' => $validated['departure'],
            'arrival_time' => $validated['arrival'],
            'price' => $validated['price'],
        ]);

        return response()->json([
            'message' => 'Flight created',
            'flight' => $flight
        ], 201);
    }


    /**
     * Format flight to match React sample structure
     */
    private function formatFlight($flight)
    {
        return [
            'id' => $flight->id,
            'from' => $flight->from_city,
            'to' => $flight->to_city,
            'departure' => $flight->departure_time,
            'arrival' => $flight->arrival_time,
            'price' => $flight->price,
            'airline' => $flight->airline->name,
        ];
    }
}
