import { Link } from "react-router-dom";
import Rest_card ,{withPromotedLabel} from "./rest-card";
import Skeleton from "./skeleton";
//----> it is a main restaurent list
import { useEffect, useState } from "react";
import useNetworkStatus from "../utils/useNetworkStatus";
import { withPromotedLabel } from "./rest-card";

const Body = () => {
  const [listofRestaurent, setlistofRestaurent] = useState([]);
  const [filteredRestaurent, setfilteredRestaurent] = useState([]);
  const [search_text, setsearch_text] = useState("");

  useEffect(() => {
    console.log("amit bhramanan");
    fetchData();
  }, []);
  const final = [];
  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.61610&lng=73.72860&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const jsonData = await data.json();

    setlistofRestaurent(
      jsonData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setfilteredRestaurent(jsonData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants)
        console.log(jsonData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants)
  };
  const sort = () => {
    const sortedRestaurent = listofRestaurent.filter(
      (res) => res.info.avgRating > 4
    );
    console.log(listofRestaurent.length);
    console.log(sortedRestaurent.length);

    setlistofRestaurent(sortedRestaurent);
    setfilteredRestaurent(sortedRestaurent)
  };
  const search = (e) => {
   
    let sub = e.toLowerCase();

    const searched_resto = listofRestaurent.filter((str) =>
      str.info.name.toLowerCase().includes(sub)
    );
    setfilteredRestaurent(searched_resto);

    console.log(searched_resto)
  };
  const PromotedRestaurent=withPromotedLabel(Rest_card)   //----> we have called functional component here 
  // Here , we can render skeleton of the cards or restaurents for better experience for the users //
  // we also call this Conditional Rendering
  const NetworkStatus=useNetworkStatus();

  if(NetworkStatus===false) {
    return(
      <h1>You are offline ! ⚠️ </h1>
    );
  }

  if (listofRestaurent.length === 0) {
    return <Skeleton />;
  }
  return (
    <div className="body">
      <div className="flex justify-end filters">
        <div>
          <input
            type="text"
            className="search-bar"
            value={search_text}
            placeholder="Search a restaurent"
            onChange={(e) => {
                console.log(e.target.value);
                setsearch_text(e.target.value);
                search(e.target.value);
                
            }}
          />
          <button onClick={search}><i className="bi bi-search"></i></button>
        </div>
        <button className="sort-btn" onClick={sort}>
          sort by rating
        </button>
      </div>
      <div className="flex flex-wrap gap-8 justify-between resto-cont">
        {filteredRestaurent.map((it) => (
          <Link key={it.info.id} 
          to={"/restaurents/"+it.info.id}>
         
          {/* {  it?.info?.isOpen?(
            <PromotedRestaurent resData={it} />    ------> This is a code for rendering promtoed label
                                                           with help of Higher order components

 
          ):(
            <Rest_card  resData={it} /> 
          )
          } */}
           <Rest_card  resData={it} /> </Link>
        ))}
      </div>
    </div>
  );
};



export default Body;
