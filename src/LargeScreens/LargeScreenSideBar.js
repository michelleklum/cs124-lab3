import Home from "../Home/Home";

function LargeScreenSideBar(props) {
  return (
    <Home
      isLargeScreen={props.isLargeScreen}
      data={props.data}
      onChangePage={props.onChangePage}
      onChangeList={props.onChangeList}
      onDeleteList={props.onDeleteList}
      onToggleDeleteAlert={props.onToggleDeleteAlert}
    />
  );
}

export default LargeScreenSideBar;
