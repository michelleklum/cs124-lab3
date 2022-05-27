import React, { useState } from "react";
import "./ViewEditCreateTaskPage.css";
import TaskTopBar from "./TaskTopBar";
import TaskDisplay from "./TaskDisplay";
import DeleteTaskListBar from "../Global/DeleteTaskListBar";
import DeleteAlert from "../Global/DeleteAlert";
import { Timestamp } from "firebase/firestore";
import ErrorAlert from "../Global/ErrorAlert";

import { useCollectionData } from "react-firebase-hooks/firestore";

function getCurrentDate() {
  // Get JavaScript Date object for current date and time
  const currentJSDate = new Date();

  const currentMonth = currentJSDate.getMonth();
  const currentDay = currentJSDate.getDate();
  const currentYear = currentJSDate.getFullYear();
  const currentHour = currentJSDate.getHours();
  const currentMinute = currentJSDate.getMinutes();
  const nearestFiveMinute = Math.round(currentMinute / 5) * 5; // round minute to nearest 5 minutes

  // Create new JavaScript Date object for current date and time, rounded to nearest 5 minutes
  const taskDeadlineJSDate = new Date(
    currentYear,
    currentMonth,
    currentDay,
    currentHour,
    nearestFiveMinute
  );

  // Convert JavaScript Date object to Firebase Timestamp
  return Timestamp.fromDate(taskDeadlineJSDate);
}

function ViewEditCreateTaskPage(props) {
  // TODO: In the future, give users option to not assign a deadline to a task?
  // By default, this assumes the current time for the task deadline

  const tasksError = useCollectionData(props.tasksQuery)[2];

  const newTask = {
    name: "",
    deadline: getCurrentDate(),
    notes: "",
    priority: 0,
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
  const [tempTaskName, setTempTaskName] = useState(task && task.name);
  const [tempTaskDeadline, setTempTaskDeadline] = useState(
    task && task.deadline
  );
  const [tempTaskPriority, setTempTaskPriority] = useState(
    task && task.priority ? task.priority : 0
  );
  const [tempTaskNotes, setTempTaskNotes] = useState(task && task.notes);
  const [tempTaskStatus, setTempTaskStatus] = useState(
    task && task.isCompleted
  );

  return (
    <div id="task-page">
      {(tasksError || task === undefined) && (
        <ErrorAlert
          error={tasksError}
          onCreateErrorReport={props.onCreateErrorReport}
        />
      )}
      {task && (
        <TaskTopBar
          isLargeScreen={props.isLargeScreen}
          onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
          task={task}
          prevPage={props.prevPage}
          data={props.data}
          currentListId={props.currentListId}
          currentTaskId={props.currentTaskId}
          onChangePage={props.onChangePage}
          inEditTaskMode={props.inEditTaskMode}
          inCreateTaskMode={props.inCreateTaskMode}
          onCreateTask={props.onCreateTask}
          tempTaskName={tempTaskName}
          onChangeTaskName={setTempTaskName}
          tempTaskDeadline={tempTaskDeadline}
          onChangeTaskDeadline={setTempTaskDeadline}
          tempTaskNotes={tempTaskNotes}
          onChangeTaskNotes={setTempTaskNotes}
          tempTaskStatus={tempTaskStatus}
          onEditAllTaskFields={props.onEditAllTaskFields}
          tempTaskPriority={tempTaskPriority}
          onChangeTaskPriority={setTempTaskPriority}
        />
      )}
      {task && <hr />}
      {task && (
        <TaskDisplay
          task={task}
          currentListId={props.currentListId}
          currentTaskId={props.currentTaskId}
          inEditTaskMode={props.inEditTaskMode}
          inCreateTaskMode={props.inCreateTaskMode}
          tempTaskDeadline={tempTaskDeadline}
          onChangeTaskDeadline={setTempTaskDeadline}
          tempTaskNotes={tempTaskNotes}
          onChangeTaskNotes={setTempTaskNotes}
          tempTaskStatus={tempTaskStatus}
          onChangeTaskStatus={setTempTaskStatus}
          tempTaskPriority={tempTaskPriority}
          onChangeTaskPriority={setTempTaskPriority}
        />
      )}
      {props.inEditTaskMode ? (
        <DeleteTaskListBar onToggleDeleteAlert={props.onToggleDeleteAlert} />
      ) : null}
      {props.showDeleteAlert && (
        <DeleteAlert
          type="this task"
          onToggleDeleteAlert={props.onToggleDeleteAlert}
          onDelete={function () {
            props.onDeleteTask(props.currentTaskId);
            props.isLargeScreen && props.onToggleLargeScreenPopup();
          }}
        />
      )}
    </div>
  );
}

export default ViewEditCreateTaskPage;
