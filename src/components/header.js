import { Link } from "react-router-dom";
import userLogin from "../utils/userLogin";
import { useContext } from "react";
import { useSelector } from "react-redux";


const Header=()=>{
    const {userName}=useContext(userLogin);
    const cart=useSelector((store)=>store.cart.items)
    console.log(cart);
    return(
        <div className="flex items-center justify-between heading">
            <div className="w-28 logo">
                <img src="https://cdn.dribbble.com/userupload/5966432/file/original-03c1fe57f7907074905632cbf187f058.png?crop=0x0-2800x2100&resize=400x300&vertical=center"></img>
            </div>
            <div className="pr-10 align-center nav-bar">
                <ul className="flex gap-10"> 
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/cart">cart- {cart.length}</Link></li>
                    <li>{userName}</li>
                </ul>

            </div>
        </div>
    );
}
export default Header;