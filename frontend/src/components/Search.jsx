import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

function Search({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className="mb-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-colors duration-200"
            />
        </div>
    );
}

export default Search;
