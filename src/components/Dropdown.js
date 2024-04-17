// dropdown.js

const Dropdown = () => {
    const dropdownMenu = document.getElementById("drop-down-menu");

    if (dropdownMenu) {
        dropdownMenu.addEventListener("click", () => {
            console.log("Dropdown clicked");
            dropdownMenu.classList.toggle("open");
        });
    }
};

export default Dropdown;
