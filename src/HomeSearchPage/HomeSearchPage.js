import "./HomeSearchPage.css";
import React, { Fragment, useState } from "react";
import SearchBar from "../Global/SearchBar";
import ListCard from "../Home/ListCard";
import DeleteAlert from "../Global/DeleteAlert";

const filterLists = (lists, query) => {
  query = query.toLowerCase();
  if (query.length === 0) {
    return lists;
  }
  return lists.filter((list) => {
    const listName = list.name.toLowerCase();
    return listName.includes(query);
  });
};

function HomeSearchPage(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredLists = filterLists(props.data, searchQuery);

  return (
    <Fragment>
      <SearchBar
        onChangePage={props.onChangePage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        prevPage={props.prevPage}
        searchLabel="All lists"
      />
      <div id="filtered-lists">
        {filteredLists.map((list) => (
          <ListCard
            key={list.id}
            id={list.id}
            listName={list.name}
            listIcon={list.icon}
            onChangePage={props.onChangePage}
            onChangeList={props.onChangeList}
            onDeleteList={props.onDeleteList}
            onToggleDeleteAlert={props.onToggleDeleteAlert}
          />
        ))}
      </div>
      {props.showDeleteAlert && (
        <DeleteAlert
          type="this list"
          onToggleDeleteAlert={props.onToggleDeleteAlert}
          onDelete={() => props.onDeleteList()}
        />
      )}
    </Fragment>
  );
}

export default HomeSearchPage;
