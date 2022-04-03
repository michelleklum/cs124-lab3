function LargeScreenAddButton(props) {

  function handleClick() {
    if (props.addType === "list") {
      props.onChangePage("CreateListPage") 
    }
    else {
      props.onChangePage("CreateTaskPage")
    }
    props.onToggleLargeScreenPopup()
  }

  return (
    <div className="large-screen-add-button" onClick={handleClick}>
      <i className="fas fa-plus fa-4x"></i>
    </div>
  );
}

export default LargeScreenAddButton;
