import { Coupon } from "./Coupon";

export class Customer {
    id:number;
    first_name:string;
    last_name:string;
    email:string;
    password:string;
    coupons:Coupon[];


    constructor(id:number,first_name:string,last_name:string,email:string,password:string,coupons:Coupon[]){
    this.id=id;
    this.first_name=first_name;
    this.last_name=last_name;
    this.email=email;
    this.password=password;
    this.coupons=coupons;
}
}