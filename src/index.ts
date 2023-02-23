import {users, products, purchases} from "./database"
import express, { Request, Response} from 'express';
import cors from 'cors'
import { CATEGORY, TProduct, TPurchase, TPurchaseProduct, TUser } from "./types";
// import { createUser, getAllUsers, createProduct, getAllProducts, getProductById, createPurchase, getAllPurchasesFromUserId } from "./database"
import { db } from './database/knex';

// console.log(users);
// console.log(products);
// console.log(purchases);


const app = express();
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get('/users', async (req: Request, res: Response) => {
    try {
        
        const searchTerm = req.query.q as string | undefined

        if(searchTerm === undefined) {
            const result = await db("users")
            .select(
                "id",
                "name",
                "email",
                "password",
                "created_at AS createdAt",
            )
            res.status(200).send(result)
        } else {
            const result = await db("users")
            .select(
                "id",
                "name",
                "email",
                "password",
                "created_at AS createdAt",
            )
            .where("name", "LIKE", `%${searchTerm}%`)
            .orWhere("id", "LIKE", `%${searchTerm}%`)
            res.status(200).send(result)
        }

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


  app.get('/products', async (req: Request, res: Response) => {
   try {
    const result = await db.raw(`
    SELECT * FROM products;
`)
    res.status(200).send(result)
   } catch (error: any) {
    console.log(error)

    if (res.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
}
});

  app.get('/products/search', async (req: Request, res: Response) => {
    try {
        
        const searchTerm = req.query.q as string | undefined

        if(searchTerm === undefined) {
            const result = await db("products")
            .select(
                "id",
                "name",
                "price",
                "category",
                "description",
                "image_url AS imageUrl"
            )
            res.status(200).send(result)
        } else {
            const result = await db("products")
            .select(
                "id",
                "name",
                "price",
                "category",
                "description",
                "image_url AS imageUrl"
            )
            .where("name", "LIKE", `%${searchTerm}%`)
            .orWhere("description", "LIKE", `%${searchTerm}%`)
            res.status(200).send(result)
        }


    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});

//CreateUser

app.post('/users', async (req: Request, res: Response) =>{
    try {
        const {id, name, email, password} = req.body 
        if(!id || !name || !email || !password) {
            res.status(400)
            throw new Error("Dados inválidos")
        }

        if(typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser do tipo string.")
        }

        if(typeof name !== "string") {
            res.status(400)
            throw new Error("'name' deve ser do tipo string.")
        }

        if(typeof email !== "string") {
            res.status(400)
            throw new Error("'email' deve ser do tipo string.")
        }

              if(typeof password !== "string") {
            res.status(400)
            throw new Error("'password' deve ser do tipo string.")
        }

        await db.raw(`
         INSERT INTO users (id, name, email, password)
         VALUES ("${id}", "${name}", "${email}", "${password}")
         `)

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
  

app.post('/products', async (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const name = req.body.name
        const price = req.body.price
        const category = req.body.category
        const description = req.body.description
        const imageUrl = req.body.imageUrl

        if(!id || !name || !price || !category || !description || !imageUrl){
            res.status(404)
            throw new Error("Dados inválidos.")
        }
    
        if(typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser do tipo string." )
        }

        if(!name){
            res.status(404)
            throw new Error( "'name' deve ser ser informado.")
        }        
        
        if(typeof name !== "string") {
            res.status(400)
            throw new Error( "'name' deve ser do tipo string.")
        }       

        if(!price){
            res.status(404)
            throw new Error( "'price' deve ser ser informado.")
        }

        if(typeof price !== "number") {
            res.status(400)
            throw new Error( "'price' deve ser do tipo string.")
        }

        if(!category){
            res.status(404)
            throw new Error( "'category' deve ser ser informado.")
        }
        
        if(typeof category !== "string") {
            res.status(400)
            throw new Error("'category' deve ser do tipo string.")
        }

        const [ productIdAlreadyExists ]: TProduct[] | undefined = await db("products").where({ id })

        if(productIdAlreadyExists) {
            res.status(409)
            throw new Error( "'id' do produto já cadastrado.")
        }

        const newProduct: any = {
            id,
            name,
            price,
            category,
            description, 
            image_url: imageUrl
        }

        await db.insert(newProduct).into("products")
    
        res.status(201).send("Cadastro realizado com sucesso")

    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
    
})
    
app.post("/purchases", async (req: Request, res: Response) => {

    try {

        if(!req.body.id){
            res.status(400);
            throw new Error("Informe o ID da compra.");
        }

        if(!req.body.id.startsWith("pur")){
            res.status(400);
            throw new Error("O ID deve começar com 'pur'.");
        }

        if(!req.body.buyerId){
            res.status(400);
            throw new Error("Não foi informado o 'buyer'.");
        }

        const buyer=db("users").where({id:req.body.buyerId}).first();
        if(!buyer){
            res.status(400);
            throw new Error(`O comprador '${req.body.buyerId}' não foi localizado.`);
        }

        if(!req.body.totalPrice||req.body.totalPrice<=0){
            res.status(400);
            throw new Error("O valor total do pedido não foi informado.");
        }

        if(!req.body.products.length){
            res.status(400);
            throw new Error("Os produtos não foram informados.");
        }

        const totalPrice=req.body.products.reduce((soma:number, item:TProduct)=> soma+item.price*item.quantity, 0);
        if(totalPrice!==req.body.totalPrice){
            res.status(400);
            throw new Error("O valor total do pedido é diferente da soma do valor total de cada produto.");
        }

        for (let index = 0; index < req.body.products.length; index++) {
            const element:TPurchaseProduct = req.body.products[index];
            
            try{
                if(!element.productID){
                    throw new Error("O código do produto não foi informado.");
                }

                const product=await  db("products").where({id: element.purchaseID}).first();
                if(!product){
                    throw new Error(`Produto '${element.purchaseID}' não localizado.`)
                }

                if(!element.price||element.price<=0){
                    throw new Error("O preço deve ser maior que zero.");
                }

                if(!element.quantity||element.quantity<=0){
                    throw new Error("A quantidade do produto deve ser informada.");
                }

            }catch(error:any){
                    res.status(400);
                    throw new Error(`Produtcs[${index}]: ${error.message}`);
            };
        }

        const purchase = await db("purchases").where({id: req.body.id}).first()
        if(purchase){
            res.status(400)
            throw new Error(`Peiddo de compra '${req.body.id}' já cadastrado`);
        }

        if(!req.body.products.length){
            res.status(400);
            throw new Error("Nenhum produto informado.");
        }

        const newPurchase= {
            "id":req.body.id,
            "total_price":req.body.totalPrice,
            "paid": 0,
            "delivered_at":null,
            "buyer_id":req.body.buyerId
        };

       await db("purchases").insert(newPurchase);

       req.body.products.forEach(async (element:TProduct) => {
            const newProduct={
                "purchase_id":newPurchase.id,
                "product_id":element.id,
                "quantity":element.quantity
            };

            await db("purchases_products").insert(newProduct);
       });

        res.status(201).send({ 
            message: "Pedido realizado com sucesso"
        });

    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
});

app.delete("/purchase/:id", async(req:Request,res:Response)=>{
    try{
    if(!req.params.id){
        throw new Error("Informe o código do pedido de venda.");
    }

    const purchase=await db("purchases").where({id:req.params.id}).first();
    if(!purchase){
        throw new Error(`O pedido de venda '${req.params.id}' não foi localizado.`);
    }

    const products=await db("purchases_products").where({purchase_id:req.params.id});
    products.forEach(async (element:TPurchaseProduct)=>{
        await db("purchases_products").del()
            .where({purchase_id:req.params.id});
    });

    await db("purchases").del()
        .where({id:req.params.id});

    res.status(200);
    res.send(`Pedido de venda '${req.params.id} apagado.`);

}catch(error:any){
    res.status(400);
    res.send(error.message);
}
});

//Get Products By Id

app.get('/products/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string

        const result = await db("products").where({ id })

        if(!result) {
            throw new Error("Produto não existe.")
        }
        res.status(200).send(result)
        console.log("Produto encontrado")

    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//Get User Purchases By User id

app.get('/users/:id/purchases', async (req: Request, res: Response) => {
    try {
        const buyerId = req.params.id
    
        const result: TPurchase[] = await db("purchases")
        .select(
            "id",
            "buyer_id AS buyerId", 
            "total_price AS totalPrice", 
            "paid AS isPaid", 
            "delivered_at AS deliveredAt", 
            "created_at AS createdAt"
        )
        .where({ buyer_id: buyerId })

        if(!result) {
            res.status(404)
            throw new Error("Compra do usuário informado não existe.")
        }

        res.status(200).send(result)
        console.log("Array de compras do user informado.")

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

        if(!products.find((product) => product.id === id)){
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

        const newId = req.body.id as string | undefined
        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newCategory = req.body.category as CATEGORY | undefined

        if(!newId){
            res.status(404)
            throw new Error("Escreva um novo id.")
        }
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