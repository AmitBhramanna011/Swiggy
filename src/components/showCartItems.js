import { useDispatch } from "react-redux";
import { addItems,clearCart } from "../utils/cartSlice";
import EmptyCart from "./emptycart";

const ShowCartItems=(data)=>{
    
    const dispatch=useDispatch();
    const cartclear=()=>{
        dispatch(clearCart())
    }
    const {cartItems}=data;
    console.log(cartItems)
    console.log(data)
    if(cartItems.length===0) {
        return <EmptyCart></EmptyCart>
    }
    return (
        <div className="p-4">
       <div className="max-w-5xl m-auto flex justify-between" >
        <p className="text-2xl" >Cart</p>
        <p className="cursor-pointer text-base border border-solid rounded-2xl px-3 py-1 bg-gray-800 text-white " onClick={cartclear} >Clear</p>
       </div>
    {cartItems.map((itr)=>(
    <div className="flex justify-center max-w-5xl border-b-2 p-4 mx-auto  menu-card">         
    <ul className=" flex justify-between w-9/12" >
    <img className=" select-none w-44 h-32 border rounded-xl object-cover menu-img" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/"+itr.imageId} ></img>
       <div className="w-1/3 flex flex-col gap-2">
        <h2 className=" text-xl font-bold" >{itr.name}</h2>
        <p>{itr.category}</p>
        {itr.itemAttribute.vegClassifier=='VEG' ? (
            <p className="tracking-widest border rounded-md px-1 w-11 bg-green-600 text-white" >{itr.itemAttribute.vegClassifier}</p>

        ):(
            <p className="tracking-widest border rounded-md px-1 w-1/3 bg-red-600 text-white" >{itr.itemAttribute.vegClassifier}</p>
        )}
       </div> 
       <div className= "px-2 flex w-1/5 justify-center gap-6  customize-cart">
       <i className="bi bi-dash-lg"></i>
       <p>1</p>
       <i className="bi bi-plus-lg"></i>
       </div>
        {itr.price != null ? (
          <p className="text-xl font-bold">₹ {itr.price / 100}</p>
         ) : (
          <p className="text-xl font-bold">₹ {itr.defaultPrice/100}</p>
         )}

         

        {/* <p> ⭐ {itr.ratings?.aggregatedRating?.rating} ({itr.ratings?.aggregatedRating?.ratingCountV2})</p> */}
    </ul>
   
</div>
    )) }

</div>
);
}
export default ShowCartItems;