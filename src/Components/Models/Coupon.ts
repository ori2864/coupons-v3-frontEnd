import { Category } from "./Category";

export  class Coupon{
    id:number;
    category:Category
    title:string;
    companyID:number;
    description:string;
    start_date:Date;
    end_date:Date;
    amount:number;
    price:number;
    image:string;


    constructor(id:number,category:Category,title:string,company_id:number,description:string,start_date:Date,end_date:Date,amount:number,price:number,image:string){
        this.id=id;
        this.category=category;
        this.title=title;
        this.companyID=company_id;
        this.description=description;
        this.start_date=start_date;
        this.end_date=end_date;
        this.amount=amount;
        this.price=price;
        this.image=image;
    }
}

