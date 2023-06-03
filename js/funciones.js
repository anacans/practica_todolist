const añadirTarea = document.querySelector('#tarea');
const añadirPrioridad = document.querySelector('#prioridad');
const boton = document.querySelector('#boton');
let id = 1;


//para guardar una tarea en el array
function saveTarea(pList, pTarea) {
    let duplicado = pList.findIndex(tarea => tarea.titulo === pTarea.titulo)

    if (duplicado === -1) {
        pList.push(pTarea);
        return 'tarea guardada';
    }
    return 'tarea duplicada';
}

//para obtener los datos de las nuevas tareas

function getData(event) {
    event.preventDefault();

    const titulo = añadirTarea.value;
    const prioridad = añadirPrioridad.value;

    if (titulo === '' || prioridad === '') {
        alert('Los campos no pueden estar vacíos');
        return;
    }

    newTarea = {
        idTarea: id,
        titulo: añadirTarea.value,
        prioridad: añadirPrioridad.value
    }

    let guardado = saveTarea(listaTareas, newTarea)

    if (guardado === 'tarea guardada') {
        printOneTarea(newTarea, sectionTareas)
        id++
    } else {
        alert(guardado);

    }

}

boton.addEventListener('click', getData)

//para pintar las tareas
const sectionTareas = document.querySelector('#sectionTareas')


function printOneTarea(pTarea, pDom) {
    const ul = document.createElement('ul');
    ul.innerHTML = `<li>${pTarea.titulo}<p>${pTarea.prioridad}</p></li>`

    sectionTareas.appendChild(ul)
    pDom.appendChild(ul)

}

function printAllTareas(pList, pDom) {
    pList.forEach(tarea => printOneTarea(tarea, pDom))
}

printAllTareas(listaTareas, sectionTareas)