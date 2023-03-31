import React from 'react';

const InformationShowcase = ({ university }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <img className="rounded-lg h-48 w-full object-cover" />
        </div>
        <div className="md:w-2/3 md:ml-6 mt-4 md:mt-0">
          <h2 className="text-2xl font-bold mb-2">London Metroplitan University</h2>
          <p className="text-gray-700 text-base mb-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis pariatur laudantium unde incidunt dolore soluta, sapiente architecto, nemo accusamus rem debitis libero laboriosam. Omnis corrupti sit consequatur, accusantium minus molestias.</p>
          <div className="flex flex-wrap mb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">London, United Kingdom</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">4/5</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Science</span>
          </div>
          <a className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Visit Website</a>
        </div>
      </div>
    </div>
  );
}

export default InformationShowcase;