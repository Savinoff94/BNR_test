const {coffeeMachineTest} = require('./tests')
const {orders, startIngredients, refillInfo, storageIngredientsAfterProcessing, inventoryAfterRefill, expectedNotProcessedOrder, ordersInfoAfterFinishing, inventoryAfterFinishingOrders} = require('../common/tests_constants')


coffeeMachineTest(startIngredients, orders, storageIngredientsAfterProcessing, expectedNotProcessedOrder, refillInfo, inventoryAfterRefill, ordersInfoAfterFinishing, inventoryAfterFinishingOrders)