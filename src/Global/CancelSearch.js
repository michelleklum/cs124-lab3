import "./CancelSearch.css";

function CancelSearch(props) {
  return (
    <h3
      className="right-aligned"
      id="cancel-search"
      onClick={() => props.onChangePage(props.prevPage)}
    >
      Cancel
    </h3>
  );
}

export default CancelSearch;
