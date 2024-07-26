const {CoffeeMachine, Barista, OrdersList} = require('./classes');
const {isIngredientsInInventory, transformOrders} = require('../common/utilities');
                
function coffeeMachineTest(initialIngredients, menuInfo, ordersInfo, inventoryAfterProcessingOrders, ordersInfoAfterProcessing, refillInfo,inventoryAfterRefill,  ordersInfoAfterFinishing, inventoryAfterFinishingOrders) {
    const coffeeMachine = new CoffeeMachine(initialIngredients, menuInfo);
    let inventory = coffeeMachine.checkInventory();

    if(isIngredientsInInventory(initialIngredients, inventory)) {
        console.log('TEST Coffee machine initial inventory: PASSED');
    }
    else {
        console.log('TEST Coffee machine initial inventory: FAILED');
    }

    const barista = new Barista(menuInfo);
    const ordersList = new OrdersList(ordersInfo);

    testInventoryOrdersListAfterProcessing(coffeeMachine, barista, ordersList, inventoryAfterProcessingOrders, ordersInfoAfterProcessing);

    const ingredientsToRefill = Object.keys(refillInfo);
    ingredientsToRefill.forEach((ingredientName) => {
        coffeeMachine.refillIngredient(refillInfo[ingredientName], ingredientName)
    })
    inventory = coffeeMachine.checkInventory();

    if(isIngredientsInInventory(inventoryAfterRefill, inventory)) {
        console.log('TEST Inventory after refill: PASSED');
    }
    else {
        console.log('TEST Inventory after refill: FAILED');
    }

    testInventoryOrdersListAfterProcessing(coffeeMachine, barista, ordersList, inventoryAfterFinishingOrders, ordersInfoAfterFinishing, true)
}

function testInventoryOrdersListAfterProcessing(coffeeMachine, barista, ordersList, inventoryAfterProcessingOrders, ordersInfoAfterProcessing, ordersFinished = false) {
    
    barista.processOrders(ordersList, coffeeMachine);
    inventory = coffeeMachine.checkInventory();

    if(isIngredientsInInventory(inventoryAfterProcessingOrders, inventory)) {
        console.log(`TEST Coffee machine inventory after ${ordersFinished ? 'finishing' : 'processing'} orders: PASSED`);
    }
    else {
        console.log(`TEST Coffee machine inventory after ${ordersFinished ? 'finishing' : 'processing'} orders: FAILED`);
    }

    ordersInfo = [...ordersList.getOrdersInfo(false)];

    if(isIngredientsInInventory(transformOrders(ordersInfoAfterProcessing), transformOrders(ordersInfo))) {
        console.log(`TEST Orders list after ${ordersFinished ? 'finishing' : 'processing'} orders: PASSED`);
    }
    else {
        console.log(`TEST Orders list after ${ordersFinished ? 'finishing' : 'processing'} orders: FAILED`);
    }
}

module.exports = {
    // testLoadCoffeMachineStorage,
    // testIsIngredientsInInventoryAfterRefill,
    // testIsIngredienceInInventoryAfterProcessingOrders,
    coffeeMachineTest
}