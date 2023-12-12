require ('colors');
const { guardarDB, leerDb } = require('./helpers/guardarArchivo');
//const inquirer = require('inquirer')


const {
    inquirerMenu, 
    pausa, 
    leerImput, 
    listadoTareasBorrar, 
    confirmar,
    mostrarListadoChecklist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
//const {mostrarMenu, pausa} = require('./helpers/mensajes');


const main = async () => {
    
    let opt = ''
    const tareas = new Tareas();

    const tareasDb = leerDb();

    if (tareasDb) { //cargar tareas
      tareas.cargarTareasFromArray(tareasDb);
    }
    //await pausa();

    do {        
        //esta funcion imperime el menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const descripcion = await leerImput('Descripción: ');
                tareas.crarTarea(descripcion);

                break;
            case '2':
                tareas.listadoCompleto();
                break;  
            case '3':
                tareas.listarTareasCompletadas(true);
                break;
            case '4':
                tareas.listarTareasCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoChecklist( tareas.listadoArr);
                tareas.toggleCompletadas(ids)
                break;
            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr);
                if (id !== '0') {
                    const confirmarBorrado = await confirmar('Está seguro que desea borrarlo?')
                    if (confirmarBorrado) {
                        tareas.borrarTarea(id);
                        console.log ('Tarea borrada')
                    }
                    
                }

                break;
                    
        }

        guardarDB(tareas.listadoArr);
        
        console.log('\n')
        await pausa();

    } while (opt !== '0');
    

    //pausa();
}

main ();

 