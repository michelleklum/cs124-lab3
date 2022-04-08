import "./ListSearchButton.css";

function ListSearchButton(props) {
  function handleClick() {
    props.onChangePage("ListSearchPage");
  }

  return (
    <button
      onClick={handleClick}
      aria-label={`Open search bar for current list: ${props.taskList.name}`}
    >
      <i className="search-button fas fa-search fa-4x"></i>
    </button>
  );
}

export default ListSearchButton;
