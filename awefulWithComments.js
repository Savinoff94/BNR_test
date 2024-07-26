// there is no default values of parameters, and type checkers. We can create coffeMachine with undefined amount of suppliments, or with values of wrong type.
function coffeeMachine(water, milk, coffeeBeans) {
    // need to add type checkers here
    return {
        // w,m,c - it is not the bast way to name anything
        // also we can move this properties as veriables to the body of function, so they will be encapsulated. By douing that we will get rid of keyword "this" in methods, it is good because sometimes its beahviour is complicated
        w: water,
        m: milk,
        c: coffeeBeans,
        // I think "make" is not very descriptive name for a function
        // Also there is a lot of hardcoded values, they should be defined in constants
        // Also MENU for a different drinks should be defined in constants or in body of function
        // It would be better to define method isEnoughIngrediensDrink(type) to substitute checks like "if (this.w >= 50 && this.c >= 18)", because it will be much easier for reading, and changing MENU
        make: function(type) {
        
        // I think it would be better to revert all if..else statements to get rid of unnecessary nesting
            if (type == "espresso") {
                if (this.w >= 50 && this.c >= 18) {
                    this.w -= 50;
                    this.c -= 18;
                    console.log("Espresso made");
                } else {
                    console.log("Not enough ingredients");
                }
            } else if (type == "latte") {
                if (this.w >= 30 && this.m >= 150 && this.c >= 18) {
                    this.w -= 30;
                    this.m -= 150;
                    this.c -= 18;
                    console.log("Latte made");
                } else {
                    console.log("Not enough ingredients");
                }
            } else if (type == "cappuccino") {
                if (this.w >= 30 && this.m >= 100 && this.c >= 18) {
                    this.w -= 30;
                    this.m -= 100;
                    this.c -= 18;
                    console.log("Cappuccino made");
                } else {
                    console.log("Not enough ingredients");
                }
            } else {
                console.log("Unknown coffee type");
            }
        },
        // there is no default values of parameters, and type checkers.
        refillWater: function(amount) {
            this.w += amount;
        },
        refillMilk: function(amount) {
            this.m += amount;
        },
        refillCoffeeBeans: function(amount) {
            this.c += amount;
        },
        checkInventory: function() {
            return {
                water: this.w,
                milk: this.m,
                coffeeBeans: this.c
            };
        }
    };
}

// there is no default values of parameters, and type checkers.
function processOrders(machine, orders) {
    // instead of using this for loop, we should use .forEach
    // instead of var we must use let or const in variable declarations. Because var has function scope, which can be dangerouse if code is nested
    // BUG: loop will start iterate over orders with second element because var i = 1
    for (var i = 1; i < orders.length; i++) {
        var order = orders[i];
        // must check if order.quantity and order.type exits
        // must use constants instead of hardcoded values
        // BUG: each time machine will make 1 drink more than its written in order because of <=
        for (var j = 0; j <= order.quantity; j++) {
            //machine.make(type) already takes type as agrument, so we dont need this if..else statement here
            if (order.type == "espresso") {
                machine.make("espresso");
            } else if (order.type == "latte") {
                machine.make("latte");
            } else if (order.type == "cappuccino") {
                machine.make("cappuccino");
            }
        }
    }
}
// there is no default values of parameters, and type checkers.
function calculateTotalIngredients(orders) {
    // its better to use let instead of var in each case
    var totalWater = 0;
    var totalMilk = 0;
    var totalCoffeeBeans = 0;
    for (var i = 0; i < orders.length; i++) {
        var order = orders[i];
        // must use constants insted of hardcoded values
        // must check if order.quantity exists and right type, it should be defined as variable
        if (order.type == "espresso") {
            totalWater += 50 * order.quantity;
            totalCoffeeBeans += 18 * order.quantity;
        } else if (order.type == "latte") {
            totalWater += 30 * order.quantity;
            totalMilk += 150 * order.quantity;
            totalCoffeeBeans += 18 * order.quantity;
        } else if (order.type == "cappuccino") {
            totalWater += 30 * order.quantity;
            totalMilk += 100 * order.quantity;
            totalCoffeeBeans += 18 * order.quantity;
        }
    }
    return {
        water: totalWater,
        milk: totalMilk,
        coffeeBeans: totalCoffeeBeans
    };
}

var orders = [
    { type: "espresso", quantity: 2 },
    { type: "latte", quantity: 1 },
    { type: "cappuccino", quantity: 3 }
];

var myMachine = coffeeMachine(500, 300, 100);

console.log("Initial inventory:", myMachine.checkInventory());

processOrders(myMachine, orders);

console.log("Inventory after orders:", myMachine.checkInventory());

console.log("Total ingredients needed for orders:", calculateTotalIngredients(orders));

myMachine.refillWater(100);
myMachine.refillMilk(50);
myMachine.refillCoffeeBeans(20);

console.log("Inventory after refilling:", myMachine.checkInventory());

processOrders(myMachine, orders);

console.log("Final inventory:", myMachine.checkInventory());
