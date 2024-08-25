
import { Link } from "react-router-dom";
const EmptyCart=()=>{
    return(
        <div >
        <div className=" p-3 flex justify-center "  >
            <img className=" w-1/4" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" ></img> 
        </div>
        <div className="flex text-center justify-center font-bold tracking-wider font-mono text-lg p-2 " >
           <p>Your Cart is empty </p>
           
        </div>
        <div className="flex text-center justify-center  tracking-wider text-gray-500 text-base p-2 ">
            <p > You can go to home page to view more restaurants </p>
       </div>
        <div className="flex text-center justify-center  p-2">
            <Link to={"/"}><p className="racking-wider cursor-pointer font-bold border text-white tracking-wider border-solid rounded-lg px-5 py-2 text-base bg-orange-500"> SEE RESTAURANTS NEAR YOU </p> </Link>
       </div>
    </div>
    )
}
export default EmptyCart;