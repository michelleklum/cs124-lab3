import "./ListMenuButton.css";

function ListMenuButton(props) {
  return (
    <i className="fas fa-ellipsis-h fa-4x" onClick={props.onChangeMenuMode}></i>
  );
}

export default ListMenuButton;
