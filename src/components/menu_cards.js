

const Menu_card = (props) => {
    // console.log(props)

      const{resMenu,addItemToCart}=props;
      // console.log(resMenu)
      const {name, description,imageId,price,defaultPrice,ratings}=resMenu?.card?.info;
      console.log(ratings.aggregatedRating.rating);

    const cart=()=>{
      console.log("ADDeddddddddddddddddddddd")
     
      
      addItemToCart({
        id: resMenu.card.info.id,
        name: resMenu.card.info.name,
        price: price != null ? price / 100 : defaultPrice / 100,
      });
     
    }
    return (
    <div className="flex justify-between max-w-5xl border-b-2 p-4 mx-auto gap-8 menu-card">
              
              <ul className="w-9/12" >
                 <h2 className="text-xl font-bold" >{name}</h2>
                  {price != null ? (
                    <p className="text-xl font-bold">₹ {price / 100}</p>
                   ) : (
                    <p className="text-xl font-bold">₹ {defaultPrice/100}</p>
                   )}
                  
                  <p className="text-base text-black opacity-70 overflow-hidden ">{description}</p>
                  <p> ⭐ {ratings?.aggregatedRating?.rating} ({ratings?.aggregatedRating?.ratingCountV2})</p>
                  
              </ul>
              <div>
              <img className="w-52 h-44 border rounded-xl object-cover menu-img" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/"+imageId} 
              onError={(e) => {
                e.target.src = 'https://media-assets.swiggy.com/swiggy/image/upload/dls-web/assets/images/placeholder-light.png';
              }}
              ></img>
              <div className=" cursor-pointer flex justify-center " onClick={cart} >
                <p className="px-11 text-green-600 rounded-xl border border-solid border-gray-300 shadow-lg py-1 font-bold text-lg text-center relative bottom-3 bg-white" >ADD</p>
              </div>
              </div>
  </div>
 );
};
export default Menu_card;
