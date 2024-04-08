/**
 * List of products, users and different variables for the entire program
 */
const PRODUCTS = [
    {
        code: "P001",
        name: "Pizza",
        value: getRandomTwoDecimals(500,550)
    },
    {
        code: "P002",
        name: "Pizza con Muzzarela",
        value: getRandomTwoDecimals(650,700)
    },
    {
        code: "H001",
        name: "Hamburguesa",
        value: getRandomTwoDecimals(200,300)
    },
    {
        code: "H002",
        name: "Hamburugesa completa",
        value: getRandomTwoDecimals(400,500)
    },
    {
        code: "PF001",
        name: "Papas fritas",
        value: getRandomTwoDecimals(100,150)
    },
    {
        code: "A001",
        name: "Agua",
        value: getRandomTwoDecimals(150,200)
    }
]

const USERS = [{
    name: "Fede",
    edad: 24,
    due: 0.00
}]

let orders = []

let billsPendingPay = []

let businessStats = {
    sales: 0,
    profits: 0.00,
    clients: []
}