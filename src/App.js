import React, { Fragment, useState, useEffect } from "react";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import "./App.css";
import { useMediaQuery } from "react-responsive";
import Home from "./Home/Home";
import HomeSearchPage from "./HomeSearchPage/HomeSearchPage";
import HomeLoadingPage from "./HomeLoadingPage/HomeLoadingPage";
import ListSearchPage from "./ListSearchPage/ListSearchPage";
import SingleListPage from "./SingleListPage/SingleListPage";
import ViewEditCreateTaskPage from "./ViewEditCreateTaskPage/ViewEditCreateTaskPage";
import EditCreateListPage from "./EditCreateListPage/EditCreateListPage";
import SharingPage from "./Sharing/SharingPage";
import ErrorAlert from "./Global/ErrorAlert";
import LargeScreenContent from "./LargeScreens/LargeScreenContent";
import AuthenticationPage from "./Authentication/AuthenticationPage";
import UserAccountPage from "./UserAccountPage/UserAccountPage";
import EmailVerificationAlert from "./Authentication/EmailVerificationAlert";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  where,
  collection,
  orderBy,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

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

// Initialize Firebase authentication state
const auth = getAuth();

function App() {
  // Get user from Firestore
  const [user, userLoading, userError] = useAuthState(auth);

  // Code below gets data (lists) and tasks from database using Firebase queries
  const listCollectionName = "lists";
  const errorCollectionName = "errors";
  const taskSubcollectionName = "tasks";

  // Get data (lists) from Firebase
  const listsCollectionRef = collection(db, listCollectionName);
  const listsQuery =
    user &&
    query(
      listsCollectionRef,
      where("sharedWith", "array-contains", user.email),
      orderBy("nameLowercasedForSorting")
    ); // by default, sort lists alphabetically by name
  const [dbData, dataLoading, dataError] = useCollectionData(listsQuery);
  const data = dbData ? dbData : [];

  // react-responsive media query for responsive design
  // Large Screens will be defined as having a minWidth of 769px and a minHeight of 690px
  const isLargeScreen = useMediaQuery({ minWidth: 769, minHeight: 690 });
  const isNarrowScreen = useMediaQuery({ maxWidth: 329 });

  // Code below tracks state of large screen popup (open or closed)
  const [showLargeScreenPopup, setShowLargeScreenPopup] = useState(false);

  function toggleLargeScreenPopup() {
    setShowLargeScreenPopup(!showLargeScreenPopup);
  }

  // Code below tracks state of menu (open or closed; type of menu)
  const [inMenuMode, setMenuMode] = useState(false);
  const [menuModeType, setMenuModeType] = useState("general");

  function toggleMenuMode() {
    setMenuMode(!inMenuMode);
    setMenuModeType("general"); // so that next time menu is opened, it will be the general menu
  }

  // Code below changes current page, previous page, current list, and current task
  const [currentPage, setCurrentPage] = useState(user ? "Home" : "SignInPage");

  // user is initially null when app first loads, even if user is signed in.
  // This ensures that the Home page (not an empty SignInPage) shows when user is signed in and refreshes the page.
  useEffect(() => {
    user ? setCurrentPage("Home") : setCurrentPage("SignInPage");
  }, [user]);

  // Code below tracks state of email verification alert (open or closed)
  const [showEmailVerificationAlert, setShowEmailVerificationAlert] =
    useState(false);
  // user is initially null when app first loads, even if user is signed in.
  // This ensures that we eventually see the proper value of user.emailVerified.
  useEffect(() => {
    user && !user.emailVerified
      ? setShowEmailVerificationAlert(true)
      : setShowEmailVerificationAlert(false);
  }, [user]);

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

    switch (newPage) {
      case "ViewTaskPage":
      case "EditTaskPage":
      case "CreateTaskPage":
      case "EditListPage":
      case "CreateListPage":
      case "SharingPage":
        setShowLargeScreenPopup(true);
        break;
      default:
        setShowLargeScreenPopup(false);
        break;
    }

    // If menu is open, close it
    inMenuMode && toggleMenuMode();
  }

  function handleChangeList(newListId) {
    setCurrentListId(newListId);
  }

  function handleChangeTask(newTaskId) {
    setCurrentTaskId(newTaskId);
  }

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
      // if sorting tasks by priority, sort tasks primarily by priority, and then secondarily by deadline
      if (newListTasksPrimarySortField === "priority") {
        // if we were previously sorting tasks by priority ascending, now sort primarily by priority descending and secondarily by deadline ascending
        // else if we were previously sorting tasks by priority descending, now sort primarily by priority ascending and secondarily by deadline descending
        listTasksPrimarySortDirection === "asc"
          ? setListTasksSecondarySortDirection("asc")
          : setListTasksSecondarySortDirection("desc");
      }

      listTasksPrimarySortDirection === "asc"
        ? setListTasksPrimarySortDirection("desc")
        : setListTasksPrimarySortDirection("asc");
    } else {
      setListTasksPrimarySortField(newListTasksPrimarySortField);
      // eslint-disable-next-line default-case
      switch (newListTasksPrimarySortField) {
        case "deadline":
        case "nameLowercasedForSorting":
          setListTasksPrimarySortDirection("asc");
          break;
        case "creationTime":
        case "modifiedTime":
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
    }).then(() => handleChangePage("SingleListPage"));
    // when user cancels changes to task on CreateTaskPage but especially EditTaskPage, they should return to SingleListPage,
    // not the EditTaskPage's prevPage (which would be ViewTaskPage)
  }

  function handleDeleteTaskWithPageChange(taskId) {
    setCurrentPage(
      "SingleListPage"
    ); /* before deleting task in db, redirect to Single List Page */
    handleDeleteTask(taskId);
  }

  function handleDeleteTask(taskId) {
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

    if (listField === "name") {
      updateDoc(listDocRef, {
        modifiedTime: serverTimestamp(),
        nameLowercasedForSorting: newValue.toLowerCase(),
      });
    }

    // don't change page because handleEditList is used when SingleListPage is in Menu Mode
    // which is not actually a different page from the SingleListPage not in Menu Mode
  }

  function handleEditListAppearance(listId, newName, newIcon) {
    const listDocRef = doc(db, listCollectionName, listId);
    updateDoc(listDocRef, {
      modifiedTime: serverTimestamp(),
      name: newName,
      nameLowercasedForSorting: newName.toLowerCase(),
      icon: newIcon,
    }).then(() => handleChangePage(prevPage));
  }

  function handleDeleteCompletedTasks() {
    tasks
      .filter((task) => task.isCompleted)
      .forEach((task) =>
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
      .forEach((task) =>
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
    const listId = currentListId;
    handleDeleteAllTasks();
    setCurrentListId(null);
    deleteDoc(doc(db, listCollectionName, listId));
  }

  // Functions below handle list, task, and error creation
  function handleCreateList(name, icon) {
    const listId = generateUniqueID();
    const newList = {
      id: listId,
      owner: user.uid,
      ownerEmail: user.email,
      sharedWith: [user.email],
      creationTime: serverTimestamp(),
      modifiedTime: serverTimestamp(),
      name: name,
      nameLowercasedForSorting: name.toLowerCase(),
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

  function handleCreateErrorReport(error) {
    const errorId = generateUniqueID();
    const newError = {
      id: errorId,
      errorTime: serverTimestamp(),
      errorMessage: error.message,
    };
    const docRef = doc(db, errorCollectionName, errorId);
    setDoc(docRef, newError);
  }

  // State and functions below handle alerts and warnings
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  function handleToggleDeleteAlert() {
    setShowDeleteAlert(!showDeleteAlert);
  }

  return showEmailVerificationAlert ? (
    <EmailVerificationAlert auth={auth} user={user} />
  ) : user ? (
    isLargeScreen ? (
      <Fragment>
        <LargeScreenContent
          tasksQuery={tasksQuery}
          auth={auth}
          user={user}
          isLargeScreen={isLargeScreen}
          showLargeScreenPopup={showLargeScreenPopup}
          onToggleLargeScreenPopup={toggleLargeScreenPopup}
          inMenuMode={inMenuMode}
          menuModeType={menuModeType}
          setMenuModeType={setMenuModeType}
          onChangeMenuMode={toggleMenuMode}
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
          prevPage={prevPage}
          onChangeTask={handleChangeTask}
          onCreateTask={handleCreateTask}
          onEditTask={handleEditTask}
          onEditAllTaskFields={handleEditTaskAllFields}
          onDeleteTask={handleDeleteTaskWithPageChange}
          onCreateList={handleCreateList}
          onEditList={handleEditList}
          onEditListAppearance={handleEditListAppearance}
          onDeleteCompleted={handleDeleteCompletedTasks}
          onDeleteOverdue={handleDeleteOverdueTasks}
          onDeleteAllTasks={handleDeleteAllTasks}
          listTasksPrimarySortField={listTasksPrimarySortField}
          listTasksPrimarySortDirection={listTasksPrimarySortDirection}
          onChangeSort={handleChangeSort}
          onCreateErrorReport={handleCreateErrorReport}
        />
      </Fragment>
    ) : (
      <Fragment>
        {dataError || userError ? (
          <Fragment>
            <HomeLoadingPage />
            <ErrorAlert
              error={dataError}
              onCreateErrorReport={handleCreateErrorReport}
            />
          </Fragment>
        ) : null}
        {!isLargeScreen &&
        !dataError &&
        !userError &&
        currentPage === "Home" &&
        (dataLoading || userLoading) ? (
          <HomeLoadingPage />
        ) : null}
        {currentPage === "Home" &&
        !dataError &&
        !userError &&
        !dataLoading &&
        !userLoading ? (
          <Home
            auth={auth}
            user={user}
            data={data}
            isLargeScreen={isLargeScreen}
            isNarrowScreen={isNarrowScreen}
            currentListId={currentListId}
            currentTaskId={currentTaskId}
            currentPage={currentPage}
            onDeleteList={handleDeleteList}
            onChangePage={handleChangePage}
            onChangeList={handleChangeList}
            onChangeTask={handleChangeTask}
            onToggleDeleteAlert={handleToggleDeleteAlert}
            showDeleteAlert={showDeleteAlert}
          />
        ) : null}
        {currentPage === "HomeSearchPage" ? (
          <HomeSearchPage
            user={user}
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
            inMenuMode={inMenuMode}
            menuModeType={menuModeType}
            setMenuModeType={setMenuModeType}
            onChangeMenuMode={toggleMenuMode}
            db={db}
            user={user}
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
            onCreateErrorReport={handleCreateErrorReport}
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
            tasksQuery={tasksQuery}
            tasks={tasks}
            prevPage={prevPage}
            data={data}
            currentListId={currentListId}
            currentTaskId={currentTaskId}
            onChangePage={handleChangePage}
            onCreateErrorReport={handleCreateErrorReport}
            inEditTaskMode={false}
            inCreateTaskMode={false}
          />
        ) : null}
        {currentPage === "EditTaskPage" ? (
          <ViewEditCreateTaskPage
            tasksQuery={tasksQuery}
            tasks={tasks}
            prevPage={prevPage}
            data={data}
            currentListId={currentListId}
            currentTaskId={currentTaskId}
            onChangePage={handleChangePage}
            onCreateTask={handleCreateTask}
            onDeleteTask={handleDeleteTaskWithPageChange}
            onEditAllTaskFields={handleEditTaskAllFields}
            inEditTaskMode={true}
            inCreateTaskMode={false}
            onToggleDeleteAlert={handleToggleDeleteAlert}
            showDeleteAlert={showDeleteAlert}
            onCreateErrorReport={handleCreateErrorReport}
          />
        ) : null}
        {currentPage === "CreateTaskPage" ? (
          <ViewEditCreateTaskPage
            tasksQuery={tasksQuery}
            tasks={tasks}
            prevPage={prevPage}
            data={data}
            currentListId={currentListId}
            currentTaskId={currentTaskId}
            onChangePage={handleChangePage}
            onDeleteTask={handleDeleteTaskWithPageChange}
            onCreateTask={handleCreateTask}
            onEditAllTaskFields={handleEditTaskAllFields}
            onCreateErrorReport={handleCreateErrorReport}
            inEditTaskMode={false}
            inCreateTaskMode={true}
          />
        ) : null}
        {currentPage === "EditListPage" ? (
          <EditCreateListPage
            tasksQuery={tasksQuery}
            user={user}
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
            onCreateErrorReport={handleCreateErrorReport}
          />
        ) : null}
        {currentPage === "CreateListPage" ? (
          <EditCreateListPage
            tasksQuery={tasksQuery}
            user={user}
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
            onCreateErrorReport={handleCreateErrorReport}
          />
        ) : null}
        {currentPage === "SharingPage" ? (
          <SharingPage
            isLargeScreen={isLargeScreen}
            user={user}
            data={data}
            prevPage={prevPage}
            currentListId={currentListId}
            onChangePage={handleChangePage}
            onEditList={handleEditList}
          />
        ) : null}
        {currentPage === "UserAccountPage" ? (
          <UserAccountPage
            onChangePage={handleChangePage}
            onChangeList={handleChangeList}
            onChangeTask={handleChangeTask}
            user={user}
            auth={auth}
            prevPage={prevPage}
          />
        ) : null}
      </Fragment>
    )
  ) : userLoading ? (
    <div className="user-loading-screen" />
  ) : (
    <Fragment>
      <AuthenticationPage
        auth={auth}
        user={user}
        currentPage={currentPage}
        onChangePage={handleChangePage}
        isLargeScreen={isLargeScreen}
      />
    </Fragment>
  );
}

export default App;
