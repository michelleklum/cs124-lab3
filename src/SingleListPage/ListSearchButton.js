import "./ListSearchButton.css";

function ListSearchButton(props) {
  function handleClick() {
    props.onChangePage("ListSearchPage");
  }

  return (
    <button onClick={handleClick}>
      <i
        className="search-button fas fa-search fa-4x"
        aria-label={`Open search bar for current list: ${props.taskList.name}`}
      ></i>
    </button>
  );
}

export default ListSearchButton;
