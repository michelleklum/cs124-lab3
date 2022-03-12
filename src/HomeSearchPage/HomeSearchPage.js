import "./HomeSearchPage.css";
import React, { Fragment, useState } from "react";
import HomeSearchBar from "./HomeSearchBar";
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
      <HomeSearchBar
        onChangePage={props.onChangePage}
        onChangeList={props.onChangeList}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        prevPage={props.prevPage}
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
          onDelete={() => props.onDeleteList(props.currentListId)}
        />
      )}
    </Fragment>
  );
}

export default HomeSearchPage;
