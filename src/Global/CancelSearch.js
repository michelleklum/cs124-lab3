import "./CancelSearch.css";

function CancelSearch(props) {
  return (
    <h3
      className="right-aligned"
      id="cancel-search"
      onClick={() => props.onChangePage(props.prevPage)}
      aria-label="Cancel Search"
      tabIndex="0"
      role="button"
      onKeyDown={(e) => (e.code === "Enter") ? props.onChangePage(props.prevPage) : null}
    >
      Cancel
    </h3>
  );
}

export default CancelSearch;
