
const Rest_card=(props)=>{
    const {resData}=props;
    const {cloudinaryImageId,name,cuisines,avgRating,sla,isOpen,aggregatedDiscountInfoV3}=resData?.info;
    console.log(cloudinaryImageId)
    var isOpenStyle='none';
    if(isOpen===false) {
        isOpenStyle='grayscale(100%)';
    }
    return (
        <div className="rounded-2xl p-2 w-72 flex flex-col h-72 transition-all duration-500 card" >

            <img className=" h-44 w-full object-cover rounded-2xl card-img" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/"+cloudinaryImageId} style={{filter:isOpenStyle}} ></img>
            <div className="resto-shadow">
                <p>{aggregatedDiscountInfoV3?.header} {aggregatedDiscountInfoV3?.subHeader}</p>
            </div>
             <div>
            <h4 className=" text-lg font-bold" > {name}</h4>
            <div className="flex gap-4 text-lg font-bold"><p>⭐{avgRating}   - </p>
            <p>{sla.deliveryTime} minutes</p>
            </div>
            <p className=" text-base font-extralight">{cuisines.join(" , ")}</p>
            </div>
        </div>
        
    )
}
export const withPromotedLabel=(Restaurent)=>{
    return(props)=>{
      return (
        <div className="labeled-resto-cont" >
            <label className="absolute" >Promoted</label>
            <Rest_card {...props}/>
        </div>
      );
    }
  }
export default Rest_card;