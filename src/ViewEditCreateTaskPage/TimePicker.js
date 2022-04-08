// TimePicker component supports using picking task hour/minute/amPm via 2 methods:
// 1. Clicking the desired hour/minute/amPm in the TimePicker.
// 2. Scrolling through the TimePicker (by clicking and dragging).
import React, { useState } from "react";
import "./TimePicker.css";
import { Timestamp } from "firebase/firestore";

function getPrevHour(hour) {
  let prevHour = parseInt(hour) - 1;
  if (prevHour === 0) {
    prevHour = 12;
  }
  return String(prevHour).padStart(2, "0");
}

function getPrevMinute(minute) {
  let prevMin = parseInt(minute) - 5;
  if (prevMin === -5) {
    prevMin = 55;
  }
  return String(prevMin).padStart(2, "0");
}

function getNextHour(hour) {
  let nextHour = parseInt(hour) + 1;
  if (nextHour === 13) {
    nextHour = 1;
  }
  return String(nextHour).padStart(2, "0");
}

function getNextMinute(minute) {
  let nextMin = parseInt(minute) + 5;
  if (nextMin === 60) {
    nextMin = 0;
  }
  return String(nextMin).padStart(2, "0");
}

function convertStandardTimeHourToMilitaryTimeHour(hour, amPm) {
  hour = parseInt(hour);
  let militaryHour = hour;
  if (hour < 12 && amPm === "PM") {
    // PM times
    militaryHour = hour + 12;
  }

  if (hour === 12 && amPm === "AM") {
    // 12:__ AM
    militaryHour = 0;
  }

  if (hour === 12 && amPm === "PM") {
    // 12:__ PM
    militaryHour = 12;
  }

  return militaryHour;
}

function TimePicker(props) {
  // Get month, day, and year from tempTaskDeadline (which is a Firebase Timestamp)
  // Convert Firebase Timestamp to JavaScript Date object
  const tempTaskDeadlineJSDate = props.tempTaskDeadline.toDate();

  // Parse JavaScript Date object
  const initialMonth = tempTaskDeadlineJSDate.getMonth() + 1; // JavaScript Date object months are zero-indexed
  const initialDay = tempTaskDeadlineJSDate.getDate();
  const initialYear = tempTaskDeadlineJSDate.getFullYear();

  // Handle JavaScript Date object's use of military time
  const initialMilitaryHour = tempTaskDeadlineJSDate.getHours();
  let initialHour = initialMilitaryHour;
  let initialAmPm = "AM"; // assume AM for now
  if (initialMilitaryHour > 12) {
    // PM times
    initialHour -= 12;
    initialAmPm = "PM";
  } else if (initialMilitaryHour === 12) {
    // 12:00 PM
    initialHour = 12;
    initialAmPm = "PM";
  } else if (initialMilitaryHour === 0) {
    // 12:__ AM
    initialHour = 12;
    initialAmPm = "AM";
  }

  const initialMinute = tempTaskDeadlineJSDate.getMinutes();

  const [selectedHour, setSelectedHour] = useState(initialHour);
  const [selectedMinute, setSelectedMinute] = useState(initialMinute);
  const [selectedAmPm, setSelectedAmPm] = useState(initialAmPm);

  function changeTaskTime(hour, minute, amPm) {
    hour = convertStandardTimeHourToMilitaryTimeHour(hour, amPm);

    // JavaScript Date object months are zero-indexed
    const taskDeadlineJSDate = new Date(
      initialYear,
      initialMonth - 1,
      initialDay,
      hour,
      minute
    );
    props.onChangeTaskDeadline(Timestamp.fromDate(taskDeadlineJSDate));
  }

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

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

  // Scrolls the hour/minute up by 1, also toggles amPm
  // used for onClick on next hour/minute or (onTouchStart and onTouchEnd) up
  function handleMoveToNext(e) {
    // need to call onChangeTaskDeadline passing in nextHour before and separately from
    // call to setSelectedHour passing in nextHour because useState and setState
    // are asynchronous and won't update immediately

    // eslint-disable-next-line default-case
    switch (e.target.className) {
      case "prev-hour":
      case "selected-hour":
      case "next-hour":
        const nextHour = getNextHour(selectedHour);
        changeTaskTime(nextHour, selectedMinute, selectedAmPm);
        setSelectedHour(nextHour);
        break;
      case "prev-minute":
      case "selected-minute":
      case "next-minute":
        const nextMinute = getNextMinute(selectedMinute);
        changeTaskTime(selectedHour, nextMinute, selectedAmPm);
        setSelectedMinute(nextMinute);
        break;
      case "selected-am-pm":
      case "not-selected-am-pm":
        const newAmPm = selectedAmPm === "AM" ? "PM" : "AM";
        changeTaskTime(selectedHour, selectedMinute, newAmPm);
        setSelectedAmPm(newAmPm);
        break;
    }
  }

  // Scrolls the hour/minute down by 1
  // used for onClick on previous hour/minute or (onTouchStart and onTouchEnd) down
  function handleMoveToPrev(e) {
    // need to call onChangeTaskDeadline passing in prevHour before and separately from
    // call to setSelectedHour passing in prevHour because useState and setState
    // are asynchronous and won't update immediately

    // eslint-disable-next-line default-case
    switch (e.target.className) {
      case "prev-hour":
      case "selected-hour":
      case "next-hour":
        const prevHour = getPrevHour(selectedHour);
        changeTaskTime(prevHour, selectedMinute, selectedAmPm);
        setSelectedHour(prevHour);
        break;
      case "prev-minute":
      case "selected-minute":
      case "next-minute":
        const prevMinute = getPrevMinute(selectedMinute);
        changeTaskTime(selectedHour, prevMinute, selectedAmPm);
        setSelectedMinute(prevMinute);
        break;
      case "selected-am-pm":
      case "not-selected-am-pm":
        const newAmPm = selectedAmPm === "AM" ? "PM" : "AM";
        changeTaskTime(selectedHour, selectedMinute, newAmPm);
        setSelectedAmPm(newAmPm);
        break;
    }
  }

  const prevHour = getPrevHour(selectedHour);
  const prevMinute = getPrevMinute(selectedMinute);

  const nextHour = getNextHour(selectedHour);
  const nextMinute = getNextMinute(selectedMinute);
  const unselectedAmPm = selectedAmPm === "AM" ? "PM" : "AM";

  return (
    <div className="time-picker">
      <button
        className="prev-hour"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleMoveToPrev}
        aria-label={`Set task deadline hour to one hour earlier: ${prevHour}`}
      >
        <p>{prevHour}</p>
      </button>
      <button
        className="prev-minute"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleMoveToPrev}
        aria-label={`Set task deadline minute to 5 minutes earlier: ${prevMinute}`}
      >
        <p>{prevMinute}</p>
      </button>

      <p
        className="selected-hour"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {String(selectedHour).padStart(2, "0")}
      </p>
      <p
        className="selected-minute"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {String(selectedMinute).padStart(2, "0")}
      </p>
      <p
        className="selected-am-pm"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {selectedAmPm}
      </p>

      <button
        className="next-hour"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleMoveToNext}
        aria-label={`Set task deadline hour to one hour later: ${nextHour}`}
      >
        <p>{nextHour}</p>
      </button>
      <button
        className="next-minute"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleMoveToNext}
        aria-label={`Set task deadline minute to 5 minutes later: ${nextMinute}`}
      >
        <p>{nextMinute}</p>
      </button>
      <button
        className="not-selected-am-pm"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleMoveToNext}
        aria-label={`Set task deadline time to ${unselectedAmPm}`}
      >
        <p>{unselectedAmPm}</p>
      </button>
    </div>
  );
}

export default TimePicker;
