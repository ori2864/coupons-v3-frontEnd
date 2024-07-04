import { Category } from "../Models/Category";
import { Coupon } from "../Models/Coupon";
import { systemStore } from "./store";

export class GuestState{
    public guestId:number=-1;
    public allCoupons: Coupon[] = [];
}

export enum GuestActionType {
    getCouponList = "getCouponList",
    couponPurchase = "couponPurchase",
    // updateGuestId = "updateGuestId",
}
export interface GuestAction {
    type: GuestActionType,
    payload?: any
}

// export function updateGuestIdAction(guestId:number): GuestAction {
//     return { type: GuestActionType.updateGuestId, payload: guestId };
// }
export function getAllCouponsAction(coupons: Coupon[]): GuestAction {
    return { type: GuestActionType.getCouponList, payload: coupons };
}
export function couponPurchase(couponId: number): GuestAction {
    return { type: GuestActionType.couponPurchase, payload: couponId };
}


export function GuestReducer(currentState:GuestState = new GuestState(), action: GuestAction): GuestState {
    const newState = { ...currentState }; 
    switch (action.type) {
        case GuestActionType.getCouponList:
            newState.allCoupons = action.payload;
            break;
            case GuestActionType.couponPurchase:
                console.log("inside redux purchase");
                
               //i want to update newState.allCoupons at index of action.payload and reduce amount by 1
               //and save the the updated state to newState.allCoupons
               const couponIndex = newState.allCoupons.findIndex(coupon => coupon.id === action.payload);
               if (couponIndex !== -1) {
                   // Decrement the amount and update the state
                   const updatedCoupon = { ...newState.allCoupons[couponIndex], amount: newState.allCoupons[couponIndex].amount - 1 };
                   newState.allCoupons = [
                       ...newState.allCoupons.slice(0, couponIndex),
                       updatedCoupon,
                       ...newState.allCoupons.slice(couponIndex + 1)
                   ];
               }
                console.log("coupons after puchase: ",newState.allCoupons)
            break;
        // case GuestActionType.updateGuestId:
        //         newState.guestId = action.payload;
        //     break;    
    }    
        return newState;
    
}