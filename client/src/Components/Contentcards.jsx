import React from "react";
import star from "../Images/star.png"

const Contentcards = (props) => {
    return (
        <div className="productCard flex flex-col gap-x-5 w-80  rounded-md shadow-2xl" style={{ backgroundColor: "#f3f4f6" }}>
            <div className="w-full h-52 overflow-hidden">
                <img className="w-full h-50 rounded-t-md" src={props.image}/>
            </div>
            <div className="flex flex-col gap-y-2 px-5 pt-2 w-full">
                <div className="lato tracking-tighter text-xl">{props.name}</div>
                <div className="lato tracking-tighter text-sm flex flex-auto items-center">{props.rating} / 5 <img className="ml-1 h-3 w-3" src={star}/></div>
                <div className="text-gray-600 text-sm lato">{props.address}</div>
                <div className="flex flex-row gap-1">
                    {props.items.map((item, index) => (
                        (index < 3)?
                        (<div key={index} className="flex justify-center items-center rounded-full text-xs bg-blue-700 h-6 lato font-bold text-white w-2/6">{item}</div>)
                        :
                        (<></>)
                    ))}
                    {(props.items.length > 3)? (<div className="flex justify-center items-center rounded-full text-xs bg-blue-700 h-6 lato font-bold text-white w-2/6">+{props.items.length-3} more</div>):(<></>)}
                </div>
            </div>
        </div>
    );
}

export default Contentcards;