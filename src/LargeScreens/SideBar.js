import "./LargeScreen.css";
import ListOfLists from "../Home/ListOfLists";
import AddButton from "../Global/AddButton";
import DeleteAlert from "../Global/DeleteAlert";

function Home(props) {
  // TODO add back search bar
  return (
    <div className="side-bar">
      <ListOfLists
        data={props.data}
        onChangePage={props.onChangePage}
        onChangeList={props.onChangeList}
        onDeleteList={props.onDeleteList}
        onToggleDeleteAlert={props.onToggleDeleteAlert}
      />
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
    </div>
  );
}

export default Home;
