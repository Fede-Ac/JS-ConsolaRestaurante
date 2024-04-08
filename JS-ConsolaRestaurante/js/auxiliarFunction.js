/**
 * auxiliary functions to shorten code
 */
const getRandomTwoDecimals = (min, max) =>   (Math.random().toFixed(2) * (max - min) + min)

const showProducts = (ArrayProducts) => {
    if (Array.isArray(ArrayProducts) && ArrayProducts.length != 0) {
        console.log(`Código - Nombre producto - Costo`);
        ArrayProducts.forEach(product => console.log(`${product.code} - ${product.name} - $${product.value}`));
    } else {
        console.log(`No hay datos para mostrar`);
    }
}
