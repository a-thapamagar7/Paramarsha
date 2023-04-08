import React from "react";
import { useParams } from "react-router-dom";
import ace from "../Images/ace.jpg"

const CollegePage = () => {
  const { id } = useParams();

  // Pseudo data for demonstration purposes
  const college = {
    name: "Kathmandu University School of Management",
    location: "Lalitpur, Nepal",
    website: "https://kusom.edu.np/",
    university: "Kathmandu University",
    description:
      "Kathmandu University School of Management (KUSOM) is one of the leading management schools in Nepal, located in Lalitpur. It offers undergraduate, graduate and postgraduate programs in business and management.",
    approximateFee: 250000,
    courses: [
      {
        name: "Bachelor of Business Administration (BBA)",
        description:
          "This program provides students with a comprehensive understanding of business and management concepts. It prepares students for leadership roles in the business world.",
        duration: "4 years",
      },
      {
        name: "Master of Business Administration (MBA)",
        description:
          "This program is designed for professionals seeking to enhance their business and management skills. It offers advanced courses in areas such as finance, marketing, and operations management.",
        duration: "2 years",
      },
    ],
    subjects: [
      "Accounting",
      "Finance",
      "Marketing",
      "Operations Management",
      "Human Resource Management",
    ],
  };

  return (
    <div className="mx-10 py-12">
      <div className="md:flex md:space-x-6">
        <div className="md:w-1/3 mb-6">
          <div className="relative w-full h-60 md:h-80">
            <img src={ace} layout="fill" alt={college.name} />
          </div>
        </div>
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{college.name}</h1>
          <h2 className="text-xl mb-4">{college.university}</h2>
          <p className="text-gray-600 text-lg mb-4">{college.description}</p>
          <div className="flex flex-wrap space-x-2 mb-4">
           
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-lg font-bold mb-2">Location</h3>
              <p className="text-gray-600">{college.location}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Website</h3>
              <a href={college.website} className="text-blue-600 hover:underline">{college.website}</a>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Approximate Fee</h3>
              <p className="text-gray-600">{college.approximateFee} NPR</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Subjects</h3>
              <ul className="list-disc list-inside">
                {college.subjects.map((subject, i) => (
                  <li key={i + "mm"}>{subject}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Courses</h2>
        
        {college.courses.map((course, index) => (
          
          <div key={index+ "fdas"} className="mb-6">
            <h3 className="text-lg font-bold mb-2">{course.name}</h3>
            <p className="text-gray-600">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed dui nibh. Aenean eget felis risus. Vestibulum in ligula eu felis ullamcorper convallis a non augue. Sed eget eleifend metus, sed convallis velit.`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollegePage;
