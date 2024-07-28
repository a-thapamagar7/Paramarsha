import { useNavigate } from "react-router-dom"

const DashboardCard = (props) => {

    const navigate = useNavigate()

    return (
        <div onClick={() => {navigate(props.link); window.scrollTo(0, 0)}} className="mt-10 bg-yellow-100 col-span-4 flex flex-col gap-y-2 py-6 px-4 rounded-md shadow-2xl featureCard cursor-pointer">
            <div className="w-full flex flex-col items-center">
                <div className="font-bold text-3xl text-blue-700 underline underline-offset-2">{props.number}</div>
            </div>
            <div className="flex flex-col gap-y-4 px-7 pt-2 w-full">
                <div className="inter tracking-tighter text-xl w-full flex justify-center items-center font-bold">{props.name}</div>
                <div className="text-gray-600 text-xs lato w-full text-justify">
                    {(props.details)?
                        <ul className="">
                            {props.details.map((v, i)=>{
                                return(
                                    <li className="list-disc inter" key={"point"+i}>{v}</li>
                                )
                                
                            })}
                        </ul>
                        :
                        <></>}
                </div>
            </div>
        </div>
    );
}
 
export default DashboardCard;