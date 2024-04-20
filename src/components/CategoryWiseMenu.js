import React, { useState } from 'react';
import CategoryMenuComponent from './CategoryMenuComponent';
 
const CategoryWiseMenu = (props) => {
    const { data } = props;
  
    const [isDropdownOpen, setIsDropdownOpen] = useState(true);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div>
            <div className=" cursor-pointer max-w-5xl m-auto items-center rounded-lg flex justify-between border border-solid shadow-lg px-3 py-2  my-2" onClick={toggleDropdown}>
                <h1 className='tracking-wide font-bold text-lg'>{data.card.card.title} ({data.card.card.itemCards.length})</h1>
                <span id="drop-down-menu" >
                    <i className={`bi ${isDropdownOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`+" text-xl " }  ></i>
                </span>
            </div>
            {isDropdownOpen && (
                <div className="dropdown-content">
                    {/* Render your dropdown content here */}
                    {/* Example: <p>Dropdown content goes here</p> */}
                
                    <CategoryMenuComponent c={data}  />
                </div>
            )}
        </div>
    );
};

export default CategoryWiseMenu;
