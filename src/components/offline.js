import React from 'react';
import noInternetImage from '../images/no-internet.jpg'
const Offline = () => {
    console.log(noInternetImage);
    return (
        <div className="Offline">
            <h1> Check Your connection !</h1>
            {/* <img src={noInternetImage}></img> */}
        </div>
    );
}

export default Offline;
