function CancelEditListButton(props) {
  return (
    <div className="left-aligned">
      <i
        className="fas fa-times fa-5x cancel-edit-list"
        onClick={function () {
          props.onChangePage(props.prevPage);
          props.isLargeScreen && props.onToggleLargeScreenPopup();
        }}
      ></i>
    </div>
  );
}

export default CancelEditListButton;
