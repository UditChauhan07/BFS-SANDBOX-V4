import React from "react";
import Loading from "../Loading";
import styles from "./table.module.css";
const ComparisonReportTable = ({ comparisonData }) => {
  const formentAcmount = (amount, totalorderPrice, monthTotalAmount) => {
    return `${Number(amount, totalorderPrice, monthTotalAmount).toFixed(2)?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
  }
  let totalRetail = 0
  let totalSale = 0;
  return (
    <>
      {comparisonData ? (
        <>
          <div className={`d-flex p-3 ${styles.tableBoundary} mb-5 mt-3`}>
            <div className="table-responsive overflow-scroll position-relative" style={{ maxHeight: "73vh", minHeight: "40vh", width: "100vw", }}>
              <table id="salesReportTable" className="table table-responsive">
                <thead>
                  <tr>
                    <th className={`${styles.th} ${styles.stickyFirstColumnHeading} `} style={{ minWidth: "200px" }}>
                      Store Name
                    </th>
                    <th className={`${styles.th} ${styles.stickyFirstColumnHeading} `} style={{ minWidth: "200px" }}>
                      Brand
                    </th>
                    <th className={`${styles.th}  ${styles.stickyMonth}`} style={{ minWidth: "200px" }}>
                      Estee Lauder Number
                    </th>
                    <th className={`${styles.th} ${styles.stickyMonth}`}> Sales Rep</th>
                    <th className={`${styles.th} ${styles.stickyMonth} `}>
                      {/* Wholesale Amount */}
                      Purchase
                    </th>
                    <th className={`${styles.th} ${styles.stickyMonth} `}>
                      {/* Retail Revenue */}
                      Sale
                    </th>
                    <th className={`${styles.th} `}></th>
                  </tr>
                </thead>
                {comparisonData?.data?.length ? (
                  <>
                    <tbody>
                      <>
                        {comparisonData?.data?.map((ele, index) => {
                          totalRetail += ele.retail_revenue__c
                          totalSale += ele.Whole_Sales_Amount
                          return (
                            <>
                              <tr key={index}>
                                <td className={`${styles.td} ${styles.stickyFirstColumn}`}>{ele.Retail_Store_Name__c}</td>
                                <td className={`${styles.td}`}>{ele.ManufacturerName__c}</td>
                                <td className={`${styles.td}`}>{ele.Estee_Lauder_Number__c ?? 'NA'} </td>
                                <td className={`${styles.td}`}>{ele.Sales_Rep__c}</td>
                                <td className={`${styles.td}`}>${formentAcmount(Number(ele.Whole_Sales_Amount).toFixed(2))}</td>
                                <td className={`${styles.td}`}>{ele.retail_revenue__c ? "$" + formentAcmount(Number(ele.retail_revenue__c).toFixed(2)) : 'NA'}</td>
                              </tr>
                            </>
                          );
                        })}
                      </>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td className={`${styles.td}  ${styles.stickyBottom} ${styles.lastRowMonth}`} colSpan={4}>Total</td>
                        <td className={`${styles.td} ${styles.stickyBottom} ${styles.lastRowMonth}`}>{formentAcmount(Number(totalSale).toFixed(2))}</td>
                        <td className={`${styles.td} ${styles.stickyBottom} ${styles.lastRowMonth}`}>{totalRetail ? `$${formentAcmount(Number(totalRetail).toFixed(2))}` : 'NA'}</td>
                      </tr>
                    </tfoot>
                  </>
                ) : (
                  <div className="d-flex justify-content-center align-items-center position-absolute top-50 start-50">
                    No data found
                  </div>
                )}
              </table>
            </div>
          </div>
        </>
      ) : (
        <Loading height={"70vh"} />
      )}
    </>
  );
};

export default ComparisonReportTable;
