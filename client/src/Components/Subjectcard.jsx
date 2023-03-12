import subimage from "../Images/background.png"

const Subjectcard = (props) => {
    return (
        <div className="mt-20 w-40 h-20 flex flex-col col-span-2 rounded-lg cursor-pointer border-2 gap-y-2 py-6 px-4 subjectCard items-center justify-center shadow-2xl">
            <div className="spacegrotesk font-medium tracking-tighter text-base w-28 flex justify-center items-center">{props.name}</div>
            
        </div>
    );
}
 
export default Subjectcard;