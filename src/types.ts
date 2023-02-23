

export type TUser = {
    id:string,
    email:string,
    password:string
}

export enum    CATEGORY{
ACCESSORIES = "Acessórios",
CLOTHES_AND_SHOES = "Roupas e calçados",
ELECTRONICS = "Eletrônicos"
}

export type TProduct = { 
    id:string,
    name:string,
    price:number,
    description:string,
    imageUrl:string,
    quantity:number,
    category: CATEGORY
} 

export type TPurchase = {
    id: string,
    buyer:String,
    totalPrice:number,
    products: TPurchaseProduct[],
}
export type TPurchaseProduct={
    purchaseID:string,
    productID:string,
    price:number,
    quantity:number
}