const UniversityPrograms = ({ programs }) => {
    return (
      <div className="mt-10 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900">Programs</h2>
        <ul className="mt-4 border-t border-gray-200 divide-y divide-gray-200">
          {programs.map((program) => (
            <li key={program.id} className="py-6 flex">
              <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                <img
                  src={program.image}
                  alt=""
                  className="w-full h-full object-center object-cover"
                />
              </div>
  
              <div className="ml-4 flex-1 flex flex-col">
                <div>
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {program.name}
                    </h3>
                    <p className="text-lg font-medium text-gray-900">
                      {program.cost} per year
                    </p>
                  </div>
                </div>
  
                <div className="mt-2 flex-1 text-sm text-gray-500">
                  {program.description}
                </div>
  
                <div className="mt-4">
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    {program.duration}
                  </span>
                </div>
  
                <div className="mt-4 flex">
                  <a
                    href={program.link}
                    className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default UniversityPrograms;
  