import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/header";
import Body from "./components/body";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import About from "./components/about";
import Contact from "./components/contactus";
import Error from "./components/error";
import Resto_menu from "./components/menu";

import { Outlet } from "react-router-dom";
import Cart from "./components/Cart";



const root=ReactDOM.createRoot(document.getElementById("container"));


const AppLayout=()=>{
    return (
        <div className="app">
         <Header/>
         <Outlet/>
        </div>
    );
}
const appRouter=createBrowserRouter([
    {
        path:"/",
        element:<AppLayout/>,
        children:[
        {
                path:"/",
                element:<Body/>
        },
        {
            path:"/about",
            element:<About/>
        },
        {
            path:"/contact",
            element:<Contact/>
        },
        {
            path:"/cart",
            element:<Cart></Cart>
        },
        {
            path:"/restaurents/:id",
            element:<Resto_menu/>
        },
        
        ],
       errorElement:<Error/>
    }
])

root.render(<RouterProvider router={appRouter}/>);
