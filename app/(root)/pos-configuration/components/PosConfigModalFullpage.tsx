import React, { useContext } from "react";
import styles from "./PosConfigModalFullPage.module.scss";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import useWindowSize from "@/app/hooks/useWindowSize";
import {useRouter, useSearchParams } from "next/navigation";
import PosConfigEdit from "../components/pos-config-edit";
import { PosConfigContext } from "@/app/context/PosConfigContext";
import { OnlineOrderConfigContext } from "@/app/context/OnlineOrderConfigContext";

const PosConfigModalFullPage = ({
  type,
  editPage,
}: {
  type: "edit";
  editPage: "pos-security" | "register-screen" | "order-flow" | "order-types";
}) => {
  const { width } = useWindowSize();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { 
    setUpdatePosRegisterScreenClicked,
    setUpdatePosOrderFlowClicked,
    setUpdatePosSecurityClicked,
    pageKey,
    setPageKey,
   } = useContext(PosConfigContext)!;

   const { 
    setUpdatePosOrderTypesClicked,
   } = useContext(OnlineOrderConfigContext)!;

  const handleCloseModal = () => {
    setPageKey(pageKey + 1);
    router.back();

  };


  const handleUpdateStaff = () => {
    if (searchParams?.get("type") === "edit-register-screen") {
       setUpdatePosRegisterScreenClicked(true);
    }
    if (searchParams?.get("type") === "edit-order-flow") {
       setUpdatePosOrderFlowClicked(true);
    }
    if (searchParams?.get("type") === "edit-order-types") {
      setUpdatePosOrderTypesClicked(true);
    }
    if (searchParams?.get("type") === "edit-pos-security") {
       setUpdatePosSecurityClicked(true);
    }
  };


  return (
    <>
      {type == "edit" && (
        <div className="flex flex-col w-full h-[90%]  lg:h-full bg-white ">
          <div className="flex flex-col gap-8">
            <div
              className={twMerge(
                styles.titleDiv,
                width < 1024 ? "flex-col" : "",
                "!m-0 !relative"
              )}
            >
              <div className="flex justify-between items-center w-full">
                <button
                  className={styles.titleAddCloseBtn}
                  onClick={handleCloseModal}
                >
                  <Image
                    className={styles.icon}
                    src="/icons/close.svg"
                    height={12}
                    width={12}
                    alt="Close Button"
                    style={{
                      filter:
                        "invert(35%) sepia(5%) saturate(368%) hue-rotate(175deg) brightness(98%) contrast(90%)",
                    }}
                  />
                </button>
                <div className={styles.titleText}>
                  {editPage == "register-screen" && "Register Screen"}
                  {editPage == "order-flow" && "Order Flow"}
                  {editPage == "order-types" && "Order Types"}
                  {editPage == "pos-security" && "POS Security"}
                </div>
                <button
                  type="button"
                  className={styles.saveBtn}
                  onClick={handleUpdateStaff}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          <div
            className={twMerge(
              styles.modalContent,
              "!px-4 overflow-auto w-full",
              "!pt-6 lg:!pt-8",
              "lg:!w-[680px] mx-auto"
            )}
          >
            {editPage == "register-screen" && (
              <>
                <PosConfigEdit.EditRegisterScreen  key={pageKey}/>
              </>
            )}
            {editPage == "order-flow" && (
              <>
                <PosConfigEdit.EditOrderFlow key={pageKey}/>
              </>
            )}
            {editPage == "order-types" && (
              <>
                <PosConfigEdit.EditOrderTypes key={pageKey}  />
              </>
            )}
             {editPage == "pos-security" && (
              <>
                <PosConfigEdit.EditPosSecurity  key={pageKey} />
              </>
            )}
          </div>
          <div className={twMerge(styles.modalFooter, "")}>
            <button
              type="button"
              className={styles.updateBtn}
              onClick={handleUpdateStaff}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PosConfigModalFullPage;
