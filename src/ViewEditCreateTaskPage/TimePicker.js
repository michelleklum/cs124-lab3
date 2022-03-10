// TimePicker component supports using picking task hour/minute/amPm via 2 methods:
// 1. Clicking the desired hour/minute/amPm in the TimePicker.
// 2. Scrolling through the TimePicker (by clicking and dragging).
import React, { useState } from "react";
import "./TimePicker.css";

function getHourMinAmPm(militaryTime) {
  let amPm = "AM"; // assume AM for now

  let [hour, minute] = militaryTime.split(":");
  hour = parseInt(hour);
  if (hour > 12) {
    // PM times
    hour -= 12;
    amPm = "PM";
  }

  return [hour, minute.padStart(2, "0"), amPm];
}

function getPrevHour(hour) {
  let prevHour = parseInt(hour) - 1;
  if (prevHour === 0) {
    prevHour = 12;
  }
  return prevHour;
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
  return nextHour;
}

function getNextMinute(minute) {
  let nextMin = parseInt(minute) + 5;
  if (nextMin === 60) {
    nextMin = 0;
  }
  return String(nextMin).padStart(2, "0");
}

function convertStandardTimeToMilitaryTime(hour, minute, amPm) {
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

  return `${militaryHour}:${minute}`;
}

function TimePicker(props) {
  const [initialHour, initialMinute, initialAmPm] = getHourMinAmPm(
    props.tempTaskTime
  );
  const [selectedHour, setSelectedHour] = useState(initialHour);
  const [selectedMinute, setSelectedMinute] = useState(initialMinute);
  const [selectedAmPm, setSelectedAmPm] = useState(initialAmPm);

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
    // need to call onChangeTaskTime passing in nextHour before and separately from
    // call to setSelectedHour passing in nextHour because useState and setState
    // are asynchronous and won't update immediately

    // eslint-disable-next-line default-case
    switch (e.target.className) {
      case "prev-hour":
      case "selected-hour":
      case "next-hour":
        const nextHour = getNextHour(selectedHour);
        props.onChangeTaskTime(
          convertStandardTimeToMilitaryTime(
            nextHour,
            selectedMinute,
            selectedAmPm
          )
        );
        setSelectedHour(nextHour);
        break;
      case "prev-minute":
      case "selected-minute":
      case "next-minute":
        const nextMinute = getNextMinute(selectedMinute);
        props.onChangeTaskTime(
          convertStandardTimeToMilitaryTime(
            selectedHour,
            nextMinute,
            selectedAmPm
          )
        );
        setSelectedMinute(nextMinute);
        break;
      case "selected-am-pm":
      case "not-selected-am-pm":
        const newAmPm = selectedAmPm === "AM" ? "PM" : "AM";
        props.onChangeTaskTime(
          convertStandardTimeToMilitaryTime(
            selectedHour,
            selectedMinute,
            newAmPm
          )
        );
        setSelectedAmPm(newAmPm);
        break;
    }
  }

  // Scrolls the hour/minute down by 1
  // used for onClick on previous hour/minute or (onTouchStart and onTouchEnd) down
  function handleMoveToPrev(e) {
    // need to call onChangeTaskTime passing in prevHour before and separately from
    // call to setSelectedHour passing in prevHour because useState and setState
    // are asynchronous and won't update immediately

    // eslint-disable-next-line default-case
    switch (e.target.className) {
      case "prev-hour":
      case "selected-hour":
      case "next-hour":
        const prevHour = getPrevHour(selectedHour);
        props.onChangeTaskTime(
          convertStandardTimeToMilitaryTime(
            prevHour,
            selectedMinute,
            selectedAmPm
          )
        );
        setSelectedHour(prevHour);
        break;
      case "prev-minute":
      case "selected-minute":
      case "next-minute":
        const prevMinute = getPrevMinute(selectedMinute);
        props.onChangeTaskTime(
          convertStandardTimeToMilitaryTime(
            selectedHour,
            prevMinute,
            selectedAmPm
          )
        );
        setSelectedMinute(prevMinute);
        break;
      case "selected-am-pm":
      case "not-selected-am-pm":
        const newAmPm = selectedAmPm === "AM" ? "PM" : "AM";
        props.onChangeTaskTime(
          convertStandardTimeToMilitaryTime(
            selectedHour,
            selectedMinute,
            newAmPm
          )
        );
        setSelectedAmPm(newAmPm);
        break;
    }
  }

  return (
    <div className="time-picker">
      <p
        className="prev-hour"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleMoveToPrev}
      >
        {getPrevHour(selectedHour)}
      </p>
      <p
        className="prev-minute"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleMoveToPrev}
      >
        {getPrevMinute(selectedMinute)}
      </p>

      <p
        className="selected-hour"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {selectedHour}
      </p>
      <p
        className="selected-minute"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {selectedMinute}
      </p>
      <p
        className="selected-am-pm"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {selectedAmPm}
      </p>

      <p
        className="next-hour"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleMoveToNext}
      >
        {getNextHour(selectedHour)}
      </p>
      <p
        className="next-minute"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleMoveToNext}
      >
        {getNextMinute(selectedMinute)}
      </p>
      <p
        className="not-selected-am-pm"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleMoveToNext}
      >
        {selectedAmPm === "AM" ? "PM" : "AM"}
      </p>
    </div>
  );
}

export default TimePicker;
