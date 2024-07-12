import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "../Reports.module.scss";
import Image from "next/image";
import RadioButton from "../RadioButton";
import {
  getCurrentMonthRange,
  getCurrentWeekRange,
  getYesterdayDate,
} from "./formatDate";
import DatePickerModal from "../DatePickerModal";

interface DateRangeSelectorModalProps {
  reportStartDate: Date;
  setReportStartDate: (date: Date) => void;
  reportEndDate: Date;
  setReportEndDate: (date: Date) => void;
  customDate: string | undefined;
  setCustomDate: (date: string) => void;
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

const DateRangeSelectorModal = ({
  selectedOption,
  reportStartDate,
  setReportStartDate,
  reportEndDate,
  setReportEndDate,
  setSelectedOption,
  customDate,
  setCustomDate,
}: DateRangeSelectorModalProps) => {
  const [isReportVisible, setIsReportVisible] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const dateRangeOptions = [
    { value: "Today", label: "Today" },
    { value: "Yesterday", label: "Yesterday" },
    { value: "This Week", label: "This Week" },
    { value: "This Month", label: "This Month" },
    { value: "Custom", label: "Custom" },
  ];

  useEffect(() => {
    if (!isAnimating && isVisible) {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, isVisible]);

  const hideModal = () => {
    setIsAnimating(false);
  };

  const showModal = () => {
    setIsVisible(true);
    setIsReportVisible(true);
    setTimeout(() => setIsAnimating(true), 0);
  };

  function setReportDates(startDate: Date, endDate: Date): void {
    setReportStartDate(startDate);
    setReportEndDate(endDate);
    hideModal();
  }

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    switch (value) {
      case "Today":
        const today = new Date();
        setReportDates(today, today);
        setSelectedOption(value);
        break;
      case "Yesterday":
        const yesterday = getYesterdayDate();
        setReportDates(yesterday, yesterday);
        setSelectedOption(value);
        break;
      case "This Week":
        const { startDate, endDate } = getCurrentWeekRange();
        setReportDates(startDate, endDate);
        setSelectedOption(value);
        break;
      case "This Month":
        const { startMonthDate, endMonthDate } = getCurrentMonthRange();
        setReportDates(startMonthDate, endMonthDate);
        setSelectedOption(value);
        break;
      case "Custom":
        setIsReportVisible(false);
        break;
      default:
        console.log("No valid option selected");
    }
  };

  return (
    <>
      <div className={styles.timeSelector}>
        <button onClick={showModal}>
          <Image
            src="/icons/calendar.svg"
            alt="Calendar Icon"
            width={18}
            height={20}
            className={styles.calendarSvg}
          />
          {customDate ? customDate : selectedOption}
        </button>
      </div>
      {isVisible &&
        (isReportVisible ? (
          <div
            className={`${styles.timeSelectorModal} ${
              isAnimating ? styles.show : styles.hide
            }`}
          >
            <div className={styles.modalContentReports}>
              <div className={styles.modalContentHeader}>
                <div className={styles.calendarSvg}>
                  <Image
                    src="/icons/calendar.svg"
                    alt="Calendar Icon"
                    width={18}
                    height={20}
                  />
                </div>
                <span className={styles.closeButton} onClick={hideModal}>
                  &times;
                </span>
              </div>
              <div className={styles.heading}>Select report date</div>
              <div className={styles.selectDateButtons}>
                {dateRangeOptions.map(option => (
                  <RadioButton
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    checked={
                      option.value !== "Custom" &&
                      selectedOption === option.value
                    }
                    onChange={handleOptionChange}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <DatePickerModal
            setIsReportVisible={setIsReportVisible}
            reportStartDate={reportStartDate}
            setReportStartDate={setReportStartDate}
            reportEndDate={reportEndDate}
            setReportEndDate={setReportEndDate}
            setCustomDate={setCustomDate}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            isAnimating={isAnimating}
            setIsAnimating={setIsAnimating}
          />
        ))}
    </>
  );
};

export default DateRangeSelectorModal;