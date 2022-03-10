// DatePicker component supports using picking task MM/DD/YYYY via 2 methods:
// 1. Clicking the desired MM/DD/YYYY in the DatePicker.
// 2. Scrolling through the DatePicker (by clicking and dragging).
import React, { useState } from "react";
import "./DatePicker.css";

function getPrevMonth(month) {
  let prevMonth = parseInt(month) - 1;
  if (prevMonth === 0) {
    prevMonth = 12;
  }
  return String(prevMonth).padStart(2, "0");
}

function getPrevDay(day, month, year) {
  let prevDay = parseInt(day) - 1;

  if (prevDay === 0) {
    // number of days in previous month changes depending on what previous month is
    const monthInt = parseInt(month);
    const yearInt = parseInt(year);
    switch (monthInt) {
      case 2:
        if (isLeapYear(yearInt)) {
          // account for number of days (29) in February during leap years
          prevDay = 29;
        } else {
          // account for number of days (28) in February during non-leap years
          prevDay = 28;
        }
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        prevDay = 30;
        break;
      default:
        prevDay = 31;
    }
  }

  return String(prevDay).padStart(2, "0");
}

function getPrevYear(year) {
  let prevYear = parseInt(year) - 1;
  return prevYear;
}

function getNextMonth(month) {
  let nextMonth = parseInt(month) + 1;
  if (nextMonth === 13) {
    nextMonth = 1;
  }
  return String(nextMonth).padStart(2, "0");
}

function getNextDay(day, month, year) {
  let nextDay = parseInt(day) + 1;

  // number of days in current month changes depending on what current month and year is
  const monthInt = parseInt(month);
  const yearInt = parseInt(year);
  if (nextDay === 32) {
    nextDay = 1;
  } else if (
    nextDay === 31 &&
    (monthInt === 4 || monthInt === 6 || monthInt === 9 || monthInt === 11)
  ) {
    nextDay = 1;
  } else if (nextDay === 30 && monthInt === 2 && isLeapYear(yearInt)) {
    // account for number of days (29) in February during leap years
    nextDay = 1;
  } else if (nextDay === 29 && monthInt === 2 && !isLeapYear(yearInt)) {
    // account for number of days (28) in February during non-leap years
    nextDay = 1;
  }

  return String(nextDay).padStart(2, "0");
}

function getNextYear(year) {
  let nextYear = parseInt(year) + 1;
  return nextYear;
}

function isLeapYear(year) {
  // leap years occur in each year which is an integer multiple of 4 (except for years divisible by 100 but not by 400)
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function DatePicker(props) {
  const [initialMonth, initialDay, initialYear] = props.tempTaskDate.split("/");
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [selectedDay, setSelectedDay] = useState(initialDay);
  const [selectedYear, setSelectedYear] = useState(initialYear);

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  function constrainToValidDayUpdateTaskDateSetDateState(month, day, year) {
    day = parseInt(day);

    // number of days in current month changes depending on what current month and year is
    const monthInt = parseInt(month);
    const yearInt = parseInt(year);
    if (
      day > 30 &&
      (monthInt === 4 || monthInt === 6 || monthInt === 9 || monthInt === 11)
    ) {
      day = 30;
    } else if (day > 29 && monthInt === 2 && isLeapYear(yearInt)) {
      // account for number of days (29) in February during leap years
      day = 29;
    } else if (day > 28 && monthInt === 2 && !isLeapYear(yearInt)) {
      // account for number of days (28) in February during non-leap years
      day = 28;
    }

    const dayStr = String(day).padStart(2, "0");
    props.onChangeTaskDate([month, dayStr, year].join("/"));
    setSelectedDay(dayStr);
  }

  /* The three functions below handle user swiping up or down on hour / minute / amPm to look through the times */
  function handleTouchStart(e) {
    setTouchStart(e.targetTouches[0].clientY);
  }

  function handleTouchMove(e) {
    setTouchEnd(e.targetTouches[0].clientY);
  }

  function handleTouchEnd(e) {
    // touchEnd !== 0 ensures there's a drag, not a click/tap
    if (touchStart - touchEnd > 10 && touchEnd !== 0) {
      handleMoveToNext(e);
    }
    // touchEnd !== 0 ensures there's a drag, not a click/tap
    if (touchStart - touchEnd < -10 && touchEnd !== 0) {
      handleMoveToPrev(e);
    }

    // reset touchStart and touchEnd states to initial values of 0
    setTouchStart(0);
    setTouchEnd(0);
  }

  // Scrolls the month/day/year up by 1
  // used for onClick on next month/day/year or (onTouchStart and onTouchEnd) up
  function handleMoveToNext(e) {
    // need to call onChangeTaskDate passing in nextMonth before and separately from
    // call to setSelectedMonth passing in nextMonth because useState and setState
    // are asynchronous and won't update immediately

    // eslint-disable-next-line default-case
    switch (e.target.className) {
      case "prev-month":
      case "selected-month":
      case "next-month":
        const nextMonth = getNextMonth(selectedMonth);
        constrainToValidDayUpdateTaskDateSetDateState(
          nextMonth,
          selectedDay,
          selectedYear
        );
        setSelectedMonth(nextMonth);
        break;
      case "prev-day":
      case "selected-day":
      case "next-day":
        const nextDay = getNextDay(selectedDay, selectedMonth, selectedYear);
        constrainToValidDayUpdateTaskDateSetDateState(
          selectedMonth,
          nextDay,
          selectedYear
        );
        break;
      case "prev-year":
      case "selected-year":
      case "next-year":
        const nextYear = getNextYear(selectedYear);
        constrainToValidDayUpdateTaskDateSetDateState(
          selectedMonth,
          selectedDay,
          nextYear
        );
        setSelectedYear(nextYear);
        break;
    }
  }

  // Scrolls the month/day/year down by 1
  // used for onClick on previous month/day/year or (onTouchStart and onTouchEnd) down
  function handleMoveToPrev(e) {
    // need to call onChangeTaskDate passing in prevMonth before and separately from
    // call to setSelectedMonth passing in prevMonth because useState and setState
    // are asynchronous and won't update immediately

    // eslint-disable-next-line default-case
    switch (e.target.className) {
      case "prev-month":
      case "selected-month":
      case "next-month":
        const prevMonth = getPrevMonth(selectedMonth);
        constrainToValidDayUpdateTaskDateSetDateState(
          prevMonth,
          selectedDay,
          selectedYear
        );
        setSelectedMonth(prevMonth);
        break;
      case "prev-day":
      case "selected-day":
      case "next-day":
        const prevDay = getPrevDay(selectedDay, selectedMonth, selectedYear);
        constrainToValidDayUpdateTaskDateSetDateState(
          selectedMonth,
          prevDay,
          selectedYear
        );
        break;
      case "prev-year":
      case "selected-year":
      case "next-year":
        const prevYear = getPrevYear(selectedYear);
        constrainToValidDayUpdateTaskDateSetDateState(
          selectedMonth,
          selectedDay,
          prevYear
        );
        setSelectedYear(prevYear);
        break;
    }
  }

  return (
    <div className="date-picker">
      <p
        className="prev-month"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleMoveToPrev}
      >
        {getPrevMonth(selectedMonth)}
      </p>
      <p
        className="prev-day"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleMoveToPrev}
      >
        {getPrevDay(selectedDay, selectedMonth, selectedYear)}
      </p>
      <p
        className="prev-year"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleMoveToPrev}
      >
        {getPrevYear(selectedYear)}
      </p>

      <p
        className="selected-month"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {selectedMonth}
      </p>
      <p
        className="selected-day"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {selectedDay}
      </p>
      <p
        className="selected-year"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {selectedYear}
      </p>

      <p
        className="next-month"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleMoveToNext}
      >
        {getNextMonth(selectedMonth)}
      </p>
      <p
        className="next-day"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleMoveToNext}
      >
        {getNextDay(selectedDay, selectedMonth, selectedYear)}
      </p>
      <p
        className="next-year"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleMoveToNext}
      >
        {getNextYear(selectedYear)}
      </p>
    </div>
  );
}

export default DatePicker;
