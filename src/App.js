import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SalesReport from "./reports/sales_report/SalesReport";
import NewnessReport from "./reports/newness/NewnessReport";
import ComparisonReport from "./reports/comparison/ComparisonReport";
import "../node_modules/bootstrap/dist/js/bootstrap";
import Login from "./pages/Login";
import Testing from "./components/Testing";
import TopProducts from "./pages/TopProducts";
import Logout from "./components/Logout";
import { UserProvider } from "./context/UserContext";
import BrandsPage from "./pages/BrandsPage";
import WholesaleInquiry from "./pages/WholesaleInquiry"
import CustomerCare from "./pages/CustomerCare";
import AboutUs from "./pages/AboutUs";
import EducationCenter from "./pages/EducationCenter";
import Careers from "./pages/Careers"
import Instagram from "./pages/Instagram"
import JoinUs from "./pages/JoinUs"
import Linkdin from "./pages/Linkdin"
import NewArrivals from "./pages/NewArrivals";
import CustomerSupport from "./pages/CustomerSupport";
import MarketingCalendar from "./pages/MarketingCalendar";
import MyBag from "./pages/MyBag";
import OrderListPage from "./pages/OrderListPage";
import Product from "./components/BrandDetails/Product";
import BagProvider from "./context/BagContext";
import MyBagOrder from "./pages/MyBagOrder";
import OrderStatusForm from "./pages/OrderStatusForm";
import CustomerSupportDetails from "./pages/CustomerSupportDetails";
import SignUp from "./pages/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import TargetReport from "./reports/targetReport";
import OrderStatusIssues from "./pages/OrderStatusIssues";
import CustomerService from "./pages/CustomerService";

function App() {
  // const Redirect = ({ href }) => {
  //   window.location.href = href;
  // };
  return (
    <UserProvider>
      <BagProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/testing" element={<Testing />}></Route>
            <Route path="/top-products" element={<TopProducts />}></Route>
            <Route path="/my-bag" element={<MyBag />}></Route>
            <Route path="/order" element={<BrandsPage />}></Route>
            <Route path="/orders" element={<Product />}></Route>
            <Route path="/order-list" element={<OrderListPage />}></Route>
            <Route path="/orderDetails" element={<MyBagOrder />}></Route>
            <Route path="/customer-care" element={<CustomerCare />}></Route>
            <Route path="/customer-support" element={<CustomerSupport />}></Route>
            <Route path="/CustomerSupportDetails" element={<CustomerSupportDetails />} ></Route>
            <Route path="/new-arrivals" element={<NewArrivals />}></Route>
            <Route path="/marketing-calendar" element={<MarketingCalendar />} ></Route>
            <Route path="/education-center" element={<EducationCenter />}></Route>
            <Route path="/about-us" element={<AboutUs />}></Route>
            <Route path="/wholesale-inquiry" element={<WholesaleInquiry />}></Route>
            <Route path="/careers" element={<Careers />}></Route>
            <Route path="/instagram" element={<Instagram />}></Route>
            <Route path="/join-us" element={<JoinUs />}></Route>
            <Route path="/linkdin" element={<Linkdin />}></Route>
            <Route path="logout" element={<Logout />}></Route>
            <Route path="/sign-up" element={<SignUp />}></Route>
            <Route path="/orderStatusForm" element={<OrderStatusForm />}></Route>
            <Route path="/orderStatus" element={<OrderStatusIssues />} />
            <Route path="/customerService" element={<CustomerService />}></Route>
            <Route path="/Target-Report" element={<TargetReport />}></Route>
            <Route path="/purchase-report" element={<SalesReport />}></Route>
            <Route path="/comparison-report" element={<ComparisonReport />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
          </Routes>
        </BrowserRouter>
      </BagProvider>
    </UserProvider>
  );
}

export default App;
