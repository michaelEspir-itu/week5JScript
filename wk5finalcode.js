class Food {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
    describe() {
        return `${this.name} is a/an ${this.type}.`;
    }
}
class Order {
    constructor(name) {
        this.name = name;
        this.foods = [];
    }
    addFood(food) {
        if (food instanceof Food) {
            this.foods.push(food);
        } else {
            throw new Error(`You can only add an instance of ${food}.  Argument is not a food item: ${food}`);
        }
    }
    describe() {
        return `${this.name} has ${this.foods.length} food items.`;
    }
}
class Menu {
    constructor() {
        this.orders = [];
        this.selectedOrder = null;
    }
    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case `1`:
                    this.createOrder();
                    break;
                case `2`:
                    this.viewOrder();
                    break;
                case `3`:
                    this.deleteOrder();
                    break;
                case `4`:
                    this.showOrders();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert(`Thank You, Have A Great Day!`)
    }
    showMainMenuOptions() {
        return prompt(`
        0) Exit
        1) Create New Order
        2) View Order
        3) Delete Order
        4) Show All Orders
        `);
    }
    showOrderMenuOptions(orderInfo) {
        return prompt(`
        0) Back
        1) Add Food Item
        2) Remove Food Item
        ------------------
        ${orderInfo}
        `);
    }
    showOrders() {
        let orderString = ``;
        for (let i = 0; i < this.orders.length; i++) {
            orderString += i + `) ` + this.orders[i].name + `\n`;  
        }
        alert(orderString);
    }
    createOrder() {
        let name = prompt(`Enter name for new order:`);
        this.orders.push(new Order(name));
    }
    viewOrder() {
        let index = prompt(`Enter the index of the order you wish to view:`);
        if (index > -1 && index < this.orders.length) {
            this.selectedOrder = this.orders[index];
            let description = `Order Name:  ` + this.selectedOrder.name + `\n`;
            for (let i = 0; i < this.selectedOrder.foods.length; i++) {
                description += i + `) ` + this.selectedOrder.foods[i].name
                    + ` - ` + this.selectedOrder.foods[i].type + `\n`;
            }
            let selection = this.showOrderMenuOptions(description);
            switch (selection) {
                case `1`:
                    this.addFoodItem();
                    break;
                case `2`:
                    this.removeFoodItem();
            }
        }
    }
    deleteOrder() {
        let index = prompt(`Enter the index of the order you wish to delete: `);
        if (index > -1 && index < this.orders.length) {
            this.orders.splice(index, 1);
        }
    }
    addFoodItem() {
        let name = prompt(`Enter name for new food item: `);
        let type = prompt(`Is food Item a/an Appetizer, Main Course, Dessert, or Drink?`);
        this.selectedOrder.foods.push(new Food(name, type));
    }
    removeFoodItem() {
        let index = prompt(`Enter the index of the food item you wish to delete: `);
        if (index > -1 && index < this.selectedOrder.foods.length) {
            this.selectedOrder.foods.splice(index, 1);
        }
    }
}
let menu = new Menu();
menu.start();