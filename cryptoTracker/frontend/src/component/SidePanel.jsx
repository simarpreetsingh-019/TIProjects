import React from 'react';
import SearchHistory from './SearchHistory';
import SuspiciousTransactions from './SuspiciousTransaction';

function SidePanel ( { setInputValue } )
{  // Accept setInputValue as a prop
  return (
    <div className="flex flex-col px-9 -mt-10 mx-auto w-full border border-solid bg-neutral-800 border-neutral-800">
      <div className="text-2xl text-white px-4 ">
        Dashboard
      </div>
      <div className="flex overflow-hidden flex-col px-4 pt-4 pb-48 mt-9 rounded-lg bg-neutral-800 font-[number:var(--sds-typography-body-font-weight-regular)] min-h-[740px] text-[length:var(--sds-typography-body-size-medium)] max-md:pb-24">
        <SearchHistory onSelectSearch={ ( query ) => setInputValue( query ) } />  {/* Pass setInputValue to SearchHistory */ }
        {/* <SuspiciousTransactions risk={ 35 } /> */}
        
        {/* <SuspiciousTransactions risk={ 12 } /> */}
      </div>
    </div>
  );
}

export default SidePanel;
