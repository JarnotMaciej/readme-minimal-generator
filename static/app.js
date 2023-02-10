let textAreas = document.getElementsByTagName("textarea");
let inputTitle = document.querySelector("#project-title");
let submitButton = document.querySelector("#main-submit-button");

let flagsToObtain = 0;
let flagsObtained = 0;

emptyOrTooLong(inputTitle, 64);
flagsToObtain++;
for (let i = 0; i < textAreas.length; i++) {
    emptyOrTooLong(textAreas[i], 10000);
    flagsToObtain++;
}

console.log(flagsToObtain);

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
