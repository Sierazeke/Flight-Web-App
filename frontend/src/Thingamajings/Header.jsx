function Header({ search, setSearch }) {
    return (
        <header className="bg-gray-900 border-b border-gray-700 p-4">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <h1 className="text-2xl font-semibold text-gray-100 font-mono">
                    Flight App
                </h1>
                <input
                    type="text"
                    placeholder="Search Flights"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/3 bg-gray-800 border border-gray-600 rounded-full py-2 px-4 text-gray-200 placeholder-gray-400 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:bg-gray-700 transition-all duration-300 ease-in-out"
                />
            </div>
        </header>
    );
}

export default Header;
