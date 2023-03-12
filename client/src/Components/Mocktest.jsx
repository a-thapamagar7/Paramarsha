import { useState } from "react";
import ComboBox from "./ComboBox";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Mocktest = () => {
    const [start, setStart] = useState(false)
    const [questionNos, setQuestionNos] = useState(false)
    const [selectedValue, setSelectedValue] = useState('');

    const options = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ];

    const handleValueChange = (value) => {
        setSelectedValue(value);
    };

    const OnStartSubmit = async(event) => {
        event.preventDefault()
        setStart(true)
    }

    return (
        <>
            <div className="px-20 w-full">
                <Navbar />
                {start ?
                    (
                        <>
                        </>
                    )
                    :
                    (<div className="flex justify-center items-center mt-20">
                        <div className="p-5 w-1/2 flex flex-col gap-y-12">
                            <div className="text-4xl font-sans font-extrabold tracking-tight text-gray-900 w-full flex">Practice Mock Test</div>
                            <div onSubmit={OnStartSubmit} className="flex flex-col gap-x-4 gap-y-9 text-lg">
                                <div className="flex justify-between">  
                                    <label className="">Subject: </label>
                                    <ComboBox options={options} selectedValue={selectedValue} onValueChange={handleValueChange} />
                                </div>
                                <div className="flex justify-between gap-x-5">  
                                    <label className="" >No of questions: </label>
                                    <input type="number" className="border border-black py-2 px-3 w-80" value={questionNos} onChange={(e) => setQuestionNos(e.target.value)}/>
                                </div>
                                <button type="submit" className='border w-2/6 h-10 bg-blue-700 spacegrotesk text-sm text-white'>Start</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
            <Footer/>
        </>
        
    );
}

export default Mocktest;