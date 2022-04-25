
/* 
    El siguiente programa esta diseñado para encontrar la CI del robot adjuntado
    en la actividad de Robotica
*/

"use strict";

function algoritmo_ccd() {
    let numero_iteraciones = 0;
    let err = 0;    // Declaración de variable de error
    /* 
        Las funciones del Objeto Math no funcionan bajo grados, sino en base a radianes, por lo que es necesario usar una función
        para transformar esos radianes a grados y viceversa.
    */

    // Función de conversión de radianes a grados
    function toDegress(angle) { return angle * (180 / Math.PI); }

    // Función de conversión de grados a radianes
    function toRadians(angle) { return angle * (Math.PI / 180); }

    /* 
        La distancia entre los puntos la utilizo para encontrar distintos parametros para aplicar CCD, por ejemplo; ver si es posible
        aplicar el método en base a las dimensiones del robot.
    */
    // Función de distancia entre 2 puntos
    function distancia_entre_2_puntos(x1, y1, z1, x2, y2, z2) { return Math.sqrt(((x2 - x1)**2) + ((y2 - y1)**2) + ((z2 - z1)**2)) }

        /*
            Se obtienen las condiciones iniciales del robot que involucran a: 
            1.- Theta 1 (Angulo de la base del robot)
            2.- Theta 2 (Angula de la armadura superior del robot)
            3.- D3 (distancia dezplazada por el eje en la armadura superior (acotada de 0 a 0.5 para uso practico del problema))
        */ 
    let theta_1 = Number(document.getElementById("theta_1").value);
    let theta_2 = Number(document.getElementById("theta_2").value);
    let d3 = Number(document.getElementById("d3").value);

    
	/*	Cinemática directa	*/
    let z = ((10*Math.sin(toRadians(theta_2))) + (d3*Math.sin(toRadians(theta_2 - 90)))) + 50;					// Eje Z -> Correcto
    let x = ((10*Math.cos(toRadians(theta_2))) + (d3*Math.cos(toRadians(theta_2 - 90)))) * Math.cos(toRadians(theta_1));	// Eje X -> Correcto
    let y = ((10*Math.cos(toRadians(theta_2))) + (d3*Math.cos(toRadians(theta_2 - 90)))) * Math.sin(toRadians(theta_1));   	// Eje Y -> Correcto

    //    console.log(x, y, z);

        /* Pido al usuario las coordenadas a las cuales quiere mover el efector final */
    let x_final = Number(document.getElementById("x_final").value);
    let y_final = Number(document.getElementById("y_final").value);
    let z_final = Number(document.getElementById("z_final").value);

    // Verificar que se encuentre dentro del espacio de trabajo
    let distancia1 = distancia_entre_2_puntos(0, 0, 50, x_final, y_final, z_final);

    if (distancia1 <= Math.sqrt((10**2) + (50**2))){

            // Obtener el valor de Theta_1
        let theta_referencia = toDegress(Math.atan(y_final/x_final));
        if (x_final < 0){ theta_referencia = theta_referencia + 180; }
        if (y_final < 0){ theta_referencia = theta_referencia + 360; }

        let z_referencia = z_final - 50;
        
        let angulo_punto_final = toDegress(Math.asin(z_referencia/distancia1));
        let hipotenusa = Math.sin(toRadians(angulo_punto_final));
        let distancia_centro_efector = Math.sqrt((d3**2) + (10**2));

        err = distancia_entre_2_puntos(x, y, z, x_final, y_final, z_final);

        do{
            /* Algoritmo iterativo */
            if(distancia_centro_efector > hipotenusa){
                distancia_centro_efector = distancia_centro_efector - 0.1;
                d3 = Math.sqrt((distancia_centro_efector**2) - (10**2));
            } if(distancia_centro_efector < hipotenusa) {
                distancia_centro_efector = distancia_centro_efector + 0.1;
                d3 = Math.sqrt((distancia_centro_efector**2) - (10**2));
            }
            
            err = Math.abs(hipotenusa - distancia_centro_efector);
            numero_iteraciones++;
        }while(err > 0.1)

        let angulo_referencia_final = Math.atan(toRadians(d3/10));
        angulo_referencia_final = angulo_referencia_final + angulo_punto_final;

        const salida_texto = document.getElementById("elemento_salida");
        let resultado = `
            θ_1: ${theta_referencia.toFixed(4)}°
            θ_2: ${angulo_referencia_final}
            D3: ${d3}
            
            Número de iteraciones: ${numero_iteraciones}
        `;
        salida_texto.innerText = resultado;
    } else {
        const salida_texto = document.getElementById("elemento_salida");
        let resultado = "El punto final se encuentra fuera del espacio alcanzable del robot, pruebe con un nuevo punto";
        salida_texto.innerText = resultado;
    }
}
