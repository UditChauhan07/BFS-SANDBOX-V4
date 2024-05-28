import React, { useState } from "react";
import AppLayout from "../AppLayout";
import Styles from "../CustomerSupportPage/Style.module.css"
import Styles1 from "./Style.module.css"
import ModalPage from "../Modal UI";
import { Link, useNavigate } from "react-router-dom";
import { CustomerServiceIcon, OrderStatusIcon, DefaultSupportIcon, MarketingSupportIcon, DIFTestIcon, DisplayIssuesIcon } from "../../lib/svg";
import SelectCaseReason from "../CustomerServiceFormSection/SelectCaseReason/SelectCaseReason";
import { BiLeftArrow } from "react-icons/bi";
import BrandManagementModal from "../Brand Management Approval/BrandManagementModal";

const CustomerSupportLayout = ({ children, filterNodes }) => {
    const navigate = useNavigate();
    const path = window.location.pathname;
    const [modalOpen, setModalOpen] = useState(false);
    const [brandManagementModalOpen, setBrandManagementModalOpen] = useState(false);
    let to = "/customer-support"
    if (path == "/orderStatusForm") {
        to = "/orderStatus"
    }

    const reasons = {
        Charges: "Charges",
        "Product Missing": "Product Missing",
        "Product Overage Shipped": "Product Overage",
        "Product Damage": "Product Damage",
        "Update Account Info": "Update Account Info",
    };
    return (
        <AppLayout
            filterNodes={filterNodes}
        >
            <div>
                <div className="">
                    <ModalPage
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                        content={<SelectCaseReason reasons={reasons} onClose={() => setModalOpen(false)} recordType={{ id: "0123b0000007z9pAAA", name: "Customer Service" }} />}
                    />
                    <ModalPage
                        open={brandManagementModalOpen}
                        onClose={() => setBrandManagementModalOpen(false)}
                        content={<BrandManagementModal onClose={() => setBrandManagementModalOpen(false)} recordType={{ id: "0123b000000GfOEAA0", name: "Brand Management Approval" }} />}
                    />
                    <div className={Styles.supportMain}>
                        <div className="row">
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <div className={Styles.supportLeft}>
                                    <Link to={"/orderStatus"} className={`${(path == "/orderStatus" || path == "/orderStatusForm") && Styles1.activeReason}`}>
                                        <div className={`${Styles.supportLeftBox} cardHover`} >
                                            <div className={Styles.supportLeftImg}>
                                                <OrderStatusIcon width={42} height={42} />
                                            </div>

                                            <div className={Styles.supportLeftContent}>
                                                <h2>Order Status</h2>
                                                <p>Track Your Orders with Ease.</p>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to={"/customerService"} className={`${path == "/customerService" && Styles1.activeReason}`}>
                                        <div
                                            className={`${Styles.supportLeftBox} cardHover`}
                                            style={{ cursor: "pointer" }}
                                        // onClick={() => {
                                        //   setModalOpen(true);
                                        // }}
                                        >
                                            <div className={Styles.supportLeftImg}>
                                                <CustomerServiceIcon width={42} height={42} />
                                            </div>
                                            <div className={Styles.supportLeftContent}>
                                                <h2>Customer Services </h2>
                                                <p>Resolving Concerns Serving Solutions</p>
                                            </div>
                                        </div>
                                    </Link>
                                    {/* Brand Management Approval */}
                                    <div
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            setBrandManagementModalOpen(true);
                                        }}
                                    >
                                        <div className={`${Styles.supportLeftBox} cardHover`}>
                                            <div className={Styles.supportLeftImg}>
                                                <DefaultSupportIcon width={42} height={42} />
                                            </div>
                                            <div className={Styles.supportLeftContent}>
                                                <h2>Brand Management Approval </h2>
                                                <p>Effective Management</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className={`${Styles.supportLeftBox} cardHover`}>
                                            <div className={Styles.supportLeftImg}>
                                                <MarketingSupportIcon width={42} height={42} />
                                            </div>

                                            <div className={Styles.supportLeftContent}>
                                                <h2>Marketing Request</h2>
                                                <p>Elevate Your Marketing with Proactive Solutions.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className={`${Styles.supportLeftBox} cardHover`}>
                                            <div className={Styles.supportLeftImg}>
                                                <DisplayIssuesIcon width={42} height={42} />
                                            </div>

                                            <div className={Styles.supportLeftContent}>
                                                <h2>Displays Issues </h2>
                                                <p>Empowering Solutions for Effective Management</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={`${Styles.supportLeftBox} cardHover`}>
                                            <div className={Styles.supportLeftImg}>
                                                <DIFTestIcon width={42} height={42} />
                                            </div>

                                            <div className={Styles.supportLeftContent}>
                                                <h2>DIF Tester Issue </h2>
                                                <p>Empowering Solutions for Effective Management</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-9 col-md-12 col-sm-12">
                                <Link to={to} style={{ color: "#000", display: 'flex', alignItems: 'center' }}><BiLeftArrow />&nbsp;Go Back</Link>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default CustomerSupportLayout;
