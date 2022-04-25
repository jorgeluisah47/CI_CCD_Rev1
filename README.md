
# CI-CDD: algoritmo -> V1

Esta es la primera versión de un algortimo de CI (CCD) para la clase de robótica.

## Alumno:
Alumno: Azuara Hernández Jorge Luis (s18001575)
- [@jorgeluisah47](https://github.com/jorgeluisah47)

## Funcionamiento básico
El algoritmo es una variación ligera del visto en la clase, en lugar de buscar la cinemática inversa por medio de rectas y planos lo busco por medio de "match" entre distancias y angulos:

Basicamente busco que los angulos y distancias individuales por medio de aumento y reducción de parametros, evitando así el uso de planos y rectas.
Es un análisis un poco mas simple, aunque mas largo en terminos computacionales, ya que requiere de mas ciclos para poder converjer en un resultado esperado.

Algoritmo diseñado para el siguiente robot:

![alt text](https://raw.githubusercontent.com/jorgeluisah47/CI_CCD_Rev1/main/src/assets/img/img1.png)



