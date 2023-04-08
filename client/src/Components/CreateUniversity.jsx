import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
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
    const [imgURL, setImgURL] = useState("")
    const [logoURL, setLogoURL] = useState("")
    const [subjects, setSubjects] = useState([])
    const [description, setDescription] = useState("")
    const [availableSubjects, setAvailableSubjects] = useState([])
    const [availableCourses, setAvailableCourses] = useState([])
    const [availableColleges, setAvailableColleges] = useState([])
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

    const handleCheckboxCollege = (event) => {
        const value = event.target.value;
        const index = colleges.indexOf(value);
    
        if (event.target.checked) {
          if (index === -1) {
            setColleges([...colleges, value]);
          }
        } else {
          if (index !== -1) {
            const newCheckedBoxes = [...colleges];
            newCheckedBoxes.splice(index, 1);
            setColleges(newCheckedBoxes);
          }
        }
    }

    const getIDUniversities = async () => {
        const response = await fetch(`http://localhost:1447/api/getrequireduniversity/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const answer = await response.json();
        if(answer.data){
            setName(answer.data.name)
            setDescription(answer.data.description)
            setSubjects(answer.data.subjects)
            setLocation(answer.data.location)
            setWebsite(answer.data.website)
            setColleges(answer.data.colleges)
            setCourses(answer.data.courses)
            setImgURL(answer.data.imgURL)
            setLogoURL(answer.data.logoURL)
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

    const getColleges = async () => {
        const response = await fetch("http://localhost:1447/api/getcollegeinfo", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const answer = await response.json();
        setAvailableColleges(answer.data)
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

    const createUniversities = async() => {
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
                description,
                imgURL,
                logoURL
            })
        })
        const data = await response.json()
        if (data.message == "data_added") {
            navigate("/admin/universities")
            
        } else {
            const newError = { ...error }
            newError.message = "The was an error"
            newError.style = "text-red-700 text-lg"
            setError(newError)
        }
    }

    const editUniversity = async (userId) => {
        const response = await fetch(`http://localhost:1447/api/university/update/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                location, 
                website, 
                courses, 
                subjects, 
                colleges, 
                description,
                imgURL,
                logoURL
            })
        })
        const answer = await response.json();
        if (answer.message == "data_updated") {
            navigate("/admin/universities")
        }
        else {
            const newError = { ...error }
            newError.message = "Please input all the fields"
            newError.style = "text-red-600 text-lg"
            setError(newError)
        }
    }

    const onUniversitySubmit = async(event) => {
        event.preventDefault()
        if (!name || !description || subjects.length === 0 || courses.length === 0) {
            const newError = { ...error }
            newError.message = "Please input all the fields"
            newError.style = "text-red-600 text-lg"
            setError(newError)
        }
        else {
            if(!id)
            {
                createUniversities()
            }
            else {
                editUniversity()
            }
        }
        
    }

    useEffect(() => {
        getSubjects()
        getCourses()
        getColleges()
        getIDUniversities()
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

                <div className="grid grid-cols-12 items-center">
                    <div className="col-span-2">Logo URL</div>
                    <input value={logoURL} onChange={(e) => setLogoURL(e.target.value)}  className="border border-black col-span-4 h-8 text-sm px-2"/>
                </div>

                <div className="grid grid-cols-12 items-center">
                    <div className="col-span-2">Image URL</div>
                    <input value={imgURL} onChange={(e) => setImgURL(e.target.value)}  className="border border-black col-span-4 h-8 text-sm px-2"/>
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

                <div className="grid grid-cols-12 items-center w-2/3 gap-y-4">
                    <div className="col-span-12">Colleges</div>
                    {availableColleges.map((v, i) => {
                        return (
                            <div key={v.name + i} className='flex items-center gap-x-3 col-span-4'>
                                <input id={v.name + i} type="checkbox" value={v.name} checked={colleges.indexOf(v.name) !== -1} onChange={handleCheckboxCollege} />
                                <label htmlFor={v.name + i} className='text-base'>{capitalizeFirstLetter(v.name)}</label>
                            </div>
                        )
                    })}
                </div>

                <div className="grid grid-cols-12 items-center gap-y-4">
                    <div className="col-span-12">Description</div>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}   className="border border-black col-span-8 h-40 py-2 px-3"/>
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