import React from "react";
import styles from "./DataTable.module.scss";
import Skeleton from "./Skeleton";

interface DataTableProps {
  dataObj: Array<Record<string, any>>;
  firstColumnTitle: string;
  secondColumnTitle: string;
  thirdColumnTitle?: string;
  secondColumnSymbol?: string;
  thirdColumnSymbol?: string;
  loading: boolean;
  customDate?: string;
  selectedOption?: string;
  negative?: boolean;
  hideRow?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  dataObj,
  firstColumnTitle,
  secondColumnTitle,
  thirdColumnTitle,
  secondColumnSymbol,
  thirdColumnSymbol,
  loading,
  customDate,
  selectedOption,
  negative = false,
  hideRow = false,
}) => {
  return (
    <div
      className={`${styles.report} ${
        firstColumnTitle === "Net Sales" ? styles.netSalesReport : ""
      } ${firstColumnTitle === "Gross Sales" ? styles.grossSalesReport : ""}`}
    >
      <div className={styles.reportHeader}>
        <div
          className={`${styles.headerItem} ${styles.headerItemTopCategories}`}
        >
          {firstColumnTitle}
        </div>
        {secondColumnTitle && (
          <div className={`${styles.headerItemCenter} ${styles.countHeading}`}>
            {secondColumnTitle}
          </div>
        )}
        {thirdColumnTitle && (
          <div className={styles.headerItem}>{thirdColumnTitle}</div>
        )}
      </div>
      {loading && <Skeleton />}
      {!loading && (
        <div className={styles.reportBody}>
          {dataObj.length === 0 ? (
            <div className={styles.reportRow}>
              <div className={`${styles.reportItem} ${styles.reportItemName}`}>
                <p className={styles.noDataText}>
                  No sale completed{" "}
                  {customDate
                    ? `between ${customDate}`
                    : selectedOption?.toLowerCase()}
                </p>
              </div>
            </div>
          ) : (
            dataObj.map((item, i) =>
              hideRow && !item[Object.keys(item)[1]] ? (
                <div></div>
              ) : (
                <div key={i} className={styles.reportRow}>
                  <div
                    className={`${styles.reportItem} ${styles.reportItemName}`}
                  >
                    {item[Object.keys(item)[0]]}
                  </div>
                  <div className={`${styles.reportItem}`}>
                    {secondColumnSymbol === "$" ? (
                      <>
                        {negative && "("}
                        {secondColumnSymbol}
                        {item[Object.keys(item)[1]]
                          ? item[Object.keys(item)[1]].toFixed(2)
                          : 0}
                        {negative && ")"}
                      </>
                    ) : (
                      <>
                        {item[Object.keys(item)[1]]}
                        {secondColumnSymbol}
                      </>
                    )}
                  </div>
                  {thirdColumnTitle && (
                    <div className={`${styles.reportItem}`}>
                      {thirdColumnSymbol === "$" ? (
                        <>
                          {thirdColumnSymbol}
                          {item[Object.keys(item)[2]]
                            ? item[Object.keys(item)[2]].toFixed(2)
                            : 0}
                        </>
                      ) : (
                        <>
                          {item[Object.keys(item)[2]]}
                          {thirdColumnSymbol}
                        </>
                      )}
                    </div>
                  )}
                </div>
              )
            )
          )}
        </div>
      )}
    </div>
  );
};

export default DataTable;