
import { useEffect, useState } from "react";

const useRestaurantsMenu=(id)=>{
    const [resInfo,setresInfo]=useState(null);
    // const [resAPIData,setresAPIData]=useState(null);
    // const [originalMenu,setoriginalMenu]=useState(null);
    useEffect(()=>{
        fetchMenu();
    },[]);
    
    const  fetchMenu= async() =>{
        const menu= await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.61610&lng=73.72860&restaurantId="+id+"&catalog_qa=undefined&isMenuUx4=true&submitAction=ENTER");
        const menu_json=await menu.json();
        console.log(menu_json);
        console.log(menu_json.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[2].card.card.itemCards);
        setresInfo(menu_json.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[2].card.card.itemCards);
        // setresAPIData(menu_json)
        // setoriginalMenu(menu_json.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[2].card.card.itemCards);

    };

    return resInfo;

};
export default useRestaurantsMenu;