import './style.css'
import image from "../images/neerajchopra.webp";
import SideBoxImage from "./SideBoxImage"

const suggestions = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];

const SideBox = ()=>{
    return(
        <>
        <div className="sideBox">
            <div>
            <img src={image}  className="sideBox_main_image" alt=""></img>
         <div>
         <h3>Jugesh Raghav</h3>
         <p>jugesh_raghav</p>
         </div>
            </div>
            <h3>Suggestions For You</h3>
            {suggestions.map((suggestion) => (
              <SideBoxImage key={suggestion.id} />
            ))}
        </div>
        </>
    )
}

export default SideBox