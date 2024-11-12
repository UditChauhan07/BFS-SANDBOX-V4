import React from "react";
import LogoHeader from "../components/All Headers/logoHeader/LogoHeader";
import TopNav from "../components/All Headers/topNav/TopNav";
import Header from "../components/All Headers/header/Header";
import HelpSection from "../components/Footer/HelpSection";
import Footer from "../components/Footer/Footer";
import MobileHeader from "../components/All Headers/mobileHeader/MobileHeader";
import AppLayout from "../components/AppLayout";

const CustomerCare = () => {
  return (
   <AppLayout>

          {/* Top products */}
          <div className="row d-flex flex-column justify-content-around align-items-center lg:min-h-[300px] xl:min-h-[400px]">
            <div className="col-4">
              <p className="m-0 fs-2 font-[Montserrat-400] text-[14px] tracking-[2.20px]">Coming Soon...</p>
            </div>
          </div>
   </AppLayout>
  );
};

export default CustomerCare;
