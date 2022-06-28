function removeClassById(id, className) {
    const element = document.getElementById(id);
    if (element.classList.contains(className)){
        document.getElementById(id).classList.remove(className);
    }  
}

function addClassById(id, className) {
    const element = document.getElementById(id);
    if (element.classList.contains(className) == false){
        document.getElementById(id).classList.add(className);
    } 
}

function emptyValueById (id) {
    document.getElementById(id).innerHTML = '';
}