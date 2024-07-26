const {CoffeeMachine, Barista, OrdersList} = require('./classes');
const {isIngredientsInInventory, transformOrders} = require('../common/utilities');


// function testLoadCoffeMachineStorage(initialIngredients) {
//     const coffeeMachine = new CoffeeMachine(initialIngredients);
//     const inventory = coffeeMachine.checkInventory();
    
//     const success = isIngredientsInInventory(initialIngredients, inventory);

//     if(success) {
//         console.log('Coffee machine initial inventory test: PASSED');
//         return;
//     }

//     console.log('Coffee machine initial inventory test: FAILED');
// }

// function testIsIngredienceInInventoryAfterProcessingOrders(initialIngredients, menuInfo, ordersInfo, inventoryAfterProcessingOrders, expectedOrdersInfoAfterProcessing) {
//     const coffeeMachine = new CoffeeMachine(initialIngredients, menuInfo);
//     const barista = new Barista(menuInfo);
//     const ordersList = new OrdersList(ordersInfo);
//     barista.processOrders(ordersList, coffeeMachine);

//     const inventory = coffeeMachine.checkInventory();

//     const isExpectedIngridientsInInventoryAfterProcessing = isIngredientsInInventory(inventoryAfterProcessingOrders, inventory);

//     if(isExpectedIngridientsInInventoryAfterProcessing) {
//         console.log('Coffee machine inventory after processing orders test: PASSED');
//     }
//     else {
//         console.log('Coffee machine inventory after processing orders test: FAILED');
//     }

//     ordersInfo = [...ordersList.getOrdersInfo(false)];
//     const isExpectedIngridientsInOrdersListAfterProcessing = isIngredientsInInventory(transformOrders(expectedOrdersInfoAfterProcessing), transformOrders(ordersInfo));

//     if(isExpectedIngridientsInOrdersListAfterProcessing) {
//         console.log('Orders list after processing orders test: PASSED');
//     }
//     else {
//         console.log('Orders list after processing orders test: FAILED');
//     }
// }

// function testIsIngredientsInInventoryAfterRefill(initialIngredients, refillInfo, inventoryAfterRefill) {
//     const coffeeMachine = new CoffeeMachine(initialIngredients);

//     const ingredientsToRefill = Object.keys(refillInfo);

//     ingredientsToRefill.forEach((ingredientName) => {
//         coffeeMachine.refillIngredient(refillInfo[ingredientName], ingredientName)
//     })

//     const inventory = coffeeMachine.checkInventory();
//     const success = isIngredientsInInventory(inventoryAfterRefill, inventory);

//     if(success) {
//         console.log('Inventory after refill test: PASSED');
//     }
//     else {
//         console.log('Inventory after refill test: FAILED');
//     }

// }
                
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