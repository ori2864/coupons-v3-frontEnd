import { Category } from "../Models/Category";
import { Coupon } from "../Models/Coupon";

export class CompanyState {
    public companyId: number = -1;
    public myCompanyCoupons: Coupon[] = [];
    public companyCouponsByCat: Coupon[] = [];
    public companyCouponsByPrice: Coupon[] = [];
}

export enum CompanyActionType {
    getMyCompanyCoupons = "getMyCompanyCoupons",
    getCompanyCouponListByPrice = "getCompanyCouponListByPrice",
    getCompanyCouponListByCat = "getCompanyCouponListByCat",
    updateCompanyId = "updateCompanyId",
    resetCompanyCoupons = "resetCompanyCoupons",
    updateCompanyCoupons = "updateCompanyCoupons", 
    addCoupon = "addCoupon", 
    updateCoupon = "updateCoupon",
    deleteCoupon = "deleteCoupon",
}

export interface CompanyAction {
    type: CompanyActionType,
    payload?: any
}

// export function updateCompanyIdAction(CompanyId:number): CompanyAction {
//     return { type: CompanyActionType.updateCompanyId, payload: CompanyId };
// }
export function getMyCompanyCouponsAction(coupons:Coupon[]): CompanyAction {
    return { type: CompanyActionType.getMyCompanyCoupons, payload:coupons };
}

export function getCompanyCouponsByPriceAction(price: number): CompanyAction {
    return { type: CompanyActionType.getCompanyCouponListByPrice, payload: price };
}

export function getCompanyCouponsByCatAction(category: Category): CompanyAction {
    return { type: CompanyActionType.getCompanyCouponListByCat, payload: category };
}

export function resetListAfterPurchaseAction(): CompanyAction {
    return { type: CompanyActionType.resetCompanyCoupons };
}

export function updateCompanyCouponsAction(): CompanyAction {
    return { type: CompanyActionType.updateCompanyCoupons };
}
export function updateCompanyIdAction(id:number): CompanyAction {
    return { type: CompanyActionType.updateCompanyId, payload: id};
}
export function addCouponAction(coupon:Coupon): CompanyAction {
    return { type: CompanyActionType.addCoupon, payload: coupon};
}

export function updateCouponAction(coupon:Coupon): CompanyAction {
    return { type: CompanyActionType.updateCoupon, payload: coupon};
}
export function deleteCouponAction(id:number): CompanyAction {
    return { type: CompanyActionType.deleteCoupon, payload: id};
}

export function CompanyReducer(currentState: CompanyState = new CompanyState(), action: CompanyAction): CompanyState {
    const newState = { ...currentState };
    switch (action.type) {
        case CompanyActionType.getMyCompanyCoupons:
            let coupons:Coupon[] = action.payload;
            // console.log("coupons filtered: ",coupons.filter((item)=>item.companyID===newState.companyId));
            newState.myCompanyCoupons = coupons.filter((item)=>item.companyID===newState.companyId);
            console.log(newState.myCompanyCoupons);
            break;
        
        case CompanyActionType.getCompanyCouponListByCat:
            action.payload = action.payload.toUpperCase();
            newState.companyCouponsByCat = [...newState.myCompanyCoupons].filter((item) => item.category === action.payload);
            break;

        case CompanyActionType.getCompanyCouponListByPrice:
            newState.companyCouponsByPrice = [...newState.myCompanyCoupons].filter((item) => item.price < action.payload);
            break;

        case CompanyActionType.resetCompanyCoupons:
            return new CompanyState();

        case CompanyActionType.updateCompanyId:
            newState.companyId = action.payload;
            break;
        case CompanyActionType.addCoupon:
            newState.myCompanyCoupons = [...newState.myCompanyCoupons, action.payload];
            break;
        case CompanyActionType.updateCoupon:
            let couponUpdate: Coupon = action.payload;
            newState.myCompanyCoupons = newState.myCompanyCoupons.map(coupon => 
                coupon.id == couponUpdate.id ? couponUpdate : coupon
            );
            break;
        case CompanyActionType.deleteCoupon:
           newState.myCompanyCoupons = [...newState.myCompanyCoupons].filter(item=>item.id!=action.payload) ;
           
            break;
    }
    return newState;
}
