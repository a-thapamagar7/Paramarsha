import React from "react";
import islington from "../Images/islington.jpg"
import ace from "../Images/ace.jpg"
import herald from "../Images/herald.jpg"
import ncm from "../Images/ncm.jpg"
import Contentcards from "./Contentcards";

const Collegesection = () => {
    return (
        <div className="w-full flex flex-col mt-32 gap-y-7">
            <div className="mb-10 flex flex-row items-end" style={{justifyContent: "space-between"}}>
                <div className="">
                    <div className="text-5xl font-sans font-extrabold tracking-tight text-gray-900">
                        <span className="">Discover </span>
                        <span className="text-blue-700">Colleges</span>
                    </div>
                    <div className="mt-3 w-max text-lg text-gray-500">
                        Explore some of the best colleges from around the country with our curated list
                    </div>
                </div>
                <div className="text-gray-500 text-lg">
                    View All
                </div>
            </div>
            <div className="w-full h-96 flex flex-row" style={{ justifyContent: "space-between", height: "350px"}}>
                <Contentcards image={islington} name="Islington College" rating="4" address="Kamalpokhari, Kathmandu" items={["IT", "Business"]}/>
                <Contentcards image={ace} name="Ace Institute of Management" rating="3" address="New Baneshwor, Kathmandu" items={["Business"]}/>
                <Contentcards image={herald} name="Herald College"  rating="4" address="Naxal, Kathmandu" items={["Business", "Business","Business", "Business", "Business", "IT"]}/>
            </div>
            
        </div>
    );
}

export default Collegesection;