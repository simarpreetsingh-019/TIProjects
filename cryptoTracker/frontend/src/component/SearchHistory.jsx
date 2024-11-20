import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { History, Trash2, ArrowRight } from 'lucide-react';

const SearchHistory = ( { onSelectSearch } ) =>
{
  const [ history, setHistory ] = useState( [] );
  const [ isLoading, setIsLoading ] = useState( true );
  const [ error, setError ] = useState( null );

  // Fetch history when component mounts
  const fetchHistory = async () =>
  {
    try
    {
      const response = await axios.get( 'http://localhost:3000/tezos/history' );
      setHistory( response.data );
    } catch ( err )
    {
      setError( 'Failed to load search history' );
      console.error( 'Error fetching history:', err );
    } finally
    {
      setIsLoading( false );
    }
  };

  useEffect( () =>
  {
    fetchHistory();
  }, [] );

  // Clear history
  const clearHistory = async () =>
  {
    try
    {
      await axios.delete( 'http://localhost:3000/tezos/history' );
      setHistory( [] );
    } catch ( err )
    {
      setError( 'Failed to clear history' );
      console.error( 'Error clearing history:', err );
    }
  };

  // Handle Loading
  if ( isLoading )
  {
    return (
      <div className="p-4 bg-neutral-800 rounded-lg">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-neutral-600 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-neutral-600 rounded"></div>
              <div className="h-4 bg-neutral-600 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-700 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <History size={ 20 } />
          Search History
        </h2>
        { history.length > 0 && (
          <button
            onClick={ clearHistory }
            className="text-red-400 hover:text-red-300 transition-colors"
            title="Clear history"
          >
            <Trash2 size={ 18 } />
          </button>
        ) }
      </div>

      { error && (
        <div className="text-red-400 mb-4 text-sm">
          { error }
        </div>
      ) }

      { history.length === 0 ? (
        <div className="text-gray-400 text-sm">
          No search history yet
        </div>
      ) : (
        <div className="space-y-2">
          { history.map( ( item ) => (
            <div
              key={ item._id }
              className="flex items-center justify-between p-2 rounded hover:bg-neutral-600 cursor-pointer group truncate overflow-hidden text-ellipsis whitespace-nowrap"
              // When a history item is clicked, trigger a search with onSelectSearch
              onClick={ () => onSelectSearch( item.query ) }
            >
              <div className="flex-1">
                <div className="text-white text-sm truncate">
                  { item.query }
                </div>
                <div className="text-xs text-gray-400 flex items-center gap-2">
                  <span className={ `px-2 py-0.5 rounded-full text-xs ${ item.type === 'transaction' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400' }` }>
                    { item.type }
                  </span>
                  <span>{ new Date( item.timestamp ).toLocaleDateString() }</span>
                </div>
              </div>
              <ArrowRight
                size={ 16 }
                className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
          ) ) }
        </div>
      ) }
    </div>
  );
};

export default SearchHistory;
