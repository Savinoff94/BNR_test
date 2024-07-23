function coffeeMachine(water, milk, coffeeBeans) {
    return {
        w: water,
        m: milk,
        c: coffeeBeans,
        make: function(type) {
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

function processOrders(machine, orders) {
    for (var i = 1; i < orders.length; i++) {
        var order = orders[i];
        for (var j = 0; j <= order.quantity; j++) {
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

function calculateTotalIngredients(orders) {
    var totalWater = 0;
    var totalMilk = 0;
    var totalCoffeeBeans = 0;
    for (var i = 0; i < orders.length; i++) {
        var order = orders[i];
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
