document.addEventListener('DOMContentLoaded', () => {
    //DESARROLLA TU CÓDIGO A PARTIR DE AQUÍ

// Definiones de variables globales

    let herramienta = undefined;
    let barraHerramientas = document.getElementById("toolbar");
    let canvas = document.getElementById("canvas");
    let paleta = document.getElementById("color_picker");

    let colorActual = document.getElementById("main_color_cell");
    let colorCode = document.getElementById("chosen_color");

    console.log("B -> Pincel\nR -> Goma\nP -> Pipeta\nC -> Cubo\nT -> Basura")


// Utilizacion del color "x" para pintar "y" casilla

    function changeColor (color,casilla) {
        casilla.style.backgroundColor=color;
    }


// Herramienta seleccionada

    // Seleccion de la herramienta

    barraHerramientas.addEventListener('click', () => {
        if (event.target.className == "button") {
            pushToolButton(event.target)

        } else if (event.target.className == "button_img") {
            pushToolButton(event.target.parentElement)

        }
    });

    // Cambiar color de la herramienta seleccionada

    function pushToolButton (herSelec) {
        if (herramienta == undefined) {
            changeColor('#ffcc66',herSelec);
            herramienta = herSelec;

        } else if (herramienta == herSelec) {
            changeColor('silver',herSelec);
            herramienta = undefined;

        } else {
            changeColor('silver',herramienta);
            changeColor('#ffcc66',herSelec);
            herramienta = herSelec;

        }
    }


//  Pintar el canvas

    // Funciones para pintar segun si el raton esta siendo clickado

    canvas.addEventListener("mousedown", () => {
        if (event.target.className == "canvas_cell") {
            paintCelda(event.target);
        }
        
        canvas.onmousemove = () => {
            if (event.target.className == "canvas_cell") {
                paintCelda(event.target);
            }
        }
    });
        
    canvas.addEventListener("mouseup", () => {
        canvas.onmousemove = null;
    });


    /* Codigo previsualizacion color

    canvas.addEventListener("mouseover", () => {
        if (event.target.className == "canvas_cell") {
            paintCelda(event.target);
        }

        canvas.addEventListener("mouseout", () => {
            if (event.target.className == "canvas_cell") {
                event.target.style.backgroundColor = "#FFFFFF";
            }
        });
    }); 
    */


    // Utilizar la funcion de la herramienta en cuestion

    function paintCelda (casilla) {
        switch (herramienta.id) {
            case "brush_button":
                pintar = colorActual.style.backgroundColor;
                changeColor(pintar,casilla);
                break;

            case "picker_button":
                sacarColor = event.target.style.backgroundColor;
                selectColor(sacarColor);
                autoPincel = document.getElementById("brush_button") 
                pushToolButton(autoPincel);
                break;

            case "bucket_button": //
                pintar = colorActual.style.backgroundColor;
                /*selec = event.target.style.backgroundColor;*/
                Array.from(document.getElementsByClassName('canvas_cell')).forEach(casilla => {
                    changeColor(pintar,casilla)
                });
                break;

            case "rubber_button":
                changeColor('#FFFFFF',casilla);
                break;

            case "trash_button": 
                Array.from(document.getElementsByClassName('canvas_cell')).forEach(casilla => {
                    changeColor('#FFFFFF',casilla)
                });
                break;
        }
        
        
    }


// Seleccionar color

    // Seleccionador de color

    paleta.addEventListener('click', () => {
        if (event.target.className == "color_cell") {
            selectColor(event.target.style.backgroundColor);
        }
    });


    // Asignar los cambios de color

    function selectColor (colSelec) {
        colorActual.style.backgroundColor = colSelec;
        colorCode.textContent = colSelec;
    }


// Seleccion con teclas

    document.addEventListener('keyup', (key) => {
        if (key.code === "KeyB") {
            keyHerramienta = document.getElementById("brush_button") 
            pushToolButton(keyHerramienta);
            
        } else if (key.code === "KeyP") {
            keyHerramienta = document.getElementById("picker_button") 
            pushToolButton(keyHerramienta);

        } else if (key.code === "KeyC") {
            keyHerramienta = document.getElementById("bucket_button") 
            pushToolButton(keyHerramienta);

        } else if (key.code === "KeyR") {
            keyHerramienta = document.getElementById("rubber_button") 
            pushToolButton(keyHerramienta);

        } else if (key.code === "KeyT") {
            keyHerramienta = document.getElementById("trash_button") 
            pushToolButton(keyHerramienta);

        }
    });



    //alert('Hola')
});