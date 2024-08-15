import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../../Components/Common/Footer";
import Navbar from "../../../Components/Common/Navbar";
import { capitalizeFirstLetter } from "../../../utils/formatter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCourse = () => {
  const wrongError = "text-red-600 text-xs";
  const rightError = "text-green-600 text-xs";
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [error, setError] = useState([]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const index = subjects.indexOf(value);

    if (event.target.checked) {
      if (index === -1) {
        setSubjects([...subjects, value]);
      }
    } else {
      if (index !== -1) {
        const newCheckedBoxes = [...subjects];
        newCheckedBoxes.splice(index, 1);
        setSubjects(newCheckedBoxes);
      }
    }
  };

  useEffect(() => {
    getSubjects();
    getIDCourses();
  }, []);

  const getSubjects = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/getsubjectinfo`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const answer = await response.json();
    setAvailableSubjects(answer.data);
  };

  const editCourse = async (userId) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/course/update/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          subjects,
        }),
      }
    );
    const answer = await response.json();
    if (answer.status == "success") {
      navigate("/admin/courses");
    } else {
      toast.error(answer.message);
    }
  };

  const getIDCourses = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/getrequiredcourse/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const answer = await response.json();
    if (answer.data) {
      setName(answer.data.name);
      setDescription(answer.data.description);
      setSubjects(answer.data.subjects);
    }
  };

  const createCourses = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/course/create`,
      {
        method: "POST",
        //sends the data in json format
        headers: {
          "Content-Type": "application/json",
        },
        //sends the states to the server
        body: JSON.stringify({
          name,
          description,
          subjects,
        }),
      }
    );

    const data = await response.json();
    if (data.status == "success") {
      navigate("/admin/courses");
    } else {
      toast.error("The was an error");
    }
  };

  const submitCourse = (event) => {
    event.preventDefault();
    if (!name || !description || subjects.length === 0) {
      toast.error("Please input all the fields");
    } else {
      if (!id) {
        createCourses();
      } else {
        editCourse();
      }
    }
  };

  return (
    <>
      <div className="px-20">
        <ToastContainer />
        <Navbar />
        <form
          onSubmit={submitCourse}
          className="flex flex-col mt-10 gap-y-6 lato"
        >
          <div className=" text-4xl tracking-tighter font-sans font-bold">
            <span>Add New </span>
            <span className="text-blue-700">Course</span>
          </div>

          <div className="grid grid-cols-12 items-center">
            <div className="col-span-2">Name</div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-black col-span-4 h-8 text-sm px-2 py-4"
            />
          </div>

          <div className="grid grid-cols-12 items-center w-2/3 gap-y-2">
            <div className="col-span-12">Subjects</div>
            {availableSubjects.map((v, i) => {
              return (
                <div
                  key={v + i}
                  className="flex items-center gap-x-3 col-span-4"
                >
                  <input
                    id={v + i}
                    type="checkbox"
                    value={v.name}
                    checked={subjects.indexOf(v.name) !== -1}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={v + i} className="text-base">
                    {capitalizeFirstLetter(v.name)}
                  </label>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-12 items-center gap-y-4">
            <div className="col-span-12">Description</div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-black col-span-8 h-40 px-3 py-2"
            />
          </div>
          <div className="flex flex-row gap-x-10">
            <button
              type="submit"
              className="border bg-blue-700 text-white w-1/12 spacegrotesk h-12"
            >
              {id ? <>Update</> : <>Add</>}
            </button>
            <button
              onClick={() => navigate("/admin/courses")}
              className="border bg-blue-700 text-white w-1/12 spacegrotesk h-12"
            >
              Cancel
            </button>
          </div>

          <div className={error.style}>{error.message}</div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateCourse;
