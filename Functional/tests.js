const {transformOrders, isIngredientsInInventory} = require('../common/utilities')
const {getCoffeeMachine, processOrders} = require('./lib');

function coffeeMachineTest(initialIngredients, orders, inventoryAfterProcessingOrders, ordersInfoAfterProcessing, refillInfo, inventoryAfterRefill, ordersInfoAfterFinishing, inventoryAfterFinishingOrders) {
    const {water, milk, coffeeBeans} = initialIngredients;
    const coffeeMachine = getCoffeeMachine(water, milk, coffeeBeans);
    let inventory = coffeeMachine.checkInventory();

    if(isIngredientsInInventory(initialIngredients, inventory)) {
        console.log('TEST Coffee machine initial inventory: PASSED');
    }
    else {
        console.log('TEST Coffee machine initial inventory: FAILED');
    }

    orders = testInventoryOrdersListAfterProcessing(coffeeMachine, orders, inventoryAfterProcessingOrders, ordersInfoAfterProcessing, false)
    
    const {water: waterRefill, milk: milkRefill, coffeeBeans: coffeeBeansRefill} = refillInfo
    coffeeMachine.refillWater(waterRefill);
    coffeeMachine.refillMilk(milkRefill);
    coffeeMachine.refillCoffeeBeans(coffeeBeansRefill);
    inventory = coffeeMachine.checkInventory();

    if(isIngredientsInInventory(inventoryAfterRefill, inventory)) {
        console.log('TEST Inventory after refill orders: PASSED');
    }
    else {
        console.log('TEST Inventory after refill orders: FAILED');
    }

    testInventoryOrdersListAfterProcessing(coffeeMachine, orders, inventoryAfterFinishingOrders, ordersInfoAfterFinishing, true)
}

function testInventoryOrdersListAfterProcessing(coffeeMachine, orders, inventoryAfterProcessingOrders, ordersInfoAfterProcessing, ordersFinished = false) {
    
    orders = processOrders(coffeeMachine, orders);
    inventory = coffeeMachine.checkInventory();
    
    if(isIngredientsInInventory(inventoryAfterProcessingOrders, inventory)) {
        console.log(`TEST Coffee machine inventory after ${ordersFinished ? 'finishing': 'processing'} orders : PASSED`);
    }
    else {
        console.log(`TEST Coffee machine inventory after ${ordersFinished ? 'finishing': 'processing'} orders : FAILED`);
    }
    
    if(isIngredientsInInventory(transformOrders(ordersInfoAfterProcessing), transformOrders(orders))) {
        console.log(`TEST Orders list after ${ordersFinished ? 'finishing': 'processing'} orders : PASSED`);
    }
    else {
        console.log(`TEST Orders list after ${ordersFinished ? 'finishing': 'processing'} orders : FAILED`);
    }

    return orders;
}


module.exports = {
    coffeeMachineTest
}