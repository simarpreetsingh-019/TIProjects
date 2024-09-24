import React from 'react';
import access from '../assets/images/Designer.png';

const NotAllowed = () => {
  return (
    <section>
      <div className='text-white'>
        <div className='flex h-screen'>
          <div className='m-auto text-center'>
            <div>
              <img 
                src={access} 
                width={600} 
                height={600} 
                alt='Access Denied' 
              />
            </div>
            <p className='text-sm md:text-base text-[#F6009B] p-2 mb-4'>
              You must be connected with MetaMask to access this page.
            </p>
            <a
              href='/'
              className='bg-transparent hover:bg-[#F6009B] text-[#F6009B] hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-[#F6009B] hover:border-transparent'
            >
              Take me home
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotAllowed;
