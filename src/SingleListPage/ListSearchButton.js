import "./ListSearchButton.css";

function ListSearchButton(props) {
  function handleClick() {
    props.onChangePage("ListSearchPage");
  }

  return (
    <i
      className="search-button fas fa-search fa-4x"
      onClick={handleClick}
      role="button"
      tabIndex="0"
      aria-label={`Open search bar for current list: ${props.taskList.name}`}
      onKeyDown={(e) =>
        e.code === "Enter" || e.code === "Space" ? handleClick() : null
      }
    ></i>
  );
}

export default ListSearchButton;
