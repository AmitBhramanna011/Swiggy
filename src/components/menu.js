
import { useEffect, useState } from "react";
import Menu_card from "./menu_cards";
import { Link, useParams } from "react-router-dom";
import SkeletonMenu from "./skeleton_menu";
import Noresult from "./noresult"
import useNetworkStatus from "../utils/useNetworkStatus";
import Offline from "./offline";
import CategoryWiseMenu from "./CategoryWiseMenu";
import Cart from "./Cart";
import Hi from "./hi"
const Resto_menu=()=>{
    const [resInfo,setresInfo]=useState(null);

    /*
    there is other way to write clean code 
    we can create useRestaurents hook to fetch the data 
    and return the resInfo 
    Here we can use resinfo as 
    resInfo=useRestaurents(id);
    */
    //----------------------------------> const  resInfo=useRestaurents(id);.-----------------------------------------------//

    const [resAPIData,setresAPIData]=useState([]);
    const [originalMenu,setoriginalMenu]=useState([]);
    const {id} =useParams();
    const [searchMenu,setsearchMenu]=useState("");
    const [items,setItems]=useState([]);
    const [count,setCount]=useState(0);
    const [isCartVisible, setIsCartVisible] = useState(false);


    useEffect(()=>{
        fetchMenu();
    },[]);
    
    const  fetchMenu= async() =>{
        const menu= await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.61610&lng=73.72860&restaurantId="+id+"&catalog_qa=undefined&isMenuUx4=true&submitAction=ENTER");
        const menu_json=await menu.json();

        setresInfo(menu_json.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[2].card.card.itemCards);
        
        setresAPIData(menu_json.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards)
        setoriginalMenu(menu_json.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[2].card.card.itemCards);
        if(resInfo==null) {
            setresInfo(menu_json.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[3].card.card.itemCards);
        }

    };
    
    const searchMenuFun=(e)=>{
        let sub = e.toLowerCase();
        
        const searched_menu = CategoryMenu.filter((str) =>
        str.card.card.itemCards.filter((n)=>
        //   console.log(n)
          n.card.info.name.toLowerCase().includes(sub)
        )
        
        );
        if(searched_menu.length==0) {
          setresInfo(originalMenu);
        }
        else setresInfo(searched_menu);
    }
    const NetworkStatus=useNetworkStatus();

   if(NetworkStatus===false) {
    return(
      <Offline></Offline>
    )
   }
    
    if(!resInfo){
     return (
        <SkeletonMenu></SkeletonMenu>
     )
    }
    console.log(resAPIData)
    const CategoryMenu=resAPIData.filter((it)=>
        it.card?.["card"]?.["@type"]==="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
    console.log(CategoryMenu)
    
    console.log(CategoryMenu[0])

    return (
    
    //     <div className="resto-menu">
    //         <h4 className="text-center px-14 py-3 m-0 text-5xl" >{resAPIData?.data?.cards[2]?.card?.card?.info?.name}</h4>
    //         <div className="m-auto gap-8 py-3 max-w-5xl flex justify-end search-menu" ><input type="text" className="search-menu" 
    //         value={searchMenu}
    //         placeholder={"Search in "+resAPIData?.data?.cards[2]?.card?.card?.info?.name}
    //         onChange={(e)=>{
    //             setsearchMenu(e.target.value);
    //             searchMenuFun(e.target.value);
    //         }
    //         } />
    //         <button onClick={searchMenu}>Search</button> 
    //         </div>
    //       {
    //         resInfo.map((it)=>(
    //             <Menu_card key={it.card.info.id} resMenu={it}/>
    //         ))            
    //     }
    // </div>
    <div>
        <div className="flex items-center justify-around"> 
        <h4 className="text-center px-14 py-3 m-0 text-5xl" >{resAPIData[resAPIData.length-1]?.card?.card?.name}</h4>
       
        <Link to={{ pathname: "/cart", state: { items } }}>
        <button>
          <p>Cart: {count}</p>
        
        </button>
        </Link>
       
        </div>
        <div className="m-auto gap-8 py-3 max-w-5xl flex justify-end search-menu" ><input type="text" className="search-menu" 
            value={searchMenu}
            placeholder={"Search in "+resAPIData[resAPIData.length-1]?.card?.card?.name}
            onChange={(e)=>{
                setsearchMenu(e.target.value);
                searchMenuFun(e.target.value);
            }
                
            } />
            <button onClick={searchMenu}>Search</button> 
            </div>
        
   { CategoryMenu.map((it)=>(
        //  <div>
        //    <div className="max-w-5xl m-auto flex justify-around"> <h1 className="" >{it.card.card.title}</h1>
        //     <span>👇</span>
        //     </div>
        //  <CategoryMenuComponent c={it} ></CategoryMenuComponent>
        //  </div>
        <CategoryWiseMenu key={it.card.card.title} data={it}/>
    ))
    
   }
  
   <div className="p-4 max-w-5xl m-auto gap-4 flex items-center bg-gray-200">
            <img className=" h-8 w-16 fssai-img" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_120,h_60/"+resAPIData[resAPIData.length-2].card?.card?.imageId}></img>
            <p className="pt-2 text-sm text-gray-500" >{resAPIData[resAPIData.length-2].card?.card?.text[0]}</p>
    </div>
   <div className=" p-4 max-w-5xl m-auto gap-4 flex items-center bg-gray-200">
            <div className=" border-t-2 border-gray-300 border-solid flex flex-col">
            <p className="pt-2 text-lg font-bold tracking-wider text-gray-500">{resAPIData[resAPIData.length-1].card?.card?.name}</p>
            <p className="pt-2 text-sm text-gray-500 lowercase "><i className="bi bi-geo-alt-fill"></i> {resAPIData[resAPIData.length-1].card?.card?.completeAddress}</p>
            </div>
    </div>
    <div className=" bg-gray-200 max-w-5xl m-auto text-center p-4 pb-40 download " >
        <p className="font-bold text-gray-800 p-4 border-t-2 border-gray-300 border-solid">For better experience, download our app now</p>
        <div className="flex gap-4 justify-center">
            <img className="w-52 h-16 cursor-pointer" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/play_store.png"}></img>
            <img className="w-52 h-16 cursor-pointer" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/app_store.png"}></img>

        </div>

    </div>
    </div>

    )
}

export default Resto_menu;