import HomeTopBar from "./HomeTopBar";
import ListOfLists from "./ListOfLists";
import AddButton from "../Global/AddButton";
import DeleteAlert from "../Global/DeleteAlert";

function Home(props) {
  return (
    <div>
      <HomeTopBar
        onChangePage={props.onChangePage}
        onChangeList={props.onChangeList}
        isLoading={false}
      />
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
