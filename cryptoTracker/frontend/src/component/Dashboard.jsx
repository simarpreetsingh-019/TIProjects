import { useState } from 'react';
import SearchBar from './SearchBar';
import TransactionGraph from './TransactionGraph';
import TransactionTable from './TransactionTable';
import AnomalyDashboard from './AnomalyDashboard';
import UserProfile from "./UserProfile";
import SidePanel from "./SidePanel";

function Dashboard ( { onLogout } )
{
  const [ isOpen, setIsOpen ] = useState( false );

  const toggleDropdown = () =>
  {
    setIsOpen( ( prev ) => !prev );
  };
  const [ transactionData, setTransactionData ] = useState( [] );
  const [ isLoading, setIsLoading ] = useState( false );
  const [ showGraph, setShowGraph ] = useState( true );
  const [ error, setError ] = useState( "" );
  const [ searchInputValue, setSearchInputValue ] = useState( '' );
  const [ selectedChain, setSelectedChain ] = useState( '' );
  const [ activeView, setActiveView ] = useState( 'transactions' ); // 'transactions' or 'anomalies'


  const toggleView = () =>
  {
    setShowGraph( ( prevShowGraph ) => !prevShowGraph );
  };

  const chains = [ 'tezos', 'bitcoin', 'ethereum' ];

  return (
    <div className="flex overflow-hidden flex-col min-h-screen bg-neutral-800">
      <header className="flexbox right-0 relative ml-[130px] px-16 pt-8  w-[74%] bg-neutral-800 max-md:px-5 ">
        <div className="flex gap-8 max-md:flex-col justify-center items-center">
          <div className="flex flex-col w-[68%] max-md:ml-0 max-md:w-full">
            <SearchBar
              setTransactionData={ setTransactionData }
              setIsLoading={ setIsLoading }
              setError={ setError }
              inputValue={ searchInputValue }
              setInputValue={ setSearchInputValue }
            />
          </div>
          <div className="flex flex-row relative left-[350px] cursor-pointer ml-5 w-[140px] max-md:ml-0 max-md:w-full hover:border border-gray-700 rounded-xl hover:bg-neutral-700">
            <UserProfile />
            <button
              className="text-white font-medium rounded-lg text-sm px-2 py-2 inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={ toggleDropdown }
            >
              Admin
              <svg
                className={ `w-2.5 h-2.5 ml-3 transition-transform duration-300 ${ isOpen ? 'rotate-180' : ''
                  }` }
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l4 4 4-4"
                />
              </svg>
            </button>


            { isOpen && (
              <div className="absolute top-[50px] left-0 mt-2 w-[130px] bg-neutral-500 rounded-lg shadow-lg">
                <div className="p-2 pl-4 text-white cursor-pointer border-b border-gray-700 hover:bg-red-700">
                  Settings
                </div>
                <div className="p-2 pl-4 text-white cursor-pointer hover:bg-red-700" onClick={ onLogout }>
                  Logout
                </div>
              </div>
            ) }
          </div>
        </div>
      </header>


      <main className="flex-1 z-10 mt-0 max-md:mr-1.5 max-md:max-w-full">
        <div className="flex gap-5 h-full max-md:flex-col">
          <aside className="w-[26%]">
            <SidePanel setInputValue={ setSearchInputValue } />
          </aside>

          <section className="flex flex-col ml-5 w-[74%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col mt-8 w-full max-md:mt-10 max-md:max-w-full">
              {/* Error Display */ }
              { error && (
                <div className="mb-4 p-4 bg-red-500 text-white rounded-lg">
                  { error }
                </div>
              ) }

              {/* View Toggle Buttons */ }
              <div className="flex justify-between items-center mb-6 mt-3">
                <div className="flex gap-4">
                  <button
                    onClick={ () => setActiveView( 'transactions' ) }
                    className={ `px-4 py-2 rounded ${ activeView === 'transactions'
                      ? 'bg-blue-500 text-white'
                      : 'bg-neutral-700 text-gray-300'
                      }` }
                  >
                    Transactions
                  </button>
                  <button
                    onClick={ () => setActiveView( 'anomalies' ) }
                    className={ `px-4 py-2 rounded ${ activeView === 'anomalies'
                      ? 'bg-blue-500 text-white'
                      : 'bg-neutral-700 text-gray-300'
                      }` }
                  >
                    Anomaly Detection
                  </button>
                </div>
              </div>

              {/* Loading State */ }
              { isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
              ) : (
                /* Content */
                <div className="bg-neutral-900 rounded-lg p-8 mt-2 w-[90%]">
                  { activeView === 'transactions' ? (
                    transactionData.length === 0 ? (
                      <div className="text-center text-gray-400 py-12">
                        <p className="text-lg">No transactions to display</p>
                        <p className="text-sm mt-2">Search for a wallet address or transaction hash to begin</p>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <button
                          onClick={ toggleView }
                          className="mb-4 px-4 w-24 py-2 bg-blue-500 text-white rounded"
                        >
                          { showGraph ? "Show Table" : "Show Graph" }
                        </button>
                        { showGraph ? (
                          <TransactionGraph transactions={ transactionData } />
                        ) : (
                          <TransactionTable transactions={ transactionData } />
                        ) }
                      </div>
                    )
                  ) : (
                    <AnomalyDashboard />
                  ) }
                </div>
              ) }
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
