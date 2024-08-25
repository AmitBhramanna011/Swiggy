import { Link } from "react-router-dom";
import userLogin from "../utils/userLogin";
import { useContext } from "react";
import { useSelector } from "react-redux";

import logo from "../images/logo.png"
import name from "../images/name.png"



const Header=()=>{
    const {userName}=useContext(userLogin);
    const cart=useSelector((store)=>store.cart.items)
    console.log(cart);
    return(
        <div className="px-6 shadow-lg flex items-center justify-between heading">
            <div className="w-24 logo p-3">
                <img src={logo}></img>
                <img src={name}></img>
                
            </div>
            <div className="pr-10 align-center nav-bar">
                <ul className="flex gap-10 items-center"> 
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/cart"><i class="bi bi-bag"></i> {cart.length}</Link></li>
                    <li><i class="bi bi-person-fill cursor-pointer text-2xl"></i></li>
                </ul>

            </div>
        </div>
    );
}
export default Header;