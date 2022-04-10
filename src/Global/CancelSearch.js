import "./CancelSearch.css";

function CancelSearch(props) {
  return (
    <button
      className="right-aligned"
      id="cancel-search"
      onClick={() => props.onChangePage(props.prevPage)}
      aria-label="Cancel Search"
    >
      Cancel
    </button>
  );
}

export default CancelSearch;
