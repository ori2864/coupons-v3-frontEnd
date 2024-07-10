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
    addGuestCoupon = "addGuestCoupon",
    updateGuestCoupon = "updateGuestCoupon",
    deleteGuestCoupon = "deleteGuestCoupon",
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
export function couponPurchaseAction(couponId: number): GuestAction {
    return { type: GuestActionType.couponPurchase, payload: couponId };
}
export function addGuestCouponAction(coupon: Coupon): GuestAction {
    return { type: GuestActionType.addGuestCoupon, payload: coupon };
}
export function updateGuestCouponAction(coupon: Coupon): GuestAction {
    return { type: GuestActionType.updateGuestCoupon, payload: coupon };
}
export function deleteGuestCouponAction(id: number): GuestAction {
    return { type: GuestActionType.deleteGuestCoupon, payload: id };
}


export function GuestReducer(currentState:GuestState = new GuestState(), action: GuestAction): GuestState {
    const newState = { ...currentState }; 
    switch (action.type) {
        case GuestActionType.getCouponList:
            newState.allCoupons = action.payload;
            break;
            case GuestActionType.couponPurchase:
                console.log("inside redux purchase");
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
                // console.log("coupons after puchase: ",newState.allCoupons)
            break;
            case GuestActionType.addGuestCoupon:
            newState.allCoupons = [...newState.allCoupons, action.payload];
            break;
            case GuestActionType.updateGuestCoupon:
                let couponUpdate: Coupon = action.payload;
                newState.allCoupons = newState.allCoupons.map(coupon => 
                    coupon.id == couponUpdate.id ? couponUpdate : coupon
                );
            break;
            case GuestActionType.deleteGuestCoupon:
                console.log(action.payload)
                console.log(newState.allCoupons)
                newState.allCoupons = [...newState.allCoupons].filter(item=>item.id!=action.payload) ;
                console.log(newState.allCoupons)
                break;
          
    }    
        return newState;
    
}