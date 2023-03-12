import React from "react";
import ku from "../Images/KU.jpg"
import tu from "../Images/TU.jpg"
import lmu from "../Images/lmu.jpg"
import Contentcards from "./Contentcards";

const Universitysection = () => {
    return (
        <div className="w-full flex flex-col mt-28 gap-y-7">
            <div className="mb-10 flex flex-row items-end" style={{justifyContent: "space-between"}}>
                <div className="">
                    <div className="text-5xl font-sans font-extrabold tracking-tight text-gray-900">
                        <span className="">Discover </span>
                        <span className="text-blue-700">Universities</span>
                    </div>
                    <div className="mt-3 w-max text-lg text-gray-500">
                        Explore some of the best universities from around the country with our curated list
                    </div>
                </div>
                <div className="text-gray-500 text-lg">
                    View All
                </div>
            </div>
            <div className="w-full h-96 flex flex-row" style={{ justifyContent: "space-between", height: "350px" }}>
                <Contentcards image={ku} name="Kathmandu University" rating="4" address="Dhulikhel, Kavrepalanchok" items={["IT", "Business", "Arts", "Engineering", "Law", "Medical"]} />
                <Contentcards image={tu} name="Tribhuvan University" rating="2" address="Kritipur, Kathmandu" items={["IT", "Business", "Arts", "Engineering", "Law", "Medical"]} />
                <Contentcards image={lmu} name="London Metropolitan University" rating="5" address="London, England" items={["IT", "Business", "Arts", "Multimedia"]} />
            </div>

        </div>
    );
}

export default Universitysection;