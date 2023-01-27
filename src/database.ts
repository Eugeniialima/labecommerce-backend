import { TProduct, TPurchase, TUser } from "./types";

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


export const products: TProduct[] = [
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
]


export const purchases: TPurchase[] = [
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
]
