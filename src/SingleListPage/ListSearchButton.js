import "./ListSearchButton.css";

function ListSearchButton(props) {
  return (
    <i
      className="search-button fas fa-search fa-4x"
      onClick={() => props.onChangePage("ListSearchPage")}
    ></i>
  );
}

export default ListSearchButton;
