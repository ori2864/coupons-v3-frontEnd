import { Category } from "../Models/Category";
import { Company } from "../Models/Company";
import { Coupon } from "../Models/Coupon";
import { Customer } from "../Models/Customer";

export class AdminState {
    public adminId: number = -1;
    public allCompanies: Company[] = [];
    public allCustomers: Customer[] = [];
    public adminCouponsByCat: Coupon[] = [];
    public adminCouponsByPrice: Coupon[] = [];
}

export enum AdminActionType {
    setAllCompanies = "setAllCompanies",
    setAllCustomers = "setAllCustomers",
    addCustomer = "addCustomer",
    updateCustomer = "updateCustomer",
    deleteCustomer = "deleteCustomer",
    deleteCompany = "deleteCompany",
    updateCompany = "updateCompany",
    addCompany = "addCompany",
}

export interface AdminAction {
    type: AdminActionType,
    payload?: any
}


export function setAllCompaniesAction(companies:Company[]): AdminAction {
    return { type: AdminActionType.setAllCompanies, payload: companies};
}
export function deleteCompanyAction(id:number): AdminAction {
    return { type: AdminActionType.deleteCompany, payload: id};
}
export function updateCompanyAction(company:Company): AdminAction {
    return { type: AdminActionType.updateCompany, payload: company};
}
export function addCompanyAction(company:Company): AdminAction {
    return { type: AdminActionType.addCompany, payload: company};
}
export function addCustomerAction(customer:Customer): AdminAction {
    return { type: AdminActionType.addCustomer, payload: customer};
}
export function setAllCustomersAction(customers:Customer[]): AdminAction {
    return { type: AdminActionType.setAllCustomers, payload: customers};
}
export function updateCustomerAction(customer:Customer): AdminAction {
    return { type: AdminActionType.updateCustomer, payload: customer};
}
export function deleteCustomerAction(id:number): AdminAction {
    return { type: AdminActionType.deleteCustomer, payload: id};
}
export function AdminReducer(currentState: AdminState = new AdminState(), action: AdminAction): AdminState {
    const newState = { ...currentState };
    switch (action.type) {
        case AdminActionType.setAllCompanies:
            newState.allCompanies = action.payload;
            break;
        case AdminActionType.deleteCompany:
            newState.allCompanies = [...newState.allCompanies].filter(item=>item.id!=action.payload);
            break;
        case AdminActionType.updateCompany:
        let companyUpdate: Company = action.payload;
        console.log(companyUpdate);
            newState.allCompanies = newState.allCompanies.map(company => 
                company.id == companyUpdate.id ? companyUpdate : company
            );
            console.log(newState.allCompanies);
            break;
        case AdminActionType.addCompany:
            newState.allCompanies = [...newState.allCompanies,action.payload];
            break;
        case AdminActionType.setAllCustomers:
                newState.allCustomers = action.payload;
                break;
        case AdminActionType.addCustomer:
                newState.allCustomers = [...newState.allCustomers,action.payload];
                break;
        case AdminActionType.updateCustomer:
            let customerUpdate: Customer = action.payload;
            console.log(customerUpdate);
                newState.allCustomers = newState.allCustomers.map(customer => 
                    customer.id == customerUpdate.id ? customerUpdate : customer
                );
                console.log(newState.allCompanies);
                break;
        case AdminActionType.deleteCustomer:
                    newState.allCustomers = [...newState.allCustomers].filter(item=>item.id!=action.payload);
                break;
        }
    return newState;
}
