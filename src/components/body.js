import { Link } from "react-router-dom";
import Rest_card from "./rest-card";
import Skeleton from "./skeleton";
import { useEffect, useState } from "react";
import useNetworkStatus from "../utils/useNetworkStatus";
import { withPromotedLabel } from "./rest-card";
import { useContext } from "react";
import userLogin from "../utils/userLogin";

const Body = () => {
  const [listofRestaurent, setlistofRestaurent] = useState([]);
  const [filteredRestaurent, setfilteredRestaurent] = useState([]);
  const [search_text, setsearch_text] = useState("");
  const [loading, setLoading] = useState(false); // For showing loading indicator
  const [page, setPage] = useState(1); // To keep track of the current page

  useEffect(() => {
    fetchData();
    
    // Adding scroll event listener for infinite scrolling
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.61610&lng=73.72860&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING&page=${page}`
      );
      const jsonData = await data.json();

      // Append new data to the existing list instead of overwriting it
      setlistofRestaurent((prev) => [
        ...prev,
        ...jsonData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants,
      ]);

      setfilteredRestaurent((prev) => [
        ...prev,
        ...jsonData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants,
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleScroll = () => {
    // Check if user has scrolled to near the bottom of the page
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 10
    ) {
      setPage((prevPage) => prevPage + 1); // Load the next page
    }
  };

  const sort = () => {
    const sortedRestaurent = listofRestaurent.filter(
      (res) => res.info.avgRating > 4
    );
    setlistofRestaurent(sortedRestaurent);
    setfilteredRestaurent(sortedRestaurent);
  };

  const search = (e) => {
    let sub = e.toLowerCase();
    const searched_resto = listofRestaurent.filter((str) =>
      str.info.name.toLowerCase().includes(sub)
    );
    setfilteredRestaurent(searched_resto);
  };

  const PromotedRestaurent = withPromotedLabel(Rest_card);
  const NetworkStatus = useNetworkStatus();
  const { userName, setuserName } = useContext(userLogin);

  if (NetworkStatus === false) {
    return <h1>You are offline! ⚠️</h1>;
  }

  if (listofRestaurent.length === 0 && !loading) {
    return <Skeleton />;
  }

  return (
    <div className="body">
      <div className="flex justify-end filters gap-10 items-center">
        <div className="">
          <input
            type="text"
            className="border border-gray-400 rounded-lg py-1 px-3 search-bar mx-2"
            placeholder="Search a restaurant"
            onChange={(e) => {
              setsearch_text(e.target.value);
              search(e.target.value);
            }}
          />
          <button
            onClick={() => {
              search(search_text);
            }}
          >
            <i className="bi bi-search"></i>
          </button>
        </div>
        <button className="sort-btn" onClick={sort}>
          <i className="bi bi-sort-down text-4xl"></i>
        </button>
      </div>

      <div className="flex flex-wrap gap-8 justify-between resto-cont">
        {filteredRestaurent.map((it) => (
          <Link key={it.info.id} to={"/restaurents/" + it.info.id}>
            <Rest_card resData={it} />
          </Link>
        ))}
      </div>

      {loading && <p>Loading more restaurants...</p>} {/* Show a loading indicator */}
      
      <div className="flex justify-center pt-16 gap-4">
        <p>Made with ❣️ by Amit Bhramanna</p>
        <p>
          <a
            target="_blank"
            href="https://www.instagram.com/amit_bhramanna17/"
          >
            <i className="bi bi-instagram"></i>
          </a>
        </p>
        <p>
          <a target="_blank" href="https://github.com/amitbhramanna011">
            <i className="bi bi-github"></i>
          </a>
        </p>
        <p>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/amit-bhramanna-063b7922a/"
          >
            <i className="bi bi-linkedin"></i>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Body;
