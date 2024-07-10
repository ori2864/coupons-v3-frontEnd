import { Category } from "../Models/Category";
import { Coupon } from "../Models/Coupon";
import { systemStore } from "./store";

export class CustomerState{
    public customerId:number=-1;
    // public allCoupons: Coupon[] = [];
    public myCustomerCoupons: Coupon[] = [];
    public customerCouponsByCat:Coupon[] = [];
    public customerCouponsByPrice:Coupon[] = [];
}
export enum CustomerActionType {
    getMyCustomerCoupons = "getMyCustomerCoupons",
    getCustomerCouponListByPrice = "getCustomerCouponListByPrice",
    getCustomerCouponListByCat = "getCustomerCouponListByCat",
    updateCustomerId = "updateCustomerId",
    resetCustomerCoupons = "resetCustomerCoupons",
}
export interface CustomerAction {
    type: CustomerActionType,
    payload?: any
}

export function updateCustomerIdAction(customerId:number): CustomerAction {
    return { type: CustomerActionType.updateCustomerId, payload: customerId };
}
export function getMyCustomerCouponsAction(coupons:Coupon[]): CustomerAction {
    return { type: CustomerActionType.getMyCustomerCoupons, payload:coupons };
}
export function getCustomerCouponsByPriceAction(price:number): CustomerAction {
    return { type: CustomerActionType.getCustomerCouponListByPrice, payload: price };
}
export function getCustomerCouponsByCatAction(category:Category): CustomerAction {
    return { type: CustomerActionType.getCustomerCouponListByCat, payload: category };
}
export function resetListAfterCustomerPurchaseAction(): CustomerAction {
    return { type: CustomerActionType.resetCustomerCoupons};
}

export function CustomerReducer(currentState:CustomerState = new CustomerState(), action: CustomerAction): CustomerState {
    const newState = { ...currentState }; 
    switch (action.type) {
        // case CustomerActionType.getCouponList:
        //     newState.allCoupons = action.payload;
        //     break;
        case CustomerActionType.getMyCustomerCoupons:
            newState.myCustomerCoupons = action.payload;
            break;
            // [...newState.allCoupons].filter((item)=>item.company_id!==newState.customerId); template for company reducer
        
        case CustomerActionType.getCustomerCouponListByCat:
            action.payload=action.payload.toUpperCase();
            newState.customerCouponsByCat = [...newState.myCustomerCoupons].filter((item)=>item.category===action.payload);
            break;
        
        case CustomerActionType.getCustomerCouponListByPrice:
            newState.customerCouponsByPrice = [...newState.myCustomerCoupons].filter((item)=>item.price<action.payload);
            break;
        case CustomerActionType.resetCustomerCoupons:
            return new CustomerState();
            break;
        case CustomerActionType.updateCustomerId:
                newState.customerId = action.payload;
            break;    
    }    
        return newState;
    
}