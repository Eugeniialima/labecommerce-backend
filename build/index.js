"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
console.log(database_1.users);
console.log(database_1.products);
console.log(database_1.purchases);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get('/users', (req, res) => {
    try {
        res.status(200).send(database_1.users);
    }
    catch (error) {
        res.status(404);
        res.send(error.message);
    }
});
app.get('/products', (req, res) => {
    res.status(200).send(database_1.products);
});
app.get('/products/search', (req, res) => {
    const q = req.query.q;
    const result = database_1.products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase());
    });
    res.status(200).send(result);
});
app.post('/users', (req, res) => {
    const { id, email, password } = req.body;
    const newUser = {
        id,
        email,
        password
    };
    database_1.users.push(newUser);
    res.status(201).send("Cadastro realizado com sucesso!");
});
app.post('/products', (req, res) => {
    const { id, name, price, category } = req.body;
    const newProduct = {
        id,
        name,
        price,
        category
    };
    database_1.products.push(newProduct);
    res.status(201).send("Produto realizado com sucesso!");
});
app.post('/purchases', (req, res) => {
    const { userId, productId, quantify, totalPrice } = req.body;
    const newPurchase = {
        userId,
        productId,
        quantify,
        totalPrice
    };
    database_1.purchases.push(newPurchase);
    res.status(201).send("Compra realizada com sucesso!");
});
app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const result = database_1.products.find((product) => {
        return product.id === id;
    });
    res.status(200).send(result);
    console.log("objeto product encontrado");
});
app.get('/users/:id/purchases', (req, res) => {
    const id = req.params.id;
    const result = database_1.purchases.filter((purchase) => {
        return purchase.userId === id;
    });
    res.status(200).send(result);
    console.log("array de compras do user procurado");
});
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const userIndex = database_1.users.findIndex((user) => {
        return user.id === id;
    });
    if (userIndex >= 0) {
        database_1.users.splice(userIndex, 1);
    }
    res.status(200).send("Usuário deletado com sucesso");
});
app.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    const productIndex = database_1.products.findIndex((product) => {
        return product.id === id;
    });
    if (productIndex >= 0) {
        database_1.products.splice(productIndex, 1);
    }
    res.status(200).send("Produto apagado com sucesso");
});
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const newId = req.body.id;
    const newEmail = req.body.email;
    const newPassword = req.body.password;
    const user = database_1.users.find((user) => user.id === id);
    if (user) {
        user.id = newId || user.id;
        user.email = newEmail || user.email;
        user.password = newPassword || user.password;
    }
    res.status(200).send("Atualização realizada com sucesso");
});
app.put('/products/:id', (req, res) => {
    const id = req.params.id;
    const newId = req.body.id;
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newCategory = req.body.category;
    const product = database_1.products.find((product) => product.id === id);
    if (product) {
        product.id = newId || product.id;
        product.name = newName || product.name;
        product.price = isNaN(newPrice) ? product.price : newPrice;
        product.category = newCategory || product.category;
    }
    res.status(200).send("Atualização realizada com sucesso");
});
//# sourceMappingURL=index.js.map