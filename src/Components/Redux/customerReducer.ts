import { Category } from "../Models/Category";
import { Coupon } from "../Models/Coupon";
import { systemStore } from "./store";

export class CustomerState{
    // public customerId:number=-1;
    // public allCoupons: Coupon[] = [];
    public myCoupons: Coupon[] = [];
    public couponsByCat:Coupon[] = [];
    public couponsByPrice:Coupon[] = [];
}
export enum CustomerActionType {
    getMyCoupons = "getMyCoupons",
    getCouponListByPrice = "getCouponListByPrice",
    getCouponListByCat = "getCouponListByCat",
    updateCustomerId = "updateCustomerId",
    resetCoupons = "resetCoupons",
}
export interface CustomerAction {
    type: CustomerActionType,
    payload?: any
}

// export function updateCustomerIdAction(customerId:number): CustomerAction {
//     return { type: CustomerActionType.updateCustomerId, payload: customerId };
// }
export function getMyCouponsAction(coupons:Coupon[]): CustomerAction {
    return { type: CustomerActionType.getMyCoupons, payload:coupons };
}
export function getCouponsByPriceAction(price:number): CustomerAction {
    return { type: CustomerActionType.getCouponListByPrice, payload: price };
}
export function getCouponsByCatAction(category:Category): CustomerAction {
    return { type: CustomerActionType.getCouponListByCat, payload: category };
}
export function resetListAfterPurchaseAction(): CustomerAction {
    return { type: CustomerActionType.resetCoupons};
}

export function CustomerReducer(currentState:CustomerState = new CustomerState(), action: CustomerAction): CustomerState {
    const newState = { ...currentState }; 
    switch (action.type) {
        // case CustomerActionType.getCouponList:
        //     newState.allCoupons = action.payload;
        //     break;
        case CustomerActionType.getMyCoupons:
            newState.myCoupons = action.payload;
            break;
            // [...newState.allCoupons].filter((item)=>item.company_id!==newState.customerId); template for company reducer
        
        case CustomerActionType.getCouponListByCat:
            action.payload=action.payload.toUpperCase();
            newState.couponsByCat = [...newState.myCoupons].filter((item)=>item.category===action.payload);
            break;
        
        case CustomerActionType.getCouponListByPrice:
            newState.couponsByPrice = [...newState.myCoupons].filter((item)=>item.price<action.payload);
            break;
        case CustomerActionType.resetCoupons:
            return new CustomerState();
            break;
        // case CustomerActionType.updateCustomerId:
        //         newState.customerId = action.payload;
        //     break;    
    }    
        return newState;
    
}