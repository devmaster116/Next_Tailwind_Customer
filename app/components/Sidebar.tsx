import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.scss";
import Image from "next/image";
import LogoutButton from "./Auth/LogoutButton";

interface MenuItemProps {
  icon: React.ReactNode;
  name: string;
  route: string;
}

interface SidebarProps {
  show: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuPageName: React.Dispatch<React.SetStateAction<string>>;
}

export default function Sidebar({
  show,
  setter,
  setMenuPageName,
}: SidebarProps) {
  const [kitchenName, setKitchenName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setKitchenName(localStorage.getItem("kitchenName"));
      setUserEmail(localStorage.getItem("userEmail"));
    }
  }, []);

  const className = `${styles.sidebar} ${
    show ? styles.sidebarShow : styles.sidebarHide
  }`;

  const MenuItem = ({ icon, name, route }: MenuItemProps) => {
    const isActive = pathname === route;
    const colorClass = isActive ? styles.active : styles.inactive;

    return (
      <Link
        href={route}
        onClick={() => {
          setter(oldVal => !oldVal);
          setMenuPageName(name);
        }}
        className={`${styles.menuItem} ${colorClass}`}
      >
        <div className={styles.iconContainer}>{icon}</div>
        <div>{name}</div>
      </Link>
    );
  };

  const ModalOverlay = () => (
    <div
      className={styles.modalOverlay}
      onClick={() => {
        setter(oldVal => !oldVal);
      }}
    />
  );

  return (
    <>
      <div className={`${styles.sidebarContainer} ${className}`}>
        <div className={styles.innerContainer}>
          <div className={styles.logoContainer}>
            <h4>Reports</h4>
            <div className={styles.menuItems}>
              <MenuItem
                name="Overview"
                route="/reports-dashboard"
                icon={
                  <Image
                    className={styles.icon}
                    src="/icons/home-line.svg"
                    height={18}
                    width={18}
                    alt="Home line icon"
                  />
                }
              />
              <MenuItem
                name="Sales Summary"
                route="/sales-summary"
                icon={
                  <Image
                    className={styles.icon}
                    src="/icons/bar-chart-square-02.svg"
                    height={18}
                    width={18}
                    alt="Bar chart icon"
                  />
                }
              />
            </div>
          </div>
          <div className={styles.logoutBtn}>
            <LogoutButton />
          </div>
        </div>
        <div className={styles.sidebarFooter}>
          <div className={styles.businessLogo}>
            <Image
              src="/images/swifti-logo.png"
              height={18}
              width={28}
              alt="Swifti Logo"
              className={styles.logo}
            />
          </div>
          <div className={styles.businessDetails}>
            <h4>{kitchenName}</h4>
            <p>{userEmail}</p>
          </div>
        </div>
      </div>
      {show ? <ModalOverlay /> : null}
    </>
  );
}