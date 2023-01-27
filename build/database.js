"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.purchases = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.products = exports.getAllUsers = exports.createUser = exports.users = void 0;
const types_1 = require("./types");
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
function createUser(id, email, password) {
    const newUser = {
        id,
        email,
        password
    };
    exports.users.push(newUser);
    console.log("Cadastro realizado com sucesso!");
}
exports.createUser = createUser;
createUser("u003", "mari@gmail.com", "30284");
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
console.log(getAllUsers());
exports.products = [
    {
        id: "p001",
        name: "garrafa",
        price: 59,
        category: types_1.CATEGORY.ACCESSORIES
    },
    {
        id: "p002",
        name: "kindle",
        price: 499,
        category: types_1.CATEGORY.ELECTRONICS
    }
];
function createProduct(id, name, price, category) {
    const newProduct = {
        id,
        name,
        price,
        category
    };
    exports.products.push(newProduct);
    console.log("Produto criado com sucesso!");
}
exports.createProduct = createProduct;
createProduct("p003", "Ipad", 10000, types_1.CATEGORY.ELECTRONICS);
function getAllProducts() {
    return exports.products;
}
exports.getAllProducts = getAllProducts;
function getProductById(idSearch) {
    return (exports.products.filter((product) => product.id === idSearch));
}
exports.getProductById = getProductById;
console.log(getProductById("p001"));
exports.purchases = [
    {
        userId: "u001",
        productId: "p001",
        quantify: 105,
        totalPrice: 105 * 59
    },
    {
        userId: "u002",
        productId: "p002",
        quantify: 25,
        totalPrice: 25 * 499
    }
];
function queryProductsByName(q) {
    const query = exports.products.filter((product) => {
        product.name.toLowerCase().includes(q.toLowerCase());
    });
    console.log(query);
}
exports.queryProductsByName = queryProductsByName;
function createPurchase(userId, productId, quantify, totalPrice) {
    const newPurchase = {
        userId,
        productId,
        quantify,
        totalPrice
    };
    console.table(newPurchase);
    exports.purchases.push(newPurchase);
    console.log("Compra realizada com sucesso");
}
exports.createPurchase = createPurchase;
function getAllPurchasesFromUserId(userIdToSearch) {
    return (exports.purchases.filter((purchase) => purchase.userId === userIdToSearch));
}
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
//# sourceMappingURL=database.js.map