import React, { useState } from "react";
import Api from "./api";

export default function FlightSeeder() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [status, setStatus] = useState("");

  const sampleFlights = [
    { id: 1, from: 'New York', to: 'London', departure: '2026-03-15T10:00:00', arrival: '2026-03-15T22:30:00', price: 650, airline: 'Sky Airlines' },
    { id: 2, from: 'London', to: 'Paris', departure: '2026-03-16T08:00:00', arrival: '2026-03-16T10:30:00', price: 180, airline: 'EuroFly' },
    { id: 3, from: 'Tokyo', to: 'Sydney', departure: '2026-03-17T14:00:00', arrival: '2026-03-18T06:00:00', price: 1200, airline: 'Pacific Airways' },
    { id: 4, from: 'Los Angeles', to: 'Miami', departure: '2026-03-18T09:00:00', arrival: '2026-03-18T17:00:00', price: 420, airline: 'Coastal Air' },
    { id: 5, from: 'Dubai', to: 'Singapore', departure: '2026-03-19T22:00:00', arrival: '2026-03-20T07:30:00', price: 750, airline: 'Desert Wings' }
  ];

  const seedFlights = async () => {
    if (isSeeding) return;
    setIsSeeding(true);
    setStatus("Seeding flights...");
    try {
      for (const flight of sampleFlights) {
        await Api.post("/flights", {
          from: flight.from,
          to: flight.to,
          departure: flight.departure,
          arrival: flight.arrival,
          price: flight.price,
          airline: flight.airline
        });
      }
      setStatus("✅ Flights seeded successfully!");
    } catch (error) {
      console.error(error);
      setStatus("❌ Seeding failed");
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <button
        onClick={seedFlights}
        disabled={isSeeding}
        className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 ${isSeeding ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isSeeding ? "Seeding..." : "Seed Sample Flights"}
      </button>
      {status && <p className="mt-2 text-gray-300">{status}</p>}
    </div>
  );
}