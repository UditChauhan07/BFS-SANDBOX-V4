import Styles from "./index.module.css";
import { DateConvert, GetAuthData, formatNumber, originAPi } from "../../lib/store";
import { useState } from "react";
import Loading from "../Loading";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MapGenerator from "../Map";
import Chart from "react-apexcharts";

const StoreDetailCard = ({ account }) => {
    let graph = {
        options: {
            chart: {
                id: 'brand-Sales'
            },
            dataLabels: {
                enabled: false // disable data labels
            },
            xaxis: {
                categories: account.Brands.map((value) => {
                    return value?.ManufacturerName__c || 0;
                })
            },
            colors: ["#3296ed", "#16bc4e"],
            tooltip: {
                enabled: true,
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                    return (
                        `<div style="background: #333; color: #fff; padding: 10px; border-radius: 8px;">
                      <strong>${w.globals.labels[dataPointIndex]}</strong>
                      <br />
                      <span style="color: ${w.globals.colors[seriesIndex]};">
                        ${w.globals.seriesNames[seriesIndex]}: <span style="color: #fff;">$${series[seriesIndex][dataPointIndex].toFixed(2)}</span>
                      </span>
                    </div>`
                    );
                }
            }
        },
        series: [
            {
                name: 'Purchase',
                data: account.Brands.map((value) => {
                    return parseFloat(value?.Sales?.Amount || 0).toFixed(2);
                })
            },
            {
                name: 'Sales',
                data: account.Brands.map((value) => {
                    return parseFloat(value?.Sales?.Retail || 0).toFixed(2);
                })
            }],
    }
    let [fileDownload, setLoader] = useState(false)
    const bgColors = {
        "Kevyn Aucoin Cosmetics": "KevynAucoinCosmeticsBg",
        "Bumble and Bumble": "BumbleandBumbleBg",
        "BY TERRY": "BYTERRYBg",
        "Bobbi Brown": "BobbiBrownBg",
        "ReVive": "ReViveBg",
        "Maison Margiela": "MaisonMargielaBg",
        "Smashbox": "SmashboxBg",
        "RMS Beauty": "RMSBeautyBg",
        "ESTEE LAUDER": "esteeLauderBg",
        "AERIN": "RMSBeautyBg",
        "ESTEE LAUDER": "esteeLauderBg",
        "ESTEE LAUDER": "esteeLauderBg",
        "ESTEE LAUDER": "esteeLauderBg",
    };
    const options = {
        loop: true,
        margin: 50,
        nav: true,
        dots: false,
        navText: [
            '<svg width="46" style="position: absolute; left: -3px; top: -25%;" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_3824_341)"><circle cx="23" cy="21" r="19" fill="white"/><circle cx="23" cy="21" r="18.75" stroke="#E1E1E1" stroke-width="0.5"/></g><path d="M26.454 27.9102L19.5449 21.0011L26.454 14.092" stroke="black"/><defs><filter id="filter0_d_3824_341" x="0" y="0" width="46" height="46" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="2"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3824_341"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3824_341" result="shape"/></filter></defs></svg>',
            '<svg width="46" style="position: absolute; right: -3px; top: -25%;" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_3824_342)"><circle cx="23" cy="21" r="19" transform="rotate(-180 23 21)" fill="white"/><circle cx="23" cy="21" r="18.75" transform="rotate(-180 23 21)" stroke="#E1E1E1" stroke-width="0.5"/></g><path d="M19.546 14.0898L26.4551 20.9989L19.546 27.908" stroke="black"/><defs><filter id="filter0_d_3824_342" x="0" y="0" width="46" height="46" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="2"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3824_342"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3824_342" result="shape"/></filter></defs></svg>',
        ],
        responsive: {
            0: {
                items: 1,
            },
            767: {
                items: 2,
            },
            1000: {
                items: 3,
            },
        },
    };
    return (<section className={Styles.container}>
        {fileDownload ? <Loading /> :
            <div>
                <div className={`${Styles.accountHolder} ${Styles.dFlex} flex-column`}>
                    <div className={`d-flex w-[100%]`}>
                        <div className={Styles.accountTitleHolder}>
                            <p className={Styles.accountLabel}>ACCOUNT NAME</p>
                            <h3 className={Styles.accountNameHolder}>{account.Name}</h3>
                            {account.Website ? <Link to={account.Website} style={{ color: '#000' }} className={Styles.webLinkHolder}>{account.Website}</Link> : null}
                        </div>
                        <div className="d-flex w-[100%] justify-between pl-2 mt-3">
                            <div className="d-flex gap-4">
                                {account.ShippingCity ? <div className={`${Styles.addressHoilder} d-flex flex-column`}>
                                    <span className={Styles.labelHolder}>Store City</span>
                                    <span className={Styles.addCard}>{account.ShippingCity}</span></div> : null}
                                {account.ShippingState ? <div className={`${Styles.addressHoilder} d-flex flex-column`}>
                                    <span className={Styles.labelHolder}>Store State</span>
                                    <span className={Styles.addCard}>{account.ShippingState}</span></div> : null}
                                {account.Phone ? <div className={`${Styles.addressHoilder} d-flex flex-column`}>
                                    <span className={Styles.labelHolder}>Phone</span>
                                    <span className={Styles.addCard}>{account.Phone}</span></div> : null}
                            </div>
                            <div>
                                <p className={Styles.totalRevenueLinkHolder}>Total Revenue</p>
                                <p className={Styles.totalRevenueHolder}>${formatNumber(account.TotalSales||0)}</p>
                            </div>
                        </div>
                    </div>
                    {account.Brands.length >= 3 ?
                        <div className="d-flex mt-4 min-h-[75px]">
                            <div className={`${Styles.infoHolder} d-flex`}>
                                <p className={Styles.accountDetailerLabel}>Account Details</p>
                                <p className={`${Styles.webLinkHolder} m-auto`}>More Info</p>
                            </div>
                            <div className={`${Styles.BrandInfoHolder} d-flex flex-column`}>
                                <p className={Styles.accountLabel}>All Brands</p>

                                <div className="d-flex justify-between">
                                    <OwlCarousel {...options} style={{ position: 'absolute', top: '45px' }}>
                                        {account.Brands.map((element, index) => (
                                            <p className={Styles.webLinkHolder}  style={{ textAlign: 'center', color: '#3296ED', textDecoration: 'underline',cursor:'pointer' }} key={index}>{element.ManufacturerName__c}</p>
                                        ))}
                                    </OwlCarousel>
                                </div>
                            </div>
                        </div> : account.Brands.length ?
                            <div className="d-flex mt-4 min-h-[75px]">
                                <div className={`${Styles.infoHolder} d-flex`}>
                                    <p className={Styles.accountDetailerLabel}>Account Details</p>
                                    <p className={`${Styles.webLinkHolder} m-auto`}>More Info</p>
                                </div>
                                <div className={`${Styles.BrandInfoHolder} d-flex flex-column`}>
                                    <p className={Styles.accountLabel}>Brand Audit Report</p>

                                    <div className="m-auto d-flex">
                                        {account.Brands.map((element, index) => (
                                            <p className={Styles.webLinkHolder} style={{ textAlign: 'center', color: '#3296ED', textDecoration: 'underline',marginRight:'2rem' }} key={index}>{element.ManufacturerName__c}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            : null}
                </div>
                <div className={Styles.detailsContainer}>
                    <h3 className={Styles.detailTitleHolder}>Details</h3>
                    <div className="d-flex mt-4">
                        <div className={`${Styles.accountNumberHolder}`}>
                            <span className={`${Styles.buttonHolder} ${Styles.activeHolder}`}>Status: Active</span>
                            <h4 className={Styles.accountNumber}>{account.Estee_Lauder_Account_Number__c}</h4>
                            <p className={Styles.accountNumberTinyText}>Estee Launder Account Name</p>
                        </div>
                        <div className={`${Styles.dGrid} w-[80%]`}>
                            <div className={Styles.detailBox}>
                                <p className={Styles.labelHolder}>Account Owner:</p>
                                <p className={Styles.valueHolder}>{account.Owner?.Name ?? 'NA'}</p>
                            </div>
                            <div className={Styles.detailBox}>
                                <p className={Styles.labelHolder}>Account Name:</p>
                                <p className={Styles.valueHolder}>{account.Name}</p>
                            </div>
                            <div className={Styles.detailBox}>
                                <p className={Styles.labelHolder}>Type of Business:</p>
                                <p className={Styles.valueHolder}>{account.Type_of_Business__c ?? 'NA'}</p>
                            </div>
                            <div className={Styles.detailBox}>
                                <p className={Styles.labelHolder}>Number of Order Placed:</p>
                                <p className={Styles.valueHolder} style={{marginTop:'20px'}}>{account.TotalSaleCount}</p>
                            </div>
                            <div className={Styles.detailBox}>
                                <p className={Styles.labelHolder}>Date Account Est. with BFSG:</p>
                                <p className={Styles.valueHolder} style={{marginTop:'20px'}}>{DateConvert(account.Date_account_established_with_BFSG__c || null, true) ?? 'NA'}</p>
                            </div>
                            <div className={Styles.detailBox}>
                                <p className={Styles.labelHolder}>Address:</p>
                                <p className={Styles.valueHolder}>{account.ShippingAddress?.street},{account.ShippingAddress.city},<br />{account.ShippingAddress.state} {account.ShippingAddress.postalCode}<br /> {account.ShippingAddress.country}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${Styles.detailsContainer} d-flex`}>
                    <div className={`${Styles.mapContainer} w-[50%]`}>
                        <h3 className={Styles.detailTitleHolder}>Store Addressed</h3>
                        <div className={`${Styles.mapHolder} mt-4`}>
                            <MapGenerator focusOn={{ lat: account.ShippingLatitude, lng: account.ShippingLongitude }} MarkLocations={[{ lat: account.ShippingLatitude, lng: account.ShippingLongitude }]} zoom={12} icon={false} />
                            <div className="d-flex mt-3">
                                <div className="w-[50%]">
                                    <p className={Styles.subTitleHolder}>Shipping Address</p>
                                    <p className={Styles.addressLabelHolder} style={{ color: '#3296ED' }}>{account.ShippingAddress?.street},{account.ShippingAddress.city},<br />{account.ShippingAddress.state},{account.ShippingAddress.postalCode}<br /> {account.ShippingAddress.country}</p>
                                </div>
                                <div className="w-[50%]">
                                    <p className={Styles.subTitleHolder}>Billing Address</p>
                                    <p className={Styles.addressLabelHolder} style={{ color: '#3296ED' }}>{account.BillingAddress?.street},{account.BillingAddress.city},<br />{account.BillingAddress.state},{account.BillingAddress.postalCode}<br /> {account.BillingAddress.country}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[50%]">
                        <h3 className={`${Styles.detailTitleHolder} ml-4`}>Chart</h3>
                        <div>
                            <Chart options={graph.options} series={graph.series} type="bar" width={'100%'} height={320} />
                        </div>
                    </div>
                </div>
            </div>
        }
    </section>)
}
export default StoreDetailCard;