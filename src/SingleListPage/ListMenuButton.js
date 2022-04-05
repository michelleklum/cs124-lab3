import "./ListMenuButton.css";

function ListMenuButton(props) {
  return (
    <i className="fas fa-ellipsis-h fa-4x list-menu-button" onClick={props.onChangeMenuMode}></i>
  );
}

export default ListMenuButton;
