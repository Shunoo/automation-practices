interface ProductProps{
    id: number;
    name: string;
    price: number;
    stock: number;
    category: string;
}


export class Product{
    readonly id : number;
    readonly name : string;
    readonly price : number;
    readonly stock: number;
    readonly category : string;

    constructor( {id,name,price,stock,category}: ProductProps){
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.category = category;
    }
}