import { useDispatch } from "react-redux";
import { addItems } from "../utils/cartSlice";
import { useRef } from "react";

const Menu_card = (props) => {
  const { resMenu } = props;
  const { name, description, imageId, price, defaultPrice, ratings } = resMenu?.card?.info;
  const dispatch = useDispatch();

  const buttonRef = useRef(null);

  const handleDispatch = (item) => {
    dispatch(addItems(item));
    const button = buttonRef.current;

    button.innerText = "ADDED";
    button.style.backgroundColor = "#009700";
    button.style.color = "white";
    // button.style.color.letterspacing ="2px";
    
    setTimeout(() => {
      button.innerText = "ADD";
      button.style.backgroundColor = "white";
      button.style.color = "green";
      
    }, 1000);
  };

  return (
    <div className="flex justify-between max-w-5xl border-b-2 p-4 mx-auto gap-8 menu-card">
      <ul className="w-9/12">
        <h2 className="text-xl font-bold">{name}</h2>
        {price != null ? (
          <p className="text-xl font-bold">₹ {price / 100}</p>
        ) : (
          <p className="text-xl font-bold">₹ {defaultPrice / 100}</p>
        )}
        <p className="text-base text-black opacity-70 overflow-hidden">{description}</p>
        <p>⭐ {ratings?.aggregatedRating?.rating} ({ratings?.aggregatedRating?.ratingCountV2})</p>
      </ul>
      <div>
        <img
          className="select-none w-52 h-44 border rounded-xl object-cover menu-img"
          src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + imageId}
          onError={(e) => {
            e.target.src = 'https://media-assets.swiggy.com/swiggy/image/upload/dls-web/assets/images/placeholder-light.png';
          }}
        />
        <div
          className="cursor-pointer flex justify-center"
          onClick={() => handleDispatch(resMenu.card.info)}
        >
          <p
            ref={buttonRef}
            className="hover:bg-zinc-200 select-none px-11 rounded-xl border border-solid border-gray-300 shadow-lg py-1 font-bold text-lg text-center relative bottom-3 bg-white text-green-600 transition-colors duration-200"
          >
            ADD
          </p>
        </div>
      </div>
    </div>
  );
};

export default Menu_card;
