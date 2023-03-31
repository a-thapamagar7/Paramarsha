import React from 'react';

function UniversityHeader({university}) {
  return (
    <div className='w-full'>
        <div className="bg-white shadow-xl max-w-4xl mx-auto">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="rounded-lg overflow-hidden w-56 h-56 flex justify-center items-center mr-6">
              <img src={university.image} alt={`${university.name} image`} className="h-full object-cover object-center" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">{university.name}</h1>
              <div className="text-gray-500">{university.location}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default UniversityHeader;