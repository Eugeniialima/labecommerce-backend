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
    try{
        res.status(200).send(users)
    } catch (error:any){
        res.status(404)
        res.send(error.message)
    }
  });

  app.get('/products', (req: Request, res: Response) => {
   try {
    res.status(200).send(products)
   } catch (error:any) {
    res.status(404)
    res.send(error.message)
     } 
    });

  app.get('/products/search', (req: Request, res: Response) => {
    try {
        const q = req.query.q as string
        const result: TProduct[] = products.filter((product) => {
            return product.name.toLowerCase().includes(q.toLowerCase())
        })

        if(q.length <= 2){
            res.status(400)
            throw new Error("Nome de produto inválido. Nome deve contar no mínimo 2 caracteres")
        }

        if(result.length < 1){
            res.status(400)
            throw new Error("Produto não encontrado")
        }

        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
})

//CreateUser

app.post('/users', (req: Request, res: Response) =>{
    try {
        const {id, email, password} = req.body 
        if(!id ||  !email || !password) {
            res.status(400)
            throw new Error("Dados inválidos")
        }

        if(typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser do tipo string.")
        }

        if(typeof email !== "string") {
            res.status(400)
            throw new Error("'email' deve ser do tipo string.")
        }

        if(typeof password !== "string") {
            res.status(400)
            throw new Error("'password' deve ser do tipo string.")
        }

    const userId = users.find((user) => user.id === id)

        if(userId) {
            res.status(409)
            throw new Error("'id' já cadastrado.")
        }

        const userEmail = users.find((user) => user.email === email)

        if(userEmail) {
            res.status(409)
            throw new Error("'email' já cadastrado.")
        }

        const newUser = {
            id,
            email, 
            password
        }
        users.push(newUser)
    
        res.status(201).send("Cadastro realizado com sucesso")

    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
    
})
  

app.post('/products', (req: Request, res: Response) =>{
    try {
        const {id, name, price, category} = req.body 
        if(!id ||  !name || !price || !category) {
            res.status(400)
            throw new Error("Dados inválidos")
        }

        if(typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser do tipo string.")
        }

        if(typeof name !== "string"){
            res.status(400)
            throw new Error("'name' deve ser do tipo string")
        }

        if(typeof price !== "number") {
            res.status(400)
            throw new Error("'price' deve ser do tipo numero.")
        }

        if(typeof category !== "string") {
            res.status(400)
            throw new Error("'category' deve ser do tipo string.")
        }

    const productId = products.find((product) => product.id === id)

        if(productId) {
            res.status(409)
            throw new Error("'id' já cadastrado.")
        }


        const newProduct:any = {
            id,
            name,
            price, 
            category
        }

        products.push(newProduct)
    
        res.status(201).send("Cadastro realizado com sucesso")

    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
    
})
    
  
app.post('/purchases', (req: Request, res: Response) =>{
    try {
        const {userId,productId, quantify, totalPrice} = req.body 
      
        if(!userId ||  !productId || !quantify || !totalPrice){
       res.status(400)
       throw new Error("Dados inválidos")
       }

       if(!(users.find((user) => user.id === userId))){
        res.status(404)
        throw new Error("O usuário não existe. Escolha um usuário existente.")
    }
    if(!(products.find((product) => product.id === productId))){
        res.status(404)
        throw new Error("O produto não existe. Escolha um produto existente.")
    }
        
        const newPurchase = {
        userId,
        productId,
        quantify,
        totalPrice
        }
    
        purchases.push(newPurchase)
    
        res.status(201).send("Compra realizada com sucesso!")     
    } catch(error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
   
})

//Get Products By Id

app.get('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        const result = products.find((product) => {
            return product.id === id
        })

        if(!result) {
            throw new Error("Produto não existe.")
        }
        res.status(200).send(result)
        console.log("Produto encontrado")
        
    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }    
})

//Get User Purchases By User id

app.get('/users/:id/purchases', (req: Request, res: Response) => {
    try {
        const { id } = req.params
    
        const result = purchases.filter((purchase) => {
            return purchase.userId === id
        })

        if(!result) {
            res.status(404)
            throw new Error("Compra não existe.")
        }
        res.status(200).send(result)
        console.log("array de compras do user procurado")

    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
})


//Delete User by Id

app.delete('/users/:id', (req: Request, res: Response) => {
    try {
        const { id } = req.params    
        const userIndex = users.findIndex((user) => {
            return user.id === id
        })
    
        if (userIndex >= 0) {
            users.splice(userIndex, 1)
            res.status(200).send("Usuário deletado com sucesso")
            console.log("Usuário deletado com sucesso")
        } else {
            res.status(404)
            throw new Error("Usuário não encontrado")
        }
    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
})

//Delete Product by id

app.delete('/products/:id', (req:Request, res:Response) => {
    try{
        const id = req.params.id

        if(!(products.find((product) => product.id === id))){
            res.status(404)
            throw new Error("O id do produto não existe. Escolha um produto existente.")
        }

        const productIndex = products.findIndex((product) => product.id === id)

        if (productIndex >= 0){
            products.splice(productIndex, 1)
        }

        res.status(200).send("Produto deletado com sucesso")

    }catch(error:any){
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
})


//Edit User by id

app.put('/user/:id', (req:Request, res:Response) => {
    try{
        const id = req.params.id

        if(!(users.find((user) => user.id === id))){
            res.status(404)
            throw new Error("O id do usuário não existe. Escolha um usuário existente.")
        }

        const newEmail = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined

        const user = users.find((user) => user.id === id)

        if(!newEmail){
            res.status(404)
            throw new Error("O email não existe. Escolha um novo email.")
        }
        if(!newPassword){
            res.status(404)
            throw new Error("A senha não existe. Escolha uma nova senha.")
        }

        if (user) {
            user.email = newEmail || user.email
            user.password = newPassword || user.password
        }

        res.status(200).send("Cadastro atualizado com sucesso")

    }catch(error:any){
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
})

//Edit Product by id

app.put('/product/:id', (req:Request, res:Response) => {
    try{
        const id = req.params.id

        if(!(products.find((product) => product.id === id))){
            res.status(404)
            throw new Error("O id do produto não existe. Escolha um produto existente.")
        }

        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newCategory = req.body.category as CATEGORY | undefined

        if(!newName){
            res.status(404)
            throw new Error("Escreva um novo nome.")
        }
        if(!newPrice){
            res.status(404)
            throw new Error("Escreva um novo preço.")
        }
        if(!newCategory){
            res.status(404)
            throw new Error("Escreva uma nova categoria.")
        }

        const product = products.find((product) => product.id === id)

        if (product) {
            product.name = newName || product.name
            product.price = newPrice ||  product.price
            product.category = newCategory || product.category
        }

        res.status(200).send("Produto atualizado com sucesso")

    }catch(error:any){
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
})