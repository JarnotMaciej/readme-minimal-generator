// Variables
let textAreas = document.getElementsByTagName("textarea");
let inputTitle = document.querySelector("#project-title");
let inputShortDesc = document.querySelector("#short-desc");
let inputProblemToSolve = document.querySelector("#problem-to-solve");
let inputHowToUse = document.querySelector("#how-to-use");
let submitButton = document.querySelector("#main-submit-button");
let coffeeSwitch = document.querySelector("#coffee-switch");
let projectSwitch = document.querySelector("#project-switch");
let inputCoffee = document.querySelector("#coffee-input");
let inputProject = document.querySelector("#project-input");

// ----------------------------
// Functions

async function loadConfig() {
    try {
        const response = await fetch("/config");
        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Failed to load config:", error);
        return null;
    }
}

function emptyOrTooLong(x, lenmax) {
    if (x.value == "" || x.value.length > lenmax) {
        x.classList.remove("is-valid");
        x.classList.add("is-invalid");
    } else {
        x.classList.remove("is-invalid");
        x.classList.add("is-valid");
    }
}

function validateAndListen(x, lenmax) {
    x.addEventListener("keyup", () => {
        emptyOrTooLong(x, lenmax);
        flagsObtained = howManyIsValids();
        checkFlags();
    });
    x.addEventListener("click", () => {
        emptyOrTooLong(x, lenmax);
        flagsObtained = howManyIsValids();
        checkFlags();
    });
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

hideShowInputs();
let config = loadConfig();
const maxTitleLength = config.maxTitleLength;
const maxShortDescLength = config.maxShortDescLength;
const maxProblemToSolveLength = config.maxProblemToSolveLength;
const maxHowToUseLength = config.maxHowToUseLength;
const maxCoffeeURL = config.maxCoffeeURLLength;
const maxProjectURL = config.maxProjectURLLength;

validateAndListen(inputTitle, maxTitleLength);
flagsToObtain++;
validateAndListen(inputShortDesc, maxShortDescLength);
flagsToObtain++;
validateAndListen(inputProblemToSolve, maxProblemToSolveLength);
flagsToObtain++;
validateAndListen(inputHowToUse, maxHowToUseLength);
flagsToObtain++;

coffeeSwitch.addEventListener("click", hideShowInputs);
projectSwitch.addEventListener("click", hideShowInputs);
