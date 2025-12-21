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
    if (newChar && (/[+\-\.eE]/.test(newChar))){
        console.log("new char is " + newChar + " character. We make the input value ''!");
        this.value = "";
    } else if (strInputValue && (strInputValue[0] === "0")){
        console.log("input starts with 0. We make the input value ''!");
        this.value = "";
    } else if (strInputValue === ""){
        console.log("input is ''. We leave it as is");
    } else{
        console.log("input is ok");
    }

    updateOutput(this);
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
        updateOutput(this);
    }
}

function checkboxHandler(e){
    updateOutput(this);
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
    dropdownPlaceholder.children[0].style.color = "black";
}


//adding/connecting event functions to elements
quantityInput.addEventListener("input", inputHandler);
ordersInput.addEventListener("input", inputHandler);
dropdownPlaceholder.addEventListener("click", clickHandler);
for (let i = 0; i < dropdownList.children.length; i++){dropdownList.children[i].addEventListener("click", clickHandler)};
accountingCheckboxField.querySelector("#accounting").addEventListener("change", checkboxHandler);
terminalCheckboxField.querySelector("#terminal").addEventListener("change", checkboxHandler);

//output functions

function updateOutput(inputEle){
    console.log("");
    console.log("updateOutput");

    const outputRow = getOutputRow(inputEle.id);

    console.log("output row");
    console.log(outputRow);

    updateOutputRow(outputRow, inputEle);
    updateTotal();
}

function getOutputRow(inputEleId){
    for (let i = 0; i < outputRows.length; i++){
        if (outputRows[i].id.includes(inputEleId)){
            return outputRows[i];
        }
    }
    return outputRows[2]; //return the package row - only possibility left
}

function updateOutputRow(outputRow, inputEle){
    console.log("update row with id " + outputRow.id);

    if (outputRow.id === "quantity-row" || outputRow.id === "orders-row"){
        console.log("row is quantity or orders");

        if (inputEle.value === ""){
            console.log("input value is empty");
            console.log("we hide the row");

            outputRow.style.display = "none";
            outputRow.dataset.total = "0";

        } else {
            console.log("input value isn't empty - will be int number");
            console.log("we show the row");

            outputRow.style.display = "flex";

            const rowCalc = outputRow.children[1];
            const rowTotal = outputRow.children[2];

            const numOfItems = Number(inputEle.value);
            let costOfItem;
            if (outputRow.id === "quantity-row"){costOfItem = 0.5;} else{costOfItem = 0.25}

            let rowTotalPrice = numOfItems*costOfItem;
            if (!Number.isInteger(rowTotalPrice)){rowTotalPrice = rowTotalPrice.toFixed(2)};

            rowCalc.innerText = numOfItems + " x $" + costOfItem;
            rowTotal.innerText = "$" + rowTotalPrice

            outputRow.dataset.total = rowTotalPrice;
            console.log(typeof(outputRow.dataset.total));
        }
    } else if (outputRow.id === "package-row") {
        console.log("row is package");
        console.log("we show it");
        outputRow.style.display = "flex";

        const packageName = outputRow.children[1];
        const totalPrice = outputRow.children[2];

        let package;
        let rowTotalPrice
        if (inputEle.id.includes("basic")){
            [package, rowTotalPrice] = ["Basic", "0"];
        } else if (inputEle.id.includes("pro")){
            [package, rowTotalPrice] = ["Professional", "25"]
        } else if (inputEle.id.includes("premium")){
            [package, rowTotalPrice] = ["Premium", "60"]
        }

        packageName.innerText = package;
        totalPrice.innerText = "$" + rowTotalPrice;
        outputRow.dataset.total = rowTotalPrice;
    } else if (outputRow.id === "accounting-row" || outputRow.id === "terminal-row"){
        console.log("row is accounting or terminal");

        if (!inputEle.checked){
            console.log("if checkbox isnt checked, hide row and make its total: $0");

            outputRow.style.display = "none";
            outputRow.dataset.total = "0";
        } else {
            console.log("if checkbox IS checked, show row and determine its total");

            outputRow.style.display = "flex";

            const totalPrice = outputRow.children[1];
            let rowTotalPrice;
            if (inputEle.id.includes("accounting")){
                rowTotalPrice = "35";
            } else if (inputEle.id.includes("terminal")){
                rowTotalPrice = "5";
            }
            totalPrice.innerText = "$" + rowTotalPrice;

            outputRow.dataset.total = rowTotalPrice;
        }
    }
}

function updateTotal(){
    console.log("update total!")
    let totalAmount = 0;
    for (let i = 0; i < outputRows.length; i++){
        totalAmount += Number(outputRows[i].dataset.total);
    }

    if (!Number.isInteger(totalAmount)){totalAmount = totalAmount.toFixed(2)};

    totalPrice.innerText = "$" + totalAmount;
}