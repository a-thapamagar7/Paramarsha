import { useNavigate } from "react-router-dom"

const Features = (props) => {

    const navigate = useNavigate()

    return (
        <div onClick={() => {navigate(props.link); window.scrollTo(0, 0)}} className="mt-10 w-80 flex flex-col col-span-4 gap-y-2 py-6 px-4 rounded-md shadow-2xl featureCard cursor-pointer">
            <div className="w-full overflow-hidden flex justify-center items-baseline">
                <img className="w-16 h-16 rounded-t-md" src={props.image}/>
            </div>
            <div className="flex flex-col gap-y-4 px-5 pt-2 w-full">
                <div className="lato tracking-tighter text-xl w-full flex justify-center items-center">{props.name}</div>
                <div className="text-gray-600 text-sm lato w-full text-justify">{props.details}</div>
                <div className="text-blue-700 text-sm text-center font-bold joinUs">{props.premium}</div>
            </div>
        </div>
    );
}
 
export default Features;