let textAreas = document.getElementsByTagName('textarea');
let inputTitle = document.querySelector('#project-title');
isEmpty(inputTitle);
for(let i=0; i < textAreas.length;i++){
    isEmpty(textAreas[i])
}

function isEmpty(x){
    x.addEventListener('click', () => {
        if(x.value == ''){
            x.classList.remove('is-valid')
            x.classList.add('is-invalid')
        } else {
            x.classList.remove('is-invalid')
            x.classList.add('is-valid')
        }
})
    x.addEventListener('keyup', () => {
            if(x.value == ''){
                x.classList.remove('is-valid')
                x.classList.add('is-invalid')
            } else {
                x.classList.remove('is-invalid')
                x.classList.add('is-valid')
            }
    })
}