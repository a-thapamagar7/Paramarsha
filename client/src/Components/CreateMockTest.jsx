import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Footer from './Footer';
import Navbar from './Navbar';

const CreateMockTest = () => {

    const navigate = useNavigate()
    const forHeading = "text-xl font-sans tracking-tight"
    const [subject, setSubject] = useState("")
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const [option, setOption] = useState()

    return (
        <>
            <div className='px-20'>
                <Navbar/>
                <div className='mt-14 flex flex-col gap-y-14'>
                    <div className="text-4xl font-sans font-extrabold tracking-tight">Create Mock <span className='text-blue-700'>Test</span></div>
                    <div className='grid grid-cols-1 gap-y-5 mb-20'>
                        <div className='flex flex-row gap-x-7 items-center'>
                            <label className={forHeading + " font-extrabold"}>Subject:</label>
                            <input placeholder='Subject' className='border-black text-lg borderM question1 w-4/12 py-3 px-6'/>
                        </div>
                        <hr className='mb-10'/>
                        <label className={forHeading + " underline underline-offset-2"}>Question</label>
                        <textarea className='flex text-lg border-black borderM question w-full h-28 py-3 px-6'/>
                        <div className='flex flex-row gap-x-5 items-center'>
                            <label className={forHeading + " text-blue-700"}>Answer:</label>
                            <input placeholder='Answer' className='border-black text-lg borderM question1 w-8/12 py-3 px-6'/>
                        </div>
                        <div className='flex flex-row gap-x-6 items-center'>
                            <label className={forHeading + ""}>Option:</label>
                            <input placeholder='Option' className='border-black text-lg borderM question1 w-1/2 py-3 px-6'/>
                        </div>
                        <div className='flex flex-row gap-x-6 items-center'>
                            <label className={forHeading + ""}>Option:</label>
                            <input placeholder='Option' className='border-black text-lg borderM question1 w-1/2 py-3 px-6'/>
                        </div>
                        <div className='flex flex-row gap-x-6 items-center'>
                            <label className={forHeading + ""}>Option:</label>
                            <input placeholder='Option' className='border-black text-lg borderM question1 w-1/2 py-3 px-6'/>
                        </div>
                        <button className='border w-2/12 h-16 bg-blue-700 spacegrotesk text-white'>Submit</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
        
    );
}
 
export default CreateMockTest;