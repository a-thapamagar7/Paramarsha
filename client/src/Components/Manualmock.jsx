const Manualmock = () => {
    return ( 
        <div>
            
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
     );
}
 
export default Manualmock;