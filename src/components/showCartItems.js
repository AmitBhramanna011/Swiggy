


const ShowCartItems=(data)=>{
    const {cartItems}=data;
    console.log(cartItems)
    console.log(data)
    return (
        
    cartItems.map((itr)=>(
    <div className="flex justify-center max-w-5xl border-b-2 p-4 mx-auto  menu-card">         
    <ul className=" flex justify-between w-9/12" >
    <img className=" select-none w-44 h-32 border rounded-xl object-cover menu-img" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/"+itr.imageId} ></img>
       <h2 className="w-2/5 text-xl font-bold" >{itr.name}</h2>
       <div className="customize-cart">
       <i class="bi bi-dash"></i>
       <i class="bi bi-plus"></i>
       </div>
        {itr.price != null ? (
          <p className="text-xl font-bold">₹ {itr.price / 100}</p>
         ) : (
          <p className="text-xl font-bold">₹ {itr.defaultPrice/100}</p>
         )}

         {/* <p>Remove</p>     */}

        {/* <p> ⭐ {itr.ratings?.aggregatedRating?.rating} ({itr.ratings?.aggregatedRating?.ratingCountV2})</p> */}
    </ul>
    <div>
    </div>
</div>
    )));
}
export default ShowCartItems;