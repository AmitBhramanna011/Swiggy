import Menu_card from "./menu_cards";
const CategoryMenuComponent=(props)=>{
    const {c,addItemToCart}=props;
    console.log(c);

    // const {c}=props?.card.card.itemCards;
    
    return(

        <div className="resto-menu">
            
        {/* <h4 className="text-center px-14 py-3 m-0 text-5xl" >{resAPIData[19]?.card?.card?.name}</h4> */}
        
      {
        c.card.card.itemCards.map((it)=>(
            <Menu_card key={it.card.info.id} resMenu={it} addItemToCart={addItemToCart}/>
        ))            
    }
</div>
    )
}

export default CategoryMenuComponent;