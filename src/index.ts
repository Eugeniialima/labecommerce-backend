import {users, products, purchases} from "./database"
import express, { Request, Response} from 'express';
import cors from 'cors'
import { CATEGORY, TProduct, TPurchase, TUser } from "./types";
// import { createUser, getAllUsers, createProduct, getAllProducts, getProductById, createPurchase, getAllPurchasesFromUserId } from "./database"

console.log(users);
console.log(products);
console.log(purchases);


const app = express();
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(users)
  });

  app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(products)
  });

  app.get('/products/search', (req: Request, res: Response) => {
    const q = req.query.q as string
    const result: TProduct[] = products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase())
    })
    res.status(200).send(result)
})

app.post('/users', (req: Request, res: Response) =>{
    const {id, email, password} = req.body as TUser

    const newUser = {
        id,
        email, 
        password
    }

    users.push(newUser)

    res.status(201).send("Cadastro realizado com sucesso!")
})

app.post('/products', (req: Request, res: Response) =>{
    const {id, name, price, category} = req.body as TProduct

    const newProduct = {
        id,
        name, 
        price,
        category
    }

    products.push(newProduct)

    res.status(201).send("Produto realizado com sucesso!")
})

app.post('/purchases', (req: Request, res: Response) =>{
    const {userId,productId, quantify, totalPrice} = req.body as TPurchase

    const newPurchase = {
    userId,
    productId,
    quantify,
    totalPrice
    }

    purchases.push(newPurchase)

    res.status(201).send("Compra realizada com sucesso!")
})
