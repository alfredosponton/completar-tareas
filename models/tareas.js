const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    // obj key me permite extrar cada una de las llaves del obj
    Object.keys(this._listado).forEach((element) => {
      const tarea = this._listado[element];
      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._listado;
  }

  borrarTarea (id = '') {
    if (this._listado[id]) {
        delete this._listado[id];
        
    }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crarTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  // listadoCompleto () {
  //     let count = 1
  //     this.listadoArr.forEach((element) => {

  //         if (element.completadoEn === null) {

  //             console.log(`${count.toString().green}${'. '.green} ${element.desc} :: ${'Pendiente'.red}`    )

  //         }else {
  //             console.log(`${count.toString().green}${'. '.green} ${element.desc} :: ${'Completada'.green}`    )
  //         }
  //        count++;
  //     }
  //     );

  // }

  listadoCompleto() {
    this.listadoArr.forEach((element, i) => {
        const idx = `${i+1}`.green;
        const {desc, completadoEn} = element;
        const estado = (completadoEn)
                            ? 'Completado'.green
                            : 'Pendiente'.red;
        
        console.log(`${idx}. ${desc} :: ${estado}`)
    });
  }

listarTareasCompletadas (completadas = true) {
    let count = 1
    this.listadoArr.forEach((element) => {

        const {desc, completadoEn} = element;
        const estado = (completadoEn)
        ? 'Completado en: '.green
        : 'Pendiente'.red;
        
        if (completadas && completadoEn !== null ) {      

            console.log(`${(count + '.').green}. ${desc} :: ${estado + completadoEn.blue}`)
            count++;
            
        } else if (!completadas && completadoEn === null) {
                        
            console.log(`${(count + '.').green}. ${desc} :: ${estado}`)
            count++;
        }


        
    });
}

toggleCompletadas (ids = []) {

    ids.forEach (id => {
        const tarea = this._listado[id];
        if (!tarea.completadoEn) {
            tarea.completadoEn = new Date().toISOString()
        }
    });

    this.listadoArr.forEach (tarea => {

        if (!ids.includes(tarea.id)) {
            this._listado[tarea.id].completadoEn = null;
        }
    })

}




}

module.exports = Tareas;
