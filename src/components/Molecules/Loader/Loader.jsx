import React from 'react';

const Loader = ({ message = 'Loading...' }) => {
   return (
      <div
         role='status'
         aria-live='polite'
         aria-busy='true'
         aria-label={message}
         className='w-full h-screen bg-[#333] text-white flex items-center justify-center z-[99999] fixed top-0 left-0 loader-fade'
      >
         <div className='flex flex-col items-center gap-8'>
            <div className='flex items-center justify-center relative w-[80px] h-[80px] max-[599px]:w-[60px] max-[599px]:h-[60px] md:w-32 md:h-32'>
               <div className='absolute w-full h-full border-8 border-t-transparent border-r-transparent border-b-white border-l-transparent rounded-full animate-spin'>
                  <div
                     className='absolute w-full h-full border-8 border-t-transparent border-r-transparent border-b-[#FF6603] border-l-transparent rounded-full animate-spin'
                     style={{ animationDelay: '200ms' }}
                  ></div>
                  <div
                     className='absolute w-full h-full border-8 border-t-transparent border-r-transparent border-b-[#FF6603] border-l-transparent rounded-full animate-spin'
                     style={{ animationDelay: '400ms' }}
                  ></div>
               </div>
            </div>
            <div className='flex flex-col items-center gap-2 text-center'>
               <h1 className='text-3xl max-[599px]:text-2xl md:text-4xl text-[#FF6603] font-bold font-[Poppins] animate-pulse'>
                  {message}
               </h1>
               <p className='text-lg max-[599px]:text-base md:text-xl font-[Poppins] text-gray-200'>
                  Please wait while we prepare everything for you
               </p>
            </div>
         </div>
      </div>
   );
};

export default Loader;
