import React, { useState, useEffect } from "react";
import Footer from "../../../Components/Common/Footer";
import Navbar from "../../../Components/Common/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../utils/formatter";
import ComboBox from "../../../Components/Common/ComboBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCollege = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [university, setUniversity] = useState("");
  const [website, setWebsite] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [logoURL, setLogoURL] = useState("");
  const [approximateFee, setApproximateFee] = useState(0);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [description, setDescription] = useState("");
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [availableUniversities, setAvailableUniversities] = useState([]);
  const [error, setError] = useState({});

  // adds the checked checkbox to the array and removes the unchecked values from the array
  const handleCheckboxSubject = (event) => {
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

  const getIDCollege = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/getrequiredcollege/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const answer = await response.json();

    setName(answer.data.name);
    setDescription(answer.data.description);
    setSubjects(answer.data.subjects);
    setLocation(answer.data.location);
    setWebsite(answer.data.website);
    setUniversity(answer.data.university);
    setCourses(answer.data.courses);
    setApproximateFee(answer.data.approximateFee);
    setImgURL(answer.data.imgURL);
    setLogoURL(answer.data.logoURL);
  };

  const handleValueChange = (value) => {
    setUniversity(value);
  };

  const handleCheckboxCourse = (event) => {
    const value = event.target.value;
    const index = courses.indexOf(value);

    if (event.target.checked) {
      if (index === -1) {
        setCourses([...courses, value]);
      }
    } else {
      if (index !== -1) {
        const newCheckedBoxes = [...courses];
        newCheckedBoxes.splice(index, 1);
        setCourses(newCheckedBoxes);
      }
    }
  };

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

  const getUniversity = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/getuniversityinfo`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const answer = await response.json();
    const newOptions = [];
    for (let i = 0; i < answer.data.length; i++) {
      const labelValue = {};
      labelValue.label = capitalizeFirstLetter(answer.data[i].name);
      labelValue.value = answer.data[i].name;
      newOptions.push(labelValue);
    }

    setAvailableUniversities(newOptions);
  };

  const getCourses = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/getcourseinfo`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const answer = await response.json();
    setAvailableCourses(answer.data);
  };

  const createCollege = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/college/create`,
      {
        method: "POST",
        //sends the data in json format
        headers: {
          "Content-Type": "application/json",
        },
        //sends the states to the server

        body: JSON.stringify({
          name,
          location,
          website,
          courses,
          subjects,
          approximateFee,
          university,
          description,
          imgURL,
          logoURL,
        }),
      }
    );
    const data = await response.json();
    if (data.status === "success") {
      navigate("/admin/colleges");
    } else {
      toast.error(data.message);
    }
  };

  const editUniversity = async (userId) => {
    const response = await fetch(`api/college/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        location,
        website,
        courses,
        subjects,
        approximateFee,
        university,
        description,
        imgURL,
        logoURL,
      }),
    });
    const answer = await response.json();
    if (answer.status === "success") {
      navigate("/admin/colleges");
    } else {
      toast.error(answer.message);
    }
  };

  const onUniversitySubmit = async (event) => {
    event.preventDefault();
    if (
      !name ||
      !description ||
      !location ||
      !website ||
      subjects.length === 0 ||
      !university ||
      courses.length === 0 ||
      approximateFee < 0
    ) {
      toast.error("All the fields are required");
    } else {
      if (!id) {
        createCollege();
      } else {
        editUniversity();
      }
    }
  };

  useEffect(() => {
    getSubjects();
    getCourses();
    if (id) {
      getIDCollege();
    }
    getUniversity();
  }, []);

  return (
    <>
      <div className="px-20">
        <ToastContainer />
        <Navbar />
        <form
          onSubmit={onUniversitySubmit}
          className="flex flex-col mt-10 gap-y-7 lato"
        >
          <div className=" text-4xl tracking-tighter font-sans font-bold">
            <span>Add New </span>
            <span className="text-blue-700">College</span>
          </div>

          <div className="grid grid-cols-12 items-center">
            <div className="col-span-2">Name</div>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-black col-span-4 h-8 text-sm px-2 py-4"
            />
          </div>

          <div className="grid grid-cols-12 items-center">
            <div className="col-span-2">Location</div>
            <input
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border border-black col-span-4 h-8 text-sm px-2"
            />
          </div>

          <div className="grid grid-cols-12 items-center">
            <div className="col-span-2">Website</div>
            <input
              required
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="border border-black col-span-4 h-8 text-sm px-2"
            />
          </div>

          <div className="grid grid-cols-12 items-center">
            <div className="col-span-2">Approximate Fee</div>
            <input
              required
              type="number"
              value={approximateFee}
              onChange={(e) => setApproximateFee(e.target.value)}
              className="border border-black col-span-4 h-8 text-sm px-2"
            />
          </div>

          <div className="grid grid-cols-12 items-center">
            <div className="col-span-2">Logo URL</div>
            <input
              required
              value={logoURL}
              onChange={(e) => setLogoURL(e.target.value)}
              className="border border-black col-span-4 h-8 text-sm px-2"
            />
          </div>

          <div className="grid grid-cols-12 items-center">
            <div className="col-span-2">Image URL</div>
            <input
              required
              value={imgURL}
              onChange={(e) => setImgURL(e.target.value)}
              className="border border-black col-span-4 h-8 text-sm px-2"
            />
          </div>

          <div className="grid grid-cols-12 items-center w-2/3 gap-y-4">
            <div className="col-span-12">Courses</div>
            {availableCourses.map((v, i) => {
              return (
                <div
                  key={v.name + i}
                  className="flex items-center gap-x-3 col-span-6"
                >
                  <input
                    id={v.name + i}
                    type="checkbox"
                    value={v.name}
                    checked={courses.indexOf(v.name) !== -1}
                    onChange={handleCheckboxCourse}
                  />
                  <label htmlFor={v.name + i} className="text-base">
                    {capitalizeFirstLetter(v.name)}
                  </label>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-12 items-center w-full gap-y-4">
            <div className="col-span-12">Univeristy</div>
            <div className="w-80">
              <ComboBox
                options={availableUniversities}
                selectedValue={university}
                onValueChange={handleValueChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-12 items-center w-2/3 gap-y-4">
            <div className="col-span-12">Subjects</div>
            {availableSubjects.map((v, i) => {
              return (
                <div
                  key={v.name + i}
                  className="flex items-center gap-x-3 col-span-4"
                >
                  <input
                    id={v.name + i}
                    type="checkbox"
                    value={v.name}
                    checked={subjects.indexOf(v.name) !== -1}
                    onChange={handleCheckboxSubject}
                  />
                  <label htmlFor={v.name + i} className="text-base">
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
              className="border border-black col-span-8 h-40 py-2 px-3"
            />
          </div>

          <button
            type="submit"
            className="border bg-blue-700 text-white w-2/12 spacegrotesk h-12"
          >
            Submit
          </button>
          <div className={error.style}>{error.message}</div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateCollege;
