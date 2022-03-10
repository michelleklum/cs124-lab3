import "./ListSearchBar.css";
import CancelListSearch from "./CancelListSearch";

function ListSearchBar(props) {

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
      <CancelListSearch
        onChangePage={props.onChangePage}
        onChangeList={props.onChangeList}
        prevPage={"SingleListPage"}
        id={props.id} />
    </div>
  );
}

export default ListSearchBar;
