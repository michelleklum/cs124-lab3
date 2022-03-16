import React, { useState } from "react";
import "./ViewEditCreateTaskPage.css";
import TaskTopBar from "./TaskTopBar";
import TaskDisplay from "./TaskDisplay";
import DeleteTaskBar from "./DeleteTaskBar";
import DeleteAlert from "../Global/DeleteAlert";

function getCurrentDate() {
  const today = new Date();

  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // today.getMonth() gives 0 for January, which is why we need the + 1
  const yyyy = today.getFullYear();

  const currDate = mm + "/" + dd + "/" + yyyy;
  return currDate;
}

function getCurrentTimeRoundedToNearestFiveMin() {
  const today = new Date();

  const hours = String(today.getHours()).padStart(2, "0");
  const nearestFiveMinutes = Math.round(today.getMinutes() / 5) * 5;
  const nearestFiveMinutesStr = String(nearestFiveMinutes).padStart(2, "0");

  const currTime = hours + ":" + nearestFiveMinutesStr;
  return currTime;
}

function ViewEditCreateTaskPage(props) {
  const newTask = {
    name: "",
    taskDate: getCurrentDate(),
    taskTime: getCurrentTimeRoundedToNearestFiveMin(),
    notes: "",
    isCompleted: false,
  };

  const currentTask = props.tasks.find(
    (task) => task.id === props.currentTaskId
  );

  const task = props.inCreateTaskMode ? newTask : currentTask;
  // When a user is editing a task, they may potentially edit more than one task field.
  // useState is asynchronous, which may cause problems.
  // As a workaround, we put all of users' tasks in these state variables,
  // and then only when the user clicks the SaveTaskButton do we call onEditAllTaskFields
  // or onCreateTask to actually update the data in the App component's state.
  const [tempTaskName, setTempTaskName] = useState(task.name);
  // TODO: add deadline for task
  // TODO: deal with no deadline
  const [tempTaskDate, setTempTaskDate] = useState("");
  const [tempTaskTime, setTempTaskTime] = useState("");
  const [tempTaskNotes, setTempTaskNotes] = useState(task.notes);
  const [tempTaskStatus, setTempTaskStatus] = useState(task.isCompleted);
  return (
    <div id="task-page">
      <TaskTopBar
        task={task}
        prevPage={props.prevPage}
        currentListId={props.currentListId}
        currentTaskId={props.currentTaskId}
        onChangePage={props.onChangePage}
        inEditTaskMode={props.inEditTaskMode}
        inCreateTaskMode={props.inCreateTaskMode}
        onCreateTask={props.onCreateTask}
        tempTaskName={tempTaskName}
        onChangeTaskName={setTempTaskName}
        tempTaskDate={tempTaskDate}
        onChangeTaskDate={setTempTaskDate}
        tempTaskTime={tempTaskTime}
        onChangeTaskTime={setTempTaskTime}
        tempTaskNotes={tempTaskNotes}
        onChangeTaskNotes={setTempTaskNotes}
        tempTaskStatus={tempTaskStatus}
        onEditAllTaskFields={props.onEditAllTaskFields}
      />
      <hr />
      <TaskDisplay
        task={task}
        currentListId={props.currentListId}
        currentTaskId={props.currentTaskId}
        inEditTaskMode={props.inEditTaskMode}
        inCreateTaskMode={props.inCreateTaskMode}
        tempTaskDate={tempTaskDate}
        onChangeTaskDate={setTempTaskDate}
        tempTaskTime={tempTaskTime}
        onChangeTaskTime={setTempTaskTime}
        tempTaskNotes={tempTaskNotes}
        onChangeTaskNotes={setTempTaskNotes}
        tempTaskStatus={tempTaskStatus}
        onChangeTaskStatus={setTempTaskStatus}
      />
      {props.inEditTaskMode ? (
        <DeleteTaskBar onToggleDeleteAlert={props.onToggleDeleteAlert} />
      ) : null}
      {props.showDeleteAlert && (
        <DeleteAlert
          type="this task"
          onToggleDeleteAlert={props.onToggleDeleteAlert}
          onDelete={() =>
            props.onDeleteTask(props.currentTaskId)
          }
        />
      )}
    </div>
  );
}

export default ViewEditCreateTaskPage;
