import "./HomeSearchButton.css";

function HomeSearchButton(props) {
  return (
    <i
      className="search-button fas fa-search fa-4x"
      onClick={() => props.onChangePage("HomeSearchPage")}
      tabIndex="0"
      role="button"
      aria-label = "Search for List"
      onKeyDown={(e) => (e.code === "Enter") ? props.onChangePage("HomeSearchPage") : null}
    ></i>
  );
}

export default HomeSearchButton;
