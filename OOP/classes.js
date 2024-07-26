const {isValidIngrediensAmount} = require('../common/utilities');
const {COFFEE_MACHINE_CLASS_NAME, ORDERS_LIST_CLASS_NAME} = require('../common/constants');

class Menu {
    constructor(menuInfo = {}) {
        this.menu = structuredClone(menuInfo);
    }

    getRecipe(name) {

        if(!(name in this.menu)) {
            throw new Error("Unknown coffee type");
        }
        
        return new Recipe(name, structuredClone(this.menu[name]));
    }
}

class Recipe {
    constructor(name, ingredients) {
        this.name = name;
        this.ingredients = ingredients;
    }

    getName = () => this.name;
    getIngredientsData = () => structuredClone(this.ingredients);
    getIngredientsList = () => Object.keys(this.ingredients);
}

class Storage {
    constructor(ingredients) {

        this.store = {};

        Object.keys(ingredients).forEach((ingredientName) => {
            this.store[ingredientName] = isValidIngrediensAmount(ingredients[ingredientName]);
        })
    }

    isEnoughingredients(recipe) {

        const ingredientsList = recipe.getIngredientsList();
        const ingredientsData = recipe.getIngredientsData();

        return ingredientsList.every((ingredientName) => {
            if(!(ingredientName in this.store)) {
                return false;
            }
            if(this.store[ingredientName] < ingredientsData[ingredientName]) {
                return false;
            }
            return true;
        })
    }

    useIngredience(recipe) {
        
        const ingredientsList = recipe.getIngredientsList();
        const ingredientsData = recipe.getIngredientsData();

        ingredientsList.forEach((ingredientName) => {

            if(!(ingredientName in this.store)) {
                throw new Error(`There is no such ingredient(${ingredientName}) in machine`);
            }

            this.store[ingredientName] -= ingredientsData[ingredientName];
        })
    }

    refillIngredient(amount = 0, ingredientName) {

        if(!(ingredientName in this.store)) {
            throw new Error(`There is no such ingredient(${ingredientName}) in machine`);
        }
        
        this.store[ingredientName] += isValidIngrediensAmount(amount);
    }

    checkInventory() {
        return structuredClone(this.store);
    }
}
 
class CoffeeMachine {
    constructor(ingredients = {}, menuInfo = {}) {

        this.menu = new Menu(menuInfo);
        this.storage = new Storage(ingredients)

    }

    makeDrink(drinkName) {
        const recipe = this.menu.getRecipe(drinkName)

        if(!this.storage.isEnoughingredients(recipe)) {
            console.log("Not enough ingredients");
            return false;
        }

        this.storage.useIngredience(recipe);
        console.log(`${recipe.getName()} made`);
        return true;
    }

    refillIngredient(amount = 0, ingerdientName) {
        this.storage.refillIngredient(amount, ingerdientName)
    }

    checkInventory() {
        return this.storage.checkInventory()
    }
}

class Barista {

    constructor(menuInfo = {}) {
        this.menu = new Menu(menuInfo);
    }

    processOrders(ordersList, machine) {
        if(machine.constructor.name !== COFFEE_MACHINE_CLASS_NAME) {
            throw new Error('wrong machine')
        }

        if(ordersList.constructor.name !== ORDERS_LIST_CLASS_NAME) {
            throw new Error('wrong orders list')
        }
    
        const ordersInfo = ordersList.getOrdersInfo();    
        ordersInfo.forEach((order, orderId) => {
    
            const drinkName = order.getDrinkName();
            const quantity = order.getQuantity();
    
            if(!drinkName || !quantity || isNaN(quantity)) {
                throw new Error('error in order')
            }
            for(let i = 0; i < quantity; i++) {
                const success= machine.makeDrink(drinkName);
    
                if(success) {
                    ordersList.removeOrder(orderId)
                }
            }
        })
    }

    calculateTotalIngredients(ordersList) {
        if(ordersList.constructor.name !== ORDERS_LIST_CLASS_NAME) {
            throw new Error('wrong orders list')
        }
        
        return [...ordersList.getOrdersInfo().values()].reduce((acc, order) => {

            const drinkName = order.getDrinkName();
            const quantity = order.getQuantity();
    
            if(!drinkName || !quantity || isNaN(quantity)) {
                throw new Error('error in order')
            }
            
            const recipe = this.menu.getRecipe(drinkName);
            const ingredientsList = recipe.getIngredientsList();
            const ingredientsData = recipe.getIngredientsData();
    
            ingredientsList.forEach((ingredientName) => {
    
                if(!(ingredientName in acc)) {
                    acc[ingredientName] = 0;
                }
                for(let i = 0; i < quantity; i++) {
                    acc[ingredientName] += ingredientsData[ingredientName];
                }
            })
    
            return acc;
        }, {})
    }
}

class Order {
    constructor(quantity = 0, drinkName) {
        this.quantity = isValidIngrediensAmount(quantity);
        this.drinkName = drinkName;
    }
    getQuantity = () => this.quantity;
    decreaseQuantity = () => --this.quantity;
    getDrinkName = () => this.drinkName; 
}

class OrdersList {
    constructor(orders = []) {

        this.orders = new Map();
        this.appendOrders(orders)
    }
    appendOrders(orders) {
        orders.forEach((order, index) => {
            let {drinkName, quantity} = order;

            if(!drinkName || !quantity || isNaN(quantity)) {
                throw new Error('error in order')
            }

            const now = new Date();
            const timestamp = now.getTime() + drinkName + index;
            this.orders.set(timestamp, new Order(quantity, drinkName));
        })
    }
    removeOrder(orderId) {
        const order = this.orders.get(orderId);
        
        if(!order) {
            throw new Error('there is no such order')
        }

        order.decreaseQuantity();

        if(order.getQuantity() === 0) {
            this.orders.delete(orderId)
        }
    }
    getOrdersInfo = (isMap = true) => {

        if(isMap) {return new Map(this.orders);}

        return [...this.orders.values()].map((order) => {
            return {
                drinkName:order.getDrinkName(),
                quantity:order.getQuantity(),
            }
        })
    };
}

module.exports = {Menu, Recipe, Storage, CoffeeMachine, Barista, Order, OrdersList}