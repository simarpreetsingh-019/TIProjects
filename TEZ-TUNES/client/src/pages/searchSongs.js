import React, { useState } from 'react';

const SearchPage = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // Logic to search songs
    console.log('Searching for:', query);
  };

  return (
    <div>
      <h2>Search Songs</h2>
      <input 
        type="text" 
        placeholder="Search by title, artist, or genre" 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchPage;
