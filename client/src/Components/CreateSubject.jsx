import { useState } from "react"

const CreateSubject = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState({})

    const OnSubjectSubmit = (event) => {
        event.preventDefault()
        SendSubject()
        setDescription("")
        setName("")
    }

    const SendSubject = async () => {
        const response = await fetch("http://localhost:1447/api/subject/create", {
            method: "POST",
            //sends the data in json format
            headers: {
                "Content-Type": "application/json"
            },
            //sends the states to the server
            body: JSON.stringify({
                name,
                description
            })
        })

        const data = await response.json()
        if (data.message == "data_added") {
            const newError = { ...error }
            newError.message = "The questions have been sucessfully added"
            newError.style = "text-green-700 text-lg"
            setError(newError)
        } else {
            const newError = { ...error }
            newError.message = "There was an error"
            newError.style = "text-red-600 text-lg"
            setError(newError)
        }
    }

    return (
        <>
            <div className="px-20">
                <form onSubmit={OnSubjectSubmit} className="flex flex-col mt-10 gap-y-6 lato">
                    <div className=" text-4xl tracking-tighter font-sans font-bold"><span>Add New </span><span className="text-blue-700">Subject</span></div>

                    <div className="grid grid-cols-12 items-center">
                        <div className="col-span-2">Name</div>
                        <input value={name} onChange={(e) => setName(e.target.value)} className="border border-black col-span-4 h-8 text-sm px-2 py-4" />
                    </div>


                    <div className="grid grid-cols-12 items-center gap-y-4">
                        <div className="col-span-12">Description</div>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="border border-black px-4 py-2 col-span-8 h-40" />
                    </div>

                    <button type="submit" className="border bg-blue-700 text-white w-2/12 spacegrotesk h-12">Submit</button>
                    <div className={error.style}>{error.message}</div>
                </form>
            </div>
        </>

    )
}

export default CreateSubject;