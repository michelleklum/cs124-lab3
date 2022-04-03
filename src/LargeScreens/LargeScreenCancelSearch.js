import "./LargeScreenCancelSearch.css";

function LargeScreenCancelSearch(props) {
  return (
    <h3
      className="right-aligned"
      id="large-screen-cancel-search"
      onClick={() => props.onChangePage(props.prevPage)}
    >
      Cancel
    </h3>
  );
}

export default LargeScreenCancelSearch;
