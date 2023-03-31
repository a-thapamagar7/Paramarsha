import { useState, react } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const CreateUniversity = () => {

    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [university, setUniversity] = useState("")
    const [website, setWebsite] = useState("")
    const [fee, setFee] = useState("")
    const [course, setCourse] = useState([])
    const [subject, setSubject] = useState([])
    const [description, setDescription] = useState("")

    return (
        <>
            <div className="px-20">
            <Navbar/>
            <form className="flex flex-col mt-10 gap-y-6 lato">
                <div className=" text-4xl tracking-tighter font-sans font-bold"><span>Add New </span><span className="text-blue-700">College</span></div>
                
                <div className="grid grid-cols-12 items-center">
                    <div className="col-span-2">Name</div>
                    <input value={name} OnChange={(e) => setName(e)} className="border border-black col-span-4 h-8 text-sm px-2 py-4"/>
                </div>

                <div className="grid grid-cols-12 items-center">
                    <div className="col-span-2">Location</div>
                    <input value={location} OnChange={(e) => setLocation(e)}  className="border border-black col-span-4 h-8 text-sm px-2"/>
                </div>
                
                <div className="grid grid-cols-12 items-center">
                    <div className="col-span-2">University</div>
                    <input value={university} OnChange={(e) => setUniversity(e)}  className="border border-black col-span-4 h-8 text-sm px-2"/>
                </div>

                <div className="grid grid-cols-12 items-center">
                    <div className="col-span-2">Website</div>
                    <input value={website} OnChange={(e) => setWebsite(e)}  className="border border-black col-span-4 h-8 text-sm px-2 py-4"/>
                </div>

                <div className="grid grid-cols-12 items-center">
                    <div className="col-span-2">Approximate Fee</div>
                    <input value={fee} OnChange={(e) => setFee(e)}  className="border border-black col-span-4 h-8 text-sm px-2"/>
                </div>

                <div className="grid grid-cols-12 items-center">
                    <div className="col-span-2">Courses</div>
                    <input className="border border-black col-span-4 h-8 text-sm px-2"/>
                </div>

                <div className="grid grid-cols-12 items-center">
                    <div className="col-span-2">Subjects</div>
                    <input className="border border-black col-span-4 h-8 text-sm px-2"/>
                </div>

                <div className="grid grid-cols-12 items-center gap-y-4">
                    <div className="col-span-12">Description</div>
                    <textarea OnChange={(e) => setDescription(e)}   className="border border-black col-span-8 h-40"/>
                </div>

                <button type="submit" className="border bg-blue-700 text-white w-2/12 spacegrotesk h-12">Submit</button>
            </form>
        </div>
        <Footer/>
    </>
        
    )
}
 
export default CreateUniversity;