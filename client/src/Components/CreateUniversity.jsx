import { useState, useEffect } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Checkbox from "./Checkbox";
import { capitalizeFirstLetter } from "../utils/formatter";

const CreateUniversity = () => {

    const navigate = useNavigate()
    const { id } = useParams();
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [colleges, setColleges] = useState([])
    const [website, setWebsite] = useState("")
    const [courses, setCourses]= useState([])
    const [subjects, setSubjects] = useState([])
    const [description, setDescription] = useState("")
    const [availableSubjects, setAvailableSubjects] = useState([])
    const [availableCourses, setAvailableCourses] = useState([])
    const [error, setError] = useState({})

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
    }

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
    }

    const getSubjects = async () => {
        const response = await fetch("http://localhost:1447/api/getsubjectinfo", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const answer = await response.json();
        setAvailableSubjects(answer.data)
    }

    const getCourses = async () => {
        const response = await fetch("http://localhost:1447/api/getcourseinfo", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const answer = await response.json();
        setAvailableCourses(answer.data)
    }

    const onUniversitySubmit = async(event) => {
        event.preventDefault()
        console.log(name, 
            location, 
            website, 
            courses, 
            subjects, 
            colleges, 
            description)
        const response = await fetch("http://localhost:1447/api/university/create", {
            method: "POST",
            //sends the data in json format
            headers: {
                "Content-Type": "application/json"
            },
            //sends the states to the server
            
            body: JSON.stringify({
                name, 
                location, 
                website, 
                courses, 
                subjects, 
                colleges, 
                description
            })
        })
        const data = await response.json()
        if (data.message == "data_added") {
            const newError = { ...error }
            newError.message = "The data was added"
            newError.style = "text-green-700 text-lg"
            setError(newError)
            
        } else {
            const newError = { ...error }
            newError.message = "The was an error"
            newError.style = "text-red-700 text-lg"
            setError(newError)
        }
    }

    useEffect(() => {
        getSubjects()
        getCourses()
    }, [])

    return (
        <>
            <div className="px-20">
            <Navbar/>
            <form onSubmit={onUniversitySubmit} className="flex flex-col mt-10 gap-y-6 lato">
                <div className=" text-4xl tracking-tighter font-sans font-bold"><span>Add New </span><span className="text-blue-700">University</span></div>
                
                <div className="grid grid-cols-12 items-center">
                    <div className="col-span-2">Name</div>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="border border-black col-span-4 h-8 text-sm px-2 py-4"/>
                </div>

                <div className="grid grid-cols-12 items-center">
                    <div className="col-span-2">Location</div>
                    <input value={location} onChange={(e) => setLocation(e.target.value)}  className="border border-black col-span-4 h-8 text-sm px-2"/>
                </div>
                
                <div className="grid grid-cols-12 items-center">
                    <div className="col-span-2">Website</div>
                    <input value={website} onChange={(e) => setWebsite(e.target.value)}  className="border border-black col-span-4 h-8 text-sm px-2"/>
                </div>

                <div className="grid grid-cols-12 items-center w-2/3 gap-y-4">
                        <div className="col-span-12">Courses</div>
                        {availableCourses.map((v, i) => {
                            return (
                                <div key={v.name+i} className='flex items-center gap-x-3 col-span-6'>
                                    <input id={v.name + i} type="checkbox" value={v.name} checked={courses.indexOf(v.name) !== -1} onChange={handleCheckboxCourse} />
                                    <label htmlFor={v.name + i} className='text-base'>{capitalizeFirstLetter(v.name)}</label>
                                </div>
                            )
                        })}
                </div>

                <div className="grid grid-cols-12 items-center w-2/3 gap-y-4">
                    <div className="col-span-12">Subjects</div>
                    {availableSubjects.map((v, i) => {
                        return (
                            <div key={v.name + i} className='flex items-center gap-x-3 col-span-4'>
                                <input id={v.name + i} type="checkbox" value={v.name} checked={subjects.indexOf(v.name) !== -1} onChange={handleCheckboxSubject} />
                                <label htmlFor={v.name + i} className='text-base'>{capitalizeFirstLetter(v.name)}</label>
                            </div>
                        )
                    })}
                </div>

                <div className="grid grid-cols-12 items-center gap-y-4">
                    <div className="col-span-12">Description</div>
                    <textarea onChange={(e) => setDescription(e.target.value)}   className="border border-black col-span-8 h-40"/>
                </div>

                <button type="submit" className="border bg-blue-700 text-white w-2/12 spacegrotesk h-12">Submit</button>
                <div className={error.style}>{error.message}</div>
            </form>
        </div>
        <Footer/>
    </>
        
    )
}
 
export default CreateUniversity;