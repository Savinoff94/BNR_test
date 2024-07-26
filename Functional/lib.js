const {INGREDIENTS, MENU} = require('../common/constants');

function getCoffeeMachine(water, milk, coffeeBeans) {

    waterStorage = water
    milkStorage = milk
    coffeeBeansStorage = coffeeBeans
    return {
        make: function(type) {
            if(!(type in MENU)) {
                console.log("Unknown coffee type");
            }

            const {water, milk, coffeeBeans} = MENU[type];

            if(waterStorage < water || milkStorage < milk || coffeeBeansStorage < coffeeBeans) {
                console.log("Not enough ingredients");
                return false;
            }

            waterStorage -= water;
            milkStorage -= milk;
            coffeeBeansStorage -= coffeeBeans;
            console.log(`${type} made`);
            return true;
        },
        refillWater: function(amount) {
            waterStorage += amount;
        },
        refillMilk: function(amount) {
            milkStorage += amount;
        },
        refillCoffeeBeans: function(amount) {
            coffeeBeansStorage += amount;
        },
        checkInventory: function() {
            return {
                water: waterStorage,
                milk: milkStorage,
                coffeeBeans: coffeeBeansStorage
            };
        }
    };
}

function processOrders(machine, orders) {
    return orders.reduce((unprocessedOrders, order) => {
        const {drinkName, quantity} = order;
        let unprocessedQuantity = 0;
        
        for(let i = 0; i < quantity; i++) {
            const success = machine.make(drinkName);
            if(!success) {++unprocessedQuantity}
        }

        if(unprocessedQuantity) {
            unprocessedOrders.push({drinkName,quantity: unprocessedQuantity});
        }

        return unprocessedOrders;
    }, [])
}

function calculateTotalIngredients(orders) {

    return orders.reduce((acc, order) => {
        const {quantity, type} = order;
        const recipe = MENU[type];

        acc[INGREDIENTS.WATER] += recipe[INGREDIENTS.WATER] * quantity
        acc[INGREDIENTS.MILK] += recipe[INGREDIENTS.MILK] * quantity
        acc[INGREDIENTS.COFFEE_BEANS] +=recipe[INGREDIENTS.COFFEE_BEANS] * quantity

        return acc;

    },{[INGREDIENTS.WATER]: 0, [INGREDIENTS.MILK]: 0,[INGREDIENTS.COFFEE_BEANS]: 0})
}

module.exports = {
    getCoffeeMachine,
    processOrders,
    calculateTotalIngredients,
}