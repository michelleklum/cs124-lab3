import "./HomeSearchBar.css";
import CancelHomeSearch from "./CancelHomeSearch";

function HomeSearchBar(props) {
  return (
    <div className="search-background">
      <div className="search">
        <i className="fas fa-search fa-3x"></i>
        <form action="/" method="get">
          <label htmlFor="search" className="search-label">Search</label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search"
            autoComplete="off"
            autoFocus
            value={props.searchQuery}
            onInput={e => props.setSearchQuery(e.target.value)}
          />
        </form>
      </div>
      <CancelHomeSearch
        onChangePage={props.onChangePage}
        prevPage={"Home"} />
    </div>
  );
}

export default HomeSearchBar;
