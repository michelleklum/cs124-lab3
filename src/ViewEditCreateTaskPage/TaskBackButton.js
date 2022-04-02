function TaskBackButton(props) {
  return (
    <i
      className="fas fa-chevron-left fa-4x"
      onClick={function () {
        props.onChangePage("SingleListPage");
        props.isLargeScreen && props.onToggleLargeScreenPopup();
      }}
    ></i>
  );
}

export default TaskBackButton;
