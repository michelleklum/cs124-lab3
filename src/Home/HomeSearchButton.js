import "./HomeSearchButton.css";

function HomeSearchButton(props) {
  return (
    <button
      onClick={() => props.onChangePage("HomeSearchPage")}
      aria-label="Search for List">
      <i
        className="search-button fas fa-search fa-4x"
      ></i>
    </button>
  );
}

export default HomeSearchButton;
