import "./DeleteListButton.css";

function DeleteListButton(props) {
  return (
    <i
      className="fas fa-trash-alt fa-4x delete-list right-aligned"
      onClick={() => {
        props.onChangeList(props.id);
        props.onToggleDeleteAlert();
      }}
    ></i>
  );
}

export default DeleteListButton;
