import "./ListMenuButton.css";

function ListMenuButton(props) {
  function handleClick() {
    props.onChangeMenuMode();
  }

  const closeEnterVerb = props.inMenuMode ? "Close" : "Enter";

  return (
    <i
      className="fas fa-ellipsis-h fa-4x list-menu-button"
      onClick={handleClick}
      role="button"
      tabIndex="0"
      aria-label={`${closeEnterVerb} options menu for current list: ${props.taskList.name}`}
      onKeyDown={(e) =>
        e.code === "Enter" || e.code === "Space" ? handleClick() : null
      }
    ></i>
  );
}

export default ListMenuButton;
