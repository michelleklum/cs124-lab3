import React, { Fragment, useState } from "react";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import "./App.css";
import Home from "./Home/Home";
import HomeSearchPage from "./HomeSearchPage/HomeSearchPage";
import ListSearchPage from "./ListSearchPage/ListSearchPage";
import SingleListPage from "./SingleListPage/SingleListPage";
import ViewEditCreateTaskPage from "./ViewEditCreateTaskPage/ViewEditCreateTaskPage";
import EditCreateListPage from "./EditCreateListPage/EditCreateListPage";

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
  getDoc,
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

  // find out how current list's tasks are sorted
  const listDocRef = doc(db, listCollectionName, currentListIdWithDefault);
  let listTasksSortMethod = "deadline"; // assume current list's tasks are sorted by deadline for now
  getDoc(listDocRef).then(function (listDoc) {
    if (listDoc.data()) {
      listTasksSortMethod = listDoc.data().sortMethod;
    }
  });

  const tasksQuery = query(tasksSubcollectionRef, orderBy(listTasksSortMethod));
  const [dbTasks, tasksLoading, tasksError] = useCollectionData(tasksQuery);
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
  }

  function handleEditTaskAllFields(
    listId,
    taskId,
    taskName,
    taskDeadline,
    taskNotes,
    taskStatus
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
      deadline: taskDeadline,
      notes: taskNotes,
      isCompleted: taskStatus,
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
  // TODO: test showing / hiding completed items once we have tasks
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
    deleteDoc(doc(db, listCollectionName, currentListId));
  }

  // Functions below handle list and task creation
  function handleCreateList(name, icon) {
    const listId = generateUniqueID();
    const newList = {
      id: listId,
      creationTime: serverTimestamp(),
      modifiedTime: serverTimestamp(),
      name: name,
      icon: icon,
      hideCompletedTasks: false,
      sortMethod: "deadline", // by default, sort list tasks by deadline
    };
    setDoc(doc(db, listCollectionName, listId), newList).then(() =>
      handleChangePage("Home")
    );
  }

  function handleCreateTask(listId, taskName, taskDeadline, taskNotes) {
    const taskId = generateUniqueID();
    const newTask = {
      id: taskId,
      creationTime: serverTimestamp(),
      modifiedTime: serverTimestamp(),
      name: taskName,
      deadline: taskDeadline,
      notes: taskNotes,
      isCompleted: false,
    };
    const docRef = doc(
      db,
      listCollectionName,
      listId,
      taskSubcollectionName,
      taskId
    );
    setDoc(docRef, newTask).then(() => handleChangePage(prevPage));
  }

  // State and functions below handle alerts and warnings
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  function handleToggleDeleteAlert() {
    setShowDeleteAlert(!showDeleteAlert);
  }

  if (dataLoading) {
    return <>Loading!</>;
  }
  if (dataError) {
    return <>Error!</>;
  }
  return (
    <Fragment>
      {currentPage === "Home" ? (
        <Home
          data={data}
          currentListId={currentListId}
          currentTaskId={currentTaskId}
          currentPage={currentPage}
          onDeleteList={handleDeleteList}
          onChangePage={handleChangePage}
          onChangeList={handleChangeList}
          onCreateTask={handleCreateList}
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
          data={data}
          tasks={tasks}
          loading={tasksLoading}
          error={tasksError}
          prevPage={prevPage}
          currentListId={currentListId}
          currentTaskId={currentTaskId}
          currentPage={currentPage}
          onChangePage={handleChangePage}
          onChangeTask={handleChangeTask}
          onEditTask={handleEditTask}
          onEditList={handleEditList}
          onDeleteCompleted={handleDeleteCompletedTasks}
          onDeleteAllTasks={handleDeleteAllTasks}
          onDeleteList={handleDeleteList}
          onCreateTask={handleChangeTask}
          onToggleDeleteAlert={handleToggleDeleteAlert}
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
          onEditList={handleEditListAppearance}
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
          onEditList={handleEditListAppearance}
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
