import { useEffect, useState } from "react";
import Api from "./utils/api.jsx";
import FlightSeeder from "./utils/Seeder.jsx";

function Header({ goToForm }) {
    return (
        <header className="bg-gray-900 border-b border-gray-700 p-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-100 font-mono tracking-wide">
                    SkyForger
                </h1>
                <button
                    onClick={goToForm}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded-full transition-all duration-300 ease-in-out"
                >
                    Find a Flight
                </button>
            </div>
        </header>
    );
}

function LandingPage({ onStart }) {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col justify-center items-center px-6">
            <div className="text-center max-w-3xl">
                <h1 className="text-7xl md:text-8xl font-bold mb-6 font-mono tracking-tight">
                    SkyForger
                </h1>
                <p className="text-gray-400 text-lg md:text-xl mb-8">
                    Discover Flights Effortlessly. Search, compare, and book your flights all in one place.
                </p>
                <button
                    onClick={onStart}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out"
                >
                    Start Searching
                </button>
            </div>
        </div>
    );
}

function FlightForm({ onSubmit }) {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [departure, setDeparture] = useState("");
    const [arrival, setArrival] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [airline, setAirline] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !from.trim() &&
            !to.trim() &&
            !departure &&
            !arrival &&
            !maxPrice &&
            !airline.trim()
        ) {
            alert("Please fill at least one field to search flights.");
            return;
        }
        onSubmit({ from, to, departure, arrival, maxPrice, airline });
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-6">
            <h2 className="text-3xl font-semibold mb-6 font-mono">Find a Flight</h2>
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-md flex flex-col gap-4 w-full max-w-md"
            >
                <input
                    type="text"
                    placeholder="From"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="bg-gray-900 border border-gray-600 rounded-full py-2 px-4 text-gray-200 placeholder-gray-400 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                />
                <input
                    type="text"
                    placeholder="To"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="bg-gray-900 border border-gray-600 rounded-full py-2 px-4 text-gray-200 placeholder-gray-400 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                />
                <input
                    type="date"
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    className="bg-gray-900 border border-gray-600 rounded-full py-2 px-4 text-gray-200 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                />
                <input
                    type="date"
                    value={arrival}
                    onChange={(e) => setArrival(e.target.value)}
                    className="bg-gray-900 border border-gray-600 rounded-full py-2 px-4 text-gray-200 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="bg-gray-900 border border-gray-600 rounded-full py-2 px-4 text-gray-200 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                />
                <input
                    type="text"
                    placeholder="Airline"
                    value={airline}
                    onChange={(e) => setAirline(e.target.value)}
                    className="bg-gray-900 border border-gray-600 rounded-full py-2 px-4 text-gray-200 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                />
                <button
                    type="submit"
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 ease-in-out"
                >
                    Search Flights
                </button>
            </form>
        </div>
    );
}

function FlightResults({ searchQuery, goToForm }) {
    const [flights, setFlights] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [seats, setSeats] = useState({});

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                let data = await Api.get("/flights");
                data = data.filter((flight) => {
                    if (searchQuery.from && !flight.from.toLowerCase().includes(searchQuery.from.toLowerCase())) return false;
                    if (searchQuery.to && !flight.to.toLowerCase().includes(searchQuery.to.toLowerCase())) return false;
                    if (searchQuery.airline && !flight.airline.toLowerCase().includes(searchQuery.airline.toLowerCase())) return false;
                    if (searchQuery.departure && new Date(flight.departure).toDateString() !== new Date(searchQuery.departure).toDateString()) return false;
                    if (searchQuery.arrival && new Date(flight.arrival).toDateString() !== new Date(searchQuery.arrival).toDateString()) return false;
                    if (searchQuery.maxPrice && flight.price > Number(searchQuery.maxPrice)) return false;
                    return true;
                });
                setFlights(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to load flights:", error.message);
            }
        };
        fetchFlights();
    }, [searchQuery]);

    const handleSeatsChange = (flightId, value) => {
        const num = Math.max(1, Math.min(150, Number(value)));
        setSeats((prev) => ({ ...prev, [flightId]: num }));
    };

    const handleBuySeats = (flight) => {
        const seatCount = seats[flight.id] || 1;
        alert(`Successfully reserved ${seatCount} seats for ${flight.airline}!`);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-6">
            <Header goToForm={goToForm} />
            <FlightSeeder />
            {isLoading ? (
                <h1 className="text-2xl font-medium text-gray-400 mt-10">
                    Loading flights...
                </h1>
            ) : flights.length === 0 ? (
                <h1 className="text-2xl font-medium text-gray-400 mt-10">
                    No flights found.
                </h1>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                    {flights.map((flight) => {
                        const seatCount = seats[flight.id] || 0;
                        const totalPrice = seatCount * flight.price;

                        return (
                            <div
                                key={flight.id}
                                className="bg-gray-800 border border-gray-700 rounded-lg p-5 shadow-sm hover:shadow-md hover:bg-gray-700 transition-all duration-500 ease-in-out"
                            >
                                <h2 className="text-xl font-semibold mb-2 text-gray-100">{flight.airline}</h2>
                                <p className="text-gray-300 mb-1">
                                    <span className="font-medium">From:</span> {flight.from} → <span className="font-medium">To:</span> {flight.to}
                                </p>
                                <p className="text-gray-400 text-sm mb-1">
                                    <span className="font-medium">Departure:</span> {new Date(flight.departure).toLocaleString()}
                                </p>
                                <p className="text-gray-400 text-sm mb-3">
                                    <span className="font-medium">Arrival:</span> {new Date(flight.arrival).toLocaleString()}
                                </p>

                                <div className="flex items-center gap-2 mb-3">
                                    <label className="text-gray-300 font-medium">Seats:</label>
                                    <input
                                        type="number"
                                        min={0}
                                        max={150}
                                        value={seatCount}
                                        onChange={(e) => handleSeatsChange(flight.id, e.target.value)}
                                        className="w-20 bg-gray-900 border border-gray-600 rounded-full py-1 px-2 text-gray-200 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                                    />
                                </div>

                                {seatCount > 0 && (
                                    <p className="text-yellow-400 font-semibold mb-2">
                                        Seats Reserved: {seatCount}
                                    </p>
                                )}

                                <p className="text-green-400 font-semibold text-lg mb-3">
                                    Total: ${totalPrice}
                                </p>

                                <button
                                    onClick={() => handleBuySeats(flight)}
                                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-full transition-all duration-300"
                                >
                                    Buy Seats!
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default function App() {
    const [stage, setStage] = useState("landing");
    const [searchQuery, setSearchQuery] = useState(null);

    const goToForm = () => setStage("form");

    const handleFormSubmit = (query) => {
        setSearchQuery(query);
        setStage("results");
    };

    return stage === "landing" ? (
        <LandingPage onStart={goToForm} />
    ) : stage === "form" ? (
        <FlightForm onSubmit={handleFormSubmit} />
    ) : (
        <FlightResults searchQuery={searchQuery} goToForm={goToForm} />
    );
}
