import React, { useEffect, useState } from "react";
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
import userLogin from "./utils/userLogin";
import { Provider } from "react-redux";   //----------------> connect store to react layer (ui-layer)
import appStore from "./utils/appStore";



const root=ReactDOM.createRoot(document.getElementById("container"));


const AppLayout=()=>{
    const [userName,setuserName]=useState();

    useEffect(()=>{
        setuserName("Amit Bhramanna")
    },[])
    return (
        
        // <userLogin.Provider value={{userName:"Sanjay",setuserName}}>
        <Provider store={appStore} >
        <div className="app">
         <Header/>
         <Outlet/>
        </div>
        </Provider>
        // </userLogin.Provider>

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
            element: (<userLogin.Provider value={{userName:"Sanjay"}} ><Resto_menu/> </userLogin.Provider> ),
        },
        
        ],
       errorElement:<Error/>
    }
])

root.render(<RouterProvider router={appRouter}/>);
