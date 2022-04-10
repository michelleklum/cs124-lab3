import "./LargeScreenCancelSearch.css";

function LargeScreenCancelSearch(props) {
  function handleClick() {
    props.setSearchQuery("");
  }

  return (
    <button
      className="large-screen-cancel-search-button"
      onClick={handleClick}
      aria-label="Cancel current list search"
    >
      <h3 className="right-aligned" id="large-screen-cancel-search">
        Cancel
      </h3>
    </button>
  );
}

export default LargeScreenCancelSearch;
