import "./HomeSearchButton.css";

function HomeSearchButton(props) {
  return (
    <i
      className="search-button fas fa-search fa-4x"
      onClick={() => props.onChangePage("HomeSearchPage")}
    ></i>
  );
}

export default HomeSearchButton;
