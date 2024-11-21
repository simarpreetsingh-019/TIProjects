import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Alert, AlertDescription } from "@/component/ui/alert";

const AnomalyDashboard = () =>
{
  const [ anomalyData, setAnomalyData ] = useState( [] );
  const [ timeRangeData, setTimeRangeData ] = useState( [] );
  const [ selectedWallet, setSelectedWallet ] = useState( '' );
  const [ loading, setLoading ] = useState( false );
  const [ error, setError ] = useState( null );
  const [ timeRange, setTimeRange ] = useState( {
    start: '',
    end: ''
  } );

  // Fetch recent anomalies
  const fetchRecentAnomalies = async () =>
  {
    try
    {
      setLoading( true );
      const response = await fetch( 'http://localhost:5000/detect_recent_anomalies' );
      if ( !response.ok )
      {
        throw new Error( `HTTP error! status: ${ response.status }` );
      }
      const data = await response.json();
      setAnomalyData( data );
    } catch ( err )
    {
      setError( 'Failed to fetch recent anomalies: ' + err.message );
    } finally
    {
      setLoading( false );
    }
  };

  // Fetch wallet-specific anomalies
  const fetchWalletAnomalies = async ( wallet ) =>
  {
    if ( !wallet ) return;
    try
    {
      setLoading( true );
      const response = await fetch( `http://localhost:5000/detect_anomalies_by_wallet?wallet_address=${ wallet }` );
      if ( !response.ok )
      {
        throw new Error( `HTTP error! status: ${ response.status }` );
      }
      const data = await response.json();
      setAnomalyData( data );
    } catch ( err )
    {
      setError( 'Failed to fetch wallet anomalies: ' + err.message );
    } finally
    {
      setLoading( false );
    }
  };

  // Fetch time period anomalies
  const fetchTimePeriodAnomalies = async () =>
  {
    if ( !timeRange.start || !timeRange.end ) return;
    try
    {
      setLoading( true );
      const response = await fetch(
        `http://localhost:5000/detect_time_period_anomalies?start_time=${ timeRange.start }&end_time=${ timeRange.end }`
      );
      if ( !response.ok )
      {
        throw new Error( `HTTP error! status: ${ response.status }` );
      }
      const data = await response.json();
      setTimeRangeData( data );
    } catch ( err )
    {
      setError( 'Failed to fetch time period anomalies: ' + err.message );
    } finally
    {
      setLoading( false );
    }
  };

  useEffect( () =>
  {
    fetchRecentAnomalies();
  }, [] );

  return (
    <div className="space-y-6">
      {/* Error Display */ }
      { error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{ error }</AlertDescription>
        </Alert>
      ) }

      {/* Controls Section */ }
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Wallet Search */ }
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Enter wallet address"
            className="w-full p-2 rounded border border-gray-600 bg-neutral-800 text-white"
            value={ selectedWallet }
            onChange={ ( e ) => setSelectedWallet( e.target.value ) }
          />
          <button
            onClick={ () => fetchWalletAnomalies( selectedWallet ) }
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={ !selectedWallet || loading }
          >
            Search Wallet Anomalies
          </button>
        </div>

        {/* Time Range Selection */ }
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="datetime-local"
              className="p-2 rounded border border-gray-600 bg-neutral-800 text-white"
              value={ timeRange.start }
              onChange={ ( e ) => setTimeRange( prev => ( { ...prev, start: e.target.value } ) ) }
            />
            <input
              type="datetime-local"
              className="p-2 rounded border border-gray-600 bg-neutral-800 text-white"
              value={ timeRange.end }
              onChange={ ( e ) => setTimeRange( prev => ( { ...prev, end: e.target.value } ) ) }
            />
          </div>
          <button
            onClick={ fetchTimePeriodAnomalies }
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={ !timeRange.start || !timeRange.end || loading }
          >
            Analyze Time Period
          </button>
        </div>
      </div>

      {/* Loading Indicator */ }
      { loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) }

      {/* Anomaly Data Visualization */ }
      { !loading && anomalyData.length > 0 && (
        <div className="space-y-6">
          {/* Table View */ }
          <div className="overflow-x-auto rounded-lg border border-gray-700">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-neutral-800">
                <tr>
                  <th className="px-6 py-3">Transaction Hash</th>
                  <th className="px-6 py-3">From</th>
                  <th className="px-6 py-3">To</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Suspicion Score</th>
                </tr>
              </thead>
              <tbody>
                { anomalyData.map( ( tx, index ) => (
                  <tr key={ index } className="border-b border-gray-700 hover:bg-neutral-800">
                    <td className="px-6 py-4 font-mono">{ tx.hash?.substring( 0, 8 ) }...</td>
                    <td className="px-6 py-4 font-mono">{ tx.from?.substring( 0, 8 ) }...</td>
                    <td className="px-6 py-4 font-mono">{ tx.to?.substring( 0, 8 ) }...</td>
                    <td className="px-6 py-4">{ tx.amount }</td>
                    <td className="px-6 py-4">
                      <span
                        className={ `px-2 py-1 rounded ${ tx.suspicion_score > 0.7 ? 'bg-red-500' :
                          tx.suspicion_score > 0.4 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }` }
                      >
                        { tx.suspicion_score?.toFixed( 2 ) }
                      </span>
                    </td>
                  </tr>
                ) ) }
              </tbody>
            </table>
          </div>

          {/* Chart View */ }
          <div className="bg-neutral-800 p-4 rounded-lg">
            <LineChart
              width={ 800 }
              height={ 300 }
              data={ anomalyData }
              margin={ { top: 5, right: 30, left: 20, bottom: 5 } }
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="timestamp"
                stroke="#9CA3AF"
                tick={ { fill: '#9CA3AF' } }
              />
              <YAxis
                stroke="#9CA3AF"
                tick={ { fill: '#9CA3AF' } }
              />
              <Tooltip
                contentStyle={ {
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '0.375rem'
                } }
                labelStyle={ { color: '#9CA3AF' } }
                itemStyle={ { color: '#9CA3AF' } }
              />
              <Legend
                wrapperStyle={ { color: '#9CA3AF' } }
              />
              <Line
                type="monotone"
                dataKey="suspicion_score"
                stroke="#60A5FA"
                name="Suspicion Score"
                dot={ { fill: '#60A5FA' } }
              />
            </LineChart>
          </div>
        </div>
      ) }
    </div>
  );
};

export default AnomalyDashboard;