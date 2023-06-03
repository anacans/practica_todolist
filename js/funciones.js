const añadirTarea = document.querySelector('#tarea');
const añadirPrioridad = document.querySelector('#prioridad');
const boton = document.querySelector('#boton');
let id = 4;


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

    const newTarea = {
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
    pDom.innerHTML = "";
    pList.forEach(tarea => printOneTarea(tarea, pDom))
}

printAllTareas(listaTareas, sectionTareas)

//para filtrar por prioridad necesitamos capturar el selector de prioridad, recoger su valor, filtrar el array, para luego pintar

const selectPrioridad = document.querySelector('#filtroPrioridad');

function filterByPrioridad(pListaTareas, pPrioridad) {
    if (pPrioridad === '') {
        return pListaTareas; // Si no se selecciona ninguna prioridad, retornar la lista completa
    }
    return pListaTareas.filter(tarea => tarea.prioridad === pPrioridad);
}

function getPrioridad(event) {
    let listaFiltrada = filterByPrioridad(listaTareas, event.target.value);
    printAllTareas(listaFiltrada, sectionTareas)
}

selectPrioridad.addEventListener('change', getPrioridad);

//capturar el valor el input de buscarTarea, recogemos su valor, filtramos por tarea y pintamos

const buscarTarea = document.querySelector('#buscarTarea')

function filterByWord(pList, pWord) {
    return pList.filter(tarea => tarea.titulo.toLowerCase().includes(pWord.toLowerCase()));
}

function getTarea(event) {
    let palabraBuscar = (event.target.value); // palabra recogida del evento
    let listaFiltrada = filterByWord(listaTareas, palabraBuscar);
    printAllTareas(listaFiltrada, sectionTareas)
}

buscarTarea.addEventListener('input', getTarea)