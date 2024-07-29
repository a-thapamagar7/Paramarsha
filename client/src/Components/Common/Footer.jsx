import { useNavigate } from "react-router-dom";
import param2 from "../../Images/param2.png";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-800 text-white py-8 w-full mt-32 lato px-10 lg:px-20">
      <div className="!w-full">
        <div className="md:flex flex w-full justify-between">
          <div className="md:w-1/4 mb-8 md:mb-0">
            <img className="h-10" src={param2} alt="Logo" />
            <p className="text-gray-400 mt-4 w-4/5 text-justify">
              With our professional advice and extensive tools, find the ideal
              bachelor program, college, and university in Nepal. Make a
              well-informed choice to ensure your future academic and
              professional success. Welcome to our website "Paramarsha".
            </p>
          </div>
          <div className="md:w-1/4 mb-8 flex flex-col items-start md:mb-0">
            <h3 className="text-lg font-bold mb-4">Links</h3>
            <ul className="text-gray-400">
              <li
                onClick={() => {
                  navigate("/");
                }}
                className="hover:text-white cursor-pointer"
              >
                Home
              </li>
              <li
                onClick={() => {
                  navigate("/content/colleges");
                }}
                className="hover:text-white cursor-pointer"
              >
                College
              </li>
              <li
                onClick={() => {
                  navigate("/content/universities");
                }}
                className="hover:text-white cursor-pointer"
              >
                University
              </li>
              <li
                onClick={() => {
                  navigate("/content/courses");
                }}
                className="hover:text-white cursor-pointer"
              >
                Course
              </li>
              <li
                onClick={() => {
                  navigate("/content/subjects");
                }}
                className="hover:text-white cursor-pointer"
              >
                Subject
              </li>
            </ul>
          </div>
          <div className="md:w-1/4 mb-8 flex flex-col items-start md:mb-0">
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="text-gray-400">Kamal Marg</p>
            <p className="text-gray-400">Kamal Pokhari</p>
            <p className="text-gray-400 mt-4">(+977) 98-4444-444</p>
          </div>
          <div className="md:w-1/4 flex flex-col items-end">
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex items-center">
              <a href="#" className="text-gray-400 hover:text-white mr-4">
                a
              </a>
              <a href="#" className="text-gray-400 hover:text-white mr-4">
                b
              </a>
              <a href="#" className="text-gray-400 hover:text-white mr-4">
                c
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                d
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
