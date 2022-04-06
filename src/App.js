import React, { Fragment, useState } from "react";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import "./App.css";
import { useMediaQuery } from "react-responsive";
import Home from "./Home/Home";
import HomeSearchPage from "./HomeSearchPage/HomeSearchPage";
import ListSearchPage from "./ListSearchPage/ListSearchPage";
import SingleListPage from "./SingleListPage/SingleListPage";
import ViewEditCreateTaskPage from "./ViewEditCreateTaskPage/ViewEditCreateTaskPage";
import EditCreateListPage from "./EditCreateListPage/EditCreateListPage";
import HomeLoadingPage from "./HomeLoadingPage/HomeLoadingPage";
import ErrorAlert from "./Global/ErrorAlert";
import LargeScreenContent from "./LargeScreens/LargeScreenContent";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  collection,
  orderBy,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKewQsnli_uTJBwznWaTf3Xu9umZFfyIw",
  authDomain: "cs124-lab3-9c4c8.firebaseapp.com",
  projectId: "cs124-lab3-9c4c8",
  storageBucket: "cs124-lab3-9c4c8.appspot.com",
  messagingSenderId: "228399726961",
  appId: "1:228399726961:web:8de7dc7c45ca93cbebf6d0",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

function App() {
  // react-responsive media query for responsive design
  // Large Screens will be defined as having a minWidth of 769px and a minHeight of 690px
  const isLargeScreen = useMediaQuery({ minWidth: 769, minHeight: 690 });
  const isNarrowScreen = useMediaQuery({ maxWidth: 290 });

  // Code below changes current/previous page, current list, and current task
  const [currentPage, setCurrentPage] = useState("Home");
  const [prevPage, setPrevPage] = useState("Home");
  const [currentListId, setCurrentListId] = useState();
  const [currentTaskId, setCurrentTaskId] = useState();

  function handleChangePage(newPage) {
    setPrevPage(currentPage);
    setCurrentPage(newPage);
    if (newPage === "Home") {
      handleChangeList(null);
    } else if (newPage === "SingleListPage") {
      handleChangeTask(null);
    }
  }

  function handleChangeList(newListId) {
    setCurrentListId(newListId);
  }

  function handleChangeTask(newTaskId) {
    setCurrentTaskId(newTaskId);
  }

  // Code below gets data (lists) and tasks from database using Firebase queries
  const listCollectionName = "lists";
  const errorCollectionName = "errors";
  const taskSubcollectionName = "tasks";

  // Get data (lists) from Firebase
  const listsCollectionRef = collection(db, listCollectionName);
  const listsQuery = query(listsCollectionRef, orderBy("name")); // by default, sort lists alphabetically by name
  const [dbData, dataLoading, dataError] = useCollectionData(listsQuery);
  const data = dbData ? dbData : [];

  // Get tasks (current list's tasks) from Firebase
  const currentListIdWithDefault = currentListId ? currentListId : "none";
  const tasksSubcollectionRef = collection(
    db,
    "lists",
    currentListIdWithDefault,
    "tasks"
  );
  const [listTasksPrimarySortField, setListTasksPrimarySortField] =
    useState("priority"); // by default, primary sort current list's tasks by priority
  const [listTasksPrimarySortDirection, setListTasksPrimarySortDirection] =
    useState("desc"); // by default, sort current list's tasks descending by listTasksPrimarySortField
  const [listTasksSecondarySortField, setListTasksSecondarySortField] =
    useState("deadline"); // by default, secondary sort current list's tasks by deadline
  const [listTasksSecondarySortDirection, setListTasksSecondarySortDirection] =
    useState("asc"); // by default, sort current list's tasks ascending by listTasksPrimarySortField

  function handleChangeSort(newListTasksPrimarySortField) {
    // If user clicked on the already-selected sort field, just toggle sort direction
    if (listTasksPrimarySortField === newListTasksPrimarySortField) {
      listTasksPrimarySortDirection === "asc"
        ? setListTasksPrimarySortDirection("desc")
        : setListTasksPrimarySortDirection("asc");

      // if sorting tasks by priority, sort tasks primarily by priority, and then secondarily by deadline
      if (newListTasksPrimarySortField === "priority") {
        listTasksSecondarySortDirection === "asc"
          ? setListTasksSecondarySortDirection("desc")
          : setListTasksSecondarySortDirection("asc");
      }
    } else {
      setListTasksPrimarySortField(newListTasksPrimarySortField);
      // eslint-disable-next-line default-case
      switch (newListTasksPrimarySortField) {
        case "deadline":
        case "nameLowercasedForSorting":
          setListTasksPrimarySortDirection("asc");
          break;
        case "creationTime":
        case "modificationTime":
        case "priority":
          // sort by last created, last modified, and highest priority (with secondary sort of deadline)
          setListTasksPrimarySortDirection("desc");
          break;
      }

      // if sorting tasks by priority, sort tasks primarily by descending priority, and then secondarily by ascending deadline
      if (newListTasksPrimarySortField === "priority") {
        setListTasksSecondarySortField("deadline");
        setListTasksSecondarySortDirection("asc");
      }
    }
  }

  let tasksQuery = query(
    tasksSubcollectionRef,
    orderBy(listTasksPrimarySortField, listTasksPrimarySortDirection)
  );

  if (listTasksPrimarySortField === "priority") {
    tasksQuery = query(
      tasksSubcollectionRef,
      orderBy(listTasksPrimarySortField, listTasksPrimarySortDirection),
      orderBy(listTasksSecondarySortField, listTasksSecondarySortDirection)
    );
  }

  const dbTasks = useCollectionData(tasksQuery)[0];
  const tasks = dbTasks ? dbTasks : [];

  function handleEditTask(listId, taskId, taskField, newValue) {
    const taskDocRef = doc(
      db,
      listCollectionName,
      listId,
      taskSubcollectionName,
      taskId
    );
    updateDoc(taskDocRef, {
      modifiedTime: serverTimestamp(),
      [taskField]: newValue,
    });

    if (taskField === "name") {
      updateDoc(taskDocRef, {
        modifiedTime: serverTimestamp(),
        nameLowercasedForSorting: newValue.toLowerCase(),
      });
    }
  }

  function handleEditTaskAllFields(
    listId,
    taskId,
    taskName,
    taskDeadline,
    taskNotes,
    taskStatus,
    taskPriority
  ) {
    const taskDocRef = doc(
      db,
      listCollectionName,
      listId,
      taskSubcollectionName,
      taskId
    );
    updateDoc(taskDocRef, {
      modifiedTime: serverTimestamp(),
      name: taskName,
      nameLowercasedForSorting: taskName.toLowerCase(),
      deadline: taskDeadline,
      notes: taskNotes,
      isCompleted: taskStatus,
      priority: taskPriority,
    }).then(() => handleChangePage(prevPage));
  }

  function handleDeleteTask(taskId) {
    setCurrentPage(
      "SingleListPage"
    ); /* before deleting task in db, redirect to Single List Page */
    const taskDocRef = doc(
      db,
      listCollectionName,
      currentListId,
      taskSubcollectionName,
      taskId
    );
    deleteDoc(taskDocRef);
  }

  // TODO: CONSOLIDATE EDIT LIST FUNCTIONS!!!!!! (handleEditList and handleEditListAppearance)
  function handleEditList(listId, listField, newValue) {
    const listDocRef = doc(db, listCollectionName, listId);
    updateDoc(listDocRef, {
      modifiedTime: serverTimestamp(),
      [listField]: newValue,
    });
    // don't change page because handleEditList is used when SingleListPage is in Menu Mode
    // which is not actually a different page from the SingleListPage not in Menu Mode
  }

  function handleEditListAppearance(listId, newName, newIcon) {
    const listDocRef = doc(db, listCollectionName, listId);
    updateDoc(listDocRef, {
      modifiedTime: serverTimestamp(),
      name: newName,
      icon: newIcon,
    }).then(() => handleChangePage(prevPage));
  }

  function handleDeleteCompletedTasks() {
    tasks
      .filter((task) => task.isCompleted)
      .map((task) =>
        deleteDoc(
          doc(
            db,
            listCollectionName,
            currentListId,
            taskSubcollectionName,
            task.id
          )
        )
      );
  }

  function handleDeleteOverdueTasks() {
    // Remove tasks whose deadlines are before current time
    tasks
      .filter((task) => task.deadline.toDate() < new Date())
      .map((task) =>
        deleteDoc(
          doc(
            db,
            listCollectionName,
            currentListId,
            taskSubcollectionName,
            task.id
          )
        )
      );
  }

  function handleDeleteAllTasks() {
    tasks.map((task) =>
      deleteDoc(
        doc(
          db,
          listCollectionName,
          currentListId,
          taskSubcollectionName,
          task.id
        )
      )
    );
  }

  function handleDeleteList() {
    setCurrentPage("Home"); // Change page first to avoid error where no tasks are found
    setCurrentListId(null);
    deleteDoc(doc(db, listCollectionName, currentListId));
  }

  // Functions below handle list, task, and error creation
  function handleCreateList(name, icon) {
    const listId = generateUniqueID();
    const newList = {
      id: listId,
      creationTime: serverTimestamp(),
      modifiedTime: serverTimestamp(),
      name: name,
      icon: icon,
      hideCompletedTasks: false,
    };
    setDoc(doc(db, listCollectionName, listId), newList).then(() => {
      handleChangePage("Home");
      handleChangeList(listId);
    });
  }

  function handleCreateTask(
    listId,
    taskName,
    taskDeadline,
    taskNotes,
    taskPriority
  ) {
    const taskId = generateUniqueID();
    const newTask = {
      id: taskId,
      creationTime: serverTimestamp(),
      modifiedTime: serverTimestamp(),
      name: taskName,
      nameLowercasedForSorting: taskName.toLowerCase(),
      deadline: taskDeadline,
      notes: taskNotes,
      isCompleted: false,
      priority: taskPriority,
    };
    const docRef = doc(
      db,
      listCollectionName,
      listId,
      taskSubcollectionName,
      taskId
    );
    setDoc(docRef, newTask).then(() => handleChangePage("SingleListPage"));
  }

  function handleCreateErrorReport() {
    const errorId = generateUniqueID();
    const newError = {
      id: errorId,
      errorTime: serverTimestamp(),
    };
    const docRef = doc(db, errorCollectionName, errorId);
    setDoc(docRef, newError);
  }

  // State and functions below handle alerts and warnings
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  function handleToggleDeleteAlert() {
    setShowDeleteAlert(!showDeleteAlert);
  }

  return isLargeScreen ? (
    <Fragment>
      <LargeScreenContent
        isLargeScreen={isLargeScreen}
        data={data}
        dataLoading={dataLoading}
        currentListId={currentListId}
        currentTaskId={currentTaskId}
        currentPage={currentPage}
        onDeleteList={handleDeleteList}
        onChangePage={handleChangePage}
        onChangeList={handleChangeList}
        onToggleDeleteAlert={handleToggleDeleteAlert}
        showDeleteAlert={showDeleteAlert}
        db={db}
        tasksQuery={tasksQuery}
        prevPage={prevPage}
        onChangeTask={handleChangeTask}
        onCreateTask={handleCreateTask}
        onEditTask={handleEditTask}
        onEditAllTaskFields={handleEditTaskAllFields}
        onDeleteTask={handleDeleteTask}
        onCreateList={handleCreateList}
        onEditList={handleEditList}
        onEditListAppearance={handleEditListAppearance}
        onDeleteCompleted={handleDeleteCompletedTasks}
        onDeleteOverdue={handleDeleteOverdueTasks}
        onDeleteAllTasks={handleDeleteAllTasks}
        listTasksPrimarySortField={listTasksPrimarySortField}
        listTasksPrimarySortDirection={listTasksPrimarySortDirection}
        onChangeSort={handleChangeSort}
      />
    </Fragment>
  ) : (
    <Fragment>
      {dataError ? (
        <Fragment>
          <HomeLoadingPage />
          <ErrorAlert onCreateErrorReport={handleCreateErrorReport} />
        </Fragment>
      ) : null}
      {!isLargeScreen && currentPage === "Home" && dataLoading ? (
        <HomeLoadingPage />
      ) : null}
      {currentPage === "Home" && !dataLoading ? (
        <Home
          data={data}
          isNarrowScreen={isNarrowScreen}
          currentListId={currentListId}
          currentTaskId={currentTaskId}
          currentPage={currentPage}
          onDeleteList={handleDeleteList}
          onChangePage={handleChangePage}
          onChangeList={handleChangeList}
          onToggleDeleteAlert={handleToggleDeleteAlert}
          showDeleteAlert={showDeleteAlert}
        />
      ) : null}
      {currentPage === "HomeSearchPage" ? (
        <HomeSearchPage
          data={data}
          prevPage={prevPage}
          currentListId={currentListId}
          currentTaskId={currentTaskId}
          onChangePage={handleChangePage}
          onChangeList={handleChangeList}
          onChangeTask={handleChangeTask}
          onDeleteList={handleDeleteList}
          onToggleDeleteAlert={handleToggleDeleteAlert}
          showDeleteAlert={showDeleteAlert}
        />
      ) : null}
      {currentPage === "SingleListPage" ? (
        <SingleListPage
          db={db}
          data={data}
          tasksQuery={tasksQuery}
          prevPage={prevPage}
          currentListId={currentListId}
          currentTaskId={currentTaskId}
          currentPage={currentPage}
          onChangePage={handleChangePage}
          onChangeTask={handleChangeTask}
          onEditTask={handleEditTask}
          onEditList={handleEditList}
          onDeleteCompleted={handleDeleteCompletedTasks}
          onDeleteOverdue={handleDeleteOverdueTasks}
          onDeleteAllTasks={handleDeleteAllTasks}
          onDeleteList={handleDeleteList}
          onCreateTask={handleChangeTask}
          onToggleDeleteAlert={handleToggleDeleteAlert}
          listTasksPrimarySortField={listTasksPrimarySortField}
          listTasksPrimarySortDirection={listTasksPrimarySortDirection}
          onChangeSort={handleChangeSort}
        />
      ) : null}
      {currentPage === "ListSearchPage" ? (
        <ListSearchPage
          data={data}
          tasks={tasks}
          prevPage={prevPage}
          currentListId={currentListId}
          currentTaskId={currentTaskId}
          onChangePage={handleChangePage}
          onChangeTask={handleChangeTask}
        />
      ) : null}
      {currentPage === "ViewTaskPage" ? (
        <ViewEditCreateTaskPage
          tasks={tasks}
          prevPage={prevPage}
          currentListId={currentListId}
          currentTaskId={currentTaskId}
          onChangePage={handleChangePage}
          inEditTaskMode={false}
          inCreateTaskMode={false}
        />
      ) : null}
      {currentPage === "EditTaskPage" ? (
        <ViewEditCreateTaskPage
          tasks={tasks}
          prevPage={prevPage}
          currentListId={currentListId}
          currentTaskId={currentTaskId}
          onChangePage={handleChangePage}
          onCreateTask={handleCreateTask}
          onDeleteTask={handleDeleteTask}
          onEditAllTaskFields={handleEditTaskAllFields}
          inEditTaskMode={true}
          inCreateTaskMode={false}
          onToggleDeleteAlert={handleToggleDeleteAlert}
          showDeleteAlert={showDeleteAlert}
        />
      ) : null}
      {currentPage === "CreateTaskPage" ? (
        <ViewEditCreateTaskPage
          tasks={tasks}
          prevPage={prevPage}
          currentListId={currentListId}
          currentTaskId={currentTaskId}
          onChangePage={handleChangePage}
          onDeleteTask={handleDeleteTask}
          onCreateTask={handleCreateTask}
          onEditAllTaskFields={handleEditTaskAllFields}
          inEditTaskMode={false}
          inCreateTaskMode={true}
        />
      ) : null}
      {currentPage === "EditListPage" ? (
        <EditCreateListPage
          data={data}
          prevPage={prevPage}
          currentListId={currentListId}
          onEditListAppearance={handleEditListAppearance}
          onChangePage={handleChangePage}
          onChangeList={handleChangeList}
          onDeleteList={handleDeleteList}
          onCreateList={handleCreateList}
          inEditListMode={true}
          inCreateListMode={false}
          onToggleDeleteAlert={handleToggleDeleteAlert}
          showDeleteAlert={showDeleteAlert}
        />
      ) : null}
      {currentPage === "CreateListPage" ? (
        <EditCreateListPage
          data={data}
          prevPage={prevPage}
          currentListId={currentListId}
          onEditListAppearance={handleEditListAppearance}
          onCreateList={handleCreateList}
          onChangeList={handleChangeList}
          onChangePage={handleChangePage}
          onDeleteList={handleDeleteList}
          inEditListMode={false}
          inCreateListMode={true}
        />
      ) : null}
    </Fragment>
  );
}

export default App;
