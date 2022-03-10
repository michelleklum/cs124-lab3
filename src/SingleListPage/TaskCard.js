import "./TaskCard.css";
import Checkbox from "../Global/Checkbox";

function convertMilitaryTimeToStandardTime(militaryTime) {
  let amPm = "AM"; // assume AM for now

  let [hour, minute] = militaryTime.split(":");
  hour = parseInt(hour);
  if (hour > 12) {
    // PM times
    hour -= 12;
    amPm = "PM";
  } else if (hour === 0) {
    // 12:__ AM
    hour = 12;
    amPm = "AM";
  }

  return `${hour}:${minute} ${amPm}`;
}

function TaskCard(props) {
  const numTaskCharsToShow = 30;
  function handleTaskCardClick() {
    props.onChangePage("ViewTaskPage");
    props.onChangeTask(props.task.id);
  }

  const completedTaskClassName = props.task.isTaskCompleted
    ? "task-card-completed"
    : null;

  return (
    <div className={["task", completedTaskClassName].join(" ")}>
      <div className="left-aligned">
        <Checkbox
          className="checkbox"
          currentListId={props.currentListId}
          task={props.task}
          tempTaskStatus={props.task.isTaskCompleted}
          disableCheckbox={props.inMenuMode ? true : false}
          onEditTask={props.onEditTask}
        />
      </div>

      <div
        className="task-and-date"
        onClick={props.inMenuMode ? null : handleTaskCardClick}
      >
        <label htmlFor={`task-${props.task.id}`}>
          <h2>
            {props.task.taskName.length > numTaskCharsToShow
              ? props.task.taskName.slice(0, numTaskCharsToShow) + "..."
              : props.task.taskName}
          </h2>
        </label>
        <p className="date">
          {props.task.taskDate !== "" ? props.task.taskDate : ""},{" "}
          {props.task.taskTime !== ""
            ? convertMilitaryTimeToStandardTime(props.task.taskTime)
            : ""}
        </p>
      </div>
    </div>
  );
}

export default TaskCard;
