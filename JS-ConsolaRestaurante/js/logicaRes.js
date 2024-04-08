/**
 * 
 * Principal logic to solve the restaurant exercise (exercise.txt)
 */

//hardcode only one user, chage in future
let actualClient = USERS[0].name


const instructions = () => {
    console.log("El orden de ejecución normal es: \n showMenu() - Ver opciones en el menú \n addProduct(codigo) - Agregar productos por su código \n showOrders() - Ver productos pedidos. \n calcOrderCost() - Calcular costo total sin finalizar la compra. \n generateBill() - Generar factura antes de pagar. \n PayBill(Monto,usuario) - Pagar al cuenta de 'usuario' y entregando 'monto' \n showBusiessStats() - Ver estadísticas del negocio");
}

instructions()


const showMenu = () => {
    console.log(`######### Nuestro menú hoy es ######### `);
    return showProducts(PRODUCTS);
}

const showOrders = () => showProducts(orders);

/**
 * 
 * @param {string} cod Code of product to add
 * @returns 
 */
const addProduct = cod => {
    if(billsPendingPay.find(bill => bill.client === actualClient)) return `El usuario ${actualClient} aun tiene una cuenta que pagar.`

    if (!cod) return "Ingrese un código válido"

    let findProd = PRODUCTS.find(product => product.code === cod)
    if (!findProd) return "El producto no existe"

    orders.push(findProd);
    console.log("Se agregó con éxito a sus pedidos.")
    return showProducts(orders);
}

const calcOrderCost = () => {
    let finalCost = 0
    for (product of orders) {
        finalCost += product.value
    }
    return finalCost
}

const generateBill = () => {
    if(billsPendingPay.find(bill => bill.client === actualClient)) return `El usuario ${actualClient} aun tiene una cuenta que pagar.`

    let bill = {
        client: "",
        orders: [],
        finalCost: 0
    }
    bill.finalCost = calcOrderCost();
    bill.client = actualClient
    bill.orders = orders.slice();

    billsPendingPay.push(bill)
    orders = []
    console.log("Se han comprado los siguientes productos:")
    showProducts(bill.orders)
    return `Usted debe un total de: ${bill.finalCost}. Gracias por su compra.` 
}

/**
 * 
 * @param  {float} amountPay Amount of money given by the user
 * @param  {string} client name of the client associated with the bill
 */
const PayBill = (amountPay, client) => {
    if (typeof amountPay != "number" || amountPay < 0) return "Debe ingresar un dato válido"

    let bill = billsPendingPay.find(bill => bill.client === client)
    if (bill) {
        if (amountPay === bill.finalCost) {
            console.log(`Quedó pagada su factura, gracias.`)
            billsPendingPay.pop(bill)
            addBusiessStats(bill.finalCost, client);
        } else if (amountPay > bill.finalCost){
            console.log(`Quedó pagada su factura. Su cambio es $${amountPay - bill.finalCost}`)
            billsPendingPay.pop(bill)
            addBusiessStats(bill.finalCost, client);
        } else if (amountPay < bill.finalCost) console.log(`Faltan $${amountPay - bill.finalCost}`)
    
    } else console.log("Este usuario no tiene facturas asociadas. Ejecute generateBill() antes")
} 

const showBusiessStats = () => {
    console.log(`Total de ventas ${businessStats.sales} con una ganancia de $${businessStats.profits}. \nLas ventas hechas son: `);
    businessStats.clients.forEach(client => console.log(`El cliente ${client.client}, gastó $${client.spent} el día ${client.date} a las ${client.time}`));
}

/**
 * 
 * @param {float} finalCost Sale total amount
 * @param {string} name Name of client
 */
const addBusiessStats = (finalCost, name) => {
    if (typeof finalCost != "number" || finalCost < 0) return "Debe ingresar un dato numerico válido"

    if (billsPendingPay.find(bill => bill.client === name)) return "Debe ingresar un usuario existente"

    businessStats.sales++
    businessStats.profits += finalCost
    businessStats.clients.push({
        client: name, 
        spent: finalCost,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    });
}