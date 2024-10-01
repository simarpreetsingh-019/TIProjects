import React from 'react'

const MapDisplay = ({ title, text }) => {
  return (
    <div className='flex flex-row'>
        <h1 className="text-lg font-bold text-[#E9F5D8] mr-2">{title}:</h1>
        <p className='text-lg text-green-500'>{text}</p>
    </div>
  )
}

export default MapDisplay
