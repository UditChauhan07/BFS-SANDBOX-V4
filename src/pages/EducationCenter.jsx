import React from "react";
import LogoHeader from "../components/All Headers/logoHeader/LogoHeader";
import TopNav from "../components/All Headers/topNav/TopNav";
import Header from "../components/All Headers/header/Header";
import HelpSection from "../components/Footer/HelpSection";
import Footer from "../components/Footer/Footer";
import Layout from "../components/Layout/Layout";
import AppLayout from "../components/AppLayout";

const EducationCenter = () => {
  return (
    <AppLayout>
      <div className="row d-flex flex-column justify-content-center align-items-center lg:min-h-[300px] xl:min-h-[400px]">
          <p className="m-0 fs-2 font-[Montserrat-400] text-center text-[14px] tracking-[2.20px]">
            Coming Soon...
          </p>
      </div>
      {/* <OrderStatusFormSection /> */}
    </AppLayout>
  );
};

export default EducationCenter;
