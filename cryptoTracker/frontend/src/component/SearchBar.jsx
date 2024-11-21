import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search } from 'lucide-react';

function SearchBar ( { setTransactionData, setIsLoading, inputValue, setInputValue } )
{
  const [ error, setError ] = useState( "" );

  const handleInputChange = ( e ) =>
  {
    setInputValue( e.target.value );
    if ( error ) setError( "" );
  };

  const saveToHistory = async ( query, type, hasResults ) =>
  {
    try
    {
      await axios.post( 'http://localhost:3000/tezos/history', {
        query,
        type,
        result: hasResults
      } );
    } catch ( err )
    {
      console.error( 'Failed to save to history:', err );
    }
  };

  // Effect to automatically trigger search when inputValue is set from history
  useEffect( () =>
  {
    if ( inputValue )
    {
      handleSearch( { preventDefault: () => { } } );
    }
  }, [ inputValue ] );

  const handleSearch = async ( e ) =>
  {
    e.preventDefault();

    if ( !inputValue.trim() )
    {
      setError( "Please enter a search value" );
      return;
    }

    setIsLoading( true );
    setError( "" );

    try
    {
      const isTransactionHash = inputValue.startsWith( "o" ) && inputValue.length === 51;
      const searchType = isTransactionHash ? 'transaction' : 'address';

      let url;
      if ( isTransactionHash )
      {
        url = `http://localhost:3000/tezos/tx?tx_hash=${ inputValue }`;
      } else
      {
        // Function to validate Tezos addresses
        const isValidTezosAddress = ( address ) =>
        {
          const tezosAddressPattern = /^(tz1|tz2|tz3|KT1|KT2)[1-9A-Za-z]{33}$/;
          return tezosAddressPattern.test( address );
        };

        // Validate address format
        if ( !isValidTezosAddress( inputValue ) )
        {
          throw new Error( "Invalid Tezos address format. Address should start with tz1, tz2, tz3, KT1, or KT2 and be 36 characters long." );
        }

        url = `http://localhost:3000/tezos/walletTransactions?address=${ inputValue }`;
      }

      const response = await axios.get( url );
      const hasResults = response.data &&
        ( Array.isArray( response.data ) ? response.data.length > 0 : true );

      // Save to search history
      await saveToHistory( inputValue, searchType, hasResults );

      if ( response.data )
      {
        // Flatten the transactions array if needed
        let transactions = [];
        if ( Array.isArray( response.data ) )
        {
          if ( response.data[ 0 ] && response.data[ 0 ].transactions )
          {
            transactions = response.data[ 0 ].transactions; // Extract the transactions array
          } else
          {
            transactions = response.data; // Already a flat array
          }
        } else
        {
          transactions = [ response.data ]; // Single transaction object
        }

        setTransactionData( transactions ); // Set the flat array of transactions
      } else
      {
        setTransactionData( [] );
      }
    } catch ( err )
    {
      setError( err.message || "Failed to fetch data. Please try again later." );
      setTransactionData( [] );
      await saveToHistory(
        inputValue,
        inputValue.startsWith( "o" ) ? 'transaction' : 'address',
        false
      );
      console.error( "Error:", err.message );
    } finally
    {
      setIsLoading( false );
    }
  };

  return (
    <div className="search-bar-container w-full max-w-xl mx-auto h-[50px] relative left-[200px] rounded-3xl">
      <form onSubmit={ handleSearch } className="flex flex-wrap gap-4 w-full items-center mb-4">
        <div className="flex-1">
          <div className="flex overflow-hidden gap-2 items-center px-4 py-1 bg-neutral-700 rounded-3xl border border-solid border-neutral-600">

            <input
              type="text"
              id="searchInput"
              className="flex-1 bg-transparent text-white border-none outline-none p-2 "
              placeholder="Enter Tezos Address or Transaction Hash..."
              aria-label="Search for Tezos address or transaction hash"
              value={ inputValue }
              onChange={ handleInputChange }
            />

            {/* removeed search button with icon */ }

            {/* <button
              type="submit"
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Search
            </button> */}
            <Search className="text-gray-400 " size={ 20 } type="submit" />
          </div>
        </div>
      </form>


      {/* refinement needed */ }
      { error && (
        <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded relative mt-4" role="alert">
          <span className="block sm:inline">{ error }</span>
        </div>
      ) }
    </div>
  );
}

export default SearchBar;
