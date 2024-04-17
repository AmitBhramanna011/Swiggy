import { useEffect, useState } from "react";

const useNetworkStatus=()=>{
    const [NetworkStatus,setNetworkStatus]=useState(true);
    
    useEffect(()=>{
        window.addEventListener("offline",()=>{
            setNetworkStatus(false);
        });
        window.addEventListener("online",()=>{
            setNetworkStatus(true);
        });
    },[]);
    

    return NetworkStatus;
}

export default useNetworkStatus;