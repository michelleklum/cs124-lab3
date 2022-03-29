import "./SearchBar.css";
import CancelSearch from "./CancelSearch";

function SearchBar(props) {
  return (
    <div className="search-background">
      <div className="search">
        <i className="fas fa-search fa-3x"></i>
        <label htmlFor="search" className="search-label">
          Search
        </label>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search"
          autoComplete="off"
          autoFocus
          value={props.searchQuery}
          onInput={(e) => props.setSearchQuery(e.target.value)}
        />
      </div>
      <CancelSearch
        onChangePage={props.onChangePage}
        onChangeList={props.onChangeList}
        prevPage={props.prevPage}
        listId={props.listId}
      />
    </div>
  );
}

export default SearchBar;
