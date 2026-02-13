import { useState } from "react";

function LandingPage({ onStart }) {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col justify-center items-center px-6">
            <div className="text-center max-w-3xl">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 font-mono">
                    Discover Flights Effortlessly
                </h1>
                <p className="text-gray-400 text-lg md:text-xl mb-8">
                    Search, compare, and book your flights all in one place. Minimalistic design, fast performance, and smart filters make your travel planning seamless.
                </p>
                <button
                    onClick={onStart}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out"
                >
                    Start Searching
                </button>
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl text-center">
                <div>
                    <h2 className="text-2xl font-semibold mb-2 text-gray-100">Fast Search</h2>
                    <p className="text-gray-400">Find flights instantly with our intuitive search system.</p>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-2 text-gray-100">Smart Filters</h2>
                    <p className="text-gray-400">Filter flights by date, price, airline, and destinations easily.</p>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-2 text-gray-100">Minimalistic Design</h2>
                    <p className="text-gray-400">Focus on what matters—flight information—without distractions.</p>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
