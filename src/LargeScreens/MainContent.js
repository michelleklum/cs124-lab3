import "./LargeScreen.css";
import AddButton from "../Global/AddButton";
import DeleteAlert from "../Global/DeleteAlert";
import Home from "../Home/Home";
import SingleListPage from "../SingleListPage/SingleListPage";

function MainContent(props) {
  // TODO add back search bar to both home (add HomeSearch option to side-bar) and single list page
  return (
    <div className="main-content">
      <div className="side-bar">
        <Home
          isLargeScreen={props.isLargeScreen}
          data={props.data}
          onChangePage={props.onChangePage}
          onChangeList={props.onChangeList}
          onDeleteList={props.onDeleteList}
          onToggleDeleteAlert={props.onToggleDeleteAlert}
        />
      </div>
      <AddButton
        onChangePage={props.onChangePage}
        currentPage={props.currentPage}
      />
      {props.showDeleteAlert && (
        <DeleteAlert
          type="this list"
          onToggleDeleteAlert={props.onToggleDeleteAlert}
          onDelete={() => props.onDeleteList()}
        />
      )}
      <div className="large-screen-subpage">
        {props.currentListId ? (
          <SingleListPage
            isLargeScreen={props.isLargeScreen}
            db={props.db}
            data={props.data}
            tasksQuery={props.tasksQuery}
            prevPage={props.prevPage}
            currentListId={props.currentListId}
            currentTaskId={props.currentTaskId}
            currentPage={props.currentPage}
            onChangePage={props.onChangePage}
            onChangeTask={props.onChangeTask}
            onEditTask={props.onEditTask}
            onEditList={props.onEditList}
            onDeleteCompleted={props.onDeleteCompleted}
            onDeleteAllTasks={props.onDeleteAllTasks}
            onDeleteList={props.onDeleteList}
            onCreateTask={props.onCreateTask}
            onToggleDeleteAlert={props.onToggleDeleteAlert}
            listTasksPrimarySortField={props.listTasksPrimarySortField}
            onChangeSort={props.onChangeSort}
          />
        ) : (
          <h3 className="welcome-message">Welcome!</h3>
        )}
      </div>
    </div>
  );
}

export default MainContent;
