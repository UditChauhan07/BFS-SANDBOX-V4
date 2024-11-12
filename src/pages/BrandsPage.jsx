import React, { useEffect, useState } from "react";
import BrandCard from "../components/BrandCard";
import { FilterItem } from "../components/FilterItem";
import FilterSearch from "../components/FilterSearch";
import { useNavigate } from "react-router";
import Page from "./page.module.css";
import AppLayout from "../components/AppLayout";
import { GetAuthData, getRetailerBrands } from "../lib/store";
import { CloseButton } from "../lib/svg";
import LoaderV3 from "../components/loader/v3";

const brandsImageMap = {
  Diptyque: "Diptyque.png",
  Byredo: "Byredo-1.png",
  "Maison Margiela": "Maison Margiela.png",
  "Bobbi Brown": "Bobbi Brown.png",
  "ESTEE LAUDER": "Estee Lauder.png",
  "RMS Beauty": "rmsbeauty.png",
  ReVive: "revive-1.png",
  "R Co ": "R co.png",
  "R Co Bleu": "R co Bleu.png",
  "Bumble and Bumble": "Bumblea and Bumble.png",
  "BY TERRY": "By Terry.png",
  "Susanne Kaufmann": "susanne kaufman.png",
  "Kevyn Aucoin Cosmetics": "Kevyn Aucoin.jpg",
  Smashbox: "Smashbox-3.png",
  "EVE LOM": "Evelom.png",
  AERIN: "Aerin.png",
  ARAMIS: "Aramis.png",
  "Victoria Beckham Beauty": "victoria.png",
  "Re-Nutriv": "Re-Nutriv-2.png",
  "LOccitane": "LOccitane.png",
};

const defaultImage = "dummy.png";

const BrandsPage = () => {
  const [manufacturers, setManufacturers] = useState({ isLoading: false, data: [] });
  const [searchBy, setSearchBy] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [userData, setUserData] = useState({});
  const [filteredPageData, setFilteredPageData] = useState([]);
  const [label, setLabel] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    const userData = localStorage.getItem("Name");
    if (!userData) {
      navigate("/");
    }
    GetAuthData()
      .then((user) => {
        setUserData(user.data);
        if (user?.data?.accountIds.length == 1) {
          getRetailerBrands({ rawData: { accountId: user?.data?.accountIds[0], key: user?.data?.x_access_token } })
            .then((prodcut) => {
              setManufacturers({ ...manufacturers, isLoading: true, data: prodcut });
            })
            .catch((getProductError) => {
              console.log({ getProductError });
            });
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  useEffect(() => {
    if (!Array.isArray(manufacturers?.data)) {
      return [];
    }
    let newValues = manufacturers?.data?.map((brand) => brand);

    if (searchBy) {
      newValues = newValues?.filter((value) => value.Name?.toLowerCase().includes(searchBy?.toLowerCase()));
    }
    // ..............
    switch (sortBy) {
      case "highest":
        newValues = newValues?.sort((a, b) => b.productCount - a.productCount);
        break;
      case "lowest":
        newValues = newValues?.sort((a, b) => a.productCount - b.productCount);
        break;
      case "a-z":
        newValues = newValues?.sort((a, b) => a.Name?.localeCompare(b.Name));
        break;
      case "z-a":
        newValues = newValues?.sort((a, b) => b.Name?.localeCompare(a.Name));
        break;
      default:
        newValues = newValues?.sort((a, b) => b.productCount - a.productCount);
    }
    // ...............
    // if (sortBy) {
    //   newValues = newValues?.sort((a, b) => b.productCount - a.productCount);
    // } else {
    //   newValues = newValues?.sort((a, b) => a.productCount - b.productCount);
    // }
    // if (sortBy) {
    //   if (sortBy === "a-z") {
    //     newValues = newValues?.sort((a, b) => a.Name?.localeCompare(b.Name));
    //   } else if (sortBy === "z-a") {
    //     newValues = newValues?.sort((a, b) => b.Name?.localeCompare(a.Name));
    //   }
    // }
    // ..............
    setFilteredPageData(newValues);
  }, [searchBy, manufacturers, sortBy]);


  return (
    <>
      <AppLayout
        filterNodes={
          <>
            <FilterItem
              label="sort by"
              name="Sort-by"
              value={sortBy}
              options={[
                {
                  label: "A-Z",
                  value: "a-z",
                },
                {
                  label: "Z-A",
                  value: "z-a",
                },
                {
                  label: "Highest Product ",
                  value: "highest",
                },
                {
                  label: "Lowest Product",
                  value: "lowest",
                },
              ]}
              onChange={(value) => {
                setSortBy(value);

              }}
            />

            <FilterSearch onChange={(e) => setSearchBy(e.target.value)} value={searchBy} placeholder={"Search by brands"} minWidth={"155px"} />
            <button
              className="border px-2.5 py-1 leading-tight d-grid"
              onClick={() => {
                // setHighestRetailers(true);
                setSearchBy("");
                setSortBy(null);
                setLabel("sortBy")
              }}
            >
              <CloseButton crossFill={'#fff'} height={20} width={20} />
              <small style={{ fontSize: '6px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>clear</small>
            </button>
          </>
        }
      >
        {!manufacturers.isLoading ? (
          <LoaderV3 text={"Loading Brands Details"} />
        ) : (
          <div>
            <div
              className="uppercase text-center flex justify-center items-center tracking-[1.8px] my-[48px]"
              style={{ fontFamily: "Montserrat-500" }}
            >
              Below are the Brands available with “Beauty Fashions Sales Group”
            </div>
            {/* <div className="widthGivenBrandDetailPage grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 grid-cols-2 gap-4  m-auto">    */}
            <div className={` ${Page.widthGivenBrandDetailPage}`}>
              {filteredPageData?.length ? (
                <>
                  {filteredPageData?.map((brand, index) => (
                    <BrandCard key={index} image={brandsImageMap[brand?.Name] || defaultImage} brand={brand} userData={userData} />
                  ))}
                </>
              ) : null}
            </div>
            {!filteredPageData?.length && (
              <div className="lg:min-h-[300px] xl:min-h-[380px]">
                <div className="flex justify-center items-center py-4 w-full lg:min-h-[300px] xl:min-h-[380px]">No data found</div>
              </div>
            )}
          </div>
        )}
      </AppLayout>
    </>
  );
};

export default BrandsPage;
