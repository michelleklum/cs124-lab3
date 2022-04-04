import "./TaskCard.css";
import Checkbox from "../Global/Checkbox";
function TaskCard(props) {
  // Convert Firebase Timestamp to JavaScript Date object
  const taskDeadlineJSDate = props.task.deadline.toDate();

  // Parse JavaScript Date object
  const initialMonth = taskDeadlineJSDate.getMonth() + 1; // JavaScript Date object months are zero-indexed
  const initialDay = taskDeadlineJSDate.getDate();
  const initialYear = taskDeadlineJSDate.getFullYear();

  const initialMinute = taskDeadlineJSDate.getMinutes();

  // Handle JavaScript Date object's use of military time
  const initialMilitaryHour = taskDeadlineJSDate.getHours();
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

  // Check if task is overdue; overdue tasks will have deadline shown in red
  const isOverdue = taskDeadlineJSDate < new Date();
  const overdueClassName = isOverdue ? "overdue" : null;

  const numTaskCharsToShow = 30;
  function handleTaskCardClick() {
    props.onChangePage("ViewTaskPage");
    props.onChangeTask(props.task.id);
    props.isLargeScreen && props.onToggleLargeScreenPopup();
  }

  const completedTaskClassName = props.task.isCompleted
    ? "task-card-completed"
    : null;

  const largeScreenTaskClassName = props.isLargeScreen
    ? "large-screen-task-card"
    : null;

  return (
    <div className={["task", completedTaskClassName,
      largeScreenTaskClassName].join(" ")}>
      <div className="left-aligned">
        <Checkbox
          className="checkbox"
          currentListId={props.currentListId}
          task={props.task}
          tempTaskStatus={props.task.isCompleted}
          disableCheckbox={props.inMenuMode ? true : false}
          onEditTask={props.onEditTask}
          priorityNumber={props.task.priority}
          fromTaskCard={true}
        />
      </div>

      <div
        className="task-and-date"
        onClick={props.inMenuMode || props.isLargeScreen ? null :
          handleTaskCardClick}
      >
        <label htmlFor={`task-${props.task.id}`}>
          <h2>
            {props.task.name.length > numTaskCharsToShow
              ? props.task.name.slice(0, numTaskCharsToShow) + "..."
              : props.task.name}
          </h2>
        </label>
        <p className={`date ${overdueClassName}`}>
          {`${String(initialMonth).padStart(2, "0")}/${String(
            initialDay
          ).padStart(2, "0")}/${initialYear}`}
          ,{" "}
          {`${String(initialHour).padStart(2, "0")}:${String(
            initialMinute
          ).padStart(2, "0")} ${initialAmPm}`}
        </p>
      </div>
      {props.isLargeScreen && <i className="fas fa-info-circle fa-4x info-task"
        onClick={handleTaskCardClick}></i>}
    </div>
  );
}

export default TaskCard;
