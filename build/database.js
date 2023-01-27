"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = void 0;
exports.users = [
    {
        id: "u001",
        email: "maria01@gmail.com",
        password: "9834"
    },
    {
        id: "u002",
        email: "alex1@gmail.com",
        password: "9asd4"
    }
];
exports.products = [
    {
        id: "p001",
        name: "garrafa",
        price: 59,
        category: "utilidades"
    },
    {
        id: "p002",
        name: "kindle",
        price: 499,
        category: "eletrônicos"
    }
];
exports.purchases = [
    {
        userId: "u001",
        productId: "p001",
        quantify: 105,
        totalPrice: 452
    },
    {
        userId: "u002",
        productId: "p002",
        quantify: 25,
        totalPrice: 4500
    }
];
//# sourceMappingURL=database.js.map