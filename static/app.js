// Variables
let textAreas = document.getElementsByTagName("textarea");
let inputTitle = document.querySelector("#project-title");
let submitButton = document.querySelector("#main-submit-button");
let coffeeSwitch = document.querySelector("#coffee-switch");
let projectSwitch = document.querySelector("#project-switch");
let coffeeInput = document.querySelector("#coffee-input");
let projectInput = document.querySelector("#project-input");

// ----------------------------
// Functions

function emptyOrTooLong(x, lenmax) {
    x.addEventListener("keyup", () => {
        if (x.value == "" || x.value.length > lenmax) {
            x.classList.remove("is-valid");
            x.classList.add("is-invalid");
            flagsObtained = howManyIsValids();
            checkFlags();
        } else {
            x.classList.remove("is-invalid");
            x.classList.add("is-valid");
            flagsObtained = howManyIsValids();
            checkFlags();
        }
    });
    x.addEventListener("click", () => { 
        if (x.value == "" || x.value.length > lenmax) {
            x.classList.remove("is-valid");
            x.classList.add("is-invalid");
            flagsObtained = howManyIsValids();
            checkFlags();
        } else {
            x.classList.remove("is-invalid");
            x.classList.add("is-valid");
            flagsObtained = howManyIsValids();
            checkFlags();
        }
    })
}

function howManyIsValids() {
    let isValids = document.getElementsByClassName("is-valid");
    return isValids.length;
}

function checkFlags() {
    if (flagsToObtain == flagsObtained) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

function hideShowInputs() {
    if (coffeeSwitch.checked) {
        document.querySelector("#coffee-input").classList.remove("d-none");
        document.querySelector("#coffee-input").required = true;
    } else {
        document.querySelector("#coffee-input").classList.add("d-none");
        document.querySelector("#coffee-input").required = false;
    }
    if (projectSwitch.checked) {
        document.querySelector("#project-input").classList.remove("d-none");
        document.querySelector("#project-input").required = true;
    } else {
        document.querySelector("#project-input").classList.add("d-none");
        document.querySelector("#project-input").required = false;
    }
}

// ----------------------------
// Main

let flagsToObtain = 0;
let flagsObtained = 0;

emptyOrTooLong(inputTitle, 64);
flagsToObtain++;
for (let i = 0; i < textAreas.length; i++) {
    emptyOrTooLong(textAreas[i], 10000);
    flagsToObtain++;
}

coffeeSwitch.addEventListener("click", hideShowInputs);
projectSwitch.addEventListener("click", hideShowInputs);

