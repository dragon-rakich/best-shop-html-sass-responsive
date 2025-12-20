//all elements we will be working on
const quantityInput = document.querySelector("#quantity");
const ordersInput = document.querySelector("#orders");
const dropdownPlaceholder = document.querySelector(".calc__dropdown-placeholder");
const dropdownList = document.querySelector(".calc__dropdown-list");
const hiddenSelect = document.querySelector("#hidden-select");
const accountingCheckboxField = document.querySelector(".calc__checkbox-field:first-of-type");
const terminalCheckboxField = document.querySelector(".calc__checkbox-field:last-child");
const outputRows = document.querySelectorAll(".calc__output-row");
const totalPrice = document.querySelector(".calc__total-price");


//all event functions that will be working with the elements
function inputHandler(e){
    console.log("");
    console.log("input handler function");
    console.log("input data: " + this.value);
    console.log("new char: " + e.data);

    const newChar = e.data
    const strInputValue = this.value;
    const numInputValue = Number(strInputValue);
    if (newChar && (/[+\-\.eE]/.test(newChar))){
        console.log("new char is " + newChar + " character. We make the input value ''!");
        this.value = "";
    } else if (strInputValue && (strInputValue[0] === "0")){
        console.log("input starts with 0. We make the input value ''!");
        this.value = "";
    } else if (strInputValue === ""){
        console.log("input is ''. We leave it as is");
    } else if (e.data === null){
        console.log("new char is null??")
    } else{
        console.log("input is ok");
    }
    //updateOutput();
}

function clickHandler(e){
    if (this.className === "calc__dropdown-placeholder"){
        if (!dropdownList.isShowing){
            showDropdown();
        } else{
            hideDropdown();
        }
    } else if (this.className === "calc__dropdown-option"){
        selectDropdownOption(this.innerText);

        hideDropdown();
        //updateOutput();
    }
}

function checkboxHandler(e){

}

//helper functions to event functions

function showDropdown(){
    dropdownPlaceholder.children[1].style.transform = "rotate(180deg)";
    dropdownList.style.display = "flex";
    dropdownList.isShowing = true;
}

function hideDropdown(){
    dropdownPlaceholder.children[1].style.transform = "rotate(0deg)";
    dropdownList.style.display = "none";
    dropdownList.isShowing = false;
}

function selectDropdownOption(option){
    hiddenSelect.value = option;
    dropdownPlaceholder.children[0].innerText = option;
}


//adding/connecting event functions to elements
quantityInput.addEventListener("input", inputHandler);
ordersInput.addEventListener("input", inputHandler);
dropdownPlaceholder.addEventListener("click", clickHandler);
for (let i = 0; i < dropdownList.children.length; i++){dropdownList.children[i].addEventListener("click", clickHandler)};
accountingCheckboxField.querySelector("#accounting").addEventListener("change", checkboxHandler);
terminalCheckboxField.querySelector("#terminal").addEventListener("change", checkboxHandler);

//output function