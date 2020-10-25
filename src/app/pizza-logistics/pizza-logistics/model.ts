
export class PizzaOrder {
    customerName: string;
    id: number;
    size: number;
    state: number;
    toppings: number[];
    toppingsName?: string[];
    driverId: number;
    driverName?: string;
}

export class PizzaSize {
    id: number;
    name: string;
}

export class PizzaTopping {
    id: number;
    name: string;
    time: number;
    sendToKitchenButton?: string;
}

export class Driver {
    id: number;
    firstName: string;
    lastName: string;
    state: number;
    fullName: string;
}

export class PizzaState {
    open: number = 0;
    preparing: number = 1;
    cooking: number = 2;
    ready: number = 3;
    enRoute: number = 4;
    delivered: number = 5;
}
