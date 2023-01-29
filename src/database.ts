
import { TProduct, TPurchase, TUser } from "./types";
import { CATEGORY } from "./types"

export const users: TUser[] = [
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
]

export function createUser(id:string, email:string, password:string):void {
    const newUser={
        id,
        email,
        password
    }
    users.push(newUser)
    console.log("Cadastro realizado com sucesso!");
}

createUser("u003", "mari@gmail.com", "30284")

export function getAllUsers() :TUser[] {
    return users
}

console.log(getAllUsers());


export const products: TProduct[] = [
    {
        id: "p001",
        name: "Garrafa",
        price: 59,
        category: CATEGORY.ACCESSORIES
    },
    {
        id: "p002",
        name: "kindle",
        price: 499,
        category: CATEGORY.ELECTRONICS
    }
]

export function createProduct(id:string, name:string, price:number, category:CATEGORY) :void {
    const newProduct:TProduct = {
        id,
        name,
        price, 
        category
    }
    products.push(newProduct)
    console.log("Produto criado com sucesso!");
    
}

createProduct("p003", "Ipad", 10000, CATEGORY.ELECTRONICS)

export function getAllProducts():TProduct[] {
    return products
}

export function getProductById(idSearch:string | undefined) {
    return(products.filter((product) => 
    product.id === idSearch
     )      
)}

console.log(getProductById("p001"));

export const purchases: TPurchase[] = [
    {
    userId: "u001",
    productId: "p001",
    quantify: 15,
    totalPrice: 15 * 59
    },
    {
        userId: "u002",
    productId: "p002",
    quantify: 25,
    totalPrice: 25 * 499
    }
]

export function queryProductsByName(q: string):void {
    const query = products.filter((product) => {
        product.name.toLowerCase().includes(q.toLowerCase())
    })
    console.log(query);
    
}

export function createPurchase(userId: string, productId: string, quantify: number, totalPrice: number): void {
    const newPurchase = {
        userId,
        productId,
        quantify,
        totalPrice
    }
    console.table(newPurchase)
    purchases.push(newPurchase)
    console.log("Compra realizada com sucesso")
}

export function getAllPurchasesFromUserId(userIdToSearch: string): TPurchase[] | undefined {
    return(purchases.filter((purchase) => 
        purchase.userId === userIdToSearch
    ))
}