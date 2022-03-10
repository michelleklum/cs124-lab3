function TaskBackButton(props) {
  return (
    <i
      className="fas fa-chevron-left fa-4x"
      onClick={() => props.onChangePage("SingleListPage")}
    ></i>
  );
}

export default TaskBackButton;
