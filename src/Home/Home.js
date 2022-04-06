import HomeTopBar from "./HomeTopBar";
import ListOfLists from "./ListOfLists";
import AddButton from "../Global/AddButton";
import DeleteAlert from "../Global/DeleteAlert";

function Home(props) {
  return (
    <div>
      {!props.isLargeScreen && (
        <HomeTopBar
          isNarrowScreen={props.isNarrowScreen}
          onChangePage={props.onChangePage}
          onChangeList={props.onChangeList}
          isLoading={false}
        />
      )}
      <ListOfLists
        isLargeScreen={props.isLargeScreen}
        data={props.data}
        currentListId={props.currentListId}
        onChangePage={props.onChangePage}
        onChangeList={props.onChangeList}
        onDeleteList={props.onDeleteList}
        onToggleDeleteAlert={props.onToggleDeleteAlert}
        setSearchQuery={props.setSearchQuery}
      />
      {!props.isLargeScreen && (
        <AddButton
          onChangePage={props.onChangePage}
          currentPage={props.currentPage}
          addLabel="Add New List"
        />
      )}
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
