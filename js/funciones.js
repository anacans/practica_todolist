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
    //para que se quede vacio el input despues de guardar la tarea
    añadirTarea.value = "";
    añadirPrioridad.value = "";
}

boton.addEventListener('click', getData)

//funcion para eliminar las tareas 
function eliminarTarea(idTarea) {
    const contenido = listaTareas.findIndex(tarea => tarea.idTarea === idTarea);
    if (contenido !== -1) {
        listaTareas.splice(contenido, 1);
        sectionTareas.innerHTML = "";
        printAllTareas(listaTareas, sectionTareas)
    }
}

//para pintar las tareas
const sectionTareas = document.querySelector('#sectionTareas')

function printOneTarea(pTarea, pDom) {
    const ul = document.createElement('ul');
    ul.className = "list-group"
    const li = document.createElement('li');
    li.className = "list-group-item d-flex justify-content-between"

    li.textContent = pTarea.titulo;
    const button = document.createElement('button');
    button.textContent = 'Eliminar';
    button.className = "btn btn-success btn-sm"

    //Aquí voy a asignar clase al boton en funcion de la prioridad
    if (pTarea.prioridad === 'urgente') {
        button.className = 'btn btn-outline-danger';
    } else if (pTarea.prioridad === 'diaria') {
        button.className = 'btn btn-outline-success';
    } else if (pTarea.prioridad === 'mensual') {
        button.className = 'btn btn-outline-primary';
    }
    //

    button.addEventListener('click', function () {
        eliminarTarea(pTarea.idTarea);
    });

    li.appendChild(button);
    ul.appendChild(li);
    pDom.appendChild(ul);
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