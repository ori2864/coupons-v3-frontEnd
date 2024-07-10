import { Routes, Route, useParams } from "react-router-dom";
import { Main } from "../../Layout/Main/Main";
import { Page404 } from "../../Pages/Page404/Page404";
import "./MainRoute.css";
import { Login } from "../../Pages/Login/Login";
import { Register } from "../../Pages/Register/Register";
import { ConfirmBuy } from "../../Pages/Customer/ConfirmBuy/ConfirmBuy";
import { ByCatCoupons } from "../../Pages/Customer/ByCatCoupons/ByCatCoupons";
import { ByPriceCoupons } from "../../Pages/Customer/ByPriceCoupons/ByPriceCoupons";
import { AllCustomerCoupons } from "../../Pages/Customer/AllCustomerCoupons/AllCustomerCoupons";
import { CustomerDetails } from "../../Pages/Customer/CustomerDetails/CustomerDetails";
import { CompanyDetails } from "../../Pages/Company/CompanyDetails/CompanyDetails";
import { AllCompanyCoupons } from "../../Pages/Company/AllCompanyCoupons/AllCompanyCoupons";
import { CompanyCouponsByCat } from "../../Pages/Company/CompanyCouponsByCat/CompanyCouponsByCat";
import { CompanyCouponsByPrice } from "../../Pages/Company/CompanyCouponsByPrice/CompanyCouponsByPrice";
import { AddCoupon } from "../../Pages/Company/AddCoupon/AddCoupon";
import { UpdateCoupon } from "../../Pages/Company/UpdateCoupon/UpdateCoupon";
import { DeleteCoupon } from "../../Pages/Company/DeleteCoupon/DeleteCoupon";
import { AllCompanies } from "../../Pages/Admin/AllCompanies/AllCompanies";
import { AllCustomers } from "../../Pages/Admin/AllCustomers/AllCustomers";
import { SingleCompanyDetails } from "../../Pages/Admin/SingleCompanyDetails/SingleCompanyDetails";
import { SingleCustomerDetails } from "../../Pages/Admin/SingleCustomerDetails/SingleCustomerDetails";
import { DeleteCompany } from "../../Pages/Admin/DeleteCompany/DeleteCompany";
import { UpdateCompany } from "../../Pages/Admin/UpdateCompany/UpdateCompany";
import { AddCompany } from "../../Pages/Admin/AddCompany/AddCompany";
import { AddCustomer } from "../../Pages/Admin/AddCustomer/AddCustomer";
import { UpdateCustomer } from "../../Pages/Admin/UpdateCustomer/UpdateCustomer";
import { DeleteCustomer } from "../../Pages/Admin/DeleteCustomer/DeleteCustomer";

export function MainRoute(): JSX.Element {
    return (
        <div className="MainRoute">
			<Routes >
                {/* guest routes */}
                <Route path="/" element={<Main/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
        

                {/* customer routes */}
                <Route path="/customer/confirmBuy/:id"  element={<ConfirmBuy/>}/>
                <Route path="/customer/byCat" element={<ByCatCoupons/>}/>
                <Route path="/customer/byPrice" element={<ByPriceCoupons/>}/>
                <Route path="/customer/allCoupons" element={<AllCustomerCoupons/>}/>
                <Route path="/customer/details" element={<CustomerDetails/>}/>

                {/* company routes */}
                <Route path="/company/allCoupons" element={<AllCompanyCoupons/>}/>
                <Route path="/company/byCat" element={<CompanyCouponsByCat/>}/>
                <Route path="/company/byPrice" element={<CompanyCouponsByPrice/>}/>
                <Route path="/company/coupon/add" element={<AddCoupon/>}/>
                <Route path="/company/coupon/update" element={<UpdateCoupon/>}/>
                <Route path="/company/coupon/delete/:id" element={<DeleteCoupon/>}/>
                <Route path="/company/details" element={<CompanyDetails/>}/>
                
                {/* admin routes */}
                <Route path="/admin/getAllCustomers" element={<AllCustomers/>}/>
                <Route path="/admin/getAllCompanies" element={<AllCompanies/>}/>
                <Route path="/admin/getCustomerDetails/:id" element={<SingleCustomerDetails/>}/>
                <Route path="/admin/getCompanyDetails/:id" element={<SingleCompanyDetails/>}/>
                <Route path="/admin/addCustomer" element={<AddCustomer/>}/>
                <Route path="/admin/addCompany" element={<AddCompany/>}/>
                <Route path="/admin/updateCustomer/:id" element={<UpdateCustomer/>}/>
                <Route path="/admin/deleteCustomer/:id" element={<DeleteCustomer/>}/>
                <Route path="/admin/updateCompany/:id" element={<UpdateCompany/>}/>
                <Route path="/admin/deleteCompany/:id" element={<DeleteCompany/>}/>
                


                <Route path="*" element={<Page404/>}/>
            </Routes>
        </div>
    );
}
