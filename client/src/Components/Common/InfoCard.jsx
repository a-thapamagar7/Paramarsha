import star from "../../Images/star.png"
import missIMG from "../../Images/imaga.png"
import { useNavigate } from "react-router-dom"

const InfoCard = ({ imgURL, name, description, location, rating, subjects }) => {
    
    const navigate = useNavigate();

    return (
        <div onClick={()=>{navigate("/info/" + name); window.scrollTo(0, 0)}} className="bg-white rounded-lg shadow-lg p-6 border infoCard cursor-pointer">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-3/12">
                    <img src={(imgURL)?(imgURL):(missIMG)} alt={name} className="rounded-lg h-48 w-full object-cover" />
                </div>
                <div className="md:w-2/3 md:ml-6 mt-4 md:mt-0 flex flex-col gap-y-1">
                    <h2 className="text-2xl font-bold">{name}</h2>
                    <div className="text-sm text-gray-700">{location}</div>
                    {rating?(<span className="text-sm text-gray-700 flex flex-row items-center">{rating} / 5 <img src={star} className="h-3 ml-2" /></span>):(<></>)}
                    
                    <p className="text-gray-700 mb-4 max-h-20 overflow-hidden overflow-ellipsis lato text-sm line-clamp-4">{description}</p>
                    <div className="flex flex-wrap mb-2">



                        {(subjects) ?
                            (<>
                                {subjects.map((value, i) => {
                                    return(
                                        <span key={value + i} className="inline-block bg-blue-700 rounded-full px-3 py-1 text-xs font-semibold text-white mr-2 mb-2">{value}</span>
                                    )
                                    
                                })}
                            </>
                            )
                            :
                            (
                                <>
                                </>
                            )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoCard;