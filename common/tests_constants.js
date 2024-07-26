const {MENU, DRINKS, INGREDIENTS, COFFEE_MACHINE_CLASS_NAME, ORDERS_LIST_CLASS_NAME} = require('./constants');

const orders = [
    { drinkName: DRINKS.ESPRESSO, quantity: 2 },
    { drinkName: DRINKS.LATTE, quantity: 1 },
    { drinkName: DRINKS.CAPPUCCINO, quantity: 3 },
];

const expectedNotProcessedOrder = [
    { drinkName: DRINKS.CAPPUCCINO, quantity: 2 },
]

const startIngredients = {
    [INGREDIENTS.WATER]: 500,
    [INGREDIENTS.MILK]: 300,
    [INGREDIENTS.COFFEE_BEANS]: 100
}

const refillInfo = {
    [INGREDIENTS.WATER]: 200,
    [INGREDIENTS.MILK]: 200,
    [INGREDIENTS.COFFEE_BEANS]: 200
}

const storageIngredientsAfterProcessing = {
    [INGREDIENTS.WATER]: 360,
    [INGREDIENTS.MILK]: 50,
    [INGREDIENTS.COFFEE_BEANS]: 28
}

const inventoryAfterRefill = {
    [INGREDIENTS.WATER]: 560,
    [INGREDIENTS.MILK]: 250,
    [INGREDIENTS.COFFEE_BEANS]: 228
}

const ordersInfoAfterFinishing = [];

const inventoryAfterFinishingOrders = {
    [INGREDIENTS.WATER]: 540,
    [INGREDIENTS.MILK]: 50,
    [INGREDIENTS.COFFEE_BEANS]: 192
}

module.exports = {
    orders,
    startIngredients,
    refillInfo,
    storageIngredientsAfterProcessing,
    inventoryAfterRefill,
    expectedNotProcessedOrder,
    ordersInfoAfterFinishing,
    inventoryAfterFinishingOrders
}