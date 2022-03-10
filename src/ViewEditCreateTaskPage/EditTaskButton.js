function EditTaskButton(props) {
  return (
    <i
      className="fas fa-pencil-alt fa-4x"
      onClick={() => props.onChangePage("EditTaskPage")}
    ></i>
  );
}

export default EditTaskButton;
