function isValidIngrediensAmount(amount = 0) {
    if(isNaN(amount) || amount < 0) {
        return 0;
    }
    return parseFloat(amount);
}

function assertEqual(actual, expected, testName) {
    if (actual === expected) {
        console.log(`PASSED: ${testName}`);
    } else {
        console.log(`FAILED: ${testName}. Expected "${expected}", but got "${actual}"`);
    }
}


function isIngredientsInInventory(expectedIngredients, inventory) {

    if(Object.keys(expectedIngredients).length !== Object.keys(inventory).length) {
        return false;
    }
    
    return Object.keys(expectedIngredients).every((ingredientName) => {

        if(!(ingredientName in inventory)) {
            return false;
        }

        if(inventory[ingredientName] !== expectedIngredients[ingredientName]) {
            return false;
        }

        return true;
    });
}

function transformOrders(orders) {
    
    return orders.reduce((acc, order) => {
        const {drinkName, quantity} = order;
        if(!(drinkName in acc)) {
            acc[drinkName] = quantity;
        }else {
            acc[drinkName] += quantity;
        }
        return acc;
    }, {})
}

module.exports = {isValidIngrediensAmount, assertEqual, isIngredientsInInventory, transformOrders}